import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FramerWrapper from "./animation/FramerWrapper";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  value: {
    title: string;
    description: string;
    tags: string[];
    link: string;
  };
  num: number;
}

const ProjectCards: React.FC<ProjectCardProps> = ({ value, num }) => {
  return (
    <FramerWrapper 
      className="max-w-[32%] max-lg:max-w-full" 
      y={0} 
      scale={0.8} 
      delay={num/4} 
      duration={0.15}
    >
      <Card className="glass w-full h-full flex flex-col transition-all duration-300 hover:glow-cyan hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-neon-cyan">{value.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>

          <div className="flex flex-wrap gap-2">
            {value.tags.map((tag: string, index: number) => {
              // Cycle neon accents across tags so each card reads consistently
              // regardless of what tag text is passed in.
              const accentCycle = [
                "border-neon-green text-neon-green",
                "border-[hsl(182,100%,50%)] text-neon-cyan",
                "border-[hsl(271,91%,65%)] text-neon-purple",
              ];
              const accent = accentCycle[index % accentCycle.length];

              return (
                <span
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-transparent ${accent}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="pt-2 ">
          <Link
            href={value.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ 
                variant: "default", 
                size: "sm" 
              }),
              "w-fit transition-all hover:translate-y-[-2px] hover:shadow-md group"
            )}
          >
            Visit Project 
            <ArrowUpRight className="h-4 w-4 ml-1 hidden group-hover:block -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </Link>
        </CardFooter>
      </Card>
    </FramerWrapper>
  );
};

export default ProjectCards;
