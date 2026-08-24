import { BrainCircuit, Sparkles } from 'lucide-react'
import type { ContentDNA } from '../types'

interface DNAProfileProps {
  dna?: ContentDNA
}

const fields: {
  key: keyof ContentDNA
  label: string
}[] = [
  { key: 'purpose', label: 'Purpose' },
  { key: 'topic', label: 'Topic' },
  { key: 'content_type', label: 'Content Type' },
  { key: 'tone', label: 'Tone' },
  { key: 'emotion', label: 'Emotion' },
  { key: 'audience', label: 'Audience' },
  { key: 'structure', label: 'Structure' },
  { key: 'complexity', label: 'Complexity' },
]

export function DNAProfile({ dna }: DNAProfileProps) {
  if (!dna) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white bg-white/80 shadow-xl shadow-violet-200/25">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFD5EA]/50 blur-3xl" />
      <div className="relative p-7 md:p-8 border-b border-violet-100">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A78C6]">
          <BrainCircuit size={14} /> Content profile
        </p>

        <h2 className="text-2xl font-extrabold tracking-tight text-[#201B46] mt-2">
          Content DNA
        </h2>

        <p className="text-sm text-[#706A85] mt-2 max-w-xl">
          A structured profile of what your content is communicating,
          who it targets, and how it is constructed.
        </p>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 p-3 md:p-4">
        {fields.map(({ key, label }) => (
          <div
            key={key}
            className="group min-h-[126px] rounded-2xl bg-gradient-to-br from-[#FBFAFF] to-white p-5 md:p-6 ring-1 ring-[#F0ECFA] transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100"
          >
            <p className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#918AA9]">
              <Sparkles size={12} className="text-[#F065B7]" /> {label}
            </p>

            <p className="text-sm md:text-base font-bold leading-6 mt-3 break-words text-[#332B5D]">
              {dna[key] || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
