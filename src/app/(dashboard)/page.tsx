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
import { Blocks, Box, Flame } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
      <div className="flex flex-col gap-4 mb-4 lg:mb-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-5xl font-extrabold flex items-center gap-1">
              <span>1</span>
              <Flame className="w-9 h-9" />
            </CardTitle>
            <CardDescription>
              Continue praticando e mantenha sua sequência!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-1">
              <div className="w-10 h-10 bg-green-200 border shadow-sm rounded-full flex items-center justify-center">
                D
              </div>
              <div className="w-10 h-10 bg-gray-100 border shadow-sm rounded-full flex items-center justify-center">
                S
              </div>
              <div className="w-10 h-10 bg-gray-100 border shadow-sm rounded-full flex items-center justify-center">
                T
              </div>
              <div className="w-10 h-10 bg-gray-100 border shadow-sm rounded-full flex items-center justify-center">
                Q
              </div>
              <div className="w-10 h-10 bg-gray-100 border shadow-sm rounded-full flex items-center justify-center">
                Q
              </div>
              <div className="w-10 h-10 bg-gray-100 border shadow-sm rounded-full flex items-center justify-center">
                S
              </div>
              <div className="w-10 h-10 bg-gray-100 border shadow-sm rounded-full flex items-center justify-center">
                S
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="flex-1 bg-gray-100 rounded-md shadow-sm border flex flex-col items-center p-4">
                <span className="text-sm">Seu recorde</span>
                <span className="text-2xl font-bold">12</span>
              </div>
              <div className="flex-1 bg-gray-100 rounded-md shadow-sm border flex flex-col items-center p-4">
                <span className="text-sm">Exercícios</span>
                <span className="text-2xl font-bold">24</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
        {subjects.map(subject => (
          <Card key={subject.slug} className="self-start">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {subject.type === "2D" ? <Blocks /> : <Box />}
                {subject.title}
              </CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={33} />
            </CardContent>
            <CardFooter>
              <Link href={`/subject/${subject.slug}`}>
                <Button>Iniciar</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
