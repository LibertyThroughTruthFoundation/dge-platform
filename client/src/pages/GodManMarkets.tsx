import { ShoppingBag, BookOpen, ExternalLink, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Temporary: Import product data directly until we add tRPC endpoint
import { godManMarketsProducts } from "../../../server/data/godmanmarkets-products";

export default function GodManMarkets() {
  const categories = [
    { id: "book", label: "Books", icon: BookOpen },
    { id: "ebook", label: "eBooks", icon: BookOpen },
    { id: "audiobook", label: "Audiobooks", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold mb-4">GodManMarkets</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Covenant commerce where truth creates demand for tools, and tools empower deeper truth
          </p>
        </div>

        {/* Vision Statement */}
        <Card className="p-8 mb-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
          <div className="flex items-start gap-4">
            <ShoppingBag className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-4">The Marketplace of the Kingdom</h2>
              <p className="text-muted-foreground mb-4">
                GodManMarkets is the <strong>Hands</strong> of the fourfold kingdom organism—where covenant economics becomes practical. Every book cited in the DGE footnotes, every tool mentioned in the modules, every resource that equips you for deeper discipleship—all available here.
              </p>
              <p className="text-muted-foreground mb-4">
                This is not a forced monetization strategy. This is the natural ecosystem of discipleship and stewardship beginning to sprout. The DGE (revelation) naturally points to GodManMarkets (provision) for the tools to go deeper.
              </p>
              <p className="text-muted-foreground">
                <strong>The virtuous cycle:</strong> You read a revelation with a footnote referencing a book by Michael Heiser → The footnote is hyperlinked directly to that book's listing here → You purchase the book, equipping yourself further → Revenue flows back into the covenant economy → You are now better equipped to engage the next revelation.
              </p>
            </div>
          </div>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="p-8 mb-12 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 mt-1 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="text-xl font-bold mb-2">Currently in Development</h3>
              <p className="text-muted-foreground mb-4">
                GodManMarkets is being built organically, starting with the books cited in the DGE platform. Below is the initial catalog—products will be available for purchase soon.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong className="text-base">The Exodus is beginning.</strong> If you're a farmer, book dealer, software developer, or artisan—you can bring your economic life into alignment. Start your storefront here. Move your business out of Babylon's system and into the Kingdom economy.
              </p>
              <p className="text-sm text-muted-foreground">
                Want to list your products or services? Email us at <strong>vendors@godmanmarkets.com</strong> (coming soon)
              </p>
            </div>
          </div>
        </Card>

        {/* Product Catalog */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Initial Catalog: Books from DGE Footnotes</h2>
          <p className="text-muted-foreground mb-8">
            Every book cited in Module 7 and the Lexicon—curated for covenant-minded learners.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {godManMarketsProducts.map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  {!product.inStock && (
                    <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">by {product.author}</p>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {product.description}
              </p>
              
              <Button 
                variant="outline" 
                className="w-full" 
                disabled={!product.inStock}
              >
                {product.inStock ? (
                  <>
                    View Details <ExternalLink className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 w-4 h-4" /> Coming Soon
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Future Categories */}
        <Card className="p-8 mt-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <h3 className="text-2xl font-bold mb-4">Future Offerings</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-semibold mb-2">📚 Curated Bundles</h4>
              <p className="text-sm text-muted-foreground">
                "Divine Council Starter Pack," "Covenant Economics Library," etc.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎓 Video Courses</h4>
              <p className="text-sm text-muted-foreground">
                Expanding on DGE modules with deeper dives and practical application
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🛠️ Study Tools</h4>
              <p className="text-sm text-muted-foreground">
                Worksheets, prayer guides, journals that accompany DGE modules
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
