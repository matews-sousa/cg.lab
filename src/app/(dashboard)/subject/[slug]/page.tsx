"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subjects } from "@/constants/assignments";
import Link from "next/link";
import React, { use } from "react";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const subject = subjects.find(s => s.slug === slug);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-16">
      <Card className="mb-4 md:mb-0 self-start">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{subject?.title}</CardTitle>
          <CardDescription>{subject?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>3/15 exercícios</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 col-span-2 gap-4">
        {subject?.assignments.map(assignment => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/assignment/${subject.slug}/${assignment.id}`}>
                <Button>Resolver</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
