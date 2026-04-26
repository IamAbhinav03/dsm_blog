import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, ShieldAlert, ArrowRightCircle } from "lucide-react";

export function StrategicConclusions() {
  return (
    <section className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both border-t border-primary/10 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">Strategic Conclusions</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="rounded-none border-primary border-l-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-primary/5">
          <CardContent className="p-8">
            <div className="flex gap-6 items-start">
              <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-2xl font-bold text-primary mb-3">Energy Transition Arbitrage</h3>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">
                  The temporal mismatch between renewable energy generation peaks and flat data center loads presents a major systemic risk. Direct corporate PPA investments must be coupled with on-site long-duration energy storage (LDES) to avoid falling back onto coal-heavy grid baseloads during evening hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-destructive border-l-4 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-destructive/5">
          <CardContent className="p-8">
            <div className="flex gap-6 items-start">
              <ShieldAlert className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-2xl font-bold text-destructive mb-3">Cooling Imperative</h3>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">
                  Evaporative cooling is no longer viable in high water-stress zones like Telangana. The immediate transition to closed-loop liquid cooling—specifically Direct-to-Chip (D2C) architectures—is required not just for thermal efficiency of high-density AI clusters, but for maintaining operational licenses in drought-prone regions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-[#041627] text-white p-12 text-center mt-12">
        <h3 className="font-sans text-2xl font-bold mb-6">Download Full Intelligence Brief</h3>
        <p className="font-mono text-sm text-white/70 mb-8 max-w-2xl mx-auto">
          Access the complete 42-page technical breakdown, including un-aggregated anomaly detection datasets, policy whitepapers, and grid telemetry data.
        </p>
        <button className="bg-white text-primary px-8 py-3 font-bold font-sans hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
          Download PDF <ArrowRightCircle className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
