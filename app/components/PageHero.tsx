import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-white/70 text-xs tracking-[0.35em] uppercase mb-3">
          {eyebrow}
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-bold">{title}</h1>
        <div className="mt-5 flex items-center gap-2 text-white/60 text-xs">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>›</span>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
