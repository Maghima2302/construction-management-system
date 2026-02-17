import { Layout } from "./Layout";
import { ArrowRight, Lightbulb } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const PlaceholderPage = ({
  title,
  description,
  icon = <Lightbulb size={48} />,
}: PlaceholderPageProps) => {
  return (
    <Layout>
      <div className="p-6 md:p-8 h-full flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              {icon}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>

          <p className="text-muted-foreground mb-8 leading-relaxed">{description}</p>

          <div className="glass-card p-6 rounded-xl">
            <p className="text-sm text-muted-foreground mb-4">
              This page is ready to be built out. Let me know what features you'd like to add!
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Request Features <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
