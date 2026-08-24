export interface DimensionScore {
  score: number
  evidence: string
}

export interface Scoring {
  overall_score: number
  dimensions: {
    hook: DimensionScore
    clarity: DimensionScore
    cta: DimensionScore
    readability: DimensionScore
  }
}

export interface Finding {
  type: 'strength' | 'weakness' | 'moderate'
  dimension: string
  score: number
  title: string
  evidence: string
  recommendation: string | null
}

export interface Autopsy {
  overall_score: number
  findings: Finding[]
  top_priority_fix: string
}

export interface ContentDNA {
  purpose: string
  topic: string
  content_type: string
  tone: string
  emotion: string
  audience: string
  structure: string
  complexity: string
}

export interface UploadResult {
  filename: string
  extraction_method: string
  extracted_text: string
  scoring: Scoring
  autopsy: Autopsy
  content_dna: ContentDNA
}

export interface SimulationResult {
  original_hook: string
  simulated_hook: string
  original_overall_score: number
  simulated_overall_score: number
  improvement: number
  dimension_deltas: Record<string, number>
}