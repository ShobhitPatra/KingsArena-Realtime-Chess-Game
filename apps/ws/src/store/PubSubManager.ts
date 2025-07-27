import { createClient, RedisClientType } from "redis";
import { User } from "../types";

class PubSubManager {
  private redis: RedisClientType;
  private static instance: PubSubManager;
  private subscriptions: Map<string, User[]>;

  private async init() {
    await this.redis.connect();
  }
  private constructor() {
    this.redis = createClient();
    this.init();
    this.subscriptions = new Map();
  }

  public static getInstance() {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  public subscribe(channelId: string, user: User) {
    if (!this.subscriptions.has(channelId)) {
      this.subscriptions.set(channelId, []);
    }
    this.subscriptions.get(channelId)?.push(user);
    this.redis.subscribe(channelId, (message) => {
      this.subscriptions.get(channelId)?.forEach((sub) => {
        console.log(
          `user ${user.id} subscribed to channel ${channelId} , ${message}`
        );
      });
    });
  }

  public unsubscribe(channelId: string, user: User) {
    if (!this.subscriptions.has(channelId)) {
      return;
    }

    const updatedSubscribers =
      this.subscriptions.get(channelId)?.filter((sub) => sub.id !== user.id) ||
      [];
    this.subscriptions.set(channelId, updatedSubscribers);
  }

  public publish(channelId: string, message: string) {
    if (!this.subscriptions.has(channelId)) return;
    this.redis.publish(channelId, JSON.stringify(message));
  }
}
export const pubSubManger = PubSubManager.getInstance();
