import { AiSuggestionForm } from "@/components/ai-suggestion-form";
import { Lightbulb } from "lucide-react";

export function AiSuggestion() {
  return (
    <section id="ai-suggester" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
            <div className="inline-block bg-accent text-accent-foreground p-4 rounded-full">
                <Lightbulb className="h-8 w-8" />
            </div>
          <h2 className="text-3xl font-headline font-bold md:text-4xl">Find Your Perfect Paper</h2>
          <p className="max-w-3xl mx-auto text-primary-foreground/80 text-lg">
            Use our AI-powered tool to get instant recommendations based on your specific requirements.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <AiSuggestionForm />
        </div>
      </div>
    </section>
  );
}
