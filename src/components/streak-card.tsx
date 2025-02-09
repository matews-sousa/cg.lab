import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Flame } from "lucide-react";
import lostCurrentStreak from "@/utils/lostCurrentStreak";
import { Doc } from "../../convex/_generated/dataModel";

interface Props {
  user: Doc<"users">;
  allCompletions: number;
}

export default function StreakCard({ user, allCompletions }: Props) {
  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]; // Days from Sunday to Saturday
  const practicedDays = new Set(user?.practicedWeekDays || []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-5xl font-extrabold flex items-center gap-1">
          <span>
            {lostCurrentStreak(user.lastCompletedDate) ? 0 : user.streak}
          </span>
          <Flame className="w-9 h-9" />
        </CardTitle>
        <CardDescription>
          Continue praticando e mantenha sua sequência!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div
                key={day}
                className={`w-10 h-10 border shadow-sm rounded-full flex items-center justify-center
          ${practicedDays.has(day) ? "bg-green-200" : "bg-gray-100"}`}
              >
                {daysOfWeek[index]}
              </div>
            )
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2 w-full">
          <div className="flex-1 bg-gray-100 rounded-md shadow-sm border flex flex-col items-center p-2">
            <span className="text-sm">Seu recorde</span>
            <span className="text-2xl font-bold">
              {user.bestStreak ? user.bestStreak : 0}
            </span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-md shadow-sm border flex flex-col items-center p-2">
            <span className="text-sm">Exercícios</span>
            <span className="text-2xl font-bold">{allCompletions}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
