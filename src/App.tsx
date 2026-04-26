import React, { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useScrollSpy } from "@/components/ScrollSpy"
import { MapHeader } from "@/components/MapHeader"
import {
  Globe2, Book, Zap, MapPin, BarChart3, Droplet, GitBranch,
  AlertTriangle, Globe, Wrench, CheckCircle2, LayoutDashboard, Newspaper,
} from "lucide-react"

import { Hero } from "./sections/Hero"
import { TheProblem } from "./sections/TheProblem"
import { FourStates } from "./sections/FourStates"
import { ReadinessScores } from "./sections/ReadinessScores"
import { EnvironmentalImpact } from "./sections/EnvironmentalImpact"
import { GroundwaterCrisis } from "./sections/GroundwaterCrisis"
import { CausalAnalysis } from "./sections/CausalAnalysis"
import { TippingPoints } from "./sections/TippingPoints"
import { NationalPicture } from "./sections/NationalPicture"
import { HowWeDidThis } from "./sections/HowWeDidThis"
import { TextualAnalysis } from "./sections/TextualAnalysis"
import { Conclusions } from "./sections/Conclusions"
import { Dashboard } from "./sections/Dashboard"

type ViewMode = "article" | "dashboard"

const articleSections = [
  { id: "hero", label: "Article Home", icon: <Book className="w-4 h-4" /> },
  { id: "the-problem", label: "Why This Matters", icon: <Zap className="w-4 h-4" /> },
  { id: "four-states", label: "The Four States", icon: <MapPin className="w-4 h-4" /> },
  { id: "readiness", label: "Readiness Rankings", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "environmental-impact", label: "Environmental Impact", icon: <AlertTriangle className="w-4 h-4" /> },
  { id: "groundwater", label: "Groundwater Crisis", icon: <Droplet className="w-4 h-4" /> },
  { id: "causal-analysis", label: "Cause & Effect", icon: <GitBranch className="w-4 h-4" /> },
  { id: "tipping-points", label: "Tipping Points", icon: <AlertTriangle className="w-4 h-4" /> },
  { id: "national-picture", label: "National Picture", icon: <Globe className="w-4 h-4" /> },
  { id: "textual-analysis", label: "Textual Analysis", icon: <Newspaper className="w-4 h-4" /> },
  { id: "methodology", label: "How We Did This", icon: <Wrench className="w-4 h-4" /> },
  { id: "conclusions", label: "Conclusions", icon: <CheckCircle2 className="w-4 h-4" /> },
]

export default function App() {
  const [view, setView] = useState<ViewMode>("article")
  const activeId = useScrollSpy(articleSections.map(s => s.id))

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>

      <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground selection:bg-primary selection:text-primary-foreground font-sans">

        {/* ─── Side Navigation ─── */}
        <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-r border-primary/10 bg-white md:sticky md:top-0 md:h-screen flex flex-col hidden md:flex">

          {/* Logo */}
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Globe2 className="w-6 h-6 text-primary" />
              <h1 className="font-sans font-bold text-lg text-primary tracking-tight">AIDER</h1>
            </div>
            <p className="text-xs font-mono text-primary/60 uppercase tracking-wider">AI Data Centers Environmental & Renewable Impact</p>
          </div>

          {/* View Tabs */}
          <div className="flex border-b border-primary/10">
            <TabButton
              label="Article"
              icon={<Book className="w-3.5 h-3.5" />}
              active={view === "article"}
              onClick={() => setView("article")}
            />
            <TabButton
              label="Dashboard"
              icon={<LayoutDashboard className="w-3.5 h-3.5" />}
              active={view === "dashboard"}
              onClick={() => setView("dashboard")}
            />
          </div>



          {/* Section Nav (only for article view) */}
          {view === "article" && (
            <nav className="flex-1 overflow-y-auto py-4 toc-sidebar">
              <div className="px-4">
                <p className="px-2 text-xs font-mono font-medium text-primary/50 uppercase tracking-widest mb-3">Contents</p>
                <div className="space-y-0.5">
                  {articleSections.map((section) => (
                    <NavButton
                      key={section.id}
                      icon={section.icon}
                      label={section.label}
                      active={activeId === section.id}
                      onClick={() => scrollTo(section.id)}
                    />
                  ))}
                </div>
              </div>
            </nav>
          )}

          {view === "dashboard" && (
            <nav className="flex-1 overflow-y-auto py-4 toc-sidebar">
              <div className="px-4">
                <p className="px-2 text-xs font-mono font-medium text-primary/50 uppercase tracking-widest mb-3">Sections</p>
                <div className="space-y-0.5">
                  <NavButton icon={<BarChart3 className="w-4 h-4" />} label="State Readiness" active={false} onClick={() => {}} />
                  <NavButton icon={<AlertTriangle className="w-4 h-4" />} label="Environmental Impact" active={false} onClick={() => {}} />
                  <NavButton icon={<Droplet className="w-4 h-4" />} label="Groundwater Analysis" active={false} onClick={() => {}} />
                  <NavButton icon={<GitBranch className="w-4 h-4" />} label="Tipping Points" active={false} onClick={() => {}} />
                </div>
              </div>
            </nav>
          )}

          {/* Bottom: PDF link */}
          <div className="p-4 border-t border-primary/10">
            <a
              href="/reference/report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-primary text-white px-4 py-2.5 font-sans font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Full Report (PDF)
            </a>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 flex flex-col bg-background overflow-y-auto">
          {view === "article" ? (
            <>
              {/* Interactive map hero — full bleed */}
              <MapHeader />

              {/* Article body */}
              <div className="max-w-4xl w-full mx-auto py-12 px-6 lg:px-12">
                <Hero />
                <TheProblem />
                <FourStates />
                <ReadinessScores />
                <EnvironmentalImpact />
                <GroundwaterCrisis />
                <CausalAnalysis />
                <TippingPoints />
                <NationalPicture />
                <TextualAnalysis />
                <HowWeDidThis />
                <Conclusions />

                <Separator className="bg-primary/10 mb-8 mt-16" />
                <footer className="flex flex-wrap gap-4 text-sm font-mono text-primary/60 mb-12">
                  <span>© 2026 Manas V. S. Ravulapalli & Abhinav M. Hari</span>
                  <span className="text-primary/20">·</span>
                  <span>Department of Computer Science, Ashoka University</span>
                </footer>
              </div>
            </>
          ) : (
            <div className="w-full py-12 px-6 lg:px-12">
              <Dashboard />
            </div>
          )}
        </main>
      </div>
    </>
  )
}

/* ─── Sub-components ─── */

function TabButton({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border-b-2 ${
        active
          ? "text-primary border-primary bg-primary/5"
          : "text-foreground/40 border-transparent hover:text-primary/60 hover:bg-primary/[0.02]"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function NavButton({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-none h-9 px-2 text-left text-sm font-sans transition-all duration-200 cursor-pointer ${
        active
          ? "bg-primary/5 text-primary border-l-2 border-primary font-semibold"
          : "text-foreground/60 hover:bg-primary/5 hover:text-primary border-l-2 border-transparent"
      }`}
    >
      <span className="opacity-60 flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  )
}
