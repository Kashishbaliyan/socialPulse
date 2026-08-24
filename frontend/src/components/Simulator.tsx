import { useState } from 'react'
import { Sparkles, TrendingUp } from 'lucide-react'
import type { SimulationResult } from '../types'
import { simulateHook } from '../api'

interface SimulatorProps {
  text: string
}

export function Simulator({ text }: SimulatorProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await simulateHook(text)
      setResult(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Simulation failed.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#201B46] text-white shadow-2xl shadow-violet-300/40">
      <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#F065B7]/30 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-[#31D9C2]/20 blur-3xl" />
      <div className="relative p-7 md:p-9">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#BDB4FF]">
              <Sparkles size={13} /> What-if analysis
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
              Counterfactual Simulator
            </h2>

            <p className="text-[#D3CFF0] text-sm leading-6 mt-3 max-w-lg">
              Rewrite only the hook and see how the predicted content
              performance changes.
            </p>
          </div>

          {!result && (
            <button
              onClick={run}
              disabled={loading}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF8EC7] to-[#A989FF] text-[#201B46] text-sm font-extrabold shadow-lg shadow-fuchsia-900/30 hover:-translate-y-1 transition disabled:opacity-40"
            >
              {loading
                ? 'Simulating...'
                : 'Simulate Better Hook →'}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6 border border-white/20 rounded-xl px-4 py-3">
            <p className="text-sm text-gray-300">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#BDB4FF]">
                  Original hook
                </p>

                <p className="text-[#E7E4F8] text-sm leading-6 mt-4">
                  "{result.original_hook}"
                </p>

                <div className="mt-6">
                  <p className="text-3xl font-bold">
                    {result.original_overall_score}
                  </p>

                  <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mt-1">
                    Original score
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#FFF6FB] to-[#E9FFFF] text-[#201B46] p-6 shadow-xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#85799E]">
                  Simulated hook
                </p>

                <p className="text-[#332B5D] text-sm leading-6 mt-4 font-bold">
                  "{result.simulated_hook}"
                </p>

                <div className="mt-6">
                  <p className="text-3xl font-bold">
                    {result.simulated_overall_score}
                  </p>

                  <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mt-1">
                    Simulated score
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[#D3CFF0] text-sm">
                <TrendingUp size={16} className="text-[#31D9C2]" />
                Predicted change
              </span>

              <span className="text-3xl font-bold">
                {result.improvement >= 0 ? '+' : ''}
                {result.improvement}
              </span>

              <span className="text-[#BDB4FF] text-sm">
                points
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
