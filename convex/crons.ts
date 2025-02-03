import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.weekly(
  "Reset all users practiced week days",
  {
    dayOfWeek: "sunday",
    hourUTC: 12,
    minuteUTC: 0,
  },
  internal.users.resetAllUsersPracticedWeekDays
);

export default crons;
