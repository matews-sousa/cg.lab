import { differenceInDays } from "date-fns";

const lostCurrentStreak = (
  userLastCompletedDate: string | Date | number | undefined
) => {
  if (!userLastCompletedDate) return true;

  const today = new Date().toLocaleDateString();
  const differece = differenceInDays(today, userLastCompletedDate);
  return differece > 1;
};

export default lostCurrentStreak;
