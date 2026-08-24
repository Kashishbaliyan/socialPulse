import { useState } from 'react'
import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { UploadZone } from './components/UploadZone'
import { ScoreCard } from './components/ScoreCard'
import { AutopsyPanel } from './components/AutopsyPanel'
import { Simulator } from './components/Simulator'
import { DNAProfile } from './components/DNAProfile'
import type { UploadResult } from './types'
import { uploadFile } from './api'

type Stage = 'upload' | 'processing' | 'results'

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#7B8393]">
        {eyebrow}
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#171A24] mt-2">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-[#737B8B] mt-2 max-w-xl leading-6">
          {description}
        </p>
      )}
    </div>
  )
}

function App() {
  const [stage, setStage] = useState<Stage>('upload')
  const [result, setResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSample = async () => {
    setError(null)
    setStage('processing')

    try {
      const response = await fetch('/weak_post_example.png')

      if (!response.ok) {
        throw new Error('Could not load the sample post.')
      }

      const blob = await response.blob()
      const file = new File([blob], 'weak_post_example.png', {
        type: 'image/png',
      })

      const data = await uploadFile(file)
      setResult(data)
      setStage('results')

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Sample analysis failed. Please try again.'
      )

      setStage('upload')
    }
  }

  const handleFile = async (file: File) => {
    setError(null)
    setStage('processing')

    try {
      const data = await uploadFile(file)

      setResult(data)
      setStage('results')

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Upload failed. Please try again.'
      )

      setStage('upload')
    }
  }

  const reset = () => {
    setStage('upload')
    setResult(null)
    setError(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen app-background text-[#201B46]">
      <Navbar />

      {stage === 'upload' && (
        <>
          <Hero onSampleRequested={handleSample} />

          <section
            id="upload"
            className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20"
          >
            <SectionHeader
              eyebrow="Analyze a post"
              title="See what your content is doing"
              description="Upload a screenshot, image, or PDF of your post and SocialPulse will break it down."
            />

            <UploadZone
              onFileSelected={handleFile}
            />

            {error && (
              <div className="mt-5 rounded-lg border border-[#F0C7C7] bg-[#FFF7F7] px-5 py-4">
                <p className="text-sm text-[#B33A3A]">
                  {error}
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {stage === 'processing' && (
        <main className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="text-center">

            <div className="mx-auto h-12 w-12 rounded-full border-[3px] border-[#E2E3EC] border-t-[#5B5BD6] animate-spin" />

            <h2 className="mt-6 text-xl font-semibold text-[#20232D]">
              Analyzing your post
            </h2>

            <p className="mt-2 text-sm text-[#7B8393]">
              Looking at your hook, clarity, CTA, and readability.
            </p>
          </div>
        </main>
      )}

      {stage === 'results' && result && (
        <main className="relative max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

            <div>
              <p className="inline-flex rounded-full bg-[#EEEAFF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#665CF6]">
                Analysis complete ✦
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#201B46] mt-3">
                Your content report
              </h1>

              <p className="text-sm text-[#7B8393] mt-1 truncate max-w-md">
                {result.filename}
              </p>
            </div>

            <button
              onClick={reset}
              className="self-start md:self-auto px-4 py-2 rounded-xl border border-violet-100 bg-white/80 text-sm font-bold text-[#554E72] hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              ← Analyze another post
            </button>
          </div>

          <div className="space-y-8">

            <section>
              <SectionHeader
                eyebrow="01 · Performance"
                title="How your content scores"
              />

              <ScoreCard
                scoring={result.scoring}
                extractionMethod={result.extraction_method}
              />
            </section>

            <section>
              <SectionHeader
                eyebrow="02 · Content DNA"
                title="What your post communicates"
              />

              <DNAProfile
                dna={result.content_dna}
              />
            </section>

            <section>
              <SectionHeader
                eyebrow="03 · Autopsy"
                title="What is helping and hurting"
              />

              <AutopsyPanel
                autopsy={result.autopsy}
              />
            </section>

            <section>
              <SectionHeader
                eyebrow="04 · Simulation"
                title="Test a stronger version"
                description="See what could happen if the most important weakness were improved."
              />

              <Simulator
                text={result.extracted_text}
              />
            </section>

          </div>

          <footer className="mt-16 pt-6 border-t border-[#E1E3EA] flex justify-between text-xs text-[#8A91A0]">
            <span>SocialPulse</span>
            <span>Content intelligence</span>
          </footer>
        </main>
      )}
    </div>
  )
}

export default App
