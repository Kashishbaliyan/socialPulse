import { Sparkles } from 'lucide-react'
import { SocialOrbit } from './SocialOrbit'

interface HeroProps {
  onSampleRequested: () => void
}

export function Hero({ onSampleRequested }: HeroProps) {
  return (
    <section id="how" className="relative overflow-hidden bg-[#FBF9FF]">
      <div className="hero-glow hero-glow-pink" />
      <div className="hero-glow hero-glow-aqua" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-white/80 text-[#665CF6] text-xs font-bold mb-5 shadow-sm">
              <Sparkles size={13} /> Your creative co-pilot
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[58px] font-extrabold tracking-[-0.055em] leading-[1.02] text-[#201B46]">
              Make every post
              <span className="block gradient-text">
                impossible to scroll past.
              </span>
            </h1>

            <p className="text-[#687083] text-base md:text-lg leading-7 mt-6 max-w-xl">
              SocialPulse analyzes your posts to show what is working,
              what is holding them back, and exactly what you can improve.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#upload"
                className="inline-flex items-center gap-2 bg-[#5B5BD6] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#4E4EC2] transition-colors shadow-sm"
              >
                Analyze a post
                <span>→</span>
              </a>

              <button
                type="button"
                onClick={onSampleRequested}
                className="inline-flex items-center px-5 py-3 rounded-lg border border-[#D9DCE5] bg-white text-[#303442] text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Try a sample
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8 text-xs text-[#8991A2]">
              <span>✓ No signup required</span>
              <span>✓ PDF & image support</span>
            </div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="relative min-h-[500px] pb-10 flex items-center justify-center">
            <div className="absolute inset-0 opacity-90"><SocialOrbit /></div>

            {/* Browser / dashboard frame */}
            <div className="relative z-10 w-full bg-white/90 rounded-3xl border border-white shadow-[0_24px_70px_rgba(69,54,144,0.20)] overflow-hidden backdrop-blur-sm">

              {/* Top bar */}
              <div className="h-11 border-b border-[#ECEEF2] flex items-center px-4 gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4E6EC]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4E6EC]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4E6EC]" />

                <div className="ml-4 h-6 flex-1 max-w-xs rounded-md bg-[#F5F6F8]" />
              </div>

              <div className="grid md:grid-cols-[0.95fr_1.05fr]">

                {/* POST */}
                <div className="p-5 md:p-6 bg-[#FAFAFC] border-b md:border-b-0 md:border-r border-[#ECEEF2]">

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8991A2]">
                      Original post
                    </p>

                    <span className="text-[10px] text-[#8991A2]">
                      LinkedIn
                    </span>
                  </div>

                  <div className="bg-white rounded-xl border border-[#E4E6EC] overflow-hidden">

                    <div className="p-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#DCDDF8] flex items-center justify-center text-xs font-semibold text-[#5B5BD6]">
                        KB
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#20232D]">
                          Kashish Baliyan
                        </p>

                        <p className="text-[10px] text-[#9AA1AF] mt-0.5">
                          2h · Public
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <p className="text-xs md:text-sm leading-5 text-[#363A46]">
                        I spent the last few months building my first
                        real product.

                        <br />
                        <br />

                        Here are 5 things I learned that I wish someone
                        had told me before starting.
                      </p>

                      <div className="h-32 mt-4 rounded-lg bg-gradient-to-br from-[#E9E9FB] to-[#F2F2F8] flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-[#5B5BD6]">
                            5
                          </div>

                          <p className="text-[10px] text-[#8A90A0] mt-1">
                            Lessons learned
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 border-t border-[#F0F1F4] flex gap-5 text-[10px] text-[#8A90A0]">
                      <span>♡ 243</span>
                      <span>◯ 18</span>
                      <span>↗ 12</span>
                    </div>
                  </div>
                </div>

                {/* ANALYSIS */}
                <div className="p-5 md:p-6">

                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-sm font-semibold text-[#20232D]">
                        Content analysis
                      </p>

                      <p className="text-[10px] text-[#9299A8] mt-1">
                        Performance breakdown
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-[#EAF8F3] text-[#159570] text-[10px] font-semibold">
                      Good
                    </span>
                  </div>

                  {/* SCORE */}
                  <div className="rounded-xl bg-[#F8F8FC] border border-[#ECEEF5] p-4 flex items-center justify-between">

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#8991A2]">
                        Overall score
                      </p>

                      <p className="text-3xl font-semibold text-[#171A24] mt-1">
                        82
                        <span className="text-xs font-normal text-[#9AA1AF]">
                          /100
                        </span>
                      </p>
                    </div>

                    <div className="relative h-14 w-14">
                      <svg
                        viewBox="0 0 60 60"
                        className="h-14 w-14 -rotate-90"
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke="#E6E7EE"
                          strokeWidth="6"
                        />

                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke="#5B5BD6"
                          strokeWidth="6"
                          strokeDasharray="123 151"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* DIMENSIONS */}
                  <div className="mt-5 space-y-4">

                    {[
                      ['Hook', 90],
                      ['Clarity', 78],
                      ['CTA', 74],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-[#505666]">
                            {label}
                          </span>

                          <span className="text-xs font-semibold text-[#252833]">
                            {value}
                          </span>
                        </div>

                        <div className="h-1.5 rounded-full bg-[#ECEEF3] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#5B5BD6]"
                            style={{
                              width: `${value}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* INSIGHT */}
                  <div className="mt-5 p-3.5 rounded-lg border border-[#E8E9F0] bg-white">
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#EEEEFF] flex items-center justify-center text-[#5B5BD6] text-[10px]">
                        ✦
                      </span>

                      <p className="text-xs font-semibold text-[#282B35]">
                        Main opportunity
                      </p>
                    </div>

                    <p className="text-[11px] leading-5 text-[#737A89] mt-2">
                      Your hook creates curiosity, but the CTA could give
                      readers a stronger reason to respond.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING MINI CARD */}
            <div className="absolute z-20 bottom-2 left-2 md:-left-8 bg-white border border-[#E1E3EA] shadow-lg rounded-2xl px-4 py-3 pulse-card">
              <p className="text-[10px] text-[#8991A2]">
                Suggested improvement
              </p>

              <p className="text-xs font-semibold text-[#252833] mt-1">
                Stronger CTA
              </p>

              <p className="text-[10px] text-[#159570] mt-1">
                +8 predicted points
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
