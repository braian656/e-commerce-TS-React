"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion,  AnimatePresence , useInView} from "framer-motion";

interface SliderType{
  activeComponents : boolean;
}

// const slides = [
//   {
//     id: 1,
//     image: "./images/image_slider/nike-logo.png",
//     title: "IMAGEN 1",
//     text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
   

//   },
//   {
//     id: 2,
//     image: "./images/image_slider/tiffany_logo.png",
//     title: "IMAGEN 2",
//     text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
    
//   },
//   {
//     id: 3,
//     image: "./images/image_slider/ryzen_logo.png",
//     title: "IMAGEN 3",
//     text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
    

//   },
//   {
//     id: 4,
//     image: "./images/image_slider/calvin_klein_logo.png",
//     title: "IMAGEN 4",
//     text: "Realme T300 Cancelación Ruido 30db Audio Espacial 360° Orange",
    
//   },
// ];

export default function Slider({activeComponents}: SliderType) {
  
  const [current, setCurrent] = useState(0);


  const myRef = useRef(null);
  const isInView = useInView(myRef);


  

  // useEffect(() => {

  //   if(!isInView)return

  //   const interval = setInterval(() => {

  //     setCurrent((prev) => (prev + 1) % Math.ceil(slides.length / 2)); 

  //   }, 10000); // Cada 3s cambia


  //   return () => clearInterval(interval);


  // }, [slides.length,isInView]);

  // // Agrupar de a 2 slides
  // const groupedSlides = [];
  // for (let i = 0; i < slides.length; i += 2) {

  //   groupedSlides.push(slides.slice(i, i + 2));

  // }

// arreglar el hero
  return (

    // <div ref={myRef} className="overflow-hidden w-full h-auto sm:h-[420px] flex items-center justify-center bg-butto2">
    //   <AnimatePresence mode="wait">
    //     <motion.div
    //       key={current}
    //       className="flex w-full h-full"
    //       initial={{ x: "100%", opacity: 0 }}
    //       animate={{ x: 0, opacity: 1 }}
    //       exit={{ x: "-100%", opacity: 0 }}
    //       transition={{ duration: 0.8 }}
    //       viewport={{ once: true }}

    //     >
    //       {groupedSlides[current].map((slide) => (
    //         <div key={slide.id} className="flex items-center justify-center w-[50%] bg-[#232323] sm:w-1/2 p-4">

    //           <div className="card-slider bg-white-400 rounded-lg overflow-hidden shadow-lg flex justify-center items-center">
      
    //             <div className="content-image w-[220px] h-[220px] sm:w-[90%] sm:h-[90%] flex justify-center items-center">

    //               <img
    //                 src={slide.image}
    //                 // src='../images/pngwing.com.png'
    //                 alt={slide.title}
    //                 className="object-contain w-full h-full"
    //               />

    //             </div>
    //           </div>


    //         </div>
    //       ))}
    //     </motion.div>
    //   </AnimatePresence>
    // </div>
    <section className="bg-gray-100 py-16 px-6 md:px-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Encuentra lo que amas, cómpralo al instante
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Las mejores ofertas en tecnología, moda, hogar y más. Envíos rápidos y atención personalizada.
        </p>
        <a href="#productos" className="bg-red-400 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-500 transition">
          Explorar productos
        </a>
      </div>
    </section>

    
  );
}
