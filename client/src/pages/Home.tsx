import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, BookOpen, Coins, GraduationCap, ArrowRight } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container max-w-6xl py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Divine Gospel Economy
          </h1>
          <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover covenant economics through ancient wisdom and earn tokens as you learn
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <a href={getLoginUrl()}>
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card className="p-8 text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Bible Reader</h3>
            <p className="text-muted-foreground">
              Read 1 Enoch 60-61 with interactive lexicon tooltips and earn 1 token per minute
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <GraduationCap className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Learning Modules</h3>
            <p className="text-muted-foreground">
              Explore "Leadership in the Unfolding" with 4 sub-modules on kingdom stewardship
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Coins className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Token Rewards</h3>
            <p className="text-muted-foreground">
              Earn tokens for reading and completing modules. Track your progress and growth
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-12 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the Divine Gospel Economy platform and start earning tokens while you learn about covenant economics and kingdom stewardship.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <a href={getLoginUrl()}>
              Sign In to Continue <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </Card>
      </div>
    </div>
  );
}
