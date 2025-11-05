import { Spline } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const NAV_ITEMS = [
  {
    label: "Projeto",
    href: "#demo",
  },
  {
    label: "Por que usar?",
    href: "#features",
  },
  {
    label: "Planos",
    href: "#plans",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Header() {
  return (
    <header className="w-full">
      <div className="w-full max-w-7xl py-5 mx-auto px-5 border-b border-text-muted/20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center rounded-md p-1 bg-primary">
            <Spline className="size-4 text-accent" />
          </div>
          <span className="text-accent font-bold">ShortDev</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <Button
            className="bg-secondary hover:bg-primary transition-colors"
            asChild
          >
            <Link href="/login">Entrar</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
