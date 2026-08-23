import type { Autopsy } from '../types'

const typeStyles = {
  weakness: 'border-rose-500/30 bg-rose-500/5',
  moderate: 'border-amber-500/30 bg-amber-500/5',
  strength: 'border-emerald-500/30 bg-emerald-500/5',
}

const typeLabelStyles = {
  weakness: 'text-rose-400',
  moderate: 'text-amber-400',
  strength: 'text-emerald-400',
}

interface AutopsyPanelProps {
  autopsy: Autopsy
}

export function AutopsyPanel({ autopsy }: AutopsyPanelProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Content Autopsy</h2>
        <p className="text-slate-500 text-sm">
          Top priority fix: <span className="text-slate-200 font-medium">{autopsy.top_priority_fix}</span>
        </p>
      </div>

      <div className="space-y-3">
        {autopsy.findings.map((f, idx) => (
          <div key={idx} className={`rounded-xl border p-4 ${typeStyles[f.type]}`}>
            <p className={`font-semibold ${typeLabelStyles[f.type]}`}>{f.title}</p>
            <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{f.evidence}</p>
            {f.recommendation && (
              <p className="text-slate-300 text-sm mt-2 italic">→ {f.recommendation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}