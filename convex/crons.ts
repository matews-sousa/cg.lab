import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.weekly(
  "Reset all users practiced week days",
  {
    dayOfWeek: "sunday",
    hourUTC: 21, // UTC = 24 (00:00), UTC-3 = 24-3 (00:00) (BRT)
    minuteUTC: 0,
  },
  internal.users.resetAllUsersPracticedWeekDays
);

crons.daily(
  "Reset all users daily mission progress",
  {
    hourUTC: 21, // UTC = 24 (00:00), UTC-3 = 24-3 (00:00) (BRT)
    minuteUTC: 0,
  },
  internal.users.resetAllUsersDailyMissionProgress
);

export default crons;
