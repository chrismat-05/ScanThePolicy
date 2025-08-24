import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

// Mock data for demonstration
const mockResults = {
  risk_score: 7,
  summaries: {
    data_collected: [
      "Email address and name for account creation",
      "IP address and device information for security",
      "Usage data and analytics for service improvement",
      "Location data when using mobile app",
      "Cookies and tracking pixels for advertising"
    ],
    data_sharing: [
      "Shared with advertising partners for targeted ads",
      "Analytics data provided to third-party services",
      "Legal compliance may require data disclosure",
      "Business transactions may transfer user data",
      "Service providers have access to necessary data"
    ],
    user_rights: [
      "Right to request data deletion within 30 days",
      "Access to personal data upon written request",
      "Opt-out of marketing communications anytime",
      "Data portability available in machine-readable format",
      "Right to correct inaccurate personal information"
    ]
  }
};

const Index = () => {
  const [currentView, setCurrentView] = useState('hero');
  const [analysisData, setAnalysisData] = useState(mockResults);

  const handleAnalyze = (content, type) => {
    setCurrentView('loading');
    
    // Simulate API call with different results based on content
    setTimeout(() => {
      // Generate varied mock data based on input
      const riskScore = content.toLowerCase().includes('sell') || content.toLowerCase().includes('third party') ? 8 : 
                       content.toLowerCase().includes('share') ? 6 : 3;
      
      setAnalysisData({
        ...mockResults,
        risk_score: riskScore
      });
      setCurrentView('results');
    }, 3000);
  };

  const handleReset = () => {
    setCurrentView('hero');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {currentView === 'hero' && (
        <Hero onAnalyze={handleAnalyze} />
      )}
      
      {currentView === 'loading' && <Loader />}
      
      {currentView === 'results' && (
        <Results data={analysisData} onReset={handleReset} />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;