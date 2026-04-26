import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LineChart, Line } from 'recharts';

const stateData = [
  { name: 'Gujarat', capacity: 450, growth: 12 },
  { name: 'Andhra Pradesh', capacity: 320, growth: 18 },
  { name: 'Telangana', capacity: 680, growth: 25 },
  { name: 'West Bengal', capacity: 210, growth: 8 },
];

const timelineData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 55 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 80 },
];

export function ExecutiveCommandCenter() {
  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both border-t border-primary/10 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">Executive Command Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stateData.map((state, i) => (
          <Card key={i} className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="font-sans text-lg text-primary">{state.name}</CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase">Active Capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-3xl font-bold tracking-tight text-primary">{state.capacity}</span>
                <span className="font-sans text-sm font-medium text-primary/60">MW</span>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-secondary">
                <span>+{state.growth}% YoY</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader>
            <CardTitle className="font-sans text-lg text-primary">Regional Capacity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 0, border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="capacity" fill="#041627" barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader>
            <CardTitle className="font-sans text-lg text-primary">Aggregated Growth Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <RechartsTooltip contentStyle={{ borderRadius: 0, border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="value" stroke="#006d37" strokeWidth={2} dot={{ r: 4, fill: '#006d37', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
