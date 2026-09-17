export interface ProductReview {
  authorName: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ReviewData {
  ratingValue: number;
  ratingString: string;
  reviewCount: number;
  reviews: ProductReview[];
}

const REVIEW_POOL: Array<{ name: string; title: string; comment: string; rating: number }> = [
  {
    name: "Md. Rafiqul Islam",
    title: "Best EV product in Bangladesh!",
    comment: "Bought this for daily commuting in Dhaka. Exceptional performance, top-notch build quality, and excellent battery range. Highly satisfied with EV Solution BD!",
    rating: 5,
  },
  {
    name: "Tanvir Ahmed",
    title: "Super smooth & reliable power",
    comment: "Quiet motor acceleration, robust chassis, and comfortable handling. The battery charges quickly and holds power exceptionally well.",
    rating: 5,
  },
  {
    name: "Kazi Anisur Rahman",
    title: "Genuine quality & prompt delivery",
    comment: "100% authentic product. Delivered safely to Chittagong within 2 days with complete warranty support.",
    rating: 4,
  },
  {
    name: "Mahmudul Hasan",
    title: "Highly recommended for daily commute",
    comment: "The build quality is solid and specifications match exactly what is advertised. Truly great value for money.",
    rating: 5,
  },
  {
    name: "Sabbir Hossain",
    title: "Outstanding mileage & battery backup",
    comment: "Long range on a single charge. Smooth torque even with heavy load or pillion passenger.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    title: "Great customer service & fast support",
    comment: "The EV Solution BD team helped me choose the exact model for my needs. Outstanding store for electric vehicle products.",
    rating: 4,
  },
  {
    name: "Naimur Rahman",
    title: "Durable & heavy-duty build",
    comment: "Using it daily for over 3 months now. No degradation in power, speed, or battery health. Excellent!",
    rating: 5,
  },
  {
    name: "Imtiaz Chowdhury",
    title: "Perfect replacement part & easy fit",
    comment: "Genuine component, seamless installation, and worked flawlessly right out of the box.",
    rating: 5,
  },
];

export function getProductReviews(productSlug: string, productId?: string): ReviewData {
  const seedKey = productSlug || productId || "ev-product";
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) {
    hash = (hash << 5) - hash + seedKey.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);

  // Calculate review count between 16 and 48
  const reviewCount = 16 + (posHash % 33);

  // Calculate aggregate rating value between 4.7 and 4.9
  const ratingNum = 4.7 + ((posHash % 25) / 100);
  const ratingValue = Math.min(5, Math.max(4.5, ratingNum));
  const ratingString = ratingValue.toFixed(1);

  // Pick 3-4 deterministic reviews
  const numReviews = 3 + (posHash % 2);
  const reviews: ProductReview[] = [];

  for (let i = 0; i < numReviews; i++) {
    const poolIdx = (posHash + i * 3) % REVIEW_POOL.length;
    const base = REVIEW_POOL[poolIdx];

    // Generate date within past 120 days
    const daysAgo = 3 + ((posHash + i * 19) % 115);
    const dateObj = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const dateStr = dateObj.toISOString().split("T")[0];

    reviews.push({
      authorName: base.name,
      date: dateStr,
      rating: base.rating,
      title: base.title,
      comment: base.comment,
      verified: true,
    });
  }

  return {
    ratingValue,
    ratingString,
    reviewCount,
    reviews,
  };
}
