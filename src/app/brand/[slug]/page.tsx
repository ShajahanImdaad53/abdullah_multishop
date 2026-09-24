import { FeaturePage } from "@/components/ui/FeaturePage";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const brandMap: Record<string, { title: string, subs: any[] }> = {
    "innovate": {
      title: "INNOVATE",
      subs: [
        { name: "Pens", count: 12 },
        { name: "Highlighters", count: 8 },
        { name: "Markers", count: 15 },
        { name: "Permanent Markers", count: 10 },
        { name: "Colour Pens", count: 20 },
        { name: "Fineliners", count: 18 },
        { name: "Accessories", count: 5 }
      ]
    }
  };

  const brandInfo = brandMap[slug];
  
  if (!brandInfo) {
    // If not in the map, still render a default one based on products
    const filtered = products.filter(p => p.brand.toLowerCase() === slug.replace(/-/g, ' '));
    if (filtered.length === 0) return notFound();
    
    return (
      <FeaturePage 
        title={slug.replace(/-/g, ' ')}
        subCategories={[]}
        products={filtered}
      />
    );
  }

  const filteredProducts = products.filter(p => p.brand.toLowerCase() === brandInfo.title.toLowerCase());

  return (
    <FeaturePage 
      title={brandInfo.title}
      subCategories={brandInfo.subs}
      products={filteredProducts}
    />
  );
}
