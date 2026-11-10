"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

      <div className="lg:hidden">
        <Swiper
          dir="rtl"
          modules={[Navigation, Pagination, Autoplay, Thumbs]}
          slidesPerView={1.12} 
          centeredSlides={true}
          spaceBetween={12} 
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
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src={`/Slides/${slide.img}.png`}
                  alt={slide.discreption || slide.text}
                  className="h-48 w-full object-cover object-center sm:h-56"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/10" />
                <div className="absolute inset-x-4 top-19 sm:top-1/3 sm:right-10">
                  <p className="text-right text-sm font-medium leading-relaxed text-white drop-shadow-md sm:text-xl">
                    {slide.text}
                  </p>
                  {slide.discreption && (
                    <p className="mt-1 text-right text-[10px] text-white/90 sm:text-sm">
                      {slide.discreption}
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-3 ml-auto flex items-center justify-center rounded-full bg-white/90 px-4 py-1 text-[10px] font-bold text-black shadow-sm sm:px-5 sm:text-xs"
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      
      <section dir="rtl" className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-5 gap-y-6 sm:grid-cols-5 lg:flex lg:items-start lg:justify-around">
       
          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="relative flex size-13 items-center justify-center rounded-full bg-[#b12ba4] text-white shadow-xs">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
              </svg>
              <span className="absolute -bottom-1 rounded-full border border-white bg-[#b12ba4] px-1.5 py-0.5 text-[8px] font-bold text-white">
                ۷۰٪ تخفیف
              </span>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              اشتراک پلاس
            </span>
          </div>

   
          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#0040ff] text-white shadow-xs">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="max-w-20 text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              وام بانکی، اعتبار خرید
            </span>
          </div>

    
          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#e5a024] text-white shadow-xs">
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-white/80">
                <span className="text-xs font-bold">C</span>
              </div>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              دیجی‌کوین
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="relative flex size-13 items-center justify-center rounded-full bg-[#1b1b1b] text-white shadow-xs">
              <span className="text-sm font-semibold tracking-widest">DS</span>
              <span className="absolute -bottom-1 rounded-full border border-white bg-[#ef4056] px-1.5 py-0.5 text-[8px] font-bold text-white">
                اورجینال
              </span>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              دیجی‌استایل
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="relative flex size-13 items-center justify-center rounded-full bg-[#0b5c4a] text-white shadow-xs">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="3" />
                <circle cx="8" cy="15" r="3" />
                <circle cx="16" cy="15" r="3" />
              </svg>
              <span className="absolute -bottom-1 rounded-full border border-white bg-[#ef4056] px-1.5 py-0.5 text-[8px] font-bold text-white">
                با پشتوانه طلا
              </span>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              طلا و نقره دیجیتال
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="relative flex size-13 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-xs">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="absolute -bottom-1 rounded-full border border-white bg-[#ef4056] px-1.5 py-0.5 text-[8px] font-bold text-white">
                پرتخفیف
              </span>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              سوپرمارکت
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#19bfd3] text-white shadow-xs">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              در دیجی‌کالا بفروش
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#111111] text-white shadow-xs">
              <span className="text-[9px] font-bold tracking-tight">
                digicard
              </span>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              دیجی‌کارت
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#e6123d] text-white shadow-xs">
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="max-w-22 text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              ۵۰۰ میلیون اعتبار فوری
            </span>
          </div>

          <div className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#f0f0f1] text-[#a1a3a8]">
              <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </div>
            <span className="text-[11px] font-[iransansBold] text-[#3f4064] leading-4">
              بیشتر
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
