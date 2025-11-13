import { Github, Twitter } from "lucide-react";
import Link from "next/link";

const LINKS = [
  {
    label: "Termos de uso",
    href: "/terms",
  },
  {
    label: "Política de privacidade",
    href: "/privacy",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/rennand",
  },
  {
    icon: Twitter,
    href: "https://x.com/doug_ollie",
  },
];

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full max-w-7xl mx-auto flex gap-6 flex-col md:flex-row items-center justify-between p-5 border-t border-text-muted/20">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} IndieHub. Todos os direitos
          reservados.
        </p>

        <nav
          aria-label="Links de navegação"
          className="flex flex-col md:flex-row items-center gap-4"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Links de redes sociais"
          className="flex items-center gap-4"
        >
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <Link key={link.href} href={link.href}>
                <div className="flex items-center justify-center size-8 rounded-md bg-text-muted/10">
                  <Icon className="size-4 text-primary" />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
