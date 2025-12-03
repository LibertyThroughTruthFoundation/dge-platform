import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default function Module7() {
  const { data: module, isLoading } = trpc.module.getModule.useQuery();
  const { data: user } = trpc.auth.me.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-5xl py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">{module.title}</h1>
          <p className="text-xl text-muted-foreground mb-2">{module.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{module.description}</p>
        </div>

        {/* Sub-modules grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {module.subModules.map((subModule, index) => (
            <SubModuleCard
              key={subModule.id}
              subModule={subModule}
              index={index + 1}
              userId={user?.id}
            />
          ))}
        </div>

        {/* Back button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

function SubModuleCard({ subModule, index, userId }: { subModule: any; index: number; userId?: number }) {
  const { data: completion } = trpc.module.getCompletion.useQuery(
    {
      moduleId: "module-7",
      subModuleId: subModule.id,
    },
    { enabled: !!userId }
  );

  const isCompleted = completion?.completed || false;

  return (
    <Link href={`/module/7/${subModule.id}`}>
      <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            ) : (
              <Circle className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {index}. {subModule.title}
              </h3>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-muted-foreground mb-4">{subModule.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{subModule.tokensEarned} tokens</span>
              {isCompleted && <span>• Completed ✓</span>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
