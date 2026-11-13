"use client";

import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type QuickLink = {
  label: string;
  bg: string;
  icon: ReactNode;
  badge?: string;
  badgeBg?: string;
  labelMaxW?: string;
};

const svgProps = {
  className: "size-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
};

const quickLinks: QuickLink[] = [
  {
    label: "اشتراک پلاس",
    bg: "bg-[#b12ba4]",
    badge: "۷۰٪ تخفیف",
    badgeBg: "bg-[#b12ba4]",
    icon: (
      <svg {...svgProps}>
        <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
      </svg>
    ),
  },
  {
    label: "وام بانکی، اعتبار خرید",
    bg: "bg-[#0040ff]",
    labelMaxW: "max-w-20",
    icon: (
      <svg {...svgProps} strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    ),
  },
  {
    label: "دیجی‌کوین",
    bg: "bg-[#e5a024]",
    icon: (
      <div className="flex size-9 items-center justify-center rounded-full border-2 border-white/80">
        <span className="text-xs font-bold">C</span>
      </div>
    ),
  },
  {
    label: "دیجی‌استایل",
    bg: "bg-[#1b1b1b]",
    badge: "اورجینال",
    badgeBg: "bg-[#ef4056]",
    icon: <span className="text-sm font-semibold tracking-widest">DS</span>,
  },
  {
    label: "طلا و نقره دیجیتال",
    bg: "bg-[#0b5c4a]",
    badge: "با پشتوانه طلا",
    badgeBg: "bg-[#ef4056]",
    icon: (
      <svg {...svgProps} strokeWidth={1.8}>
        <circle cx="12" cy="8" r="3" />
        <circle cx="8" cy="15" r="3" />
        <circle cx="16" cy="15" r="3" />
      </svg>
    ),
  },
  {
    label: "سوپرمارکت",
    bg: "bg-[#ff6600]",
    badge: "پرتخفیف",
    badgeBg: "bg-[#ef4056]",
    icon: (
      <svg {...svgProps}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    label: "در دیجی‌کالا بفروش",
    bg: "bg-[#19bfd3]",
    icon: (
      <svg {...svgProps}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "دیجی‌کارت",
    bg: "bg-[#111111]",
    icon: <span className="text-[9px] font-bold tracking-tight">digicard</span>,
  },
  {
    label: "۵۰۰ میلیون اعتبار فوری",
    bg: "bg-[#e6123d]",
    labelMaxW: "max-w-22",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "بیشتر",
    bg: "bg-[#f0f0f1] !text-[#a1a3a8]",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function Slider() {
  const slides = ["Slide1", "Slide2", "Slide3"];
  const mobileSlide = [
    {
      img: "Mobileslide1",
      text: " تابستان با ویتالیر شروع میشه",
      discreption: " محصولات پوستی تخصصی ویتالیر",
      button: "خرید",
    },
    {
      img: "Mobileslide2",
      text: " از خونه تا خودرو هرجی لازم داری",
      discreption: "",
      button: "خرید",
    },
    {
      img: "Mobileslide3",
      text: " خونه کارات رو میکنه",
      discreption: "همه چیز برای هوشمند کردن خونه",
      button: "خرید",
    },
  ];

  const loopedMobileSlides = [...mobileSlide, ...mobileSlide];

  return (
    <main className="w-full overflow-hidden mt-60 lg:mt-48">
      {/* Desktop slider */}
      <div className="hidden lg:block">
        <Swiper
          dir="rtl"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide}>
              <img
                src={`/Slides/${slide}.webp`}
                alt={`Slide ${slide}`}
                className="w-full object-cover object-center lg:h-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile slider */}
      <div className="lg:hidden">
        <Swiper
          dir="rtl"
          modules={[Pagination, Autoplay]}
          slidesPerView={1.2}
          centeredSlides={true}
          spaceBetween={8}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          grabCursor={true}
          allowTouchMove={true}
          touchRatio={1}
          threshold={10}
          className="w-full"
        >
          {loopedMobileSlides.map((slide, index) => (
            <SwiperSlide key={`${slide.img}-${index}`}>
              <div className="relative w-full overflow-hidden rounded-xl">
                <img
                  src={`/Slides/${slide.img}.png`}
                  alt={slide.discreption || slide.text}
                  className="h-36 w-full object-cover object-center sm:h-44"
                />

                {/* gradient from the text side (right in RTL) for readability */}
                <div className="absolute inset-0 bg-linear-to-l from-black/60 via-black/20 to-transparent" />

                {/* text block: right side, vertically centered, limited width */}
                <div className="absolute inset-y-0 right-0 flex w-[62%] flex-col items-start justify-center gap-1 pr-4 sm:w-1/2 sm:pr-8">
                  <p className="text-start text-[13px] font-[iransansBold] leading-5 text-white drop-shadow-md sm:text-xl sm:leading-8">
                    {slide.text.trim()}
                  </p>

                  {slide.discreption && (
                    <p className="text-start text-[10px] leading-4 text-white/90 sm:text-sm">
                      {slide.discreption.trim()}
                    </p>
                  )}

                  <button
                    type="button"
                    className="mt-1 rounded-full bg-white px-3.5 py-1 text-[10px] font-[iransansBold] leading-none text-[#23254e] shadow-sm transition active:scale-95 sm:px-5 sm:py-1.5 sm:text-xs"
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Quick links: single row, horizontal scroll on mobile */}
      <section dir="rtl" className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-start gap-4 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-around lg:overflow-visible">
          {quickLinks.map((item) => (
            <div
              key={item.label}
              className="flex w-[76px] shrink-0 cursor-pointer flex-col items-center gap-2 text-center lg:w-auto"
            >
              <div
                className={`relative flex size-13 items-center justify-center rounded-full text-white shadow-xs ${item.bg}`}
              >
                {item.icon}
                {item.badge && (
                  <span
                    className={`absolute -bottom-1 whitespace-nowrap rounded-full border border-white px-1.5 py-0.5 text-[8px] font-bold text-white ${item.badgeBg}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-[iransansBold] leading-4 text-[#3f4064] ${item.labelMaxW ?? ""}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}