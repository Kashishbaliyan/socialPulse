import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { FileImage, Images, UploadCloud } from 'lucide-react'

interface UploadZoneProps {
  onFileSelected: (file: File) => void
}

export function UploadZone({ onFileSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [loadingSample, setLoadingSample] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]

    if (file) {
      onFileSelected(file)
    }
  }

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      onFileSelected(file)
    }
  }

  const trySample = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setLoadingSample(true)

    try {
      const response = await fetch('/weak_post_example.png')
      const blob = await response.blob()

      const file = new File(
        [blob],
        'weak_post_example.png',
        { type: 'image/png' }
      )

      onFileSelected(file)
    } catch {
      // App-level error handling remains responsible for upload failures.
    } finally {
      setLoadingSample(false)
    }
  }

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`
          group relative min-h-[360px] md:min-h-[430px]
          rounded-3xl border
          flex flex-col items-center justify-center
          text-center cursor-pointer
          px-8 py-16
          transition-all duration-300
          ${
            isDragging
              ? 'border-[#665CF6] bg-[#F0EDFF] scale-[0.99] shadow-[0_0_0_8px_rgba(118,103,255,0.12)]'
              : 'border-white bg-white/85 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-violet-200/60'
          }
        `}
      >
        <div className="absolute top-6 left-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
          Your next hit
        </div>

        <div className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
          PDF · PNG · JPG
        </div>

        <div
          className={`
            h-20 w-20 rounded-full
            bg-gradient-to-br from-[#665CF6] to-[#F065B7] text-white shadow-xl shadow-violet-300/50
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-105
            ${isDragging ? 'scale-105' : ''}
          `}
        >
          {isDragging ? <Images className="h-9 w-9" /> : <UploadCloud className="h-9 w-9" />}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg> */}
        </div>

        <h2 className="mt-8 text-2xl md:text-3xl font-extrabold tracking-tight text-[#201B46]">
          {isDragging ? 'Drop it here' : 'Upload your content'}
        </h2>

        <p className="text-[#706A85] text-sm md:text-base mt-3 max-w-md leading-6">
          Drag and drop your post here, or click anywhere to browse your files.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#201B46] text-white text-sm font-semibold">
          <FileImage size={16} /> Choose file
          <span>→</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={onFileInputChange}
          className="hidden"
        />
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={trySample}
          disabled={loadingSample}
          className="text-sm text-black border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-400 transition-colors disabled:opacity-40"
        >
          {loadingSample
            ? 'Loading sample...'
            : "Don't have a file? Try a sample post →"}
        </button>
      </div>
    </div>
  )
}
