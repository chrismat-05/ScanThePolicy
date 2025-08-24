import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Scan, Link2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onAnalyze: (content: string, type: 'text' | 'url') => void;
}

const Hero = ({ onAnalyze }: HeroProps) => {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onAnalyze(input, inputType);
      setIsLoading(false);
    }, 2000);
  };

  const isUrl = input.trim().startsWith('http');

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-4xl mx-auto text-center animate-fade-in">
        {/* Hero Heading */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Understand Privacy Policies{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Paste any privacy policy or link, and get a clear summary with risk analysis instantly.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            {/* Input Type Toggle */}
            <div className="flex justify-center mb-4">
              <div className="glass rounded-full p-1">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setInputType('text')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200",
                      inputType === 'text' 
                        ? "btn-hero" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputType('url')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200",
                      inputType === 'url' 
                        ? "btn-hero" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link2 className="h-4 w-4" />
                    <span>URL</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Input */}
            <div className="relative">
              <Textarea
                placeholder={
                  inputType === 'url' 
                    ? "Enter privacy policy URL (e.g., https://example.com/privacy)" 
                    : "Paste privacy policy text here..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="input-glass min-h-[200px] text-lg resize-none border-0 focus:border-0 focus:ring-0 placeholder:text-muted-foreground/60"
                disabled={isLoading}
              />
              
              {/* URL Detection Indicator */}
              {isUrl && inputType === 'text' && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2 glass px-3 py-1 rounded-full">
                    <Link2 className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">URL detected</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="btn-hero px-8 py-6 text-lg rounded-2xl border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Scan className="h-5 w-5" />
                <span>Analyze Privacy Policy</span>
              </div>
            )}
          </Button>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
            <span>Fast Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
            <span>Privacy Focused</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
            <span>No Data Stored</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;