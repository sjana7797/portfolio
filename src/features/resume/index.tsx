"use client"

import { useState, type ComponentType } from "react"
import { ResumeSwitcher, type ResumeLayoutId } from "./resume-switcher"
import { SimpleResume } from "./layouts/simple-resume"
import { TwoColumnResume } from "./layouts/two-column-resume"
import { DevResume } from "./layouts/dev-resume"
import { ReelResume } from "./layouts/reel-resume"

const LAYOUTS: Record<ResumeLayoutId, ComponentType> = {
  simple: SimpleResume,
  "two-column": TwoColumnResume,
  dev: DevResume,
  reel: ReelResume,
}

export function ResumeApp() {
  const [layout, setLayout] = useState<ResumeLayoutId>("simple")
  const Layout = LAYOUTS[layout]

  return (
    <div className="pt-16">
      <ResumeSwitcher active={layout} onSelect={setLayout} />
      <div key={layout} className="animate-[vt-fade-in_280ms_ease_both]">
        <Layout />
      </div>
    </div>
  )
}
