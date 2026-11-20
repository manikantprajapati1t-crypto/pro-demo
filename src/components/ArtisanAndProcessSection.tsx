import React, { useEffect, useRef, useState } from 'react';
import {
  Quote,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Hammer,
  Flame,
  Feather,
  Award,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BrandConfig,
  MAKING_PROCESS_STAGES,
} from '../config/brandConfig';

gsap.registerPlugin(ScrollTrigger);

interface ArtisanAndProcessSectionProps {
  brand: BrandConfig;
  onExploreArtisanWorks: () => void;
}

export const ArtisanAndProcessSection: React.FC<
  ArtisanAndProcessSectionProps
> = ({ brand, onExploreArtisanWorks }) => {
  const artisanSectionRef = useRef<HTMLElement>(null);
  const processSectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const artisanProfiles = [
    {
      name: 'Ustad Budhram Baghel',
      craft: 'Bastar Lost-Wax Dhokra Bronze',
      region: 'Kondagaon, Chhattisgarh',
      years: '38 Years of Mastery',
      quote:
        'When we break the baked riverbed clay mould, no two sculptures can ever be born alike. The fire and the beeswax decide the final breath of the bronze.',
      image: 'images/artisan-master.jpg',
    },
    {
      name: 'Haji Maqbool Ansari',
      craft: 'Kadhwa Pit-Loom Silk & Zari Brocade',
      region: 'Madanpura, Varanasi',
      years: '4th Generation Master Weaver',
      quote:
        'Our wooden shuttle carries memory across 5,000 warp threads. A single ceremonial throw takes forty mornings of quiet rhythm between two weavers.',
      image: 'images/cat-textiles.jpg',
    },
    {
      name: 'Ghulam Nabi Khan',
      craft: 'Kashmir Walnut Wood Naqashi & Pinjra',
      region: 'Downtown Srinagar, Kashmir',
      years: '44 Years of Chisel Work',
      quote:
        'We wait seven winters for fallen walnut timber to season in the mountain air before our smallest kalam chisel touches its grain.',
      image: 'https://images.pexels.com/photos/37870822/pexels-photo-37870822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  ];

  const [selectedArtisanIdx, setSelectedArtisanIdx] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-artisan-reveal',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: artisanSectionRef.current,
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-process-step',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: 'top 78%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const currentArtisan = artisanProfiles[selectedArtisanIdx];

  return (
    <>
      {/* ============================================================
          SECTION D — THE ARTISAN STORY
          Deep Forest Green (#183C32) Immersive Storytelling Chapter
      ============================================================ */}
      <section
        id="artisan-story"
        ref={artisanSectionRef}
        className="relative overflow-hidden bg-[#183C32] text-[#F5F0E6] py-24 sm:py-32 lg:py-36"
      >
        {/* Warm Terracotta Ambient Glow */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-[550px] w-[550px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(188,104,71,0.75) 0%, rgba(24,60,50,0) 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          {/* Top Eyebrow & Required Headline */}
          <div className="max-w-4xl mb-16">
            <div className="gsap-artisan-reveal inline-flex items-center gap-2.5 rounded-full border border-[#BC6847]/45 bg-[#BC6847]/15 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-[#BC6847] font-semibold mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Section IV • Living Human Heritage</span>
            </div>

            <h2 className="gsap-artisan-reveal font-editorial text-4xl sm:text-6xl lg:text-[68px] font-normal leading-[1.06] tracking-[-0.015em] text-[#F5F0E6]">
              {brand.artisanHeadline}
            </h2>
          </div>

          {/* Layered Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left 7 Columns: Large Layered Photography */}
            <div className="lg:col-span-7 relative">
              <div className="gsap-artisan-reveal relative grid grid-cols-12 gap-4 items-center">
                {/* Primary Large Portrait */}
                <div className="col-span-12 sm:col-span-8 relative overflow-hidden rounded-2xl border border-[#F5F0E6]/15 shadow-2xl bg-[#112B23]">
                  <img
                    src={currentArtisan.image}
                    alt={currentArtisan.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'images/artisan-master.jpg';
                    }}
                    className="aspect-[4/5] w-full object-cover object-center transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#183C32] via-transparent to-transparent opacity-85" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#BC6847] font-semibold">
                      <MapPin className="h-3.5 w-3.5" />
                      {currentArtisan.region}
                    </span>
                    <h3 className="font-editorial text-3xl text-[#F5F0E6] mt-1">
                      {currentArtisan.name}
                    </h3>
                    <p className="text-xs text-[#F5F0E6]/80 mt-0.5">
                      {currentArtisan.craft} • {currentArtisan.years}
                    </p>
                  </div>
                </div>

                {/* Secondary Layered Workshop Snapshots */}
                <div className="col-span-12 sm:col-span-4 grid grid-cols-2 sm:grid-cols-1 gap-4">
                  <div className="overflow-hidden rounded-2xl border border-[#F5F0E6]/15 bg-[#112B23] shadow-xl">
                    <img
                      src="https://images.pexels.com/photos/33878963/pexels-photo-33878963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="Artisan hands shaping clay vessel on traditional wheel"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'images/cat-pottery.jpg';
                      }}
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="p-3 bg-[#112B23]">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847]">
                        Tactile Precision
                      </p>
                      <p className="text-xs text-[#F5F0E6]/85 mt-0.5">
                        Zero Industrial Moulds
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-[#F5F0E6]/15 bg-[#112B23] shadow-xl">
                    <img
                      src="https://images.pexels.com/photos/28389703/pexels-photo-28389703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="Detailed view of artisan carving a wooden block in Jaipur"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'images/cat-wood.jpg';
                      }}
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="p-3 bg-[#112B23]">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#BC6847]">
                        Sanganer & Jaipur
                      </p>
                      <p className="text-xs text-[#F5F0E6]/85 mt-0.5">
                        Hand-Chiseled Teak Blocks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Emotional Storytelling & Guild Switcher */}
            <div className="lg:col-span-5 space-y-6">
              <div className="gsap-artisan-reveal rounded-2xl border border-[#BC6847]/40 bg-[#112B23]/90 p-6 sm:p-8 shadow-xl">
                <Quote className="h-8 w-8 text-[#BC6847] mb-4 opacity-80" />
                <blockquote className="font-editorial text-2xl sm:text-3xl italic font-normal leading-relaxed text-[#F5F0E6]">
                  “{currentArtisan.quote}”
                </blockquote>
                <div className="mt-5 pt-4 border-t border-[#F5F0E6]/15 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#F5F0E6]">
                      {currentArtisan.name}
                    </p>
                    <p className="text-xs text-[#BC6847]">{currentArtisan.craft}</p>
                  </div>
                  <span className="rounded-full border border-[#F5F0E6]/20 px-3 py-1 font-mono-num text-[10px] uppercase tracking-widest text-[#F5F0E6]/80">
                    Master Guild
                  </span>
                </div>
              </div>

              {/* Interactive Master Artisan Switcher Tabs */}
              <div className="gsap-artisan-reveal space-y-2.5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#BC6847] font-semibold">
                  Meet Our Featured Guild Masters:
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {artisanProfiles.map((art, idx) => {
                    const active = selectedArtisanIdx === idx;
                    return (
                      <button
                        key={art.name}
                        type="button"
                        onClick={() => setSelectedArtisanIdx(idx)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all cursor-pointer ${
                          active
                            ? 'border-[#BC6847] bg-[#BC6847] text-[#F5F0E6] shadow-md'
                            : 'border-[#F5F0E6]/15 bg-[#112B23]/50 text-[#F5F0E6]/80 hover:border-[#BC6847]/60'
                        }`}
                      >
                        <div>
                          <p className="font-editorial text-lg font-medium leading-none">
                            {art.name}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              active ? 'text-[#F5F0E6]/90' : 'text-[#BC6847]'
                            }`}
                          >
                            {art.craft} • {art.region}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="gsap-artisan-reveal pt-2">
                <button
                  type="button"
                  onClick={onExploreArtisanWorks}
                  className="inline-flex items-center gap-3 rounded-full bg-[#F5F0E6] px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#183C32] hover:bg-[#BC6847] hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  <span>Collect Artisan-Signed Works</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION E — THE MAKING PROCESS
          Four Animated Stages: Design → Materials → Craftsmanship → Masterpiece
      ============================================================ */}
      <section
        id="making-process"
        ref={processSectionRef}
        className="relative bg-[#F5F0E6] text-[#183C32] py-24 sm:py-32 border-b border-[#183C32]/12"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#BC6847] font-semibold mb-3">
              Section V • The Alchemy of Creation
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#183C32]">
              From Raw Earth to{' '}
              <span className="italic text-[#BC6847]">Timeless Masterpiece.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#183C32]/75 leading-relaxed">
              Follow the four sacred stages that transform natural mineral, timber,
              and silk into signed heirlooms.
            </p>
          </div>

          {/* Interactive 4-Stage Horizontal Timeline Progress Header */}
          <div className="relative mb-14">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 bg-[#183C32]/15 z-0" />
            <div
              className="hidden md:block absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#BC6847] z-0 transition-all duration-500"
              style={{
                width: `${((activeStage + 1) / MAKING_PROCESS_STAGES.length) * 100}%`,
              }}
            />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {MAKING_PROCESS_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isCompleted = idx <= activeStage;
                const StageIcon =
                  idx === 0
                    ? Feather
                    : idx === 1
                    ? Flame
                    : idx === 2
                    ? Hammer
                    : Award;

                return (
                  <button
                    key={stage.stepNumber}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`gsap-process-step group flex flex-col items-start sm:items-center text-left sm:text-center rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#BC6847] bg-[#183C32] text-[#F5F0E6] shadow-xl -translate-y-1'
                        : isCompleted
                        ? 'border-[#BC6847]/50 bg-[#EBE3D5] text-[#183C32]'
                        : 'border-[#183C32]/15 bg-[#F5F0E6] text-[#183C32]/75 hover:border-[#BC6847]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full font-mono-num text-xs font-semibold ${
                          isActive
                            ? 'bg-[#BC6847] text-[#F5F0E6]'
                            : 'bg-[#183C32]/10 text-[#BC6847]'
                        }`}
                      >
                        {stage.stepNumber}
                      </span>
                      <StageIcon className="h-4 w-4 text-[#BC6847]" />
                    </div>
                    <p className="font-editorial text-2xl font-semibold">
                      {stage.stageTitle}
                    </p>
                    <p
                      className={`text-[10px] uppercase tracking-[0.16em] mt-1 ${
                        isActive ? 'text-[#BC6847]' : 'text-[#183C32]/60'
                      }`}
                    >
                      {stage.sanskritTerm}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Spotlight Card + All 4 Stage Cards Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl border border-[#183C32]/15 bg-[#EBE3D5]/65 p-6 sm:p-10 lg:p-12 shadow-lg">
            {/* Stage Image */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-[#183C32]/15 bg-[#183C32] relative aspect-[16/11]">
              <img
                src={MAKING_PROCESS_STAGES[activeStage].image}
                alt={MAKING_PROCESS_STAGES[activeStage].headline}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    MAKING_PROCESS_STAGES[activeStage].fallbackImage;
                }}
                className="h-full w-full object-cover object-center transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183C32]/85 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 rounded-full bg-[#BC6847] px-4 py-1.5 text-[10px] font-mono-num uppercase tracking-[0.18em] font-semibold text-[#F5F0E6]">
                Stage {MAKING_PROCESS_STAGES[activeStage].stepNumber} •{' '}
                {MAKING_PROCESS_STAGES[activeStage].stageTitle}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-[#F5F0E6]">
                <p className="text-xs uppercase tracking-[0.18em] text-[#BC6847]">
                  {MAKING_PROCESS_STAGES[activeStage].durationNote}
                </p>
              </div>
            </div>

            {/* Stage Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#BC6847] font-semibold">
                <span>
                  {MAKING_PROCESS_STAGES[activeStage].stepNumber} / 04 —{' '}
                  {MAKING_PROCESS_STAGES[activeStage].sanskritTerm}
                </span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#183C32] leading-tight">
                {MAKING_PROCESS_STAGES[activeStage].headline}
              </h3>

              <p className="text-base text-[#183C32]/80 leading-relaxed">
                {MAKING_PROCESS_STAGES[activeStage].description}
              </p>

              <ul className="space-y-2.5 pt-2">
                {MAKING_PROCESS_STAGES[activeStage].highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#183C32]/85"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#BC6847] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Prev / Next Stage Navigation */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStage((prev) =>
                      prev === 0 ? MAKING_PROCESS_STAGES.length - 1 : prev - 1
                    )
                  }
                  className="rounded-full border border-[#183C32]/25 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium text-[#183C32] hover:bg-[#183C32] hover:text-[#F5F0E6] transition-colors cursor-pointer"
                >
                  Previous Stage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStage(
                      (prev) => (prev + 1) % MAKING_PROCESS_STAGES.length
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#BC6847] px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#F5F0E6] hover:bg-[#183C32] transition-colors cursor-pointer"
                >
                  <span>
                    Next:{' '}
                    {
                      MAKING_PROCESS_STAGES[
                        (activeStage + 1) % MAKING_PROCESS_STAGES.length
                      ].stageTitle
                    }
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
