import { useState } from 'react'
import { UploadZone } from './components/UploadZone'
import { ScoreCard } from './components/ScoreCard'
import { AutopsyPanel } from './components/AutopsyPanel'
import { Simulator } from './components/Simulator'
import type { UploadResult } from './types'
import { uploadFile } from './api'

type Stage = 'upload' | 'processing' | 'results'

function App() {
  const [stage, setStage] = useState<Stage>('upload')
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setError(null)
    setStage('processing')
    try {
      const data = await uploadFile(file)
      setResult(data)
      setStage('results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
      setStage('upload')
    }
  }

  const reset = () => {
    setStage('upload')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
            SocialPulse
          </h1>
          <p className="text-slate-500 mt-2">AI Content Intelligence & Counterfactual Optimization</p>
        </header>

        {stage === 'upload' && <UploadZone onFileSelected={handleFile} />}

        {error && <p className="text-rose-400 mt-4 text-sm">{error}</p>}

        {stage === 'processing' && (
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400">Analyzing your content...</p>
          </div>
        )}

        {stage === 'results' && result && (
          <div className="space-y-8">
            <button onClick={reset} className="text-slate-400 hover:text-white text-sm transition-colors">
              ← Analyze another file
            </button>
            <ScoreCard scoring={result.scoring} extractionMethod={result.extraction_method} />
            <AutopsyPanel autopsy={result.autopsy} />
            <Simulator text={result.extracted_text} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App