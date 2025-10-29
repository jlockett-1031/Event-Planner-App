import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//=============================================================================
// Event Schema
//=============================================================================

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // birthday, graduation, baby-shower, holiday, etc
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  dressCode: text("dress_code"),
  foodStyle: text("food_style").notNull(), // host-provided or potluck
  description: text("description"),
  maxAttendees: integer("max_attendees"),
  createdAt: timestamp("created_at").defaultNow(),
  primaryHostId: varchar("primary_host_id"), // would reference users table if we had auth
  communicationLeadId: varchar("communication_lead_id"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

//=============================================================================
// Co-Hosts Schema
//=============================================================================

export const coHosts = pgTable("co_hosts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
});

export const insertCoHostSchema = createInsertSchema(coHosts).omit({
  id: true,
});

export type InsertCoHost = z.infer<typeof insertCoHostSchema>;
export type CoHost = typeof coHosts.$inferSelect;

//=============================================================================
// Guest Schema
//=============================================================================

export const guests = pgTable("guests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  rsvp: text("rsvp").notNull().default("pending"), // yes, no, maybe, pending
  plusOnes: integer("plus_ones").default(0),
  dietaryRestrictions: text("dietary_restrictions"),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertGuestSchema = createInsertSchema(guests).omit({
  id: true,
  addedAt: true,
});

export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type Guest = typeof guests.$inferSelect;

//=============================================================================
// Potluck Items Schema
//=============================================================================

export const potluckItems = pgTable("potluck_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  category: text("category").notNull(), // appetizers, mains, sides, desserts, drinks
  item: text("item").notNull(),
  description: text("description"),
  servings: integer("servings"),
  claimedBy: text("claimed_by"),
  claimedById: varchar("claimed_by_id"),
});

export const insertPotluckItemSchema = createInsertSchema(potluckItems).omit({
  id: true,
});

export type InsertPotluckItem = z.infer<typeof insertPotluckItemSchema>;
export type PotluckItem = typeof potluckItems.$inferSelect;

//=============================================================================
// Menu Items Schema (for host-provided food)
//=============================================================================

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  category: text("category").notNull(), // appetizers, mains, sides, desserts, drinks
  item: text("item").notNull(),
  description: text("description"),
  servings: integer("servings"),
  assignedTo: text("assigned_to"), // which co-host is handling this
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

//=============================================================================
// Gift Registry Items Schema
//=============================================================================

export const giftRegistryItems = pgTable("gift_registry_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price"), // in cents
  url: text("url"),
  store: text("store"),
  priority: text("priority"), // high, medium, low
  category: text("category"),
  purchasedBy: text("purchased_by"),
  isPurchased: boolean("is_purchased").default(false),
});

export const insertGiftRegistryItemSchema = createInsertSchema(giftRegistryItems).omit({
  id: true,
});

export type InsertGiftRegistryItem = z.infer<typeof insertGiftRegistryItemSchema>;
export type GiftRegistryItem = typeof giftRegistryItems.$inferSelect;

//=============================================================================
// Group Gifts Schema
//=============================================================================

export const groupGifts = pgTable("group_gifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  goalAmount: integer("goal_amount").notNull(), // in cents
  currentAmount: integer("current_amount").default(0), // in cents
  contributorCount: integer("contributor_count").default(0),
});

export const insertGroupGiftSchema = createInsertSchema(groupGifts).omit({
  id: true,
});

export type InsertGroupGift = z.infer<typeof insertGroupGiftSchema>;
export type GroupGift = typeof groupGifts.$inferSelect;

//=============================================================================
// Activity Feed Schema
//=============================================================================

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  type: text("type").notNull(), // rsvp, potluck, invite, menu, gift, etc
  text: text("text").notNull(),
  actorName: text("actor_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

//=============================================================================
// Music Playlist Schema
//=============================================================================

export const playlistSongs = pgTable("playlist_songs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  addedBy: text("added_by"),
  spotifyId: text("spotify_id"),
  orderIndex: integer("order_index"),
});

export const insertPlaylistSongSchema = createInsertSchema(playlistSongs).omit({
  id: true,
});

export type InsertPlaylistSong = z.infer<typeof insertPlaylistSongSchema>;
export type PlaylistSong = typeof playlistSongs.$inferSelect;
