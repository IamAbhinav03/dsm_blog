import { Separator } from "@/components/ui/separator";
import { useSectionFade } from "@/components/SectionFade";

export function HowWeDidThis() {
  const ref = useSectionFade();

  return (
    <section id="methodology" ref={ref} className="section-fade mb-16">
      <Separator className="bg-primary/10 mb-12" />
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold font-sans text-primary tracking-tight">
          How We Did This
        </h2>
      </div>

      <p className="text-lg font-serif leading-loose mb-8 text-foreground/90">
        This section is for readers who want to understand — or replicate — the full technical pipeline. 
        We built a 20-module system that ingests raw government data, cleans and unifies it, trains 
        predictive models, runs causal and scenario analyses, and produces the figures and tables shown 
        throughout this article.
      </p>

      {/* Pipeline Architecture */}
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-primary mb-4">Pipeline Architecture</h3>
        <div className="bg-primary/[0.03] border border-primary/10 p-6 overflow-x-auto">
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <PipelineStep step="1" label="catfish.py" desc="Ingest & Unify" color="bg-sky-100 text-sky-800 border-sky-200" />
            <Arrow />
            <PipelineStep step="2" label="Cleaner.py" desc="Domain Cleaning" color="bg-sky-100 text-sky-800 border-sky-200" />
            <Arrow />
            <PipelineStep step="3" label="DataChecker.py" desc="Quality Audit" color="bg-sky-100 text-sky-800 border-sky-200" />
            <Arrow />
            <PipelineStep step="4" label="run_all.py" desc="10 Training Modules" color="bg-emerald-100 text-emerald-800 border-emerald-200" />
            <Arrow />
            <PipelineStep step="5" label="main.ipynb" desc="Textual Analysis" color="bg-violet-100 text-violet-800 border-violet-200" />
            <Arrow />
            <PipelineStep step="6" label="analysis/*" desc="9 Analysis Modules" color="bg-amber-100 text-amber-800 border-amber-200" />
            <Arrow />
            <PipelineStep step="7" label="app.py" desc="Streamlit Dashboard" color="bg-violet-100 text-violet-800 border-violet-200" />
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-primary mb-4">Data Sources</h3>
        <p className="font-serif text-base leading-relaxed mb-4 text-foreground/80">
          Four independent government datasets, each produced by a separate measurement programme:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-primary/10">
            <thead>
              <tr className="bg-primary/[0.03]">
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Source Agency</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Domain</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Config Key</th>
              </tr>
            </thead>
            <tbody className="font-serif text-sm">
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Central Pollution Control Board</td>
                <td className="py-2.5 px-4 text-foreground/80">Air Quality Index</td>
                <td className="py-2.5 px-4 font-mono text-xs text-primary/60">AQI_CLEAN</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Central Ground Water Board</td>
                <td className="py-2.5 px-4 text-foreground/80">Groundwater depth by state</td>
                <td className="py-2.5 px-4 font-mono text-xs text-primary/60">GW_CLEAN</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Central Electricity Authority</td>
                <td className="py-2.5 px-4 text-foreground/80">Energy consumption & shortage</td>
                <td className="py-2.5 px-4 font-mono text-xs text-primary/60">ENERGY_CLEAN</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-foreground/80">Ministry of New & Renewable Energy</td>
                <td className="py-2.5 px-4 text-foreground/80">Renewable capacity installed</td>
                <td className="py-2.5 px-4 font-mono text-xs text-primary/60">RENEW_CLEAN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Name Canonicalisation Problem */}
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-primary mb-4">The Most Important Step You'd Never Think Of</h3>
        <p className="font-serif text-base leading-relaxed mb-4 text-foreground/80">
          Government datasets use heterogeneous string representations for the same state: "Andhra Pradesh", 
          "andhra pradesh", "A.P.", and "A P" all refer to the same entity. Without canonicalisation, a join 
          between datasets silently drops rows wherever state name strings differ by even a single character — 
          producing a merged dataset that <em>appears</em> complete but is actually missing entire state-years 
          of data.
        </p>
        <div className="bg-primary/5 p-4 font-mono text-xs text-primary/70 overflow-x-auto mb-4">
          # Without canonicalisation, a grouped aggregation produces:<br/>
          "Andhra Pradesh" → Row 1<br/>
          "andhra pradesh" → Row 2  ← Same state, different entry!<br/>
          "A.P."           → Row 3  ← And again!<br/>
          "A P"            → Row 4  ← Four entries for one state.
        </div>
      </div>

      {/* Model Summary Table */}
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-primary mb-4">The Seven Model Architectures</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-primary/10">
            <thead>
              <tr className="bg-primary/[0.03]">
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Model</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Algorithm</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Target</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Key Hyperparams</th>
              </tr>
            </thead>
            <tbody className="font-serif text-xs">
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Readiness</td>
                <td className="py-2.5 px-4">Weighted Composite</td>
                <td className="py-2.5 px-4">Infrastructure score</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">energy 0.35, water 0.35, renewable 0.20, carbon 0.10</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">AQI Regressor</td>
                <td className="py-2.5 px-4">XGBoost (Monotonic)</td>
                <td className="py-2.5 px-4">PM2.5</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">n_est=300, depth=6, lr=0.05</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Groundwater</td>
                <td className="py-2.5 px-4">Random Forest</td>
                <td className="py-2.5 px-4">Depth to water level</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">n_est=300, CV=5-fold</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Pollution</td>
                <td className="py-2.5 px-4">Bayesian Ridge</td>
                <td className="py-2.5 px-4">PM2.5 (posterior)</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">α, λ learned by marginal likelihood</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Forecast</td>
                <td className="py-2.5 px-4">ARIMA / Holt-Winters</td>
                <td className="py-2.5 px-4">Renewable capacity</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">Backtest=3yr, auto-selected</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Energy</td>
                <td className="py-2.5 px-4">GBM / XGBoost / Ridge</td>
                <td className="py-2.5 px-4">Electricity demand</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">n_est=300, depth=5, subsample=0.8</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">National Clustering</td>
                <td className="py-2.5 px-4">K-Means</td>
                <td className="py-2.5 px-4">State tiers</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">k=4 (silhouette-optimised)</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Sentiment (VADER)</td>
                <td className="py-2.5 px-4">Lexicon + Rules</td>
                <td className="py-2.5 px-4">News sentiment score</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">Compound avg per article</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-sans font-semibold text-primary">Sentiment (DistilBERT)</td>
                <td className="py-2.5 px-4">Transformer</td>
                <td className="py-2.5 px-4">Contextual sentiment</td>
                <td className="py-2.5 px-4 font-mono text-[10px]">distilbert-sst-2, P(POSITIVE)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="mb-8">
        <h3 className="font-sans text-xl font-bold text-primary mb-4">Honest Assessment: Strengths & Weaknesses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-3">Strengths</p>
            <ul className="space-y-2 text-sm font-serif text-emerald-900/80">
              <li>• Modular orchestration with per-step fault isolation</li>
              <li>• Centralised config.py eliminates magic numbers</li>
              <li>• Three complementary uncertainty quantification mechanisms</li>
              <li>• Causal framework (DAG + DiD) embedded in codebase</li>
              <li>• Structured cleaning log for audit trails</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50 p-5">
            <p className="font-mono text-[10px] font-bold text-red-700 uppercase tracking-widest mb-3">Weaknesses</p>
            <ul className="space-y-2 text-sm font-serif text-red-900/80">
              <li>• Preprocessing not orchestrated in run_all.py — stale data risk</li>
              <li>• Path-case duality (Data/ vs data/) breaks on Linux/macOS</li>
              <li>• Hardcoded narrative values can drift from config.py</li>
              <li>• No requirements.txt — environment not reproducible</li>
              <li>• Energy shortage classifier disabled (97.8% class imbalance)</li>
              <li>• Textual data biased towards corporate PR — optimism bias in sentiment scores</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reproducibility Table */}
      <div>
        <h3 className="font-sans text-xl font-bold text-primary mb-4">Reproducibility Scorecard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-primary/10">
            <thead>
              <tr className="bg-primary/[0.03]">
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Dimension</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest border-b border-primary/10">Detail</th>
              </tr>
            </thead>
            <tbody className="font-serif text-sm">
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Random seed control</td>
                <td className="py-2.5 px-4"><StatusBadge status="partial" /></td>
                <td className="py-2.5 px-4 text-foreground/60 text-xs">random_state=42 everywhere, but not centralised</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Environment pinning</td>
                <td className="py-2.5 px-4"><StatusBadge status="absent" /></td>
                <td className="py-2.5 px-4 text-foreground/60 text-xs">No requirements.txt observed</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Path portability</td>
                <td className="py-2.5 px-4"><StatusBadge status="risk" /></td>
                <td className="py-2.5 px-4 text-foreground/60 text-xs">Data/ vs data/ duality</td>
              </tr>
              <tr className="border-b border-primary/5">
                <td className="py-2.5 px-4 text-foreground/80">Preprocessing coupling</td>
                <td className="py-2.5 px-4"><StatusBadge status="absent" /></td>
                <td className="py-2.5 px-4 text-foreground/60 text-xs">catfish.py not in run_all.py</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-foreground/80">Artifact versioning</td>
                <td className="py-2.5 px-4"><StatusBadge status="absent" /></td>
                <td className="py-2.5 px-4 text-foreground/60 text-xs">Outputs overwritten on each run</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PipelineStep({ step, label, desc, color }: { step: string; label: string; desc: string; color: string }) {
  return (
    <div className={`border ${color} px-3 py-2 flex-shrink-0`}>
      <span className="font-bold">{step}.</span> {label}<br />
      <span className="opacity-70">{desc}</span>
    </div>
  );
}

function Arrow() {
  return <span className="text-primary/30 text-lg font-bold flex-shrink-0">→</span>;
}

function StatusBadge({ status }: { status: "partial" | "absent" | "risk" }) {
  const styles = {
    partial: "bg-amber-100 text-amber-800 border-amber-200",
    absent: "bg-red-100 text-red-800 border-red-200",
    risk: "bg-orange-100 text-orange-800 border-orange-200",
  };
  const labels = { partial: "Partial", absent: "Absent", risk: "At Risk" };
  return (
    <span className={`inline-block border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
