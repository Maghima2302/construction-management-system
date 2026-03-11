interface KnowledgeCardsProps {
  cards: string[];
}

export default function KnowledgeCards({ cards }: KnowledgeCardsProps) {
  return (
    <div className="space-y-2">
      {cards.map((card) => (
        <div key={card} className="rounded-md border border-border p-2 text-sm text-muted-foreground">{card}</div>
      ))}
    </div>
  );
}
