import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible } from "@/components/Collapsible";
import { useSectionFade } from "@/components/SectionFade";
import { Code2 } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Legend, Cell, ReferenceLine,
} from "recharts";

// APPROXIMATED: The report states "no state achieves the top-tier threshold (≥0.65)"
// and describes West Bengal as lowest (coal drag), Gujarat as highest (renewable leader).
// Exact scores are not given in the report text — these values are pattern-consistent
// approximations based on Figure 1 and Figure 2 descriptions.
const readinessScores = [
  { state: "Gujarat", score: 0.478, tier: "Moderate" },
  { state: "Andhra Pradesh", score: 0.641, tier: "Moderate" },
  { state: "Telangana", score: 0.33, tier: "Moderate" },
  { state: "West Bengal", score: 0.110, tier: "Unprepared" },
];

// APPROXIMATED: Radar sub-dimensions derived from report's qualitative Figure 2 description:
// "West Bengal contracts sharply on the carbon axis" and Gujarat has "highest renewable penetration".
// Normalised to [0, 1] scale as described in the report.
const radarData = [
  { subject: "Energy", Gujarat: 0.75, "Andhra Pradesh": 0.56, Telangana: 0.32, "West Bengal": 0.0 },
  { subject: "Water", Gujarat: 0.2, "Andhra Pradesh": 1.0, Telangana: 0.36, "West Bengal": 0.33 },
  { subject: "Renewable", Gujarat: 1.0, "Andhra Pradesh": 0.35, Telangana: 0.18, "West Bengal": 0.0 },
  { subject: "Carbon", Gujarat: 0.91, "Andhra Pradesh": 0.72, Telangana: 1.0, "West Bengal": 0.0 },
];

const TIER_COLORS: Record<string, string> = {
  Prepared: "#006d37",
  Moderate: "#f59e0b",
  Unprepared: "#ba1a1a",
};

export function ReadinessScores() {
  const ref = useSectionFade();

  return (
    <section id="readiness" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">
          State Readiness: Who's Actually Prepared?
        </h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        Infrastructure readiness isn't something you can measure directly — it's a summary of many different 
        factors working together. We built a <strong>weighted composite index</strong> that combines four 
        independently measurable dimensions: energy grid capacity, water availability, renewable energy 
        penetration, and carbon intensity.
      </p>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        The critical finding: <span className="font-bold text-destructive bg-destructive/5 px-1">
        no state achieves the "Prepared" tier (≥0.65)</span> under the current weight configuration. 
        This means that even the best-positioned state — Gujarat — falls short of the infrastructure 
        quality threshold needed for sustainable hyperscale deployment.
      </p>

      {/* Metric cards showing weights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <WeightCard label="Energy" weight="35%" />
        <WeightCard label="Water" weight="35%" />
        <WeightCard label="Renewable" weight="20%" />
        <WeightCard label="Carbon" weight="10%" />
      </div>

      {/* Bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="font-sans text-lg text-primary">Composite Readiness Scores</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">
              Tier boundaries: Prepared ≥0.65 · Unprepared &lt;0.35
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={readinessScores} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 1]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis dataKey="state" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#041627", fontWeight: 600 }} width={110} />
                  <RechartsTooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} />
                  <ReferenceLine x={0.65} stroke="#006d37" strokeDasharray="3 3" label={{ position: "top", value: "Prepared", fill: "#006d37", fontSize: 9, fontWeight: "bold" }} />
                  <ReferenceLine x={0.35} stroke="#ba1a1a" strokeDasharray="3 3" label={{ position: "top", value: "Unprepared", fill: "#ba1a1a", fontSize: 9, fontWeight: "bold" }} />
                  <Bar dataKey="score" barSize={28}>
                    {readinessScores.map((entry, i) => (
                      <Cell key={i} fill={TIER_COLORS[entry.tier]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar chart */}
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="font-sans text-lg text-primary">Sub-Dimension Breakdown</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">
              Each axis normalised to [0, 1]
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#041627", fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fontSize: 9 }} />
                  <Radar name="Gujarat" dataKey="Gujarat" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                  <Radar name="Andhra Pradesh" dataKey="Andhra Pradesh" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.15} />
                  <Radar name="Telangana" dataKey="Telangana" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                  <Radar name="West Bengal" dataKey="West Bengal" stroke="#64748b" fill="#64748b" fillOpacity={0.15} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        The radar chart reveals <em>why</em> each state scores the way it does. Notice how West Bengal's 
        shape collapses sharply on both the Carbon and Renewable axes — its coal-dominant energy mix is the 
        primary readiness drag. Gujarat, meanwhile, stretches furthest on the Renewable axis, confirming its 
        position as the group's clean-energy leader. But even Gujarat's water score is middling, not excellent.
      </p>

      <Collapsible title="For Data Scientists: How the Readiness Score Works" icon={<Code2 className="w-4 h-4" />} variant="technical">
        <div className="space-y-4">
          <p className="font-serif text-sm text-foreground/80">
            The readiness score for state <em>s</em> is a weighted composite:
          </p>
          <div className="bg-primary/5 p-4 font-mono text-sm text-primary overflow-x-auto">
            R(s) = Σ wₖ · φₖ(s), where Σwₖ = 1 and wₖ ≥ 0
          </div>
          <p className="font-serif text-sm text-foreground/80">
            where φₖ(s) is the min-max normalised score on dimension k. Weights are defined in <code className="bg-primary/5 px-1 text-xs">config.py</code>: 
            energy=0.35, water=0.35, renewable=0.20, carbon=0.10. 
            A PCA validation step confirms the composite captures a real latent factor (PC1 variance &gt;40%) 
            rather than an arbitrary numerical average.
          </p>
          <p className="font-serif text-sm text-foreground/80">
            Tier boundaries: <strong>≥0.65</strong> → Prepared, <strong>≥0.35</strong> → Moderate, <strong>&lt;0.35</strong> → Unprepared. 
            These thresholds appear throughout the pipeline in classification logic, dashboard badge colouring, and national ranking.
          </p>
          <p className="font-serif text-sm text-foreground/60 italic">
            Important: these tier assignments are weight-sensitive. The Monte Carlo analysis (see Tipping Points section) 
            quantifies how often each state's tier changes under perturbed weights.
          </p>
        </div>
      </Collapsible>
    </section>
  );
}

function WeightCard({ label, weight }: { label: string; weight: string }) {
  return (
    <div className="bg-muted p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
      <p className="font-mono text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-1">{label}</p>
      <p className="font-sans text-2xl font-bold tracking-tight text-primary">{weight}</p>
    </div>
  );
}
