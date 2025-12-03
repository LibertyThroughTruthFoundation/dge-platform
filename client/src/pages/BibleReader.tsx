import { useEffect, useState, useRef } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, BookOpen, Clock, Coins } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import LexiconTooltip from "@/components/LexiconTooltip";

export default function BibleReader() {
  const [, params] = useRoute("/bible/:chapterId");
  const chapterId = params?.chapterId || "enoch-60";
  
  const { data: chapter, isLoading } = trpc.bible.getChapter.useQuery({ chapterId });
  const { data: progress } = trpc.bible.getProgress.useQuery({ chapterId });
  const updateProgress = trpc.bible.updateProgress.useMutation();
  
  const [timeSpent, setTimeSpent] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    
    // Track reading time
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeSpent(elapsed);
      
      // Calculate tokens (1 per minute)
      const tokens = Math.floor(elapsed / 60);
      setTokensEarned(tokens);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Save progress on unmount
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (elapsed > 10) { // Only save if read for more than 10 seconds
        updateProgress.mutate({
          chapterId,
          timeSpentSeconds: elapsed,
          completed: false,
        });
      }
    };
  }, [chapterId]);

  const handleMarkComplete = () => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    updateProgress.mutate(
      {
        chapterId,
        timeSpentSeconds: elapsed,
        completed: true,
      },
      {
        onSuccess: (data) => {
          toast.success(`Chapter completed! Earned ${data.tokensEarned} tokens 🎉`);
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

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{chapter.book}</span>
            <span>•</span>
            <span>Chapter {chapter.chapter}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
          
          {/* Reading stats */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span>{tokensEarned} tokens earned</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 mb-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <LexiconTooltip content={chapter.content} terms={chapter.lexiconTerms} />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button 
            onClick={handleMarkComplete}
            disabled={progress?.completed || updateProgress.isPending}
          >
            {progress?.completed ? "Completed ✓" : "Mark as Complete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
