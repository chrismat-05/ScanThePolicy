import { Shield } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass p-12 rounded-3xl text-center max-w-md mx-auto">
        <div className="relative mb-8">
          {/* Animated Logo */}
          <div className="relative">
            <div className="animate-pulse-soft">
              <Shield className="h-16 w-16 text-primary mx-auto" />
            </div>
            
            {/* Scanning Animation */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-primary/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Analyzing Privacy Policy
        </h3>
        <p className="text-muted-foreground mb-6">
          Scanning for privacy risks and extracting key information...
        </p>
        
        {/* Progress Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Processing text</span>
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Extracting data policies</span>
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Calculating risk score</span>
            <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;