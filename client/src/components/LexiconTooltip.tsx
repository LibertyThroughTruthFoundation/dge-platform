import { useState } from "react";
import { Streamdown } from "streamdown";
import { trpc } from "@/lib/trpc";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface LexiconTooltipProps {
  content: string;
  terms: string[];
}

export default function LexiconTooltip({ content, terms }: LexiconTooltipProps) {
  const { data: allTerms } = trpc.lexicon.getAllTerms.useQuery();
  
  // Create a map of terms for quick lookup
  const termMap = new Map(allTerms?.map(t => [t.term.toLowerCase(), t]) || []);
  
  // Highlight lexicon terms in the content
  const highlightTerms = (text: string): string => {
    let highlighted = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      highlighted = highlighted.replace(regex, (match) => {
        return `<span class="lexicon-term" data-term="${match}">${match}</span>`;
      });
    });
    
    return highlighted;
  };

  const highlightedContent = highlightTerms(content);

  return (
    <div 
      className="lexicon-content"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('lexicon-term')) {
          const term = target.getAttribute('data-term');
          if (term) {
            const termData = termMap.get(term.toLowerCase());
            if (termData) {
              // Show tooltip on click for mobile
              target.setAttribute('data-show-tooltip', 'true');
            }
          }
        }
      }}
    >
      <style>{`
        .lexicon-term {
          color: rgb(59 130 246);
          text-decoration: underline;
          text-decoration-style: dotted;
          cursor: help;
          font-weight: 500;
        }
        .lexicon-term:hover {
          color: rgb(37 99 235);
        }
      `}</style>
      <Streamdown>{highlightedContent}</Streamdown>
    </div>
  );
}
