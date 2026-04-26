import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ─── state research data ─── */

interface StateData {
  name: string;
  abbr: string;
  tagline: string;
  readiness: number;
  tier: string;
  pm25Delta: number;
  gridStress: number;
  gwDepth2022: number;
  gwDepth2070: number;
  renewableGap: number;
  monteCarloStability: number;
  /* map coordinates [lat, lng] */
  coords: [number, number];
}

const STATES: StateData[] = [
  {
    name: "Gujarat",
    abbr: "GJ",
    tagline: "Renewable Leader · Tier Moderate",
    readiness: 0.58,
    tier: "Moderate",
    pm25Delta: 2.3,
    gridStress: 52,
    gwDepth2022: 14.2,
    gwDepth2070: 19.0,
    renewableGap: 12500,
    monteCarloStability: 94,
    coords: [23.0225, 72.5714], // Ahmedabad
  },
  {
    name: "Telangana",
    abbr: "TS",
    tagline: "Policy-First, Water-Last · Tier Moderate",
    readiness: 0.42,
    tier: "Moderate",
    pm25Delta: 6.7,
    gridStress: 48,
    gwDepth2022: 13.2,
    gwDepth2070: 30.5,
    renewableGap: 6100,
    monteCarloStability: 72,
    coords: [17.385, 78.4867], // Hyderabad
  },
  {
    name: "Andhra Pradesh",
    abbr: "AP",
    tagline: "Solar Expansion · Tier Moderate",
    readiness: 0.47,
    tier: "Moderate",
    pm25Delta: 4.1,
    gridStress: 35,
    gwDepth2022: 11.0,
    gwDepth2070: 16.5,
    renewableGap: 8200,
    monteCarloStability: 78,
    coords: [15.9129, 79.74], // Amaravati region
  },
  {
    name: "West Bengal",
    abbr: "WB",
    tagline: "Coal Anchor · Tier Unprepared",
    readiness: 0.31,
    tier: "Unprepared",
    pm25Delta: 8.2,
    gridStress: 38,
    gwDepth2022: 5.6,
    gwDepth2070: 8.0,
    renewableGap: 3400,
    monteCarloStability: 91,
    coords: [22.5726, 88.3639], // Kolkata
  },
];

const tierColor = (tier: string) =>
  tier === "Prepared" ? "#006d37" : tier === "Moderate" ? "#b45309" : "#ba1a1a";

/* ─── custom marker icons ─── */

function createMarkerIcon(isActive: boolean, tier: string) {
  const color = isActive ? "#041627" : tier === "Unprepared" ? "#ba1a1a" : "#b45309";
  const size = isActive ? 16 : 12;
  const border = isActive ? 3 : 2;
  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: ${border}px solid white;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.25)${isActive ? ", 0 0 0 4px rgba(4,22,39,0.15)" : ""};
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/* ─── map flyTo helper ─── */

function MapFlyTo({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 7, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

/* ─── main component ─── */

export function MapHeader() {
  const [selected, setSelected] = useState<StateData>(STATES[0]);
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <section className="relative w-full h-[520px] md:h-[600px] bg-[#f0f2f5] overflow-hidden border-b border-primary/10">

      {/* ── Leaflet Map ── */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[22.5, 79.5]}
          zoom={5}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
          style={{ height: "100%", width: "100%" }}
          className="map-container-light"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />
          <MapFlyTo coords={selected.coords} />
          {STATES.map((s) => (
            <Marker
              key={s.name}
              position={s.coords}
              icon={createMarkerIcon(selected.name === s.name, s.tier)}
              eventHandlers={{ click: () => { setSelected(s); setPanelOpen(true); } }}
            />
          ))}
        </MapContainer>
      </div>

      {/* ── Left gradient fade ── */}
      <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white/90 via-white/50 to-transparent pointer-events-none z-10" />
      {/* ── Bottom gradient fade ── */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none z-10" />

      {/* ── Left panel: Region Select ── */}
      <div className="absolute left-4 md:left-8 top-4 md:top-8 bottom-4 md:bottom-8 w-56 md:w-64 flex flex-col gap-3 z-20">

        {/* Region list card */}
        <div className="bg-white/95 backdrop-blur-sm border border-primary/10 shadow-sm flex flex-col">
          <div className="px-4 py-3 border-b border-primary/5">
            <h3 className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.15em]">
              Region Select
            </h3>
          </div>
          <ul className="flex flex-col">
            {STATES.map((s) => {
              const isActive = selected.name === s.name;
              return (
                <li key={s.name}>
                  <button
                    onClick={() => { setSelected(s); setPanelOpen(true); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-150 cursor-pointer border-l-2 ${
                      isActive
                        ? "bg-primary/5 border-l-primary"
                        : "border-l-transparent hover:bg-primary/[0.02]"
                    }`}
                  >
                    <span className={`font-sans text-sm ${isActive ? "text-primary font-semibold" : "text-foreground/80"}`}>
                      {s.name}
                    </span>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: tierColor(s.tier) }}
                    >
                      {(s.readiness * 100).toFixed(0)}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pipeline summary mini card */}
        <div className="bg-white/95 backdrop-blur-sm border border-primary/10 shadow-sm p-4 mt-auto">
          <h3 className="font-mono text-[10px] font-bold text-primary/50 uppercase tracking-[0.15em] mb-2">
            Pipeline Summary
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <MiniStat label="Models" value="7" />
            <MiniStat label="States" value="4" />
            <MiniStat label="CSVs" value="~35" />
          </div>
        </div>
      </div>

      {/* ── Right panel: Detail card ── */}
      {panelOpen && (
        <div className="absolute right-4 md:right-8 top-4 md:top-8 bottom-4 md:bottom-8 w-72 md:w-[360px] bg-white/95 backdrop-blur-sm border border-primary/10 shadow-lg flex flex-col z-20 transition-all duration-300">

          {/* Panel header */}
          <div className="px-5 py-4 border-b border-primary/5 flex justify-between items-start">
            <div>
              <span className="font-mono text-[10px] font-bold text-primary/40 uppercase tracking-[0.15em] block mb-0.5">
                Active Region
              </span>
              <h2 className="font-sans text-xl font-bold text-primary">{selected.name}</h2>
              <span className="font-sans text-xs text-foreground/50 mt-0.5 block">
                {selected.tagline}
              </span>
            </div>
            <button
              onClick={() => setPanelOpen(false)}
              className="text-foreground/30 hover:text-primary transition-colors cursor-pointer p-1"
              aria-label="Close panel"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* KPI grid */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <KpiCard
                label="Readiness"
                value={selected.readiness.toFixed(2)}
                color={tierColor(selected.tier)}
              />
              <KpiCard
                label="Tier"
                value={selected.tier}
                color={tierColor(selected.tier)}
              />
              <KpiCard
                label="PM2.5 Δ"
                value={`+${selected.pm25Delta}`}
                unit="µg/m³"
                color={selected.pm25Delta > 5 ? "#ba1a1a" : "#b45309"}
              />
              <KpiCard
                label="Grid Stress"
                value={`${selected.gridStress}`}
                unit="%"
                color={selected.gridStress > 45 ? "#ba1a1a" : "#006d37"}
              />
            </div>

            {/* Groundwater projection */}
            <div className="border border-primary/10 p-4">
              <span className="font-mono text-[10px] font-bold text-primary/40 uppercase tracking-[0.15em] block mb-2">
                Groundwater Depth
              </span>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-sans text-2xl font-bold text-primary">
                    {selected.gwDepth2022.toFixed(1)}
                    <span className="text-xs font-normal text-foreground/40 ml-1">m (2022)</span>
                  </p>
                </div>
                <div className="text-right">
                  <svg width="20" height="12" className="inline-block text-foreground/30 mr-1"><path d="M0 6 L14 6 M10 2 L14 6 L10 10" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
                  <span
                    className="font-sans text-lg font-bold"
                    style={{ color: selected.gwDepth2070 > 20 ? "#ba1a1a" : "#b45309" }}
                  >
                    {selected.gwDepth2070.toFixed(1)}
                    <span className="text-xs font-normal text-foreground/40 ml-1">m (2070)</span>
                  </span>
                </div>
              </div>
              <div className="w-full bg-primary/5 h-1.5 mt-3 overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${Math.min((selected.gwDepth2070 / 35) * 100, 100)}%`,
                    backgroundColor: selected.gwDepth2070 > 20 ? "#ba1a1a" : "#b45309",
                  }}
                />
              </div>
            </div>

            {/* Renewable headroom */}
            <div className="border border-primary/10 p-4">
              <span className="font-mono text-[10px] font-bold text-primary/40 uppercase tracking-[0.15em] block mb-2">
                Renewable Headroom
              </span>
              <p className="font-sans text-2xl font-bold text-[#006d37]">
                {selected.renewableGap.toLocaleString()}
                <span className="text-xs font-normal text-foreground/40 ml-1">MW untapped</span>
              </p>
              <div className="w-full bg-primary/5 h-1.5 mt-3 overflow-hidden">
                <div
                  className="h-full bg-[#006d37] transition-all duration-500"
                  style={{ width: `${(selected.renewableGap / 15000) * 100}%` }}
                />
              </div>
            </div>

            {/* Monte Carlo stability */}
            <div className="border border-primary/10 p-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-primary/40 uppercase tracking-[0.15em] block mb-1">
                  Rank Stability
                </span>
                <span className="font-mono text-[9px] text-primary/30 uppercase">10k MC Samples</span>
              </div>
              <span className="font-sans text-3xl font-bold text-primary">
                {selected.monteCarloStability}%
              </span>
            </div>
          </div>

          {/* Panel footer */}
          <div className="px-5 py-3 border-t border-primary/5 flex justify-end gap-3">
            <a
              href="#readiness"
              className="px-4 py-2 border border-primary text-primary font-sans text-xs font-semibold hover:bg-primary/5 transition-colors"
            >
              View in Article
            </a>
            <a
              href="/reference/report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white font-sans text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              Full Report
            </a>
          </div>
        </div>
      )}

      {/* ── Map attribution (bottom-right, subtle) ── */}
      <div className="absolute bottom-2 right-2 z-10">
        <span className="font-mono text-[8px] text-foreground/30">
          © OpenStreetMap · CARTO
        </span>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function KpiCard({ label, value, unit, color }: { label: string; value: string; unit?: string; color: string }) {
  return (
    <div className="border border-primary/10 p-3 text-center">
      <span className="font-mono text-[10px] font-bold text-primary/40 uppercase tracking-[0.15em] block mb-1">
        {label}
      </span>
      <span className="font-sans text-xl font-bold block" style={{ color }}>
        {value}
        {unit && <span className="text-xs font-normal text-foreground/40 ml-0.5">{unit}</span>}
      </span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-sm font-bold text-primary">{value}</p>
      <p className="font-mono text-[8px] text-primary/40 uppercase">{label}</p>
    </div>
  );
}
