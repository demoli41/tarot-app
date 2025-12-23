"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // npm install lucide-react якщо немає іконок
import Image from "next/image";
import {tarotDeck} from "@/data/card"; // Імпортуємо дані колоди
import { useEffect } from "react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: typeof tarotDeck[number] | null;
}

export default function CardModal({ isOpen, onClose, card }: CardModalProps) {
  // Блокуємо скрол сторінки, коли відкрито модалку
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
          {/* Темний фон (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            {/* Саме модальне вікно */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Щоб клік по вікну не закривав його
              className="bg-[#FDF8F3] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row relative"
            >
              
              {/* Кнопка закриття */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-primary"
              >
                <X size={24} />
              </button>

              {/* Ліва частина - Картинка */}
              <div className="w-full md:w-1/2 bg-[#2a1d17] flex justify-center items-center p-8 md:sticky md:top-0">
                <div className="relative w-full max-w-[300px] aspect-[2/3] shadow-2xl rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={card.imageSrc} // Тут буде реальне фото карти
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Права частина - Текст */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-left">
                <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-6">
                  {card.title}
                </h2>

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
                
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3 bg-primary text-[#FDF8F3] font-heading font-bold rounded hover:bg-secondary transition-colors w-fit"
                >
                  Close Reading
                </button>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}