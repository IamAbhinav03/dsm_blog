import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible } from "@/components/Collapsible";
import { useSectionFade } from "@/components/SectionFade";
import { Code2, AlertTriangle, Newspaper, MessageSquare } from "lucide-react";

/* ─── Sentiment divergence data ─── */

// From report Section 7.2: VADER µ≈0.25, DistilBERT µ≈0.15
const sentimentComparison = [
  { model: "VADER (Lexicon)", meanScore: 0.25, type: "Positive-biased", color: "#22c55e" },
  { model: "DistilBERT (Transformer)", meanScore: 0.15, type: "Neutral-centred", color: "#0ea5e9" },
];

// From report Section 7.2: Five LDA topic clusters
const topicClusters = [
  {
    name: "Infrastructure Expansion",
    description: "Hyperscale deployments and 5G grid readiness",
    icon: "🏗️",
    sentiment: "Positive",
  },
  {
    name: "Institutional Investment",
    description: "FDI inflows and private equity interest in the Indian data-centre market",
    icon: "💰",
    sentiment: "Positive",
  },
  {
    name: "Resource Stress",
    description: "Groundwater depletion and the PUE–WUE tradeoff in water-intensive cooling",
    icon: "💧",
    sentiment: "Negative",
  },
  {
    name: "Policy Frameworks",
    description: "State-level Data Centre Policies and renewable energy incentives",
    icon: "📜",
    sentiment: "Mixed",
  },
  {
    name: "Environmental Compliance",
    description: "EIA clearances and sustainable building certifications (LEED/IGBC)",
    icon: "🌱",
    sentiment: "Mixed",
  },
];

export function TextualAnalysis() {
  const ref = useSectionFade();

  return (
    <section id="textual-analysis" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">
          What the News Is Saying: Textual Analysis
        </h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-6 text-foreground/90">
        Numbers alone don't tell the whole story. While our quantitative models measure groundwater
        depletion and grid stress in concrete units, they can't capture what <em>people</em> think
        about data centers — the investment enthusiasm, the regulatory concerns, or the community
        opposition that shapes whether a project actually gets built. To capture this qualitative
        dimension, we scraped and analysed industry news coverage using two fundamentally different
        sentiment analysis approaches.
      </p>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        We harvested articles from <strong>Google News RSS</strong> and <strong>NewsAPI</strong> using
        targeted query parameters (<code className="bg-primary/5 px-1.5 py-0.5 text-sm font-mono text-primary/70">"data center" AND India</code>),
        deduplicated by URL to remove cross-platform syndication, and ran each article through two
        scoring models.
      </p>

      {/* The Two Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <CardTitle className="font-sans text-lg text-primary">VADER</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">
              Lexicon &amp; Rule-Based
            </p>
            <p className="font-serif text-sm text-foreground/80 mb-3">
              Think of VADER as a dictionary-based approach. It looks up each word's emotional charge
              (positive, negative, neutral) and applies rules for punctuation, capitalisation, and
              negation. It's fast and effective for news snippets and headlines.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 p-3">
              <p className="font-mono text-xs text-emerald-800">
                Mean compound score: <strong>µ ≈ 0.25</strong>
              </p>
              <p className="font-serif text-xs text-emerald-700 mt-1">
                → Consistently reports <strong>higher positive sentiment</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-primary/10 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-sky-600" />
              <CardTitle className="font-sans text-lg text-primary">DistilBERT</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-2">
              Transformer-Based
            </p>
            <p className="font-serif text-sm text-foreground/80 mb-3">
              DistilBERT reads each article as a whole, understanding context and nuance. A sentence
              like "India's data center boom faces water constraints" reads as positive to VADER
              (boom!) but neutral-to-cautious for DistilBERT (constraints).
            </p>
            <div className="bg-sky-50 border border-sky-200 p-3">
              <p className="font-mono text-xs text-sky-800">
                Mean probability score: <strong>µ ≈ 0.15</strong>
              </p>
              <p className="font-serif text-xs text-sky-700 mt-1">
                → Captures <strong>more neutral, cautious reporting</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Finding: Sentiment Divergence */}
      <div className="bg-primary/[0.03] border border-primary/10 p-6 mb-8">
        <h3 className="font-sans text-lg font-bold text-primary mb-3">
          Key Finding: The Optimism Gap
        </h3>
        <p className="font-serif text-base leading-relaxed text-foreground/80 mb-4">
          The gap between the two models tells a crucial story. Lexicon-based models like VADER
          consistently report <strong>higher positive sentiment</strong> (µ ≈ 0.25) compared to the
          transformer model DistilBERT (µ ≈ 0.15). This divergence suggests that while the <em>language</em> of
          industry press releases is highly optimistic — full of words like "growth", "investment",
          and "expansion" — the <em>underlying context</em> captured by the transformer model reveals
          more neutral or cautious reporting about infrastructure constraints.
        </p>
        {/* Visual bar comparison */}
        <div className="space-y-3">
          {sentimentComparison.map((m) => (
            <div key={m.model} className="flex items-center gap-4">
              <span className="font-mono text-xs text-foreground/60 w-48 flex-shrink-0">{m.model}</span>
              <div className="flex-1 bg-primary/5 h-6 overflow-hidden relative">
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: `${m.meanScore * 100 * 2}%`, backgroundColor: m.color }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-foreground/50">
                  µ = {m.meanScore.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Clusters */}
      <h3 className="font-sans text-xl font-bold text-primary mb-4">
        What the Media Talks About: Five Thematic Clusters
      </h3>
      <p className="font-serif text-base leading-relaxed mb-6 text-foreground/80">
        Using Latent Dirichlet Allocation (LDA) — a topic modelling technique that groups articles by
        recurring word patterns — we identified five distinct thematic clusters in the news corpus.
        These provide early-warning signals for the quantitative risk tiers: a spike in "Resource Stress"
        topic frequency often precedes a Critical tier crossing in groundwater scenario simulations
        by 6–12 months.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {topicClusters.map((topic) => (
          <div
            key={topic.name}
            className="border border-primary/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{topic.icon}</span>
              <h4 className="font-sans font-semibold text-sm text-primary">{topic.name}</h4>
            </div>
            <p className="font-serif text-xs text-foreground/70 mb-3">{topic.description}</p>
            <SentimentBadge sentiment={topic.sentiment} />
          </div>
        ))}
      </div>

      {/* Limitations */}
      <div className="bg-[#fefce8] border border-yellow-200 p-6 mb-8">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-mono text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">
              Important Caveat: Media ≠ Reality
            </h3>
            <p className="font-serif text-sm text-foreground/80">
              The NLP pipeline relies on news data harvested from public RSS feeds and NewsAPI. This
              data is inherently biased towards <strong>corporate PR and investment announcements</strong>,
              which typically exhibit a strong "optimism bias." While deduplication was applied, the raw
              news corpus contains significant noise from syndicated content. Results from this layer
              should be interpreted as <em>media-perceived risk</em> rather than direct on-ground risk.
            </p>
          </div>
        </div>
      </div>

      {/* Technical details collapsible */}
      <Collapsible title="For Data Scientists: VADER, DistilBERT & LDA" icon={<Code2 className="w-4 h-4" />} variant="technical">
        <div className="space-y-4">
          <p className="font-serif text-sm text-foreground/80">
            <strong>VADER Compound Score:</strong> For each article, the compound score S<sub>V</sub> is
            the average of normalised sentence-level scores:
          </p>
          <div className="bg-primary/5 p-4 font-mono text-sm text-primary overflow-x-auto">
            S_V = (1/N) · Σᵢ Compound(sᵢ)
          </div>
          <p className="font-serif text-sm text-foreground/80">
            where N is the number of sentences in the article text.
          </p>

          <p className="font-serif text-sm text-foreground/80">
            <strong>DistilBERT:</strong> A distilled version of BERT (distilbert-base-uncased-finetuned-sst-2-english)
            that captures contextual dependencies between words. The sentiment score S<sub>D</sub> is
            the probability associated with the POSITIVE label:
          </p>
          <div className="bg-primary/5 p-4 font-mono text-sm text-primary overflow-x-auto">
            P(y | text) = Softmax(DistilBERT(text)), S_D = P(POSITIVE)
          </div>

          <p className="font-serif text-sm text-foreground/80">
            <strong>LDA Topic Modelling:</strong> Latent Dirichlet Allocation discovers latent topics in
            the corpus by modelling each document as a mixture of topics, and each topic as a distribution
            over words. We identified k=5 clusters using intertopic distance optimisation.
          </p>

          <p className="font-serif text-sm text-foreground/80">
            <strong>Data pipeline:</strong> Automated retrieval from Google News RSS and NewsAPI using
            targeted query parameters → URL-based unique filtering to remove cross-platform duplicates →
            Dual-model scoring (VADER + DistilBERT) → LDA topic extraction.
          </p>

          <p className="font-serif text-sm text-foreground/60 italic">
            Source: textual_analysis/main.ipynb
          </p>
        </div>
      </Collapsible>
    </section>
  );
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const styles: Record<string, string> = {
    Positive: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Negative: "bg-red-100 text-red-800 border-red-200",
    Mixed: "bg-amber-100 text-amber-800 border-amber-200",
  };
  return (
    <span className={`inline-block border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${styles[sentiment] || ""}`}>
      {sentiment} sentiment
    </span>
  );
}
