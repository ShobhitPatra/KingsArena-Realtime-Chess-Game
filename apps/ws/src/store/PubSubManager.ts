import { createClient, RedisClientType } from "redis";
import { User } from "../types";
import { userSocketMap } from "..";

class PubSubManager {
  private subscriberClient: RedisClientType;
  private publisherClient: RedisClientType;

  private static instance: PubSubManager;
  private subscriptions: Map<string, User[]>;

  private constructor() {
    this.subscriberClient = createClient({
      url: "redis://localhost:6379",
    });
    this.publisherClient = createClient({
      url: "redis://localhost:6379",
    });
    this.init();
    this.subscriptions = new Map();
  }

  private async init() {
    try {
      await this.subscriberClient.connect();
      await this.publisherClient.connect();

      console.log("redis client initiated for pub sub");
    } catch (err) {
      console.error("errro initializing redis client for pub sub", err);
    }
  }

  public static getInstance() {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  public async subscribe(channelId: string, userStr: string) {
    const user = JSON.parse(userStr) as User;
    if (!this.subscriptions.has(channelId)) {
      this.subscriptions.set(channelId, []);
    }
    this.subscriptions.get(channelId)?.push(user);
    await this.subscriberClient.subscribe(channelId, (message) => {
      this.handleMessage(channelId, message);
    });
  }

  private handleMessage(channelId: string, message: string) {
    const existingChannel = this.subscriptions.has(channelId);
    if (!existingChannel) return;
    const subscribers = this.subscriptions.get(channelId);
    if (!subscribers) return;
    subscribers.forEach((user: User) => {
      const userSocket = userSocketMap.get(user.id);
      if (userSocket && userSocket.readyState === userSocket.OPEN) {
        userSocket.send(JSON.stringify(message));
      }
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

    if (updatedSubscribers.length === 0) {
      this.subscriberClient.unsubscribe(channelId);
      this.subscriptions.delete(channelId);
    }
  }

  public async publish(channelId: string, message: string) {
    if (!this.subscriptions.has(channelId)) return;
    await this.publisherClient.publish(channelId, JSON.stringify(message));
  }
}
export const pubSubManager = PubSubManager.getInstance();
