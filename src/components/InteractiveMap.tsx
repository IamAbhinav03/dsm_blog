import React, { useState } from "react";
import { X } from "lucide-react";

/* ─── state data (centralised from the blog sections) ─── */

interface StateData {
  name: string;
  tagline: string;
  readiness: number;
  tier: string;
  pm25Delta: number;
  gridStress: number;
  gwDepth2022: number;
  gwDepth2070: number;
  renewableGap: number;
  monteCarloStability: number;
  /* marker position on the SVG map (approximate) */
  mx: number;
  my: number;
}

const STATES: StateData[] = [
  {
    name: "Gujarat",
    tagline: "Renewable Leader",
    readiness: 0.58,
    tier: "Moderate",
    pm25Delta: 2.3,
    gridStress: 52,
    gwDepth2022: 14.2,
    gwDepth2070: 19.0,
    renewableGap: 12500,
    monteCarloStability: 94,
    mx: 74,
    my: 268,
  },
  {
    name: "Telangana",
    tagline: "Policy-First, Water-Last",
    readiness: 0.42,
    tier: "Moderate",
    pm25Delta: 6.7,
    gridStress: 48,
    gwDepth2022: 13.2,
    gwDepth2070: 30.5,
    renewableGap: 6100,
    monteCarloStability: 72,
    mx: 152,
    my: 350,
  },
  {
    name: "Andhra Pradesh",
    tagline: "Solar Expansion",
    readiness: 0.47,
    tier: "Moderate",
    pm25Delta: 4.1,
    gridStress: 35,
    gwDepth2022: 11.0,
    gwDepth2070: 16.5,
    renewableGap: 8200,
    monteCarloStability: 78,
    mx: 178,
    my: 372,
  },
  {
    name: "West Bengal",
    tagline: "Coal Anchor",
    readiness: 0.31,
    tier: "Unprepared",
    pm25Delta: 8.2,
    gridStress: 38,
    gwDepth2022: 5.6,
    gwDepth2070: 8.0,
    renewableGap: 3400,
    monteCarloStability: 91,
    mx: 280,
    my: 265,
  },
];

const tierColor = (tier: string) =>
  tier === "Prepared" ? "#22c55e" : tier === "Moderate" ? "#f59e0b" : "#ef4444";

/* ─── simplified India outline (approx 35-point polygon) ─── */
const INDIA_OUTLINE =
  "M107,45 L100,80 L93,117 L85,140 L75,158 L60,180 L30,215 L13,245 L18,258 L35,270 L53,283 L60,295 L67,317 L72,335 L78,360 L80,383 L85,410 L95,445 L107,480 L115,495 L120,500 L130,497 L145,480 L160,467 L170,440 L175,415 L180,395 L190,370 L205,340 L220,310 L230,295 L240,280 L255,268 L270,260 L282,250 L290,235 L295,220 L310,205 L330,195 L350,185 L370,175 L380,168 L365,158 L340,155 L310,160 L285,170 L260,178 L235,180 L210,175 L190,168 L170,158 L150,148 L135,135 L120,115 L113,95 L110,70 L107,45";

interface InteractiveMapProps {
  onClose: () => void;
}

export function InteractiveMap({ onClose }: InteractiveMapProps) {
  const [selected, setSelected] = useState<StateData | null>(STATES[0]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a1628] text-white flex overflow-hidden">
      {/* ─── left panel: region select ─── */}
      <div className="w-60 flex-shrink-0 border-r border-white/10 flex flex-col bg-[#0d1b30]">
        <div className="p-5 border-b border-white/10">
          <p className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
            Region Select
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {STATES.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelected(s)}
              className={`w-full text-left px-5 py-4 flex items-center justify-between border-b border-white/5 transition-all duration-200 cursor-pointer ${
                selected?.name === s.name
                  ? "bg-white/10 border-l-2 border-l-cyan-400"
                  : "hover:bg-white/5 border-l-2 border-l-transparent"
              }`}
            >
              <span className="font-sans font-semibold text-sm">{s.name}</span>
              <span
                className="font-mono text-xs font-bold"
                style={{ color: tierColor(s.tier) }}
              >
                {(s.readiness * 100).toFixed(0)}%
              </span>
            </button>
          ))}
        </div>

        {/* bottom: summary bar */}
        <div className="p-4 border-t border-white/10 bg-[#081422]">
          <p className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">
            Pipeline Summary
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <MiniStat label="Models" value="7" />
            <MiniStat label="States" value="4" />
            <MiniStat label="CSVs" value="~35" />
          </div>
        </div>
      </div>

      {/* ─── center: India map ─── */}
      <div className="flex-1 relative overflow-hidden">
        {/* grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="absolute top-4 left-6 z-10">
          <p className="font-mono text-[10px] font-bold text-cyan-400/80 uppercase tracking-[0.2em]">
            FIDC · Infrastructure Map
          </p>
          <p className="font-sans text-xs text-white/40 mt-1">
            Click a state to view detailed metrics
          </p>
        </div>

        {/* SVG Map */}
        <svg
          viewBox="0 0 420 540"
          className="absolute inset-0 w-full h-full"
          style={{ padding: "60px 80px 20px 60px" }}
        >
          {/* India outline */}
          <path
            d={INDIA_OUTLINE}
            fill="rgba(14,165,233,0.06)"
            stroke="rgba(14,165,233,0.25)"
            strokeWidth="1.2"
          />

          {/* connection lines between states */}
          {STATES.map((s, i) =>
            STATES.slice(i + 1).map((s2) => (
              <line
                key={`${s.name}-${s2.name}`}
                x1={s.mx}
                y1={s.my}
                x2={s2.mx}
                y2={s2.my}
                stroke="rgba(14,165,233,0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))
          )}

          {/* state markers */}
          {STATES.map((s) => {
            const isActive = selected?.name === s.name;
            return (
              <g
                key={s.name}
                onClick={() => setSelected(s)}
                className="cursor-pointer"
              >
                {/* pulse ring */}
                {isActive && (
                  <circle
                    cx={s.mx}
                    cy={s.my}
                    r="18"
                    fill="none"
                    stroke="rgba(34,211,238,0.3)"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="r"
                      from="10"
                      to="24"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* outer glow */}
                <circle
                  cx={s.mx}
                  cy={s.my}
                  r={isActive ? 10 : 7}
                  fill={isActive ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.05)"}
                  stroke={isActive ? "#22d3ee" : "rgba(255,255,255,0.2)"}
                  strokeWidth="1"
                />
                {/* dot */}
                <circle
                  cx={s.mx}
                  cy={s.my}
                  r={isActive ? 5 : 4}
                  fill={isActive ? "#22d3ee" : "#94a3b8"}
                />
                {/* label */}
                <text
                  x={s.mx}
                  y={s.my - 16}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="8"
                  fontWeight="600"
                  fill={isActive ? "#22d3ee" : "rgba(255,255,255,0.5)"}
                  letterSpacing="0.05em"
                >
                  {s.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ─── right panel: state detail card ─── */}
      {selected && (
        <div className="w-80 flex-shrink-0 border-l border-white/10 bg-[#0d1b30] flex flex-col overflow-y-auto">
          <div className="p-5 border-b border-white/10">
            <p className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
              Active Region
            </p>
            <h2 className="font-sans text-xl font-bold">{selected.name}</h2>
            <p className="font-mono text-xs text-cyan-400/80 mt-1">
              {selected.tagline}
            </p>
          </div>

          {/* stat grid */}
          <div className="p-5 grid grid-cols-2 gap-3">
            <StatCard
              label="Readiness"
              value={selected.readiness.toFixed(2)}
              color={tierColor(selected.tier)}
            />
            <StatCard
              label="Tier"
              value={selected.tier}
              color={tierColor(selected.tier)}
            />
            <StatCard
              label="PM2.5 Δ"
              value={`+${selected.pm25Delta}`}
              unit="µg/m³"
              color={selected.pm25Delta > 5 ? "#ef4444" : "#f59e0b"}
            />
            <StatCard
              label="Grid Stress"
              value={`${selected.gridStress}`}
              unit="%"
              color={selected.gridStress > 45 ? "#ef4444" : "#22c55e"}
            />
            <StatCard
              label="GW Depth '22"
              value={selected.gwDepth2022.toFixed(1)}
              unit="m"
              color="#0ea5e9"
            />
            <StatCard
              label="GW Depth '70"
              value={selected.gwDepth2070.toFixed(1)}
              unit="m"
              color={selected.gwDepth2070 > 20 ? "#ef4444" : "#f59e0b"}
            />
          </div>

          {/* renewable gap */}
          <div className="px-5 pb-4">
            <div className="bg-white/5 border border-white/10 p-4">
              <p className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                Renewable Headroom
              </p>
              <p className="font-sans text-2xl font-bold text-emerald-400">
                {selected.renewableGap.toLocaleString()}
                <span className="text-sm font-normal text-white/40 ml-1">MW</span>
              </p>
              <div className="w-full bg-white/10 h-1.5 mt-3 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${(selected.renewableGap / 15000) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Monte Carlo */}
          <div className="px-5 pb-4">
            <div className="bg-white/5 border border-white/10 p-4">
              <p className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">
                Rank Stability (10k MC)
              </p>
              <p className="font-sans text-2xl font-bold text-cyan-400">
                {selected.monteCarloStability}%
              </p>
            </div>
          </div>

          {/* GW depletion indicator */}
          <div className="px-5 pb-5 mt-auto">
            <div
              className={`p-4 border ${
                selected.gwDepth2070 > 20
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-amber-500/10 border-amber-500/30"
              }`}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: selected.gwDepth2070 > 20 ? "#ef4444" : "#f59e0b" }}
              >
                {selected.gwDepth2070 > 20 ? "⚠ Critical Depletion Risk" : "Moderate Depletion"}
              </p>
              <p className="font-serif text-xs text-white/60">
                Projected {(selected.gwDepth2070 - selected.gwDepth2022).toFixed(1)}m deepening
                by 2070 under current extraction patterns.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit?: string;
  color: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 p-3">
      <p className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-[0.15em] mb-1">
        {label}
      </p>
      <p className="font-sans text-lg font-bold" style={{ color }}>
        {value}
        {unit && (
          <span className="text-xs font-normal text-white/40 ml-0.5">
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-sm font-bold text-white">{value}</p>
      <p className="font-mono text-[8px] text-white/30 uppercase">{label}</p>
    </div>
  );
}
