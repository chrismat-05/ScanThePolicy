import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentView, setCurrentView] = useState('hero');
  const [analysisData, setAnalysisData] = useState(null);
  const { toast } = useToast();

  const handleAnalyze = async (content, type) => {
    setCurrentView('loading');
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_type: type, content }),
      });
      if (!response.ok) throw new Error('Failed to analyze policy');
      const result = await response.json();
      setAnalysisData(result);
      setCurrentView('results');
    } catch (error) {
      toast({
        title: 'Analysis Error',
        description: error.message || 'Failed to analyze policy. Please try again.',
        variant: 'destructive',
      });
      setAnalysisData({
        risk_score: 0,
        summaries: {
          data_collected: [],
          data_sharing: [],
          user_rights: [],
        },
        error: error.message,
      });
      setCurrentView('results');
    }
  };

  const handleReset = () => {
    setCurrentView('hero');
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {currentView === 'hero' && (
        <Hero onAnalyze={handleAnalyze} />
      )}
      {currentView === 'loading' && <Loader />}
      {currentView === 'results' && analysisData && (
        <Results data={analysisData} onReset={handleReset} />
      )}
      <Footer />
    </div>
  );
};

export default Index;