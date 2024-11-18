// app/page.tsx
"use client";
import { Hero } from '../components/about/Hero';
import { Services } from '../components/about/Services';
import { ProductList } from '../components/ProductList';
import { Blog } from '../components/Blog';
import { Contact } from '../components/Contact';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* About Components */}
      <div className="w-full overflow-hidden">
        <Hero />
      </div>
      <div className="w-full overflow-hidden">
        <Services />
      </div>

      {/* Hot Products Section */}
      <section className="bg-gray-50 w-full overflow-hidden">
        <ProductList />
      </section>

      {/* Blog Section */}
      <div className="w-full overflow-hidden">
        <Blog />
      </div>

      {/* Contact Section */}
      <section className="bg-gray-50 w-full overflow-hidden">
        <Contact />
      </section>
    </main>
  );
}