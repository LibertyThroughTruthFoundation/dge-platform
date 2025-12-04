import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BibleReader from "./pages/BibleReader";
import Module7 from "./pages/Module7";
import Module7SubModule from "./pages/Module7SubModule";
import Lexicon from "./pages/Lexicon";
import Scholars from "./pages/Scholars";
import GodManMarkets from "./pages/GodManMarkets";
import StablesHero from "./pages/StablesHero";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/bible/:chapterId" component={BibleReader} />
      <Route path="/module/7" component={Module7} />
      <Route path="/module/7/:subModuleId" component={Module7SubModule} />
      <Route path="/lexicon" component={Lexicon} />
      <Route path="/scholars" component={Scholars} />
      <Route path="/godmanmarkets" component={GodManMarkets} />
      <Route path="/stableshero" component={StablesHero} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
