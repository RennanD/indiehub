import { Spline } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <header className="w-full">
      <div className="w-full max-w-7xl py-5 mx-auto px-5 border-b border-text-muted/20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center rounded-md p-1 bg-primary">
            <Spline className="size-4 text-accent" />
          </div>
          <span className="text-foreground font-bold">IndieHub</span>
        </Link>

        {links.length > 0 && (
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4">
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav>
          <Button variant="secondary" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
