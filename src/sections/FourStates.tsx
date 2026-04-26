import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSectionFade } from "@/components/SectionFade";

const states = [
  {
    name: "Gujarat",
    tagline: "Renewable Leader",
    color: "bg-emerald-600",
    description:
      "Offers the highest renewable energy penetration among the study group, with a more resilient physical foundation and stabler grid baseloads.",
    highlights: ["Highest renewable penetration", "Stable grid infrastructure", "Strong land availability"],
  },
  {
    name: "Andhra Pradesh",
    tagline: "Solar Expansion",
    color: "bg-sky-500",
    description:
      "Occupies an intermediate position with active solar expansion plans, making it a transitional case between the renewable leaders and the coal-dependent states.",
    highlights: ["Active solar expansion", "Intermediate infrastructure", "Growing capacity"],
  },
  {
    name: "Telangana",
    tagline: "Policy-First, Water-Last",
    color: "bg-amber-500",
    description:
      "Provides exceptional policy incentives and fast-track approvals for data center construction, but the underlying physical infrastructure — specifically water supply and cooling — remains a critical bottleneck.",
    highlights: ["Aggressive policy support", "Groundwater over-exploited", "Coal-dominant grid"],
  },
  {
    name: "West Bengal",
    tagline: "Coal Anchor",
    color: "bg-slate-500",
    description:
      "Operates the most coal-dominant grid in the group. The carbon axis is its primary readiness drag, making it the weakest candidate for sustainable data center deployment.",
    highlights: ["Coal-dominant generation", "Lowest carbon score", "Limited renewable mix"],
  },
];

export function FourStates() {
  const ref = useSectionFade();

  return (
    <section id="four-states" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">The Four States Under the Microscope</h2>
      </div>
      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        We chose these four states because they represent <strong>contrasting infrastructure profiles</strong>. 
        Comparing them is analytically productive — it forces the analysis to differentiate between 
        jurisdictions rather than treating India as a uniform infrastructure landscape.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {states.map((state) => (
          <Card key={state.name} className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 ${state.color}`} />
                <h3 className="font-sans text-xl font-bold text-primary">{state.name}</h3>
                <span className="font-mono text-[10px] font-bold text-primary/50 uppercase tracking-widest ml-auto">
                  {state.tagline}
                </span>
              </div>
              <p className="font-serif text-sm text-foreground/80 mb-4">{state.description}</p>
              <div className="flex flex-wrap gap-2">
                {state.highlights.map((h) => (
                  <span key={h} className="font-mono text-[10px] bg-primary/5 text-primary/70 px-2 py-1 uppercase tracking-wider">
                    {h}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-primary/[0.03] border border-primary/10 p-5">
        <p className="font-serif text-sm text-foreground/70">
          <strong className="text-primary">Temporal scope:</strong> Historical observations span from approximately 
          2007, giving the time-series models a training window of fifteen to eighteen years — sufficient to 
          capture multiple monsoon cycles, which are the dominant source of annual variance in groundwater recharge. 
          The forecast horizon extends to <strong>2035</strong>, spanning the expected first and second phases 
          of India's large-scale data centre build-out.
        </p>
      </div>
    </section>
  );
}
