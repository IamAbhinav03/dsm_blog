import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const readinessData = [
  { subject: 'Grid Stability', Telangana: 80, Gujarat: 90, fullMark: 100 },
  { subject: 'Water Supply', Telangana: 40, Gujarat: 65, fullMark: 100 },
  { subject: 'Renewable Mix', Telangana: 55, Gujarat: 85, fullMark: 100 },
  { subject: 'Policy Support', Telangana: 95, Gujarat: 80, fullMark: 100 },
  { subject: 'Land Avail.', Telangana: 70, Gujarat: 90, fullMark: 100 },
  { subject: 'Cooling Efficiency', Telangana: 60, Gujarat: 75, fullMark: 100 },
];

export function StateReadiness() {
  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both border-t border-primary/10 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">State Readiness Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader>
            <CardTitle className="font-sans text-lg text-primary">Infrastructure Readiness Index</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">Comparative Matrix: Telangana vs Gujarat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={readinessData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#041627', fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Telangana" dataKey="Telangana" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="Gujarat" dataKey="Gujarat" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 justify-center">
          <div className="p-6 bg-white border border-primary/5">
            <h3 className="font-sans text-xl font-bold text-primary mb-2">Telangana: High Policy, Low Water</h3>
            <p className="font-serif text-sm text-primary/80 mb-4">
              While local governance provides exceptional incentives and fast-track approvals for data center construction, the underlying physical infrastructure—specifically municipal water supply and cooling capacity—remains a critical bottleneck.
            </p>
            <div className="w-full bg-primary/10 h-1.5 rounded-none overflow-hidden">
              <div className="h-full bg-fuchsia-600" style={{ width: '65%' }}></div>
            </div>
            <p className="font-mono text-[10px] mt-2 text-right uppercase text-primary/50">Overall Score: 65/100</p>
          </div>

          <div className="p-6 bg-white border border-primary/5">
            <h3 className="font-sans text-xl font-bold text-primary mb-2">Gujarat: Balanced Physical Infrastructure</h3>
            <p className="font-serif text-sm text-primary/80 mb-4">
              Gujarat offers a more resilient physical foundation, with a higher penetration of variable renewable energy (VRE) and stabler grid baseloads. However, it trails slightly in aggressive bureaucratic fast-tracking compared to Telangana.
            </p>
            <div className="w-full bg-primary/10 h-1.5 rounded-none overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: '82%' }}></div>
            </div>
            <p className="font-mono text-[10px] mt-2 text-right uppercase text-primary/50">Overall Score: 82/100</p>
          </div>
        </div>
      </div>
    </section>
  );
}
