import {
  type Event,
  type InsertEvent,
  type Guest,
  type InsertGuest,
  type CoHost,
  type InsertCoHost,
  type PotluckItem,
  type InsertPotluckItem,
  type MenuItem,
  type InsertMenuItem,
  type GiftRegistryItem,
  type InsertGiftRegistryItem,
  type GroupGift,
  type InsertGroupGift,
  type Activity,
  type InsertActivity,
  type PlaylistSong,
  type InsertPlaylistSong,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Events
  createEvent(event: InsertEvent): Promise<Event>;
  getEvent(id: string): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  // Co-Hosts
  addCoHost(coHost: InsertCoHost): Promise<CoHost>;
  getEventCoHosts(eventId: string): Promise<CoHost[]>;
  removeCoHost(id: string): Promise<boolean>;

  // Guests
  addGuest(guest: InsertGuest): Promise<Guest>;
  getEventGuests(eventId: string): Promise<Guest[]>;
  updateGuest(id: string, guest: Partial<InsertGuest>): Promise<Guest | undefined>;
  deleteGuest(id: string): Promise<boolean>;

  // Potluck Items
  addPotluckItem(item: InsertPotluckItem): Promise<PotluckItem>;
  getEventPotluckItems(eventId: string): Promise<PotluckItem[]>;
  updatePotluckItem(id: string, item: Partial<InsertPotluckItem>): Promise<PotluckItem | undefined>;
  deletePotluckItem(id: string): Promise<boolean>;

  // Menu Items
  addMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  getEventMenuItems(eventId: string): Promise<MenuItem[]>;
  updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: string): Promise<boolean>;

  // Gift Registry
  addGiftRegistryItem(item: InsertGiftRegistryItem): Promise<GiftRegistryItem>;
  getEventGiftRegistryItems(eventId: string): Promise<GiftRegistryItem[]>;
  updateGiftRegistryItem(id: string, item: Partial<InsertGiftRegistryItem>): Promise<GiftRegistryItem | undefined>;
  deleteGiftRegistryItem(id: string): Promise<boolean>;

  // Group Gifts
  addGroupGift(gift: InsertGroupGift): Promise<GroupGift>;
  getEventGroupGifts(eventId: string): Promise<GroupGift[]>;
  updateGroupGift(id: string, gift: Partial<InsertGroupGift>): Promise<GroupGift | undefined>;
  deleteGroupGift(id: string): Promise<boolean>;

  // Activities
  addActivity(activity: InsertActivity): Promise<Activity>;
  getEventActivities(eventId: string): Promise<Activity[]>;

  // Playlist
  addPlaylistSong(song: InsertPlaylistSong): Promise<PlaylistSong>;
  getEventPlaylistSongs(eventId: string): Promise<PlaylistSong[]>;
  deletePlaylistSong(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private events: Map<string, Event> = new Map();
  private coHosts: Map<string, CoHost> = new Map();
  private guests: Map<string, Guest> = new Map();
  private potluckItems: Map<string, PotluckItem> = new Map();
  private menuItems: Map<string, MenuItem> = new Map();
  private giftRegistryItems: Map<string, GiftRegistryItem> = new Map();
  private groupGifts: Map<string, GroupGift> = new Map();
  private activities: Map<string, Activity> = new Map();
  private playlistSongs: Map<string, PlaylistSong> = new Map();

  constructor() {
    // Initialize with mock data
    this.seedMockData();
  }

  // Events
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { ...insertEvent, id, createdAt: new Date() };
    this.events.set(id, event);
    return event;
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    const updated = { ...event, ...updateData };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  // Co-Hosts
  async addCoHost(insertCoHost: InsertCoHost): Promise<CoHost> {
    const id = randomUUID();
    const coHost: CoHost = { ...insertCoHost, id };
    this.coHosts.set(id, coHost);
    return coHost;
  }

  async getEventCoHosts(eventId: string): Promise<CoHost[]> {
    return Array.from(this.coHosts.values()).filter((ch) => ch.eventId === eventId);
  }

  async removeCoHost(id: string): Promise<boolean> {
    return this.coHosts.delete(id);
  }

  // Guests
  async addGuest(insertGuest: InsertGuest): Promise<Guest> {
    const id = randomUUID();
    const guest: Guest = { ...insertGuest, id, addedAt: new Date() };
    this.guests.set(id, guest);
    return guest;
  }

  async getEventGuests(eventId: string): Promise<Guest[]> {
    return Array.from(this.guests.values()).filter((g) => g.eventId === eventId);
  }

  async updateGuest(id: string, updateData: Partial<InsertGuest>): Promise<Guest | undefined> {
    const guest = this.guests.get(id);
    if (!guest) return undefined;
    const updated = { ...guest, ...updateData };
    this.guests.set(id, updated);
    return updated;
  }

  async deleteGuest(id: string): Promise<boolean> {
    return this.guests.delete(id);
  }

  // Potluck Items
  async addPotluckItem(insertItem: InsertPotluckItem): Promise<PotluckItem> {
    const id = randomUUID();
    const item: PotluckItem = { ...insertItem, id };
    this.potluckItems.set(id, item);
    return item;
  }

  async getEventPotluckItems(eventId: string): Promise<PotluckItem[]> {
    return Array.from(this.potluckItems.values()).filter((i) => i.eventId === eventId);
  }

  async updatePotluckItem(id: string, updateData: Partial<InsertPotluckItem>): Promise<PotluckItem | undefined> {
    const item = this.potluckItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, ...updateData };
    this.potluckItems.set(id, updated);
    return updated;
  }

  async deletePotluckItem(id: string): Promise<boolean> {
    return this.potluckItems.delete(id);
  }

  // Menu Items
  async addMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { ...insertItem, id };
    this.menuItems.set(id, item);
    return item;
  }

  async getEventMenuItems(eventId: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter((i) => i.eventId === eventId);
  }

  async updateMenuItem(id: string, updateData: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const item = this.menuItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, ...updateData };
    this.menuItems.set(id, updated);
    return updated;
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    return this.menuItems.delete(id);
  }

  // Gift Registry Items
  async addGiftRegistryItem(insertItem: InsertGiftRegistryItem): Promise<GiftRegistryItem> {
    const id = randomUUID();
    const item: GiftRegistryItem = { ...insertItem, id };
    this.giftRegistryItems.set(id, item);
    return item;
  }

  async getEventGiftRegistryItems(eventId: string): Promise<GiftRegistryItem[]> {
    return Array.from(this.giftRegistryItems.values()).filter((i) => i.eventId === eventId);
  }

  async updateGiftRegistryItem(id: string, updateData: Partial<InsertGiftRegistryItem>): Promise<GiftRegistryItem | undefined> {
    const item = this.giftRegistryItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, ...updateData };
    this.giftRegistryItems.set(id, updated);
    return updated;
  }

  async deleteGiftRegistryItem(id: string): Promise<boolean> {
    return this.giftRegistryItems.delete(id);
  }

  // Group Gifts
  async addGroupGift(insertGift: InsertGroupGift): Promise<GroupGift> {
    const id = randomUUID();
    const gift: GroupGift = { ...insertGift, id };
    this.groupGifts.set(id, gift);
    return gift;
  }

  async getEventGroupGifts(eventId: string): Promise<GroupGift[]> {
    return Array.from(this.groupGifts.values()).filter((g) => g.eventId === eventId);
  }

  async updateGroupGift(id: string, updateData: Partial<InsertGroupGift>): Promise<GroupGift | undefined> {
    const gift = this.groupGifts.get(id);
    if (!gift) return undefined;
    const updated = { ...gift, ...updateData };
    this.groupGifts.set(id, updated);
    return updated;
  }

  async deleteGroupGift(id: string): Promise<boolean> {
    return this.groupGifts.delete(id);
  }

  // Activities
  async addActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { ...insertActivity, id, createdAt: new Date() };
    this.activities.set(id, activity);
    return activity;
  }

  async getEventActivities(eventId: string): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter((a) => a.eventId === eventId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Playlist
  async addPlaylistSong(insertSong: InsertPlaylistSong): Promise<PlaylistSong> {
    const id = randomUUID();
    const song: PlaylistSong = { ...insertSong, id };
    this.playlistSongs.set(id, song);
    return song;
  }

  async getEventPlaylistSongs(eventId: string): Promise<PlaylistSong[]> {
    return Array.from(this.playlistSongs.values())
      .filter((s) => s.eventId === eventId)
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }

  async deletePlaylistSong(id: string): Promise<boolean> {
    return this.playlistSongs.delete(id);
  }

  // Seed mock data
  private seedMockData() {
    // Create Sarah's Graduation Party event
    const event1Id = randomUUID();
    this.events.set(event1Id, {
      id: event1Id,
      name: "Sarah's Graduation Party",
      type: "graduation",
      date: "December 15, 2025",
      time: "4:00 PM",
      location: "123 Main St, Apartment 4B",
      dressCode: "Summer Casual",
      foodStyle: "potluck",
      description: "Join us to celebrate Sarah's graduation! There will be food, drinks, and great company.",
      maxAttendees: 50,
      createdAt: new Date(),
      primaryHostId: "user-1",
      communicationLeadId: "user-1",
    });

    // Create Holiday Potluck event
    const event2Id = randomUUID();
    this.events.set(event2Id, {
      id: event2Id,
      name: "Holiday Potluck",
      type: "holiday",
      date: "December 23, 2025",
      time: "6:00 PM",
      location: "Maria's House",
      dressCode: null,
      foodStyle: "potluck",
      description: "Annual holiday gathering with friends and family.",
      maxAttendees: null,
      createdAt: new Date(),
      primaryHostId: "user-2",
      communicationLeadId: "user-2",
    });

    // Add co-hosts for Sarah's party
    const coHost1Id = randomUUID();
    this.coHosts.set(coHost1Id, {
      id: coHost1Id,
      eventId: event1Id,
      name: "Maria Garcia",
      email: "maria@email.com",
      phone: null,
    });

    const coHost2Id = randomUUID();
    this.coHosts.set(coHost2Id, {
      id: coHost2Id,
      eventId: event1Id,
      name: "James Smith",
      email: "james@email.com",
      phone: null,
    });

    // Add guests for Sarah's party
    const guestNames = [
      "Jake Thompson",
      "Emily Chen",
      "Michael Rodriguez",
      "Alex Kim",
      "Sarah Johnson",
    ];
    const rsvpStatuses: Array<"yes" | "no" | "maybe" | "pending"> = ["yes", "yes", "yes", "maybe", "pending"];

    guestNames.forEach((name, index) => {
      const guestId = randomUUID();
      this.guests.set(guestId, {
        id: guestId,
        eventId: event1Id,
        name,
        email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
        phone: null,
        rsvp: rsvpStatuses[index],
        plusOnes: index === 0 ? 1 : 0,
        dietaryRestrictions: null,
        addedAt: new Date(),
      });
    });

    // Add potluck items for Sarah's party
    const potluckData = [
      { category: "appetizers", item: "Chips & Salsa", claimedBy: "Michael Rodriguez" },
      { category: "mains", item: "Grilled Chicken", claimedBy: null },
      { category: "desserts", item: "Chocolate Cake", claimedBy: "Emily Chen" },
      { category: "drinks", item: "Sodas & Juice", claimedBy: null },
    ];

    potluckData.forEach((data) => {
      const itemId = randomUUID();
      this.potluckItems.set(itemId, {
        id: itemId,
        eventId: event1Id,
        category: data.category,
        item: data.item,
        description: null,
        servings: null,
        claimedBy: data.claimedBy,
        claimedById: data.claimedBy ? randomUUID() : null,
      });
    });

    // Add activities for Sarah's party
    const activityData = [
      { type: "rsvp", text: "Emily Chen RSVP'd Yes", actorName: "Emily Chen" },
      { type: "potluck", text: "Michael Rodriguez claimed Chips & Salsa", actorName: "Michael Rodriguez" },
      { type: "invite", text: "You invited Jake Thompson", actorName: "You" },
    ];

    activityData.forEach((data) => {
      const activityId = randomUUID();
      this.activities.set(activityId, {
        id: activityId,
        eventId: event1Id,
        type: data.type,
        text: data.text,
        actorName: data.actorName,
        createdAt: new Date(Date.now() - Math.random() * 86400000), // Random time in last 24h
      });
    });
  }
}

export const storage = new MemStorage();
