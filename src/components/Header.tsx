export default function Header() {
  return (
    <header className="w-full py-14 px-4 flex justify-center items-center">
      <div className="font-heading text-[#414141] flex flex-col items-center">
        <h1 className="font-heading-medium text-[20px] tracking-widest leading-tight uppercase text-center ml-[0.1em]">
          WISDOM OF BIRTH
        </h1>

        <span className="block mt-2 italic text-secondary text-[3rem] leading-none text-center">
          Tarot Card Pull
        </span>
      </div>
    </header>
  );
}