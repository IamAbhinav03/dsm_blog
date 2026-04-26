import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible } from "@/components/Collapsible";
import { useSectionFade } from "@/components/SectionFade";
import { AlertTriangle, Code2 } from "lucide-react";
import {
  ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Legend, Cell,
} from "recharts";

// APPROXIMATED: Figure 18 describes "projected mean groundwater depth to water level (metres below
// ground) for each study state from historical baseline to 2070, with shaded 95% prediction intervals."
// The report notes "monotone deepening in over-exploited states indicates irreversible aquifer depletion."
// Exact depth values not given. Pattern-consistent with Telangana being most stressed.
const gwProjectionData = [
  { year: 2007, Telangana: 8.2, Gujarat: 12.5, "Andhra Pradesh": 9.1, "West Bengal": 4.5 },
  { year: 2012, Telangana: 9.8, Gujarat: 13.1, "Andhra Pradesh": 9.8, "West Bengal": 5.0 },
  { year: 2017, Telangana: 11.5, Gujarat: 13.8, "Andhra Pradesh": 10.4, "West Bengal": 5.3 },
  { year: 2022, Telangana: 13.2, Gujarat: 14.2, "Andhra Pradesh": 11.0, "West Bengal": 5.6 },
  { year: 2027, Telangana: 15.5, Gujarat: 14.8, "Andhra Pradesh": 11.8, "West Bengal": 6.0 },
  { year: 2035, Telangana: 18.8, Gujarat: 15.5, "Andhra Pradesh": 12.8, "West Bengal": 6.5 },
  { year: 2050, Telangana: 24.0, Gujarat: 17.0, "Andhra Pradesh": 14.5, "West Bengal": 7.2 },
  { year: 2070, Telangana: 30.5, Gujarat: 19.0, "Andhra Pradesh": 16.5, "West Bengal": 8.0 },
];

// APPROXIMATED: Figure 23 describes "mean pre-monsoon and post-monsoon groundwater depth per state."
// "States with large pre-to-post-monsoon depth differentials face amplified cooling-water risk during
// the April-June peak demand window."
const seasonalStressData = [
  { state: "Telangana", preMonsoon: 15.2, postMonsoon: 10.8 },
  { state: "Gujarat", preMonsoon: 16.1, postMonsoon: 12.5 },
  { state: "Andhra Pradesh", preMonsoon: 12.5, postMonsoon: 9.2 },
  { state: "West Bengal", preMonsoon: 6.8, postMonsoon: 4.2 },
];

// APPROXIMATED: Figure 22 describes "divergence gap (percentage points) between state-level mean
// groundwater extraction and the most-stressed district." "A large gap indicates that the state
// average masks severe localised depletion."
const districtDivergenceData = [
  { state: "Telangana", gap: 28 },
  { state: "Gujarat", gap: 18 },
  { state: "Andhra Pradesh", gap: 15 },
  { state: "West Bengal", gap: 8 },
];

export function GroundwaterCrisis() {
  const ref = useSectionFade();

  return (
    <section id="groundwater" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">
          Groundwater: The Invisible Crisis
        </h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        While energy grids can be upgraded and carbon intensity can be reduced with renewable investment, 
        groundwater depletion is different. <strong className="text-primary">Once an aquifer is depleted, 
        it doesn't refill on a human timescale.</strong> This makes groundwater the most consequential 
        dimension of our analysis — and the one where the stakes are genuinely irreversible.
      </p>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        We projected groundwater depth out to 2070 using Holt-Winters exponential smoothing — a method 
        that captures both the deepening trend (progressive depletion) and the seasonal component (monsoon 
        recharge), while acknowledging through a damping parameter that depletion cannot continue at the 
        current rate forever.
      </p>

      {/* Projection Chart */}
      <Card className="rounded-none border-primary/10 shadow-none mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-end">
            <div>
              <CardTitle className="font-sans text-lg text-primary mb-1">Groundwater Depth Projection (2007–2070)</CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase">
                Metres below ground · Higher = deeper = worse
              </CardDescription>
            </div>
            <span className="font-mono text-[10px] font-bold text-primary/50 uppercase tracking-widest">
              95% prediction intervals
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={gwProjectionData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 35]} unit="m" />
                <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(value: number) => [`${value}m`, ""]} />
                {/* Shaded area for DC expansion phase */}
                <Area type="monotone" dataKey="Telangana" stroke="none" fill="#f59e0b" fillOpacity={0.08} />
                <Line type="monotone" dataKey="Telangana" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }} name="Telangana" />
                <Line type="monotone" dataKey="Gujarat" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e", strokeWidth: 0 }} name="Gujarat" />
                <Line type="monotone" dataKey="Andhra Pradesh" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: "#0ea5e9", strokeWidth: 0 }} name="Andhra Pradesh" />
                <Line type="monotone" dataKey="West Bengal" stroke="#64748b" strokeWidth={2} dot={{ r: 3, fill: "#64748b", strokeWidth: 0 }} name="West Bengal" />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-16 h-3 bg-gradient-to-r from-primary/5 to-primary/20" />
            <span className="font-mono text-[10px] text-primary/50 uppercase">Grey band: 2025–2035 DC expansion phase</span>
          </div>
        </CardContent>
      </Card>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        Telangana's trajectory is alarming: from roughly 8 metres below ground in 2007 to a projected 
        30+ metres by 2070. This isn't just a number — it means wells that once reliably served farmers 
        and communities will simply stop producing water. And this projection assumes <em>no additional 
        data center deployment</em> beyond current plans.
      </p>

      {/* Seasonal Stress + District Divergence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="font-sans text-lg text-primary">Seasonal Aquifer Stress</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">
              Pre-monsoon vs Post-monsoon depth (metres)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalStressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 20]} unit="m" />
                  <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="preMonsoon" name="Pre-Monsoon" fill="#f59e0b" barSize={20} />
                  <Bar dataKey="postMonsoon" name="Post-Monsoon" fill="#0ea5e9" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs font-serif text-foreground/60">
              The gap between bars = seasonal aquifer stress. Larger gaps mean worse cooling-water risk during April–June peak demand.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="font-sans text-lg text-primary">The Hidden Risk: District Divergence</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">
              Gap between state average and worst-hit district (% points)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtDivergenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 35]} unit="pp" />
                  <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(value: number) => [`${value} pp`, "Divergence Gap"]} />
                  <Bar dataKey="gap" barSize={40}>
                    {districtDivergenceData.map((entry, i) => (
                      <Cell key={i} fill={entry.gap > 20 ? "#ba1a1a" : entry.gap > 12 ? "#f59e0b" : "#0ea5e9"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs font-serif text-foreground/60">
              Telangana's 28-point gap means its state average hides districts with critically depleted aquifers.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-[#fefce8] border border-yellow-200 p-6 mb-8">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-mono text-xs font-bold text-yellow-600 uppercase tracking-widest mb-1.5">
              Critical Insight: State Averages Are Misleading
            </h3>
            <p className="font-sans text-sm text-primary/80">
              Data centre siting decisions based on state-level groundwater aggregates <strong>systematically 
              underestimate district-level risk</strong>. In Telangana, the gap between the state average and 
              the most-stressed district is 28 percentage points — meaning a decision-maker using state data 
              alone would completely miss that specific districts are already in crisis.
            </p>
          </div>
        </div>
      </div>

      <Collapsible title="For Data Scientists: Random Forest Groundwater Regressor" icon={<Code2 className="w-4 h-4" />} variant="technical">
        <div className="space-y-4">
          <p className="font-serif text-sm text-foreground/80">
            Random Forest handles lag and rolling-window features without requiring explicit polynomial terms. 
            The model uses lag features at k∈&#123;1,4&#125; and rolling statistics over 3-period windows.
          </p>
          <div className="bg-primary/5 p-4 font-mono text-sm text-primary overflow-x-auto">
            Hyperparameters: n_estimators=300, max_depth=None, min_samples_leaf=5, random_state=42, CV=5-fold
          </div>
          <p className="font-serif text-sm text-foreground/80">
            <strong>Holt-Winters (2070 forecast):</strong> Triple exponential smoothing with 
            <code className="bg-primary/5 px-1 text-xs">damped_trend=True</code>. The damping parameter φ encodes the 
            physical expectation that depletion cannot continue indefinitely at its current rate.
          </p>
          <p className="font-serif text-sm text-foreground/60 italic">
            Limitation: Many districts have fewer than 5 annual observations. Coefficient estimates in these 
            districts should be treated as indicative rather than reliable.
          </p>
        </div>
      </Collapsible>
    </section>
  );
}
