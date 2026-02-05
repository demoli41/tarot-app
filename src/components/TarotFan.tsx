"use client";

import { motion, AnimatePresence } from "framer-motion"; 
import Image from "next/image";
import { useState, useEffect } from "react";

import { tarotDeck } from "@/data/card"; 
import { TarotCard } from "@/types"; 
import CardModal from "./Card.Modal";

const DESKTOP_CONFIG = { cardWidth: 111, cardHeight: 180, radius: 380, arcAngle: 150, displayCount: 22, yOffset: 0, containerHeight: "h-[300px]", marginTop: "mt-8 mb-16" };
const TABLET_CONFIG = { cardWidth: 83, cardHeight: 135, radius: 280, arcAngle: 145, displayCount: 22, yOffset: 10, containerHeight: "h-[240px]", marginTop: "mt-6 mb-12" };
const MOBILE_CONFIG = { cardWidth: 56, cardHeight: 91, radius: 180, arcAngle: 140, displayCount: 20, yOffset: 20, containerHeight: "h-[180px]", marginTop: "mt-4 mb-8" };

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function TarotFan() {
  const [mounted, setMounted] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [fanCards, setFanCards] = useState<TarotCard[]>([]);
  const [preloadCard, setPreloadCard] = useState<TarotCard | null>(null);
  const [clickedCardId, setClickedCardId] = useState<string | number | null>(null);

  useEffect(() => {
    setMounted(true);
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    setFanCards(shuffled.slice(0, 25));

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
  const displayIndices = Array.from({ length: config.displayCount }, (_, i) => i);
  const startAngle = -config.arcAngle / 2;
  const angleStep = config.arcAngle / (config.displayCount - 1);

  const handleCardClick = (card: TarotCard) => {
    if (isLoading) return;

    setClickedCardId(card.id); 
    setIsLoading(true);

    setTimeout(() => {
      setSelectedCard(card);
      setIsLoading(false);
      setIsModalOpen(true);
      setClickedCardId(null); 
    }, 1000);
  };

  const handleMouseEnter = (card: TarotCard) => {
    setPreloadCard(card);
  };

  if (!mounted) return <div className="h-[250px] w-full" />;

  return (
    <>
      <div 
        className={`relative w-full flex justify-center items-end overflow-visible z-10 transition-all duration-500
        ${config.containerHeight} ${config.marginTop}`}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 border-6 border-[#ffffff] border-t-transparent rounded-full animate-spin mb-4" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-1 h-1"> 
          {displayIndices.map((index) => {
            const rotate = startAngle + index * angleStep;
            const cardData = fanCards[index];
            if (!cardData) return null;

            const isTargeted = clickedCardId === cardData.id;

            return (
              <motion.div
                key={cardData.id || index} 
                className={`absolute cursor-pointer shadow-xl rounded-lg ${isLoading ? 'pointer-events-none' : ''}`}
                style={{
                  width: `${config.cardWidth}px`,
                  height: `${config.cardHeight}px`,
                  left: `-${config.cardWidth / 2}px`, 
                  top: `-${config.cardHeight + 40 - config.yOffset}px`, 
                  transformOrigin: `50% ${config.radius}px`,
                  rotate: rotate,
                  zIndex: index, 
                }}
                animate={{ 
                rotate: rotate, 
                opacity: 1, 
                y: isTargeted ? (deviceType === 'mobile' ? -25 : -15) : 0, 
                scale: isTargeted ? 1.05 : 1 
              }}
                whileHover={!isLoading ? {
                  y: deviceType === 'mobile' ? -5 : -15, 
                  scale: 1.05, 
                  transition: { type: "spring", stiffness: 400, damping: 40 },
                } : {}}

                onClick={() => handleCardClick(cardData)}
                onMouseEnter={() => handleMouseEnter(cardData)}
                initial={{ rotate: 0, opacity: 0, y: config.radius }} 

                transition={{ duration: 1, delay: index * 0.015, type: "spring", stiffness: 50 }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 bg-[#2a1d17]">
                  <Image
                    src="/images/RearCardSide.webp"
                    alt="Tarot Back"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60px, (max-width: 1024px) 90px, 120px"
                    priority={index < 10}
                  />
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
        {preloadCard && (
          <Image src={preloadCard.imageSrc} alt="preload" width={320} height={500} priority={true} />
        )}
      </div>

      <CardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        card={selectedCard} 
      />
    </>
  );
}