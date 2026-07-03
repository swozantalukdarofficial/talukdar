import { HeroSkeleton } from "@/components/Skeletons";
import { ProductCarouselSkeleton } from "@/components/Skeletons";

// Next.js automatically shows this while page.tsx is loading
export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      <ProductCarouselSkeleton />
      <ProductCarouselSkeleton />
    </>
  );
}
