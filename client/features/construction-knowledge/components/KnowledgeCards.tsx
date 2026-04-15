import type { KnowledgeItem } from "@/features/construction-knowledge/data/knowledgeDummyData";

interface KnowledgeCardsProps {
  cards: KnowledgeItem[];
  onSelect: (question: string) => void;
}

export default function KnowledgeCards({ cards, onSelect }: KnowledgeCardsProps) {
  return (
    <div className="space-y-2">
      {cards.map((card) => {
        const categoryLabel = card.category === "privacy-policy" ? "Privacy Policy" : "Construction Design";

        return (
          <button
            key={card.id}
            onClick={() => onSelect(card.question)}
            className="w-full rounded-md border border-border bg-background p-3 text-left transition-colors hover:bg-muted/40"
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{card.title}</p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {categoryLabel}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{card.question}</p>
          </button>
        );
      })}
    </div>
  );
}
