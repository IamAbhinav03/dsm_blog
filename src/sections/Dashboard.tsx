import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Legend, Cell, ReferenceLine, ComposedChart,
  Area, Line,
} from "recharts";

/* ═══════════════════════════════════════════════════════════
   ALL chart data centralised here — mirrors the blog sections.
   See walkthrough.md for which values are approximated.
   ═══════════════════════════════════════════════════════════ */

// APPROXIMATED (see ReadinessScores.tsx)
const readinessScores = [
  { state: "Gujarat", score: 0.58, tier: "Moderate" },
  { state: "Andhra Pradesh", score: 0.47, tier: "Moderate" },
  { state: "Telangana", score: 0.42, tier: "Moderate" },
  { state: "West Bengal", score: 0.31, tier: "Unprepared" },
];

// APPROXIMATED (see ReadinessScores.tsx)
const radarData = [
  { subject: "Energy", Gujarat: 0.70, "Andhra Pradesh": 0.55, Telangana: 0.60, "West Bengal": 0.45 },
  { subject: "Water", Gujarat: 0.65, "Andhra Pradesh": 0.50, Telangana: 0.30, "West Bengal": 0.40 },
  { subject: "Renewable", Gujarat: 0.85, "Andhra Pradesh": 0.55, Telangana: 0.35, "West Bengal": 0.25 },
  { subject: "Carbon", Gujarat: 0.45, "Andhra Pradesh": 0.40, Telangana: 0.50, "West Bengal": 0.15 },
];

// APPROXIMATED (see EnvironmentalImpact.tsx)
const pm25ImpactData = [
  { state: "West Bengal", delta: 8.2 },
  { state: "Telangana", delta: 6.7 },
  { state: "Andhra Pradesh", delta: 4.1 },
  { state: "Gujarat", delta: 2.3 },
];

// APPROXIMATED (see EnvironmentalImpact.tsx)
const gridStressData = [
  { state: "Gujarat", stress: 52 },
  { state: "Telangana", stress: 48 },
  { state: "West Bengal", stress: 38 },
  { state: "Andhra Pradesh", stress: 35 },
];

// APPROXIMATED (see GroundwaterCrisis.tsx)
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

// APPROXIMATED (see GroundwaterCrisis.tsx)
const seasonalStressData = [
  { state: "Telangana", preMonsoon: 15.2, postMonsoon: 10.8 },
  { state: "Gujarat", preMonsoon: 16.1, postMonsoon: 12.5 },
  { state: "Andhra Pradesh", preMonsoon: 12.5, postMonsoon: 9.2 },
  { state: "West Bengal", preMonsoon: 6.8, postMonsoon: 4.2 },
];

// APPROXIMATED (see GroundwaterCrisis.tsx)
const districtDivergenceData = [
  { state: "Telangana", gap: 28 },
  { state: "Gujarat", gap: 18 },
  { state: "Andhra Pradesh", gap: 15 },
  { state: "West Bengal", gap: 8 },
];

// APPROXIMATED (see TippingPoints.tsx)
const scenarioData = [
  { multiplier: "0.5×", Telangana: 55, Gujarat: 35, "Andhra Pradesh": 40, "West Bengal": 30 },
  { multiplier: "1.0×", Telangana: 68, Gujarat: 45, "Andhra Pradesh": 50, "West Bengal": 38 },
  { multiplier: "1.5×", Telangana: 82, Gujarat: 55, "Andhra Pradesh": 60, "West Bengal": 46 },
  { multiplier: "2.0×", Telangana: 95, Gujarat: 65, "Andhra Pradesh": 72, "West Bengal": 55 },
  { multiplier: "2.5×", Telangana: 108, Gujarat: 76, "Andhra Pradesh": 84, "West Bengal": 64 },
  { multiplier: "3.0×", Telangana: 120, Gujarat: 88, "Andhra Pradesh": 96, "West Bengal": 74 },
];

// APPROXIMATED (see TippingPoints.tsx)
const renewableGapData = [
  { state: "Gujarat", gap: 12500 },
  { state: "Andhra Pradesh", gap: 8200 },
  { state: "Telangana", gap: 6100 },
  { state: "West Bengal", gap: 3400 },
];

// APPROXIMATED (see NationalPicture.tsx)
const clusterProfiles = [
  { dimension: "Energy", "Tier 1": 0.85, "Tier 2": 0.65, "Tier 3": 0.45, "Tier 4": 0.25 },
  { dimension: "Water", "Tier 1": 0.80, "Tier 2": 0.60, "Tier 3": 0.50, "Tier 4": 0.35 },
  { dimension: "Renewable", "Tier 1": 0.90, "Tier 2": 0.55, "Tier 3": 0.30, "Tier 4": 0.15 },
  { dimension: "Carbon", "Tier 1": 0.70, "Tier 2": 0.50, "Tier 3": 0.35, "Tier 4": 0.20 },
];

const TIER_COLORS: Record<string, string> = {
  Prepared: "#006d37",
  Moderate: "#f59e0b",
  Unprepared: "#ba1a1a",
};

/* ═══════════════════════════════════════════════════════════ */

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-sans text-primary tracking-tight mb-2">
          AIDER Dashboard
        </h1>
        <p className="font-serif text-lg text-foreground/70">
          All visualisations from the research pipeline in one view. Each chart shows data for four study 
          states: Gujarat, Andhra Pradesh, Telangana, and West Bengal.
        </p>
      </div>

      {/* ── Row 1: Readiness ── */}
      <SectionHeader title="State Readiness" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard
          title="Composite Readiness Scores"
          caption="Weighted composite index (energy 0.35, water 0.35, renewable 0.20, carbon 0.10). No state reaches the 'Prepared' threshold of 0.65. Tier boundaries: Prepared ≥0.65, Unprepared <0.35."
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={readinessScores} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 1]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
              <YAxis dataKey="state" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#041627", fontWeight: 600 }} width={110} />
              <RechartsTooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} />
              <ReferenceLine x={0.65} stroke="#006d37" strokeDasharray="3 3" />
              <ReferenceLine x={0.35} stroke="#ba1a1a" strokeDasharray="3 3" />
              <Bar dataKey="score" barSize={28}>
                {readinessScores.map((e, i) => <Cell key={i} fill={TIER_COLORS[e.tier]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Sub-Dimension Breakdown"
          caption="Radar chart showing normalised [0,1] scores across four dimensions. West Bengal contracts sharply on Carbon and Renewable axes (coal dominance). Gujarat leads on Renewable."
        >
          <ResponsiveContainer width="100%" height={280}>
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
        </ChartCard>
      </div>

      {/* ── Row 2: Environmental Impact ── */}
      <SectionHeader title="Environmental Impact" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard
          title="Air Quality Impact: +500 MW Scenario"
          caption="Simulated change in PM2.5 (µg/m³) by adding a hypothetical 500 MW data centre. Coal-dominant grids (West Bengal, Telangana) show the largest deterioration. XGBoost model with monotonic constraints."
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pm25ImpactData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} unit=" µg/m³" />
              <YAxis dataKey="state" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#041627", fontWeight: 600 }} width={110} />
              <RechartsTooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`+${v} µg/m³`, "PM2.5 Δ"]} />
              <Bar dataKey="delta" barSize={24}>
                {pm25ImpactData.map((e, i) => <Cell key={i} fill={e.delta > 5 ? "#ba1a1a" : e.delta > 3 ? "#f59e0b" : "#22c55e"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Grid Stress Ratio"
          caption="Data centre draw as percentage of total installed generation capacity. Values above 45% (red) indicate high risk of involuntary load shedding during peak months."
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={gridStressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 70]} unit="%" />
              <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v}%`, "Grid Stress"]} />
              <Bar dataKey="stress" barSize={40}>
                {gridStressData.map((e, i) => <Cell key={i} fill={e.stress > 45 ? "#ba1a1a" : "#0ea5e9"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 3: Groundwater ── */}
      <SectionHeader title="Groundwater Analysis" />
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard
          title="Groundwater Depth Projection (2007–2070)"
          caption="Projected mean depth to water level (metres below ground) using Holt-Winters with damped trend. Higher values = deeper = worse. Telangana's monotone deepening indicates irreversible aquifer depletion."
        >
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={gwProjectionData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 35]} unit="m" />
              <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v}m`, ""]} />
              <Area type="monotone" dataKey="Telangana" stroke="none" fill="#f59e0b" fillOpacity={0.08} />
              <Line type="monotone" dataKey="Telangana" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="Gujarat" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="Andhra Pradesh" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: "#0ea5e9", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="West Bengal" stroke="#64748b" strokeWidth={2} dot={{ r: 3, fill: "#64748b", strokeWidth: 0 }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard
          title="Seasonal Aquifer Stress"
          caption="Pre-monsoon vs post-monsoon groundwater depth. The gap = seasonal stress. Larger gaps indicate worse cooling-water availability during the April–June peak data centre demand window."
        >
          <ResponsiveContainer width="100%" height={240}>
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
        </ChartCard>

        <ChartCard
          title="District Divergence Gap"
          caption="Percentage-point gap between state-level mean and worst-hit district. Telangana's 28pp gap means its state average hides critically depleted districts — siting decisions using state data alone will underestimate risk."
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={districtDivergenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 35]} unit="pp" />
              <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v} pp`, "Gap"]} />
              <Bar dataKey="gap" barSize={40}>
                {districtDivergenceData.map((e, i) => <Cell key={i} fill={e.gap > 20 ? "#ba1a1a" : e.gap > 12 ? "#f59e0b" : "#0ea5e9"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 4: Tipping Points ── */}
      <SectionHeader title="Scenario Simulations & Tipping Points" />
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard
          title="Groundwater Extraction vs. Capacity Multiplier"
          caption="Extraction percentage at different data centre capacity multiples. Dashed lines = tier thresholds (Semi-Critical 70%, Critical 90%, Over-Exploited 100%). Telangana enters over-exploitation at just 2× planned capacity."
        >
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={scenarioData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="multiplier" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, 130]} unit="%" />
              <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v}%`, ""]} />
              <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="3 3" />
              <ReferenceLine y={90} stroke="#ea580c" strokeDasharray="3 3" />
              <ReferenceLine y={100} stroke="#ba1a1a" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="Telangana" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="Gujarat" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="Andhra Pradesh" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: "#0ea5e9", strokeWidth: 0 }} />
              <Line type="monotone" dataKey="West Bengal" stroke="#64748b" strokeWidth={2} dot={{ r: 3, fill: "#64748b", strokeWidth: 0 }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard
          title="Renewable Headroom"
          caption="Gap between technically available renewable generation potential and actual installed capacity (MW). Gujarat alone has 12,500 MW of untapped renewable capacity — the single most impactful mitigation strategy."
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={renewableGapData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
              <RechartsTooltip contentStyle={{ borderRadius: 0, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v.toLocaleString()} MW`, "Untapped"]} />
              <Bar dataKey="gap" fill="#22c55e" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="National Infrastructure Tier Profiles (K-Means)"
          caption="Mean normalised feature values per K-Means cluster (k=4, silhouette-optimised). Tier 1 states lead across all dimensions; Tier 4 states lag uniformly, indicating systemic under-investment."
        >
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={clusterProfiles}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: "#041627", fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fontSize: 9 }} />
              <Radar name="Tier 1 (Best)" dataKey="Tier 1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              <Radar name="Tier 2" dataKey="Tier 2" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.15} />
              <Radar name="Tier 3" dataKey="Tier 3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
              <Radar name="Tier 4 (Worst)" dataKey="Tier 4" stroke="#ba1a1a" fill="#ba1a1a" fillOpacity={0.15} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ─── Shared components ─── */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <div className="w-1 h-6 bg-primary" />
      <h2 className="font-sans text-xl font-bold text-primary tracking-tight">{title}</h2>
    </div>
  );
}

function ChartCard({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="font-sans text-base text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        <p className="mt-4 text-xs font-serif text-foreground/50 leading-relaxed border-t border-primary/5 pt-3">
          {caption}
        </p>
      </CardContent>
    </Card>
  );
}
