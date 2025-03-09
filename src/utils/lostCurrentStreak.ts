import { addHours, differenceInDays } from "date-fns";

const lostCurrentStreak = (
  userLastCompletedDate: string | Date | number | undefined
) => {
  if (!userLastCompletedDate) return true;

  const today = addHours(new Date(), -3).toISOString(); // UTC-3 timezone (America/Sao_Paulo);
  const differece = differenceInDays(today, userLastCompletedDate);
  return differece > 1;
};

export default lostCurrentStreak;
