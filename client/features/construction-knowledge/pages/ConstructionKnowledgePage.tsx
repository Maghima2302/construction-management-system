import { FormEvent, useMemo, useState } from "react";
import { ShieldCheck, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KnowledgeCards from "@/features/construction-knowledge/components/KnowledgeCards";
import {
  KNOWLEDGE_ITEMS,
  KNOWLEDGE_QUICK_PROMPTS,
  type KnowledgeCategory,
} from "@/features/construction-knowledge/data/knowledgeDummyData";

type UiChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
};

const categoryLabelMap: Record<KnowledgeCategory, string> = {
  "construction-design": "Construction Design",
  "privacy-policy": "Privacy Policy",
};

const getBestMatch = (query: string) => {
  const needle = query.toLowerCase();
  const tokens = needle.split(/\s+/).filter(Boolean);

  let best = KNOWLEDGE_ITEMS[0];
  let bestScore = -1;

  for (const item of KNOWLEDGE_ITEMS) {
    const hay = `${item.title} ${item.question} ${item.answer} ${item.tags.join(" ")}`.toLowerCase();
    const score = tokens.reduce((acc, token) => (hay.includes(token) ? acc + 1 : acc), 0);

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return best;
};

export default function ConstructionKnowledgePage() {
  const [category, setCategory] = useState<KnowledgeCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<UiChatMessage[]>([
    {
      id: "welcome-ai",
      role: "ai",
      text:
        "Welcome to Knowledge AI. Ask doubts about construction design or privacy policy, and I will answer using frontend dummy knowledge data.",
    },
  ]);

  const filteredCards = useMemo(() => {
    const lower = query.trim().toLowerCase();

    return KNOWLEDGE_ITEMS.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      if (!categoryMatch) return false;

      if (!lower) return true;
      const text = `${item.title} ${item.question} ${item.answer} ${item.tags.join(" ")}`.toLowerCase();
      return text.includes(lower);
    });
  }, [category, query]);

  const pushAnswer = (question: string) => {
    const matched = getBestMatch(question);
    const aiText = [
      `Category: ${categoryLabelMap[matched.category]}`,
      `Matched Topic: ${matched.title}`,
      matched.answer,
      "Note: This is demo frontend dummy data for prototyping.",
    ].join("\n\n");

    setChatMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: question },
      { id: `a-${Date.now() + 1}`, role: "ai", text: aiText },
    ]);
  };

  const onAsk = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    pushAnswer(trimmed);
    setQuery("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Knowledge AI</h1>
        <p className="text-sm text-muted-foreground">
          Frontend demo assistant for construction design clarifications and privacy policy doubts.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-2 p-4">
          <Button
            type="button"
            variant={category === "all" ? "default" : "outline"}
            onClick={() => setCategory("all")}
            className="gap-1.5"
          >
            All
          </Button>
          <Button
            type="button"
            variant={category === "construction-design" ? "default" : "outline"}
            onClick={() => setCategory("construction-design")}
            className="gap-1.5"
          >
            <Wrench size={14} />
            Construction Design
          </Button>
          <Button
            type="button"
            variant={category === "privacy-policy" ? "default" : "outline"}
            onClick={() => setCategory("privacy-policy")}
            className="gap-1.5"
          >
            <ShieldCheck size={14} />
            Privacy Policy
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Knowledge AI Chat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="max-h-[360px] space-y-3 overflow-auto rounded-md border border-border p-3">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "ai"
                        ? "rounded-md bg-muted p-3 text-sm text-foreground"
                        : "ml-auto w-fit max-w-[90%] rounded-md bg-primary p-3 text-sm text-primary-foreground"
                    }
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <form onSubmit={onAsk} className="flex gap-2">
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about design standards or privacy policy..."
                />
                <Button type="submit">Ask</Button>
              </form>

              <div className="flex flex-wrap gap-2">
                {KNOWLEDGE_QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => pushAnswer(prompt)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Searchable Knowledge Cards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <KnowledgeCards cards={filteredCards} onSelect={pushAnswer} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
