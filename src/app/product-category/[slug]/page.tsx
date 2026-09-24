import { FeaturePage } from "@/components/ui/FeaturePage";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryMap: Record<string, { title: string, subs: any[] }> = {
    "edu-toys": {
      title: "EDU TOYS",
      subs: [
        { name: "BlockBuddies", count: 12 },
        { name: "CraftBuddies", count: 8 },
        { name: "MindBuddies", count: 15 },
        { name: "SmartyPops", count: 10 },
        { name: "Activity Kit", count: 22 }
      ]
    }
  };

  const catInfo = categoryMap[params.slug];
  
  if (!catInfo) {
    // Fallback
    const fallbackTitle = params.slug.replace(/-/g, ' ');
    const filtered = products.filter(p => p.category.toLowerCase() === fallbackTitle.toLowerCase());
    if (filtered.length === 0) return notFound();
    
    return (
      <FeaturePage 
        title={fallbackTitle}
        subCategories={[]}
        products={filtered}
      />
    );
  }

  const filteredProducts = products.filter(p => p.category.toLowerCase() === catInfo.title.toLowerCase());

  return (
    <FeaturePage 
      title={catInfo.title}
      subCategories={catInfo.subs}
      products={filteredProducts}
    />
  );
}
