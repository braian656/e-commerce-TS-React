"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion,  AnimatePresence , useInView} from "framer-motion";
import ButtonPag from "../buttons-component/ButtonPag";
import HeroPopularProducts from "./CardHero";

interface SliderType{
  activeComponents : boolean;
}


export default function Slider({activeComponents}: SliderType) {
  
  const [current, setCurrent] = useState(0);


  const myRef = useRef(null);
  const isInView = useInView(myRef);

  const buy = ()=>{

  }
  return (
    <section className="bg-white py-16 px-6 md:px-20 text-center">



      <div className="sm:flex">
        <div className="sm:w-lg text-start">
              <div className="bg-[#2b2c30] ml-2 px-2 py-1  w-[130px] rounded-md">
                  <h2 className="text-white font-normal">Pure Shopping</h2>
              </div>


              <h1 className="font-bold text-4xl p-2">Discover Premium Products for Your <span className="text-red-400">Lifestyle</span></h1>

              <p className="text-xl px-2 py-6">
                Shop our curated collection of high-quality products designed to enhance your daily life. From tech to wellness, we've got you covered.
              </p>

               <div className="flex sm:mt-[100px]">
                    <ButtonPag 
                      text='Comprar Ahora' 
                      onClick={buy}
                      clr='bg-button mr-2'
                      clrText='white'
                      border='border-1 border-solid border-gray-400'
                      width='w-[200px]'
                      hoverButton='hover:bg-indigo-800 hover:border-indigo-200 '
                      cursorPointer='cursor-pointer'>
                    </ButtonPag>

                    <ButtonPag 
                      text='Ver Productos' 
                      onClick={buy}
                      clr='bg-white ml-2'
                      clrText='#2b2c30 font-normal'
                      border='border-1 border-solid border-gray-400 '
                      width='w-[100px]sm:w-2xs'
                      hoverButton='hover:bg-white hover:border-indigo-800 hover:text-indigo-800'
                      cursorPointer='cursor-pointer'>
                    </ButtonPag>
                </div>
          </div>
          
          <HeroPopularProducts></HeroPopularProducts>
      </div>

      
     
    </section>

    
  );
}
