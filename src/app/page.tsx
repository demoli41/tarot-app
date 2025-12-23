import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TarotFan from "@/components/TarotFan";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <Header />

      <main className="flex-grow flex flex-col items-center w-full px-4 max-w-4xl text-center relative z-10">
        
        {/* --- ТЕКСТОВИЙ БЛОК --- */}
        {/* z-20 щоб текст був поверх карток, якщо вони сильно піднімуться */}
        <div className="space-y-6 font-body text-lg md:text-xl leading-relaxed text-primary/90 mt-8 relative z-20">
          <p>
            <span className="font-bold block mb-2">Pause.</span> 
            Take this moment to sit with yourself. To be present with the wisdom 
            of your own heart, body, mind, and spirit, in this pregnant moment.
          </p>
          
          <p>
            Connect with whatever you are gestating and birthing, be that an 
            actual child or another act of creation. Even another version of yourself.
          </p>
          
          <p className="italic">
            Inquire, reflect, seek insight. Open yourself to a new awareness, 
            a new clarity, a new understanding, a message.
          </p>

          <p className="font-semibold text-xl pt-6">
            Ask for guidance. Open to receive. <br />
            Pick a card. Or two.
          </p>
        </div>

        {/* --- БЛОК З ВІЯЛОМ --- */}
        {/* ВИПРАВЛЕННЯ:
            -mt-24 (mobile) та -mt-36 (desktop): "Підтягуємо" віяло вгору, перекриваючи пусте місце.
            pb-12: Додаємо місце знизу, щоб футер не перекривав карти.
        */}
        <div className="w-full -mt-8 md:-mt-6 pb-12">
          <TarotFan />
        </div>

      </main>

      <Footer />
    </div>
  );
}