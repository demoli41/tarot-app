"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// --- НАЛАШТУВАННЯ ---
const DISPLAY_COUNT = 22; 
const ARC_ANGLE = 150; 
// Зменшений радіус (було 550 -> 380)
const RADIUS = 380; 

// Розміри картки (виніс у змінні для зручності)
const CARD_WIDTH = 105;  // Було 120
const CARD_HEIGHT = 170; // Було 200

export default function TarotFan() {
  const cards = Array.from({ length: DISPLAY_COUNT }, (_, i) => i);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const startAngle = -ARC_ANGLE / 2;
  const angleStep = ARC_ANGLE / (DISPLAY_COUNT - 1);

  return (
    // Зменшив висоту контейнера, бо віяло стало меншим (h-[250px] md:h-[300px])
    <div className="relative w-full h-[250px] md:h-[300px] flex justify-center items-end overflow-visible mt-8 mb-16 z-10">
      
      <div className="relative w-1 h-1"> 
        {cards.map((index) => {
          const rotate = startAngle + index * angleStep;
          
          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer shadow-xl rounded-lg" // rounded-xl -> rounded-lg
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                
                // Центрування (половина ширини і повна висота в мінус)
                left: `-${CARD_WIDTH / 2}px`, 
                top: `-${CARD_HEIGHT}px`, 
                
                transformOrigin: `50% ${RADIUS}px`,
                
                rotate: rotate,
                zIndex: hoveredIndex === index ? 100 : index,
              }}
              whileHover={{
                y: -50, // Зменшив амплітуду руху (було -80)
                scale: 1.15,
                zIndex: 200,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              initial={{ rotate: 0, opacity: 0, y: RADIUS }} 
              animate={{ rotate: rotate, opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.015, 
                type: "spring", stiffness: 50 
              }}
              
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => alert(`Карта №${index + 1}`)}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 bg-[#2a1d17]">
                 <Image
                  src="/images/tarot_card.png"
                  alt="Tarot Back"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 150px"
                  priority={index < 10}
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}