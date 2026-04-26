import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useSectionFade } from "@/components/SectionFade";
import { Zap, Droplet, ArrowRightCircle, AlertTriangle } from "lucide-react";

const recommendations = [
  {
    priority: 1,
    title: "Mandate District-Level Resource Assessments",
    description: "State-level readiness aggregates systematically mask localised groundwater crises. Siting approvals must be gated on district-level water and energy availability rather than statewide averages.",
    severity: "Critical",
  },
  {
    priority: 2,
    title: "Enforce Closed-Loop Cooling in Vulnerable States",
    description: "In states like Telangana and Andhra Pradesh where aquifers are approaching semi-critical status under current trajectories, open-loop water cooling should be restricted for new hyperscale facilities.",
    severity: "Critical",
  },
  {
    priority: 3,
    title: "Require Co-located Energy Storage",
    description: "To prevent data centers from falling back on coal-heavy grid baseloads during evening hours, developers in high-renewable states (like Gujarat) must integrate long-duration battery storage alongside solar capacity.",
    severity: "High",
  },
  {
    priority: 4,
    title: "Cap Capacity at Groundwater Tipping Points",
    description: "Use the pipeline's scenario simulations to set hard, non-negotiable capacity limits (e.g., 2× planned capacity for Telangana) to prevent irreversible aquifer depletion.",
    severity: "High",
  },
  {
    priority: 5,
    title: "Look Beyond Corporate Sentiment",
    description: "When gauging public and industry readiness, policymakers must separate optimistic corporate PR from ground-level environmental compliance and resource stress signals, which often precede physical tipping points.",
    severity: "Medium",
  },
];

export function Conclusions() {
  const ref = useSectionFade();

  return (
    <section id="conclusions" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">
          Conclusions: What Needs to Change
        </h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        This pipeline integrates four independent government datasets and a scraped news corpus, trains
        nine model architectures (including VADER and DistilBERT sentiment analysers) across ten modules,
        runs nine analysis modules, and produces readiness scores, environmental impact calculations,
        time-series forecasts, causal effect estimates, Monte Carlo stability distributions, scenario
        simulations, sentiment analyses, and a long-horizon groundwater projection to 2070. The resulting
        system is technically comprehensive — but two critical risks must be resolved before it's suitable
        for actual policy decisions.
      </p>

      {/* Key Strategic Findings */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="rounded-none border-primary border-l-4 shadow-none bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardContent className="p-8">
            <div className="flex gap-6 items-start">
              <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-2xl font-bold text-primary mb-3">Energy Transition Arbitrage</h3>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">
                  The temporal mismatch between renewable energy generation peaks and flat data center loads
                  presents a major systemic risk. Each state has significant untapped renewable capacity —
                  Gujarat alone has over 12,000 MW of headroom — but without on-site long-duration energy
                  storage, data centers will fall back onto coal-heavy grid baseloads during evening hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-destructive border-l-4 shadow-none bg-destructive/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardContent className="p-8">
            <div className="flex gap-6 items-start">
              <Droplet className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-2xl font-bold text-destructive mb-3">Groundwater: The Non-Negotiable Constraint</h3>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">
                  Telangana crosses the semi-critical groundwater threshold at current planned capacity and
                  enters over-exploitation at just 2× planned capacity. Unlike energy grids, depleted
                  aquifers do not recover on human timescales. This constraint is not negotiable through
                  technology — it requires either closed-loop cooling systems or hard capacity caps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-amber-500 border-l-4 shadow-none bg-amber-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardContent className="p-8">
            <div className="flex gap-6 items-start">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-2xl font-bold text-amber-700 mb-3">State Averages Hide District Crises</h3>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">
                  Data centre siting decisions based on state-level aggregates systematically underestimate
                  localised risk. In Telangana, the gap between the state average and the worst-hit district
                  is 28 percentage points. Decision-makers must use district-level data, not state averages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <h3 className="font-sans text-xl font-bold text-primary mb-6">Prioritised Recommendations</h3>
      <div className="space-y-4 mb-12">
        {recommendations.map((rec) => (
          <div key={rec.priority} className="flex gap-4 bg-white border border-primary/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white flex items-center justify-center font-sans font-bold text-sm">
              {rec.priority}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-sans font-semibold text-primary">{rec.title}</h4>
                <SeverityBadge severity={rec.severity} />
              </div>
              <p className="font-serif text-sm text-foreground/70">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Download CTA */}
      <div className="bg-[#041627] text-white p-12 text-center">
        <h3 className="font-sans text-2xl font-bold mb-4">Read the Full Technical Report</h3>
        <p className="font-serif text-sm text-white/70 mb-6 max-w-2xl mx-auto">
          This article is a layman-readable summary. The full 44-page technical report includes complete
          hyperparameter tables, data flow matrices, formal equation derivations, and all 40+ output figures.
        </p>
        <p className="font-mono text-xs text-white/40 mb-6">
          Manas Venkata Sai Ravulapalli & Abhinav M. Hari · Department of Computer Science, Ashoka University · April 2026
        </p>
        <a
          href="/reference/report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-primary px-8 py-3 font-bold font-sans hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
        >
          Download PDF <ArrowRightCircle className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-100 text-red-800 border-red-200",
    High: "bg-orange-100 text-orange-800 border-orange-200",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
  };
  return (
    <span className={`inline-block border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${styles[severity] || ""}`}>
      {severity}
    </span>
  );
}
