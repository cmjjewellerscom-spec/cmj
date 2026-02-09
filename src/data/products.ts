export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    weight: string;
    purity: string;
    image: string;
    description: string;
}

export const products: Product[] = [
    { id: 1, name: "Men's Gold Ring", category: "Men's Gold Ring", price: 45000, weight: "8g", purity: "22k (916)", image: "/designs/Men's Gold Ring.jpeg", description: "Elegant gold ring crafted for men with premium finish." },
    { id: 2, name: "Antique Haram", category: "Antique Haram", price: 250000, weight: "85g", purity: "22k (916)", image: "/designs/antique Haram.jpeg", description: "Traditional antique haram with intricate handcrafted designs." },
    { id: 3, name: "Broad Bangles", category: "Broad Bangles", price: 95000, weight: "35g", purity: "22k (916)", image: "/designs/broad bangles.jpeg", description: "Beautiful broad bangles with stunning craftsmanship." },
    { id: 4, name: "Gold Kada for Men", category: "Gold Kada for Men", price: 75000, weight: "25g", purity: "22k (916)", image: "/designs/gold kada for men.jpeg", description: "Solid gold kada designed specifically for men." },
    { id: 5, name: "Gold Vaddanam", category: "Gold Vaddanam", price: 450000, weight: "150g", purity: "22k (916)", image: "/designs/gold vaddanam.jpeg", description: "Traditional bridal vaddanam with exquisite detailing." },
    { id: 6, name: "Men's Gold Chain", category: "Men's Gold Chain", price: 55000, weight: "18g", purity: "22k (916)", image: "/designs/men's Gold chain.jpeg", description: "Classic gold chain for men with premium finish." },
    { id: 7, name: "Necklace", category: "Necklace", price: 120000, weight: "40g", purity: "22k (916)", image: "/designs/neckles.jpeg", description: "Elegant necklace with beautiful traditional designs." },
    { id: 8, name: "Plain Bangles", category: "Plain Bangles", price: 65000, weight: "20g", purity: "22k (916)", image: "/designs/plain bangles.jpeg", description: "Simple and elegant plain gold bangles for daily wear." }
];
