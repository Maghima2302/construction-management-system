import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

interface AIChatPanelProps {
  messages: ChatMessage[];
}

export default function AIChatPanel({ messages }: AIChatPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">AI Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[380px] overflow-auto">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-md p-3 text-sm ${
              message.role === "ai" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            {message.text}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
