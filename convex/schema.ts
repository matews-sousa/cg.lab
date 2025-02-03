import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    email: v.string(),
    isAnonymous: v.optional(v.boolean()),
    streak: v.optional(v.number()),
    bestStreak: v.optional(v.number()),
    lastCompletedDate: v.optional(v.string()),
    practicedWeekDays: v.optional(v.array(v.string())),
  }).index("email", ["email"]),
});

export default schema;
