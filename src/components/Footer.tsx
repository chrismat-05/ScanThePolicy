import { ExternalLink, Github, Star, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/20 py-12">
      <div className="container mx-auto px-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>Built by</span>
              <a 
                href="https://thecma.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors duration-200 font-semibold flex items-center space-x-1"
              >
                <span>CMA</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-card-border hover:bg-muted/50"
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Bug className="h-4 w-4" />
                  <span>Create an Issue</span>
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-card-border hover:bg-muted/50"
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Star className="h-4 w-4" />
                  <span>Star on GitHub</span>
                </a>
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 ScanThePolicy. Open source under MIT license.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;