"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

interface SliderType{
  activeComponents : boolean;
}

const slides = [
  {
    id: 1,
    image: "./images/pngwing.com.png",
    title: "DR. DRE STUDIO 2.0",
    text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
  },
  {
    id: 2,
    image: "./images/pngwing.com.png",
    title: "DR. DRE STUDIO 2.0",
    text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
  },
  // {
  //   id: 3,
  //   image: "./images/pngwing.com.png",
  //   title: "DR. DRE STUDIO 2.0",
  //   text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
  // },
  // {
  //   id: 4,
  //   image: "./images/pngwing.com.png",
  //   title: "DR. DRE STUDIO 2.0",
  //   text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
  // },
];

export default function Slider({activeComponents}: SliderType) {


  const [emblaRef, embla] = useEmblaCarousel({ loop: false });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", () => setIndex(embla.selectedScrollSnap()));
  }, [embla]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (embla) embla.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [embla]);

  return (
    // slider contenedor max-w-3xl

    <div id="content-slider" className="overflow-hidden relative  mx-auto" ref={emblaRef}>



      <div className="flex box-slider">
        {
        slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            className="flex-none w-full p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: index === i ? 1 : 0.5, x: index === i ? 0 : -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-slider rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold">{slide.title}</h2>
                <p className="text-gray-600">{slide.text}</p>
              </div>
            </div>

       
          </motion.div>
        ))
        }
      </div>
    </div>
  );
}
