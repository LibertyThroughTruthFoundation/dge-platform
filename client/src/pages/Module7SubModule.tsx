import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Coins, CheckCircle2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function Module7SubModule() {
  const [, params] = useRoute("/module/7/:subModuleId");
  const subModuleId = params?.subModuleId || "";
  
  const { data: subModule, isLoading } = trpc.module.getSubModule.useQuery({ subModuleId });
  const { data: completion, refetch: refetchCompletion } = trpc.module.getCompletion.useQuery({
    moduleId: "module-7",
    subModuleId,
  });
  const markComplete = trpc.module.markComplete.useMutation();
  
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Check if user has scrolled to within 100px of bottom
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setHasScrolledToBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMarkComplete = () => {
    if (!subModule) return;
    
    markComplete.mutate(
      {
        moduleId: "module-7",
        subModuleId,
        tokensEarned: subModule.tokensEarned,
      },
      {
        onSuccess: () => {
          toast.success(`Sub-module completed! Earned ${subModule.tokensEarned} tokens 🎉`);
          refetchCompletion();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!subModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Sub-module not found</p>
      </div>
    );
  }

  const isCompleted = completion?.completed || false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Module 7: Leadership in the Unfolding</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{subModule.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{subModule.description}</p>
          
          {/* Rewards */}
          <div className="flex items-center gap-2 text-sm">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span>{subModule.tokensEarned} tokens available</span>
            {isCompleted && (
              <>
                <span>•</span>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400">Completed</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <Streamdown>{subModule.content}</Streamdown>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Module
          </Button>
          <Button 
            onClick={handleMarkComplete}
            disabled={isCompleted || markComplete.isPending || !hasScrolledToBottom}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Completed
              </>
            ) : !hasScrolledToBottom ? (
              "Scroll to bottom to complete"
            ) : (
              "Mark as Complete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
