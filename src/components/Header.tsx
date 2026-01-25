export default function Header() {
  return (
    // Додано px-4 для відступів з країв на мобільному
    // Додано text-center, щоб гарантувати центрування тексту
    <header className="w-full py-8 mt-14 xl:mt-8 px-4 flex justify-center items-center text-center">
      <div className="font-heading text-[20px] text-[#414141] tracking-wide leading-tight">
        <h1 className="font-heading-medium tracking-widest">WISDOM OF BIRTH</h1>
        {/* span з класом block переносить вміст на новий рядок.
           md:inline повертає все в один рядок на екранах ширших за 768px.
           md:ml-2 додає відступ між фразами, коли вони в один рядок.
        */}
        <span className="block mt-2 italic text-secondary text-[3rem]">
          Tarot Card Pull
        </span>
      </div>
    </header>
  );
}