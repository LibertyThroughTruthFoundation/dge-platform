import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Coins, BookOpen, GraduationCap, BookMarked, TrendingUp, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: tokenBalance } = trpc.tokens.getBalance.useQuery();
  const { data: tokenHistory } = trpc.tokens.getHistory.useQuery();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const recentTransactions = tokenHistory?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name || "Seeker"}!</h1>
          <p className="text-lg text-muted-foreground">
            Continue your journey through the Divine Gospel Economy
          </p>
        </div>

        {/* Token Balance Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Token Balance</p>
              <div className="flex items-center gap-3">
                <Coins className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                <span className="text-5xl font-bold">{tokenBalance || 0}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Tokens earned through reading and learning
              </p>
            </div>
            <TrendingUp className="w-16 h-16 text-yellow-600/20 dark:text-yellow-400/20" />
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Bible Reader */}
          <Link href="/bible/enoch-60">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Bible Reader
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Read 1 Enoch 60-61 and earn tokens while you learn
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    1 token per minute of reading →
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Module 7 */}
          <Link href="/module/7">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Module 7: Leadership in the Unfolding
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Learn about rest, flexibility, and kingdom stewardship
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    4 sub-modules • 55 tokens →
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Lexicon */}
          <Link href="/lexicon">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <BookMarked className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Covenant Economics Lexicon
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Explore 15 essential terms and concepts
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Browse all terms →
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Key Scholars */}
          <Link href="/scholars">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                  <GraduationCap className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Key Scholars
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Academic foundation and scholarly sources
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    View scholars →
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* GodManMarkets */}
          <Link href="/godmanmarkets">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                  <ShoppingBag className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    GodManMarkets
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Covenant commerce - books and resources
                  </p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    Browse marketplace →
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        {recentTransactions.length > 0 && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                    <Coins className="w-4 h-4" />
                    <span>+{transaction.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
