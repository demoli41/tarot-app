export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 text-center border-t border-primary/20">
      <p className="font-body text-sm text-primary opacity-70">
        © {new Date().getFullYear()} Wisdom of Birth. All rights reserved.
      </p>
    </footer>
  );
}