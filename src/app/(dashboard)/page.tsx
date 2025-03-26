"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/constants/assignments";
import { useQuery } from "convex/react";
import { Blocks, Box } from "lucide-react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import StreakCard from "@/components/streak-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { defaultDailyMissions } from "@/constants/defaultDailyMissions";
import RandomAssignmentCard from "@/components/random-assignment-card";

export default function Home() {
  const user = useQuery(api.users.currentUser);
  const [loading, setLoading] = useState(true);
  const subjectsCompletionProgress = useQuery(
    api.assignmentCompletions.getSubjectsCompletionProgress
  );
  const allCompletions = Object.values(subjectsCompletionProgress ?? {}).reduce(
    (prev, curr) => prev + curr,
    0
  );
  const currentUserDailyMission = user?.currentDailyMissionId
    ? defaultDailyMissions.find(
        mission => mission.id === user?.currentDailyMissionId
      )
    : defaultDailyMissions[0];
  const currentDailyMissionProgressPercentage = Math.round(
    ((user?.currentDailyMissionProgress ?? 0) /
      (currentUserDailyMission?.target ?? 1)) *
      100
  );

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 items-start">
      <div className="flex flex-col gap-4 mb-4 lg:mb-0 lg:sticky top-4 lg:col-span-1">
        {/* Show Skeleton while loading */}
        {loading && (
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-12 w-1/3 rounded-xl" />
                <Skeleton className="h-6 w-full rounded-xl mt-4" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-28 w-full rounded-xl mt-4" />
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Show StreakCard or Login Card only after loading is complete */}
        {!loading && (
          <>
            {user ? (
              // ✅ Logged-in user sees progress tracking
              <StreakCard user={user} allCompletions={allCompletions} />
            ) : (
              // ❌ Not logged-in user sees a prompt to register
              <Card>
                <CardHeader>
                  <CardTitle>Comece sua Jornada!</CardTitle>
                  <CardDescription>
                    Registre-se para acompanhar sua sequência e progresso.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Link href="/login">
                      <Button className="w-full">Entrar</Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button variant="outline" className="w-full">
                        Registrar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Random Assignment Card (always visible) */}
        <RandomAssignmentCard />

        <Card>
          <CardHeader>
            <CardTitle>Missões diárias</CardTitle>
            <CardDescription>
              {user
                ? "Complete missões diárias para ganhar pontos de experiência."
                : "Faça login para começar a completar missões diárias."}
            </CardDescription>
          </CardHeader>
          {user && (
            <CardContent>
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="text-sm">{currentUserDailyMission?.title}</p>
                  <p>
                    {user?.currentDailyMissionProgress || 0}/
                    {currentUserDailyMission?.target}
                  </p>
                </div>
                <Progress value={currentDailyMissionProgressPercentage} />
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Subjects Grid (always visible) */}
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
        {subjects.map(subject => {
          const totalCompletion =
            subjectsCompletionProgress?.[subject.slug] ?? 0;
          const completionPercentage = Math.round(
            (totalCompletion / subject.assignments.length) * 100
          );

          return (
            <Card key={subject.slug} className="self-start">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {subject.type === "2D" ? <Blocks /> : <Box />}
                  {subject.title}
                </CardTitle>
                <CardDescription>{subject.description}</CardDescription>
              </CardHeader>
              {user && (
                <CardContent className="flex items-center justify-between gap-4">
                  <Progress value={completionPercentage} />
                  <p>{completionPercentage}%</p>
                </CardContent>
              )}
              <CardFooter>
                <Link className="w-full" href={`/subject/${subject.slug}`}>
                  <Button className="w-full">Iniciar</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
