"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Professional Office Stationery",
    subtitle: "Organize with Style",
    description: "Premium box files, ring binders, and file covers for a pristine workspace.",
    buttonText: "Shop Office",
    buttonLink: "/shop?category=files",
    image: "/banner_files.jpg",
  },
  {
    id: 2,
    title: "Trendy School Bags",
    subtitle: "Back to School Ready",
    description: "Discover our vibrant collection of durable and stylish backpacks.",
    buttonText: "View Bags",
    buttonLink: "/shop?category=bags",
    image: "/banner_bags.jpg",
  },
  {
    id: 3,
    title: "Premium Water Bottles",
    subtitle: "Stay Hydrated, Stay Active",
    description: "Insulated, colorful, and eco-friendly water bottles for every adventure.",
    buttonText: "Shop Bottles",
    buttonLink: "/shop?category=bottles",
    image: "/banner_bottles.jpg",
  },
  {
    id: 4,
    title: "Creativity Unleashed",
    subtitle: "Pens, Pencils & Art",
    description: "Unleash your imagination with our top-tier pens, markers, and art supplies.",
    buttonText: "Explore Pens",
    buttonLink: "/shop?category=pens",
    image: "/banner_pens.jpg",
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex items-center"
        >
          {/* Full Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 z-10 flex items-center h-full">
            <div className="text-white max-w-2xl pt-10 md:pt-0">
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-brand-accent font-semibold tracking-wider uppercase mb-2"
              >
                {slides[current].subtitle}
              </motion.span>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-md"
              >
                {slides[current].title}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-200 mb-6 max-w-lg drop-shadow-sm"
              >
                {slides[current].description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  href={slides[current].buttonLink}
                  className="bg-brand-secondary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all hover-lift inline-block shadow-lg"
                >
                  {slides[current].buttonText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-brand-accent w-8" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
