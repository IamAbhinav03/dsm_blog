import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible } from "@/components/Collapsible";
import { useSectionFade } from "@/components/SectionFade";
import { Code2, AlertTriangle } from "lucide-react";

// The DAG has 12 nodes and 14 directed edges (exact from report Section 5.1)
const dagNodes = [
  { id: "renewable_capacity", label: "Renewable Capacity", x: 50, y: 30, color: "#22c55e" },
  { id: "energy_shortage", label: "Energy Shortage", x: 250, y: 30, color: "#f59e0b" },
  { id: "aqi", label: "Air Quality (PM2.5)", x: 450, y: 30, color: "#ba1a1a" },
  { id: "policy_index", label: "Policy Index", x: 50, y: 130, color: "#0ea5e9" },
  { id: "rainfall", label: "Rainfall", x: 250, y: 200, color: "#0ea5e9" },
  { id: "groundwater_level", label: "Groundwater Level", x: 450, y: 150, color: "#f59e0b" },
  { id: "industrial_activity", label: "Industrial Activity", x: 250, y: 120, color: "#64748b" },
];

// Key causal pathways (exact from report)
const causalPathways = [
  {
    from: "Renewable Capacity",
    to: "Energy Shortage",
    explanation: "Higher installed renewable capacity reduces peak energy deficit",
  },
  {
    from: "Energy Shortage",
    to: "Air Quality",
    explanation: "Unmet demand is substituted by fossil fuel peaker plants, raising PM2.5 levels",
  },
  {
    from: "Rainfall",
    to: "Groundwater Level",
    explanation: "Precipitation is the primary natural recharge mechanism for aquifers",
  },
  {
    from: "Policy Index",
    to: "Renewable Capacity",
    explanation: "Government renewable energy policy drives capacity growth",
  },
];

export function CausalAnalysis() {
  const ref = useSectionFade();

  return (
    <section id="causal-analysis" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">
          Cause and Effect: Does More Capacity Actually Cause Worse Outcomes?
        </h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        Finding that data centers and pollution appear together isn't enough — we needed to know if 
        one actually <em>causes</em> the other. A regression model can tell you that high renewable 
        capacity <em>correlates</em> with lower PM2.5, but it can't tell you that increasing renewable 
        capacity <em>will</em> make PM2.5 fall. The difference matters enormously for policy.
      </p>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        To answer the interventional question — <strong>"what would happen to air quality, groundwater, 
        and energy shortage if we deploy X MW of data centers in state S?"</strong> — we built a 
        causal model using a Directed Acyclic Graph (DAG) with 12 nodes and 14 directed edges.
      </p>

      {/* DAG Visualisation */}
      <Card className="rounded-none border-primary/10 shadow-none mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="font-sans text-lg text-primary">The Causal Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-foreground/70 mb-4">
            Each arrow represents a hypothesised cause-and-effect relationship. The graph encodes our explicit 
            assumptions about which variables cause which — and, critically, which paths are blocked when we 
            control for observed confounders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {causalPathways.map((path, i) => (
              <div key={i} className="bg-primary/[0.03] border border-primary/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-primary">{path.from}</span>
                  <svg width="20" height="12" className="text-primary/40"><path d="M0 6 L14 6 M10 2 L14 6 L10 10" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
                  <span className="font-mono text-xs font-bold text-primary">{path.to}</span>
                </div>
                <p className="font-serif text-xs text-foreground/70">{path.explanation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        We also ran a <strong>Difference-in-Differences (DiD)</strong> analysis — a technique that compares 
        the change in outcomes between states that got data centers ("treatment group") and those that didn't 
        ("control group"), before and after deployment. This helps separate the true effect of data centers 
        from background trends that would have happened anyway.
      </p>

      {/* Threats to validity */}
      <div className="bg-[#fefce8] border border-yellow-200 p-6 mb-8">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-mono text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">
              Honest Limitations
            </h3>
            <div className="space-y-3">
              <LimitationItem
                title="Unmeasured Confounding"
                text="Industrial output, urbanisation rate, and infrastructure investment are plausible common causes that are absent from our dataset. Any such omitted variable partially confounds the estimated effects."
              />
              <LimitationItem
                title="Interconnected Grids (SUTVA Violation)"
                text="Indian state electricity grids are interconnected through inter-state transmission agreements, and groundwater aquifers cross administrative borders. A data center in Telangana may alter grid frequency in Andhra Pradesh."
              />
              <LimitationItem
                title="Non-Random Siting"
                text="Data center siting decisions aren't random — states with better infrastructure attract more investment, creating selection bias. Without a natural experiment, the DiD estimate conflates the causal effect with pre-existing trends."
              />
            </div>
          </div>
        </div>
      </div>

      <Collapsible title="For Data Scientists: DAG Structure and DiD Estimation" icon={<Code2 className="w-4 h-4" />} variant="technical">
        <div className="space-y-4">
          <p className="font-serif text-sm text-foreground/80">
            The DAG encodes 12 nodes and 14 directed edges across the energy-water-atmosphere system. Variable 
            selection follows the backdoor criterion: identify all backdoor paths from treatment to outcome, 
            select a minimal adjustment set that blocks non-causal paths.
          </p>
          <p className="font-serif text-sm text-foreground/80">
            <strong>DiD Regression Form:</strong>
          </p>
          <div className="bg-primary/5 p-4 font-mono text-sm text-primary overflow-x-auto">
            Y_it = β₀ + β₁·D_i + β₂·T_t + β₃·(D_i · T_t) + γᵀX_it + ε_it
          </div>
          <p className="font-serif text-sm text-foreground/80">
            where D_i ∈ &#123;0,1&#125; is the treatment indicator, T_t ∈ &#123;0,1&#125; is the post-period indicator, 
            and <strong>β₃ is the DiD causal estimate</strong>.
          </p>
          <p className="font-serif text-sm text-foreground/80">
            <strong>Sensitivity analysis:</strong> Systematically removes edges from the DAG and re-estimates 
            treatment effects. Narrow bounds indicate robustness to model uncertainty; wide bounds indicate 
            dependence on specific structural assumptions.
          </p>
          <p className="font-serif text-sm text-foreground/60 italic">
            Critical gap: The parallel trends assumption is not formally tested in the source code. No 
            pre-trend event-study specification is present.
          </p>
        </div>
      </Collapsible>
    </section>
  );
}

function LimitationItem({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="font-sans text-sm font-semibold text-primary/80 mb-0.5">{title}</p>
      <p className="font-serif text-sm text-foreground/70">{text}</p>
    </div>
  );
}
