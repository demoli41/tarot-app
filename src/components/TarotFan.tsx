"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// 1. ВАШІ ІМПОРТИ
// Якщо ваш файл називається card.ts (без s), то шлях правильний.
// Якщо cards.ts - змініть на "@/data/cards"
import { tarotDeck } from "@/data/card"; 
import { TarotCard } from "@/types"; 
import CardModal from "./Card.Modal";


// --- КОНФІГУРАЦІЇ ---
const DESKTOP_CONFIG = {
  cardWidth: 105, cardHeight: 180, radius: 380, arcAngle: 150,
  displayCount: 22, yOffset: 0, containerHeight: "h-[300px]", marginTop: "mt-8 mb-16",
};
const TABLET_CONFIG = {
  cardWidth: 80, cardHeight: 135, radius: 280, arcAngle: 145,
  displayCount: 22, yOffset: 10, containerHeight: "h-[240px]", marginTop: "mt-6 mb-12",
};
const MOBILE_CONFIG = {
  cardWidth: 55, cardHeight: 90, radius: 180, arcAngle: 140,
  displayCount: 20, yOffset: 20, containerHeight: "h-[180px]", marginTop: "mt-4 mb-8",
};

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function TarotFan() {
  const [mounted, setMounted] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  
  // 2. State використовує ваш тип TarotCard
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width >= 768 && width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = deviceType === 'mobile' ? MOBILE_CONFIG : deviceType === 'tablet' ? TABLET_CONFIG : DESKTOP_CONFIG;
  const cards = Array.from({ length: config.displayCount }, (_, i) => i);
  const startAngle = -config.arcAngle / 2;
  const angleStep = config.arcAngle / (config.displayCount - 1);

  // 3. Логіка вибору карти з вашої колоди
  const handleCardClick = () => {
    if (tarotDeck.length === 0) {
        console.error("Колода пуста!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    const randomCard = tarotDeck[randomIndex];
    
    setSelectedCard(randomCard);
    setIsModalOpen(true);
  };

  if (!mounted) return <div className="h-[250px] w-full" />;

  return (
    <>
      <div 
        className={`relative w-full flex justify-center items-end overflow-visible z-10 transition-all duration-500
        ${config.containerHeight} ${config.marginTop}`}
      >
        <div className="relative w-1 h-1"> 
          {cards.map((index) => {
            const rotate = startAngle + index * angleStep;
            
            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer shadow-xl rounded-lg"
                style={{
                  width: `${config.cardWidth}px`,
                  height: `${config.cardHeight}px`,
                  left: `-${config.cardWidth / 2}px`, 
                  top: `-${config.cardHeight + 40 - config.yOffset}px`, 
                  transformOrigin: `50% ${config.radius}px`,
                  rotate: rotate,
                  zIndex: index, 
                }}
                whileHover={{
                  y: deviceType === 'mobile' ? -5 : -15, 
                  scale: 1.05, 
                  transition: { type: "spring", stiffness: 400, damping: 40 },
                }}
                initial={{ rotate: 0, opacity: 0, y: config.radius }} 
                animate={{ rotate: rotate, opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, delay: index * 0.015, type: "spring", stiffness: 50 
                }}
                onClick={handleCardClick}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 bg-[#2a1d17]">
                   <Image
                    src="/images/tarot_card.png"
                    alt="Tarot Back"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60px, (max-width: 1024px) 90px, 120px"
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

      {/* Модальне вікно */}
      <CardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        card={selectedCard} 
      />
    </>
  );
}