export default function Header() {
  return (
    // Додано px-4 для відступів з країв на мобільному
    // Додано text-center, щоб гарантувати центрування тексту
    <header className="w-full py-8 px-4 flex justify-center items-center text-center">
      <h1 className="font-heading text-[3rem] md:text-[3rem] text-primary font-bold tracking-wide leading-tight">
        Wisdom of Birth
        {/* span з класом block переносить вміст на новий рядок.
           md:inline повертає все в один рядок на екранах ширших за 768px.
           md:ml-2 додає відступ між фразами, коли вони в один рядок.
        */}
        <span className="block md:inline md:ml-3">
          Tarot Card Pull
        </span>
      </h1>
    </header>
  );
}