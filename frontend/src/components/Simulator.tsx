import { useState } from 'react'
import type { SimulationResult } from '../types'
import { simulateHook } from '../api'

function scoreColor(score: number) {
  if (score >= 80) return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
  if (score >= 60) return 'text-amber-400 border-amber-400/30 bg-amber-400/10'
  return 'text-rose-400 border-rose-400/30 bg-rose-400/10'
}

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
      setError(err instanceof Error ? err.message : 'Simulation failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-slate-900/50 backdrop-blur-sm p-6">
      <h2 className="text-white text-lg font-semibold">Counterfactual Simulator</h2>
      <p className="text-slate-500 text-sm mt-1">What if we change only the hook?</p>

      {error && <p className="text-rose-400 text-sm mt-3">{error}</p>}

      {!result && (
        <button
          onClick={run}
          disabled={loading}
          className="mt-4 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-emerald-400 text-slate-950 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Simulating...' : 'Simulate Better Hook'}
        </button>
      )}

      {result && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800">
              <p className="text-slate-500 text-xs uppercase tracking-wide">Original Hook</p>
              <p className="text-slate-300 text-sm mt-1">"{result.original_hook}"</p>
            </div>
            <div className="rounded-lg bg-slate-900/60 p-3 border border-emerald-500/20">
              <p className="text-emerald-400 text-xs uppercase tracking-wide">Simulated Hook</p>
              <p className="text-slate-200 text-sm mt-1">"{result.simulated_hook}"</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-lg font-bold px-3 py-1 rounded-full border ${scoreColor(result.original_overall_score)}`}>
              {result.original_overall_score}
            </span>
            <span className="text-slate-500">→</span>
            <span className={`text-lg font-bold px-3 py-1 rounded-full border ${scoreColor(result.simulated_overall_score)}`}>
              {result.simulated_overall_score}
            </span>
            <span className={`font-bold ${result.improvement >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {result.improvement >= 0 ? '+' : ''}{result.improvement}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}