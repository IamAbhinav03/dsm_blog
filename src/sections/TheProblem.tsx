import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";
import { useSectionFade } from "@/components/SectionFade";

export function TheProblem() {
  const ref = useSectionFade();

  return (
    <section id="the-problem" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">Why This Matters</h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        Imagine a single building that never sleeps, never pauses, and drinks enough water every day to fill 
        an Olympic swimming pool — while consuming as much electricity as a small city. That's a modern 
        hyperscale data center. Now imagine dozens of them being built across India, in states where the 
        power grid already runs on coal and where farmers are already watching their wells run dry.
      </p>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        A single hyperscale facility at <span className="font-bold text-primary bg-primary/5 px-1">500 MW</span> draws 
        power continuously, consumes millions of litres of water daily for cooling, and anchors its carbon 
        footprint to the local generation mix. In states where groundwater is already classified as 
        over-exploited by the Central Ground Water Board and where coal supplies more than 70% of installed 
        capacity, adding permanent high-density compute loads is not a neutral planning decision.
      </p>

      <div className="bg-[#fff5f5] border border-destructive/20 p-6 mb-8">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-sans font-semibold text-lg text-destructive mb-2">The Core Problem</h3>
            <p className="font-serif leading-relaxed text-foreground/90">
              Until now, decisions about where to build data centers in India have relied on qualitative 
              checklists and fragmented sector reports that cannot be reconciled or updated as conditions change. 
              Without quantitative tipping-point analysis, planners cannot distinguish a viable siting decision 
              from a commitment to <em>irreversible resource depletion</em>.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        This research addresses that gap directly. We built a computational pipeline that integrates four 
        independent government datasets — air quality, groundwater levels, electricity generation, and 
        renewable capacity — into a single analytical framework. The pipeline trains seven different types 
        of models, runs ten analysis modules, and produces concrete, quantitative answers to the question: 
        <strong className="text-primary">at what point does adding more data center capacity push a state's 
        resources past the point of no return?</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard value="4" label="Government datasets integrated" />
        <StatCard value="7" label="Model architectures deployed" />
        <StatCard value="~35" label="CSV artifacts per pipeline run" />
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-muted p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
      <p className="font-sans text-4xl font-bold tracking-tight text-primary mb-2">{value}</p>
      <p className="font-sans text-sm font-medium text-foreground/70">{label}</p>
    </div>
  );
}
