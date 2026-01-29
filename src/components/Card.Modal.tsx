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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}

              className="bg-[#f0ead8] w-full max-w-5xl rounded-xl shadow-2xl flex flex-col md:flex-row relative 
                         max-h-[90vh] md:h-[85vh] overflow-y-auto md:overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full cursor-pointer transition-colors text-primary"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-[50%] bg-[#c7ad78] flex justify-center items-center p-8 shrink-0">
                <div className="relative w-full max-w-[320px] aspect-[945/1535] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover"
                    priority 
                    sizes="(max-width: 768px) 100vw, 320px"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>

              {/* ПРАВА ЧАСТИНА - Контент */}
              <div className="w-full md:w-[60%] h-auto md:h-full relative flex flex-col md:justify-center items-center bg-[#f0ead8]">

                <div className="w-full md:max-h-full md:overflow-y-auto flex flex-col">
                  
                  {/* Header */}
                  <div className="p-8 md:p-8 pb-4 md:pb-4 text-center">
                    <h2 className="font-heading-medium text-3xl md:text-4xl text-secondary">
                      {card.title}
                    </h2>
                  </div>

                  {/* Text Content */}
                  <div className="px-6 md:px-12 py-2">
                    <div className="space-y-8 md:space-y-6 font-body text-lg text-primary/80 leading-relaxed">

                      <div className="w-full h-px bg-primary/20 my-6 md:my-4" />

                      <div>
                        <h3 className="font-body text-secondary text-sm uppercase tracking-widest mb-2 text-center">
                          Tarot Reflection
                        </h3>
                        <p className="font-body text-centert">{card.tarotReflection}</p>
                      </div>

                      <div className="w-full h-px bg-primary/20 my-6 md:my-4" />

                      <div>
                        <h3 className="font-body text-secondary text-sm uppercase tracking-widest mb-2 text-center">
                          Wisdom of Birth Support
                        </h3>
                        <p className="italic text-xl text-center">{card.wisdomOfBirthSupport}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Button */}
                  <div className="p-6 md:p-8 pt-6 flex justify-center ">
                    <button
                      onClick={onClose}
                      className="w-full md:w-auto px-8 py-3 bg-primary text-[#f0ead8] font-body cursor-pointer rounded hover:bg-secondary transition-colors"
                    >
                      Choose another card
                    </button>
                  </div>
                  
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}