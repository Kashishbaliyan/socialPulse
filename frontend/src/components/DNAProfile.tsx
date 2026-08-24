import type { ContentDNA } from '../types'

interface DNAProfileProps {
  dna?: ContentDNA
}

const fields: { key: keyof ContentDNA; label: string }[] = [
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
      <h2 className="text-white text-lg font-semibold mb-4">Content DNA</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <p className="text-slate-500 text-xs uppercase tracking-wide">{label}</p>
            <p className="text-slate-200 text-sm font-medium mt-0.5">
              {dna[key] || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}