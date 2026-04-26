import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from 'recharts';

const sentimentData = [
  { topic: 'Water Usage', positive: 20, negative: 80 },
  { topic: 'Job Creation', positive: 75, negative: 25 },
  { topic: 'Grid Strain', positive: 15, negative: 85 },
  { topic: 'Tech Innovation', positive: 90, negative: 10 },
];

export function PublicSentiment() {
  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both border-t border-primary/10 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">Public Sentiment & Media Discourse</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader>
            <CardTitle className="font-sans text-lg text-primary">Media Narrative Polarity</CardTitle>
            <CardDescription className="font-mono text-[10px] uppercase">Analyzed over 14,000 regional articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#041627' }} width={100} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 0, border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="negative" stackId="a" fill="#ef4444" barSize={24} name="Negative (%)" />
                  <Bar dataKey="positive" stackId="a" fill="#22c55e" barSize={24} name="Positive (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-primary/60 uppercase">Primary Concern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-3xl font-bold tracking-tight text-destructive mb-2">Water Scarcity</p>
              <p className="font-serif text-sm text-foreground/80">
                Mentioned in 85% of critical media coverage regarding the Telangana data center expansion.
              </p>
            </CardContent>
          </Card>
          
          <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-primary/60 uppercase">Primary Benefit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-3xl font-bold tracking-tight text-secondary mb-2">Tech Hub Status</p>
              <p className="font-serif text-sm text-foreground/80">
                Local government press releases heavily emphasize the region's elevation to a tier-1 global tech hub.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
