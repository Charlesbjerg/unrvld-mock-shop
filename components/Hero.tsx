"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

interface IProps {
  slides: {
    title: string;
    content: string;
    image: {
      url: string;
      alt: string;
    };
    cta?: {
      link: string;
      title: string;
    };
  }[];
}

export default function Hero({ slides }: IProps) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 10000 }}
    >
      {slides.map((item, index) => (
        <SwiperSlide key={`hero-${index}`} className="relative">
          <Image
            src={item.image.url}
            alt={item.image.url}
            width={1900}
            height={600}
            className="w-full h-[calc(100vh-4.4rem)] object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 z-[1] flex items-center p-8 lg:p-20 bg-black/50">
            <div className="max-w-xl text-white">
              <h1 className="text-5xl font-bold tracking-tighter mb-8">
                {item.title}
              </h1>
              <p className="text-lg mb-8">{item.content}</p>
              {item.cta && (
                <Link
                  href={item.cta.link}
                  className="px-6 py-3 rounded-lg bg-white text-black transition-all hover:bg-gray-300"
                >
                  {item.cta.title}
                </Link>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
