import { createClient, RedisClientType } from "redis";
import { User } from "../types";
import { Game } from "./Game";

const GAME_QUEUE = "game_queue";

export class GameManager {
  public redis: RedisClientType;
  public games: Game[];

  private async init() {
    await this.redis.connect();
  }

  constructor() {
    this.redis = createClient();
    this.init();
    this.games = [];
  }

  public async addUser(user: User) {
    this.redis.rPush(GAME_QUEUE, JSON.stringify(user));
    const queuelength = await this.redis.lLen(GAME_QUEUE);
    if (queuelength >= 2) {
      const player1Str = await this.redis.lPop(GAME_QUEUE);
      const player2Str = await this.redis.lPop(GAME_QUEUE);
      if (!player1Str || !player2Str) return;
      const player1: User = JSON.parse(player1Str);
      const player2: User = JSON.parse(player2Str);
      this.createGame(player1, player2);
    }
  }
  private createGame(player1: User, player2: User) {
    //create game in db => get gameId
    const gameId = Math.random().toString();
    const game = new Game(gameId, player1.id, player2.id);
    this.games.push(game);
  }
  public async removeUser(user: User) {
    const temp_queue: string[] = [];
    let removed = false;
    const queue_length = await this.redis.lLen(GAME_QUEUE);

    for (let i = 0; i < queue_length; i++) {
      const data = await this.redis.lPop(GAME_QUEUE);
      if (!data) continue;
      const currentUser: User = JSON.parse(data);

      if (currentUser.id !== user.id) {
        temp_queue.push(JSON.stringify(currentUser));
      } else {
        removed = true;
      }
    }

    for (const userStr of temp_queue) {
      await this.redis.rPush(GAME_QUEUE, userStr);
    }

    if (removed) {
      console.log(`removed user ${user} from the queue`);
    }
  }
}
