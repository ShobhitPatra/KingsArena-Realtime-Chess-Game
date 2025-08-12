import { createClient, RedisClientType } from "redis";
import { START_GAME, User } from "../types";
import { Game } from "./Game";
import { prisma } from "@repo/db";

const GAME_QUEUE = "game_queue";

class GameManager {
  private static instance: GameManager;
  public redis: RedisClientType;
  public games: Game[];

  private async init() {
    try {
      await this.redis.connect();
      console.log("redis clent initiaed for game queue");
    } catch (err) {
      console.error("error initializing redis client for game queue");
    }
  }

  private constructor() {
    this.redis = createClient({
      url: "redis://localhost:6379",
    });
    this.init();
    this.games = [];
  }

  public static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  public async addUser(user: User) {
    const queueLength = await this.redis.lLen(GAME_QUEUE);
    const existingUserInQueue: string[] = await this.redis.lRange(
      GAME_QUEUE,
      0,
      queueLength
    );
    const userAlreadyInQueue = existingUserInQueue.find(
      (currentUser) => JSON.parse(currentUser).id === user.id
    );
    if (userAlreadyInQueue) {
      console.log("user already in queue");
      return;
    }
    await this.redis.rPush(GAME_QUEUE, JSON.stringify(user));
    console.log(`pushed user ${user} in waiting queue`);
    const updatedQueuelength = await this.redis.lLen(GAME_QUEUE);
    console.log("queuelength : ", updatedQueuelength);
    if (updatedQueuelength >= 2) {
      const player1Str = await this.redis.lPop(GAME_QUEUE);
      const player2Str = await this.redis.lPop(GAME_QUEUE);
      if (!player1Str || !player2Str) return;
      const player1: User = JSON.parse(player1Str);
      const player2: User = JSON.parse(player2Str);
      this.createGame(player1, player2);
    }
  }
  private async createGame(player1: User, player2: User) {
    const gameId = await this.createGameInDb(player1, player2);
    if (!gameId) return;
    const game = new Game(gameId.toString(), player1.id, player2.id);
    this.games.push(game);
    console.log("new game created :", game);
    game.notifyPlayer(player1.id, {
      message: START_GAME,
      color: "w",
      opponent: player2,
      gameId: gameId,
    });
    game.notifyPlayer(player2.id, {
      message: START_GAME,
      color: "b",
      opponent: player1,
      gameId: gameId,
    });
  }
  private async createGameInDb(player1: User, player2: User) {
    try {
      const game = await prisma.game.create({
        data: {
          playerAsWhiteId: player1.id,
          playerAsBlackId: player2.id,
          gameResult: "DRAW",
          gameState: "ONGOING",
        },
      });

      return game.id;
    } catch (error) {
      console.error("error creating game in db", error);
    }
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
  //remove game (case : user resigns)
  public removeGame(gameId: string) {
    const existingGame = this.games.find((game) => game.gameId === gameId);
    if (!existingGame) return;
    this.games = this.games.filter((game) => game.gameId != gameId);
  }
}

export const gameManager = GameManager.getInstance();
