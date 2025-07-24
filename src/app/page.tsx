import { Menu } from '@/components/Menu';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <section id="menu" className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl md:text-6xl">Our Menu</h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Freshly prepared for you.
          </p>
        </div>
        <Menu />
      </section>
    </div>
  );
}
