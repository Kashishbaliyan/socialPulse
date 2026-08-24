import { Activity, Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FBF9FF]/80 backdrop-blur-xl border-b border-white/60">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        {/* BRAND */}
        <a
          href="#how"
          className="flex items-center gap-2.5"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#665CF6] to-[#B05DF5] flex items-center justify-center shadow-lg shadow-violet-300/50">
            <Activity size={19} strokeWidth={2.5} className="text-white" />
            {/*
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2 10H5L7 5L9.5 15L12 7L14 11H18"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </div>

          <span className="text-[15px] font-extrabold tracking-tight text-[#201B46]">
            SocialPulse
          </span>
        </a>

        {/* NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#how"
            className="text-sm text-[#687083] hover:text-[#171A24] transition-colors"
          >
            Overview
          </a>

          <a
            href="#upload"
            className="text-sm text-[#687083] hover:text-[#171A24] transition-colors"
          >
            Analyze
          </a>

          <a
            href="#how"
            className="text-sm text-[#687083] hover:text-[#171A24] transition-colors"
          >
            How it works
          </a>

        </div>

        {/* CTA */}
        <a
          href="#upload"
          className="inline-flex items-center gap-2 bg-[#201B46] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:-translate-y-0.5 hover:bg-[#665CF6] transition shadow-lg"
        >
          <Sparkles size={15} /> Try it free
        </a>
      </div>
    </nav>
  )
}
