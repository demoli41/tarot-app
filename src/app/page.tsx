import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TarotFan from "@/components/TarotFan";

export default function Home() {
  return (

    <div className="min-h-screen bg-[#f0ead8] lg:bg-[#282829] flex justify-center">
      
      <div className="w-full max-w-[1200px] bg-[#f0ead8] min-h-screen flex flex-col items-center overflow-x-hidden shadow-2xl relative">
        
        <Header />

        <main className="grow flex flex-col items-center w-full px-4 max-w-4xl text-center relative z-10">
          
          {/* --- ТЕКСТОВИЙ БЛОК --- */}
          <div className="space-y-6 text-balance font-body text-lg md:text-xl leading-relaxed text-primary/90 mt-8 relative z-20">
            <p>
              <span className="font-heading block mb-6 md:mb-6">Pause.</span> 
              Take a moment to be with yourself.
              <br className="hidden md:inline" /> Be present with the wisdom of your own heart, body, mind, and
              <br className="hidden md:inline" /> spirit, in this pregnant moment.
            </p>
            
            <p>
              Connect with whatever you are gestating and birthing, whether that 
              <br className="hidden md:inline" /> is a child, a creative offering, or even a new version of yourself.
            </p>
            
            <p>
              Inquire. Reflect. Seek insight.
              <br className="hidden md:inline" /> Open yourself to new awareness, fresh clarity, deeper
              <br className="hidden md:inline" /> understanding, and the message that is waiting for you.
            </p>

            <p>
              Ask for guidance.
              Open to receive.
              Pick a card.
            </p>
          </div>

          {/* --- БЛОК З ВІЯЛОМ --- */}
          <div className="w-full -mt-6 md:-mt-10 pb-16">
            <TarotFan />
          </div>

        </main>

        <Footer />
        
      </div>
    </div>
  );
}