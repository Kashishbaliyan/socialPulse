import { AlertTriangle, CheckCircle2, Crosshair, Lightbulb } from 'lucide-react'
import type { Autopsy } from '../types'

const typeStyles = {
  weakness: 'bg-[#FFF7FB] border-[#FFD8EB]',
  moderate: 'bg-[#FFFCF3] border-[#FFE6A6]',
  strength: 'bg-[#F1FFFA] border-[#BFEFE0]',
}

const typeLabels = {
  weakness: 'WEAKNESS',
  moderate: 'MODERATE',
  strength: 'STRENGTH',
}

interface AutopsyPanelProps {
  autopsy: Autopsy
}

export function AutopsyPanel({
  autopsy,
}: AutopsyPanelProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-white bg-white/80 shadow-xl shadow-violet-200/25">
        <div className="p-7 md:p-8 border-b border-violet-100 bg-gradient-to-r from-[#FAF8FF] via-white to-[#F1FFFA]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A78C6]">
                <Crosshair size={14} /> Diagnostic findings
              </p>

              <h2 className="text-2xl font-extrabold tracking-tight text-[#201B46] mt-2">
                Content Autopsy
              </h2>
            </div>

            <div className="md:text-right">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#918AA9]">
                Top priority fix
              </p>

              <p className="inline-flex rounded-full bg-[#EEE9FF] px-3 py-1 text-sm font-bold text-[#665CF6] mt-1 max-w-md">
                {autopsy.top_priority_fix}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-3 md:p-4 bg-[#FCFBFF]">
          {autopsy.findings.map((finding, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 md:p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${typeStyles[finding.type]}`}
            >
              <div className="grid md:grid-cols-[110px_1fr] gap-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-[#776C8F]">
                    {finding.type === 'strength' ? <CheckCircle2 size={13} className="text-[#159570]" /> : <AlertTriangle size={13} className={finding.type === 'weakness' ? 'text-[#F065B7]' : 'text-[#C78800]'} />} {typeLabels[finding.type]}
                  </span>

                  <p className="text-[10px] font-mono text-gray-400 mt-2">
                    0{idx + 1}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#201B46]">
                    {finding.title}
                  </h3>

                  <p className="text-[#625C78] text-sm leading-7 mt-3">
                    {finding.evidence}
                  </p>

                  {finding.recommendation && (
                    <div className="mt-5 rounded-xl border border-white/80 bg-white/75 p-4">
                      <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-[#9A78C6]">
                        <Lightbulb size={13} className="text-[#F3A33B]" /> Recommendation
                      </p>

                      <p className="text-[#332B5D] text-sm leading-6 mt-2 font-bold">
                        {finding.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
