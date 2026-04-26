import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ScatterChart, Scatter, ZAxis } from 'recharts';

const causalData = [
  { temp: 28, coolingDemand: 45, confidence: 90 },
  { temp: 32, coolingDemand: 60, confidence: 85 },
  { temp: 35, coolingDemand: 75, confidence: 80 },
  { temp: 38, coolingDemand: 95, confidence: 75 },
  { temp: 42, coolingDemand: 120, confidence: 60 },
  { temp: 45, coolingDemand: 150, confidence: 50 },
];

const scatterData = [
  { x: 10, y: 30, z: 200 },
  { x: 20, y: 50, z: 260 },
  { x: 30, y: 70, z: 400 },
  { x: 40, y: 90, z: 280 },
  { x: 50, y: 110, z: 500 },
];

export function MLModelsAnalysis() {
  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both border-t border-primary/10 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">ML Models & Causal Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader>
            <CardTitle className="font-sans text-lg text-primary">Causal Inference: Temp vs Cooling Demand</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">Non-linear extrapolation using Bayesian Networks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={causalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="temp" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <RechartsTooltip contentStyle={{ borderRadius: 0, border: '1px solid #e2e8f0' }} />
                  <Area type="monotone" dataKey="coolingDemand" stroke="#0ea5e9" fill="#e0f2fe" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader>
            <CardTitle className="font-sans text-lg text-primary">Predictive Anomaly Clustering</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">DBSCAN algorithm applied to power flux</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="x" name="Load" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis type="number" dataKey="y" name="Latency" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <ZAxis type="number" dataKey="z" range={[60, 400]} name="Impact" />
                  <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 0, border: '1px solid #e2e8f0' }} />
                  <Scatter name="Anomalies" data={scatterData} fill="#f59e0b" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-primary/5 p-6 border-l-4 border-primary">
        <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest mb-2">Model Confidence Score: 87.4%</h3>
        <p className="font-serif text-sm text-primary/80">
          The ML ensemble suggests a high probability of structural cooling failure if ambient temperatures exceed 42°C for more than 48 consecutive hours. Predictive modeling integrates both climate drift forecasts and hardware thermal constraints.
        </p>
      </div>
    </section>
  );
}
