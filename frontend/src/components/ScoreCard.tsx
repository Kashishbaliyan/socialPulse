import type { Scoring } from '../types'

function scoreColor(score: number) {
  if (score >= 80) return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
  if (score >= 60) return 'text-amber-400 border-amber-400/30 bg-amber-400/10'
  return 'text-rose-400 border-rose-400/30 bg-rose-400/10'
}

function ringColor(score: number) {
  if (score >= 80) return '#34d399'
  if (score >= 60) return '#fbbf24'
  return '#fb7185'
}

interface ScoreCardProps {
  scoring: Scoring
  extractionMethod: string
}

export function ScoreCard({ scoring, extractionMethod }: ScoreCardProps) {
  const { overall_score, dimensions } = scoring
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (overall_score / 100) * circumference

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 flex items-center gap-8">
        <div className="relative h-32 w-32 shrink-0">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={ringColor(overall_score)}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{overall_score}</span>
          </div>
        </div>
        <div>
          <h2 className="text-slate-400 text-sm uppercase tracking-wide font-medium">Overall Content Score</h2>
          <p className="text-white text-xl font-semibold mt-1">out of 100</p>
          <p className="text-slate-500 text-sm mt-2">Extracted via: {extractionMethod.replace(/_/g, ' ')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(dimensions).map(([key, d]) => (
          <div key={key} className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-200 font-semibold capitalize">{key}</h3>
              <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full border ${scoreColor(d.score)}`}>
                {d.score}
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{d.evidence}</p>
          </div>
        ))}
      </div>
    </div>
  )
}