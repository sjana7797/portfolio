import { site } from "@/lib/site"
import { experiences } from "@/features/experience/data"
import { skillGroups } from "@/features/skills/data"
import { education } from "@/features/resume/data"

function Key({ children }: { children: React.ReactNode }) {
  return <span className="text-sky-400">{children}</span>
}
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-amber-300">{children}</span>
}
function Punc({ children }: { children: React.ReactNode }) {
  return <span className="text-neutral-500">{children}</span>
}
function Comment({ children }: { children: React.ReactNode }) {
  return <span className="text-neutral-600">{children}</span>
}

export function DevResume() {
  return (
    <article className="mx-auto max-w-[860px] bg-neutral-950 px-6 py-12 font-mono text-[13.5px] leading-[1.7] text-neutral-300 sm:px-10">
      <p>
        <Comment>{"// " + site.jobTitle}</Comment>
      </p>
      <p className="mt-1">
        <Key>const</Key> <span className="text-emerald-400">engineer</span>{" "}
        <Punc>=</Punc> <Punc>{"{"}</Punc>
      </p>
      <div className="pl-4">
        <p>
          <Key>name</Key>
          <Punc>:</Punc> <Str>&quot;{site.name}&quot;</Str>
          <Punc>,</Punc>
        </p>
        <p>
          <Key>location</Key>
          <Punc>:</Punc>{" "}
          <Str>
            &quot;{site.locality}, {site.region}&quot;
          </Str>
          <Punc>,</Punc>
        </p>
        <p>
          <Key>contact</Key>
          <Punc>:</Punc> <Str>&quot;{site.email}&quot;</Str>
          <Punc>,</Punc>
        </p>
        <p>
          <Key>links</Key>
          <Punc>: [</Punc>
        </p>
        <div className="pl-4">
          {site.sameAs.map((href, i) => (
            <p key={href}>
              <a href={href} className="text-amber-300 hover:text-amber-200">
                &quot;{href.replace(/^https?:\/\//, "")}&quot;
              </a>
              <Punc>{i < site.sameAs.length - 1 ? "," : ""}</Punc>
            </p>
          ))}
        </div>
        <p>
          <Punc>],</Punc>
        </p>
        <p>
          <Key>summary</Key>
          <Punc>:</Punc> <Str>&quot;{site.summary}&quot;</Str>
          <Punc>,</Punc>
        </p>
      </div>
      <p>
        <Punc>{"}"}</Punc>
      </p>

      <p className="mt-8">
        <Comment>{"// Experience"}</Comment>
      </p>
      <p className="mt-1">
        <Key>const</Key> <span className="text-emerald-400">experience</span>{" "}
        <Punc>=</Punc> <Punc>[</Punc>
      </p>
      {experiences.map((job) => (
        <div key={job.company} className="pl-4">
          <p>
            <Punc>{"{"}</Punc>
          </p>
          <div className="pl-4">
            <p>
              <Key>role</Key>
              <Punc>:</Punc> <Str>&quot;{job.role}&quot;</Str>
              <Punc>,</Punc>
            </p>
            <p>
              <Key>company</Key>
              <Punc>:</Punc> <Str>&quot;{job.company}&quot;</Str>
              <Punc>,</Punc>
            </p>
            <p>
              <Key>period</Key>
              <Punc>:</Punc> <Str>&quot;{job.period}&quot;</Str>
              <Punc>,</Punc>
            </p>
            <p>
              <Key>highlights</Key>
              <Punc>: [</Punc>
            </p>
            <div className="pl-4 text-neutral-400">
              {job.highlights.map((h) => (
                <p key={h}>
                  <Str>&quot;{h}&quot;</Str>
                  <Punc>,</Punc>
                </p>
              ))}
            </div>
            <p>
              <Punc>],</Punc>
            </p>
            <p>
              <Key>tech</Key>
              <Punc>:</Punc>{" "}
              <Str>[{job.tech.map((t) => `"${t}"`).join(", ")}]</Str>
            </p>
          </div>
          <p>
            <Punc>{"},"}</Punc>
          </p>
        </div>
      ))}
      <p>
        <Punc>]</Punc>
      </p>

      <p className="mt-8">
        <Comment>{"// Skills"}</Comment>
      </p>
      <p className="mt-1">
        <Key>const</Key> <span className="text-emerald-400">skills</span>{" "}
        <Punc>=</Punc> <Punc>{"{"}</Punc>
      </p>
      <div className="pl-4">
        {skillGroups.map((g) => (
          <p key={g.category}>
            <Key>{g.category.toLowerCase().replace(/[^a-z]+/g, "_")}</Key>
            <Punc>:</Punc>{" "}
            <Str>[{g.skills.map((s) => `"${s}"`).join(", ")}]</Str>
            <Punc>,</Punc>
          </p>
        ))}
      </div>
      <p>
        <Punc>{"}"}</Punc>
      </p>

      <p className="mt-8">
        <Comment>{"// Education"}</Comment>
      </p>
      <p className="mt-1">
        <Key>const</Key> <span className="text-emerald-400">education</span>{" "}
        <Punc>=</Punc> <Punc>[</Punc>
      </p>
      {education.map((e) => (
        <div key={e.degree} className="pl-4">
          <p>
            <Punc>{"{"}</Punc>
          </p>
          <div className="pl-4">
            <p>
              <Key>degree</Key>
              <Punc>:</Punc> <Str>&quot;{e.degree}&quot;</Str>
              <Punc>,</Punc>
            </p>
            <p>
              <Key>school</Key>
              <Punc>:</Punc> <Str>&quot;{e.school}&quot;</Str>
              <Punc>,</Punc>
            </p>
            <p>
              <Key>result</Key>
              <Punc>:</Punc> <Str>&quot;{e.meta}&quot;</Str>
            </p>
          </div>
          <p>
            <Punc>{"}"}</Punc>
          </p>
        </div>
      ))}
      <p>
        <Punc>]</Punc>
      </p>
    </article>
  )
}
