"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { TarotCard } from "@/types"; 

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: TarotCard | null; 
}

export default function CardModal({ isOpen, onClose, card }: CardModalProps) {
  // Блокування скролу сторінки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 md:p-8"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              // ЗМІНИ ТУТ:
              // 1. md:h-[80vh] - на планшетах/ПК фіксуємо висоту (80% екрану)
              // 2. md:overflow-hidden - забороняємо скрол всього контейнера на ПК (скролитиметься тільки текст)
              // 3. overflow-y-auto - на мобільному залишаємо звичайний скрол
              className="bg-[#FDF8F3] w-full max-w-5xl rounded-xl shadow-2xl flex flex-col md:flex-row relative 
                         max-h-[90vh] md:h-[85vh] overflow-y-auto md:overflow-hidden"
            >
              
              {/* Кнопка закриття (Хрестик) */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-primary"
              >
                <X size={24} />
              </button>

              {/* ЛІВА ЧАСТИНА - Картинка */}
              {/* На ПК займає 50% ширини і всю висоту, картинка центрується */}
              <div className="w-full md:w-[50%] bg-[#2a1d17] flex justify-center items-center p-8 shrink-0">
                <div className="relative w-full max-w-[320px] aspect-[2/3] shadow-2xl rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={card.imageSrc} 
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* ПРАВА ЧАСТИНА - Контент */}
              {/* flex flex-col - щоб вибудувати Заголовок -> Текст -> Кнопку вертикально */}
              <div className="w-full md:w-[60%] flex flex-col h-full relative">
                
                {/* 1. Header (Фіксований зверху) */}
                <div className="p-6 md:p-8 pb-2 md:pb-4 border-b border-primary/10 bg-[#FDF8F3] z-10">
                   <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold pr-10">
                    {card.title}
                  </h2>
                </div>

                {/* 2. Scrollable Content (Скролиться тільки ця частина) */}
                {/* flex-grow - займає все вільне місце */}
                {/* overflow-y-auto - вмикає скрол, якщо текст не влазить */}
                <div className="p-6 md:p-8 py-4 overflow-y-auto flex-grow">
                  <div className="space-y-6 font-body text-lg text-primary/80 leading-relaxed">
                    <div>
                      <h3 className="font-bold text-secondary text-sm uppercase tracking-widest mb-2">
                        Tarot Reflection
                      </h3>
                      <p>{card.tarotReflection}</p>
                    </div>

                    <div className="w-full h-px bg-primary/20 my-4" />

                    <div>
                      <h3 className="font-bold text-secondary text-sm uppercase tracking-widest mb-2">
                        Wisdom of Birth Support
                      </h3>
                      <p className="italic text-xl">{card.wisdomOfBirthSupport}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Footer (Фіксований знизу) */}
                <div className="p-6 md:p-8 pt-4 border-t border-primary/10 bg-[#FDF8F3] z-10">
                  <button
                    onClick={onClose}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-[#FDF8F3] font-heading font-bold rounded hover:bg-secondary transition-colors"
                  >
                    Choose another card
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}