import { Sparkles, TrendingUp } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Scoring } from '../types'

interface ScoreCardProps {
  scoring: Scoring
  extractionMethod: string
}

export function ScoreCard({
  scoring,
  extractionMethod,
}: ScoreCardProps) {
  const { overall_score, dimensions } = scoring

  const circumference = 2 * Math.PI * 54
  const offset =
    circumference - (overall_score / 100) * circumference
  const scoreTone = overall_score >= 75 ? 'text-[#159570]' : overall_score >= 50 ? 'text-[#665CF6]' : 'text-[#F065B7]'

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-white bg-gradient-to-br from-white via-[#FAF8FF] to-[#EAFBF8] p-7 md:p-10 shadow-xl shadow-violet-200/30">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D8D1FF]/50 blur-3xl" />
        <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
          <div className="relative h-36 w-36 shrink-0 rounded-full bg-white/80 p-2 shadow-lg shadow-violet-200/40">
            <svg
              className="h-36 w-36 -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#EAE7F5"
                strokeWidth="8"
              />

              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
                className="score-ring"
                style={{ '--score-offset': offset } as CSSProperties}
              />
              <defs><linearGradient id="scoreGradient" x1="0" x2="1"><stop stopColor="#665CF6" /><stop offset="1" stopColor="#F065B7" /></linearGradient></defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-extrabold tracking-tight text-[#201B46]">
                {overall_score}
              </span>
            </div>
          </div>

          <div>
            <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#665CF6]">
              <Sparkles size={13} /> Overall score
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#201B46] mt-2">
              Content performance
            </h2>

            <p className="text-[#706A85] text-sm mt-3">
              Your content scored{' '}
              <span className={`${scoreTone} font-extrabold`}>
                {overall_score}/100
              </span>{' '}
              across four diagnostic dimensions.
            </p>

            <p className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#918AA9] mt-5">
              <TrendingUp size={13} /> Extracted via: {extractionMethod.replace(/_/g, ' ')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(dimensions).map(([key, dimension]) => (
          <div
            key={key}
            className="group rounded-2xl border border-white bg-white/85 p-6 md:p-7 shadow-lg shadow-violet-100/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#918AA9]">
                  Dimension
                </p>

                <h3 className="text-lg font-extrabold capitalize mt-2 text-[#201B46]">
                  {key}
                </h3>
              </div>

              <span className="shrink-0 h-10 min-w-10 px-2 rounded-full bg-[#F1EEFF] text-[#665CF6] flex items-center justify-center text-sm font-extrabold transition group-hover:scale-110">
                {dimension.score}
              </span>
            </div>

            <div className="mt-6">
              <div className="h-2 bg-[#EEEAF7] rounded-full overflow-hidden">
                <div
                  className="score-bar h-full rounded-full bg-gradient-to-r from-[#665CF6] via-[#9B65EE] to-[#F065B7]"
                  style={{ '--progress': dimension.score / 100 } as CSSProperties}
                />
              </div>

              <p className="text-[#706A85] text-sm leading-6 mt-5">
                {dimension.evidence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
