import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, BookOpen } from "lucide-react";

export default function Lexicon() {
  const { data: terms, isLoading } = trpc.lexicon.getAllTerms.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(terms?.map(t => t.category) || []));

  // Filter terms
  const filteredTerms = terms?.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Covenant Economics Lexicon</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential terms and concepts from the Divine Gospel Economy framework
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search terms or definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Terms grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTerms.map(term => (
            <Card key={term.id} className="p-6">
              <div className="mb-2">
                <h3 className="text-2xl font-bold mb-1">{term.term}</h3>
                <p className="text-sm text-muted-foreground">{term.category}</p>
              </div>
              <p className="text-muted-foreground mb-4">{term.definition}</p>
              {term.relatedTerms && (
                <div className="text-sm">
                  <span className="font-semibold">Related: </span>
                  <span className="text-muted-foreground">{term.relatedTerms}</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No terms found matching your search.</p>
          </div>
        )}

        {/* Back button */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
