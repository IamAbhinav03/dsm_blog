import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Building2 } from "lucide-react";

export function Hero() {
  return (
    <header id="hero" className="mb-16">
      <Badge variant="outline" className="font-mono text-secondary mb-4 border-secondary/30 bg-secondary/5 rounded-none">
        Technical Report · v1.0
      </Badge>
      <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary tracking-tight leading-tight mb-6">
        AIDER: AI Data Centers Environmental and Renewable Impact in India
      </h1>
      <p className="text-xl md:text-2xl font-serif text-foreground/80 leading-relaxed max-w-3xl mb-8">
        An analysis of how AI data centers will reshape India's energy grids, deplete its groundwater,
        and test the limits of four states' infrastructure — combining quantitative modelling with
        public sentiment analysis to paint the full picture.
      </p>

      <div className="bg-primary/[0.03] border border-primary/10 p-6 mb-8">
        <p className="font-serif text-base leading-relaxed text-foreground/80">
          India's data centre expansion is intersecting with two resource constraints that existing siting
          frameworks do not adequately capture: electricity grids with high coal dependence and groundwater
          systems already under stress in several high-growth states. This pipeline develops a quantitative
          analytical framework for four candidate host states — Telangana, Andhra Pradesh, Gujarat, and
          West Bengal — integrating air quality, groundwater, electricity, renewable capacity data, and
          industry news sentiment into a unified readiness assessment.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm font-sans font-medium text-foreground/70 border-t border-primary/10 pt-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>April 26, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>24 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Manas Venkata Sai Ravulapalli, Abhinav M. Hari</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          <span>Department of Computer Science, Ashoka University</span>
        </div>
      </div>
    </header>
  );
}
