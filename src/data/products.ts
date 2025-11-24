// Import áo quần
import ajax2525 from "../assets/clothes/ajax2525.png";
import ajax2526khach from "../assets/clothes/ajax2526khach.png";
import benfica2526khach from "../assets/clothes/benfica2526khach.png";
import milan2526 from "../assets/clothes/milan2526.png";
import mu2525khach from "../assets/clothes/mu2525khach.png";
import mu2526 from "../assets/clothes/mu2526.png";
import real2526 from "../assets/clothes/real2526.png";
import real2526khach from "../assets/clothes/real2526khach.png";
import tot2526 from "../assets/clothes/tot2526.png";
import tot2526khach from "../assets/clothes/tot2526khach.png";

// Import giày bóng đá
import adidasCopaGloro from "../assets/shoes/football/AdidasCopaGloro.png";
import adidasF50League from "../assets/shoes/football/AdidasF50League.png";
import adidasF50Messi from "../assets/shoes/football/AdidasF50Messi.png";
import mizunoMoreliaNeoSala from "../assets/shoes/football/MizunoMoreliaNeoSala.png";
import mizunoMoreliaSalaElite from "../assets/shoes/football/MizunoMoreliaSalaElite.png";
import nikeMerSuperfly10 from "../assets/shoes/football/nikeMerSuperfly10.png";
import nikeMerVaper16Aca from "../assets/shoes/football/nikeMerVaper16Aca.png";
import nikeMerVapor15Pro from "../assets/shoes/football/NikeMerVapor15Pro.png";
import nikeTiempoLegendAca from "../assets/shoes/football/nikeTiempoLegendAca.png";
import pumaFuture8Pro from "../assets/shoes/football/pumaFuture8Pro.png";

// Import giày cầu lông
import kawasaki3307 from "../assets/shoes/badminton/Kawasaki3307.png";
import kawasaki3324 from "../assets/shoes/badminton/Kawasaki3324.png";
import kawasakiK065 from "../assets/shoes/badminton/KawasakiK065.png";
import kawasakiK065Den from "../assets/shoes/badminton/KawasakiK065_đen.png";
import kawasakiK086 from "../assets/shoes/badminton/KawasakiK086.png";
import kawasakiK173 from "../assets/shoes/badminton/KawasakiK173.png";
import kawasakiK176 from "../assets/shoes/badminton/KawasakiK176.png";
import kawasakiK1841 from "../assets/shoes/badminton/KawasakiK1841.png";
import kawasakiK2b50A3308 from "../assets/shoes/badminton/KawasakiK2b50-a3308.png";
import kawasakiK367 from "../assets/shoes/badminton/KawasakiK367.png";

export interface Product {
  id: string;
  name: string;
  category: "clothes" | "shoes";
  subCategory: "football" | "badminton" | "jersey";
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description: string;
  brand: string;
  sizes: string[];
  sizeStock: { [size: string]: number };
  colors: string[];
  inStock: boolean;
}

export const products: Product[] = [
  // Áo đấu
  {
    id: "CLO001",
    name: "Áo Ajax 2025",
    category: "clothes",
    subCategory: "jersey",
    price: 230000,
    image: ajax2525,
    description: "Áo đấu Ajax mùa giải 2025",
    brand: "Ajax",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 15, M: 32, L: 0, XL: 8, XXL: 25 },
    colors: ["Đỏ trắng"],
    inStock: true,
  },
  {
    id: "CLO002",
    name: "Áo Ajax 2025/26 Khách",
    category: "clothes",
    subCategory: "jersey",
    price: 230000,
    image: ajax2526khach,
    description: "Áo đấu sân khách Ajax mùa giải 2025/26",
    brand: "Ajax",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 0, M: 22, L: 45, XL: 12, XXL: 3 },
    colors: ["Trắng"],
    inStock: true,
  },
  {
    id: "CLO003",
    name: "Áo Benfica 2025/26 Khách",
    category: "clothes",
    subCategory: "jersey",
    price: 230000,
    image: benfica2526khach,
    description: "Áo đấu sân khách Benfica mùa giải 2025/26",
    brand: "Benfica",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 28, M: 0, L: 18, XL: 35, XXL: 7 },
    colors: ["Xanh"],
    inStock: true,
  },
  {
    id: "CLO004",
    name: "Áo AC Milan 2025/26",
    category: "clothes",
    subCategory: "jersey",
    price: 250000,
    image: milan2526,
    description: "Áo đấu AC Milan mùa giải 2025/26",
    brand: "AC Milan",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 5, M: 42, L: 38, XL: 0, XXL: 15 },
    colors: ["Đỏ đen"],
    inStock: true,
  },
  {
    id: "CLO005",
    name: "Áo Manchester United 2025 Khách",
    category: "clothes",
    subCategory: "jersey",
    price: 250000,
    image: mu2525khach,
    description: "Áo đấu sân khách Manchester United 2025",
    brand: "Manchester United",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 20, M: 48, L: 35, XL: 22, XXL: 0 },
    colors: ["Trắng"],
    inStock: true,
  },
  {
    id: "CLO006",
    name: "Áo Manchester United 2025/26",
    category: "clothes",
    subCategory: "jersey",
    price: 250000,
    image: mu2526,
    description: "Áo đấu Manchester United mùa giải 2025/26",
    brand: "Manchester United",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 0, M: 15, L: 50, XL: 30, XXL: 12 },
    colors: ["Đỏ"],
    inStock: true,
  },
  {
    id: "CLO007",
    name: "Áo Real Madrid 2025/26",
    category: "clothes",
    subCategory: "jersey",
    price: 250000,
    image: real2526,
    description: "Áo đấu Real Madrid mùa giải 2025/26",
    brand: "Real Madrid",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 33, M: 27, L: 41, XL: 0, XXL: 19 },
    colors: ["Trắng"],
    inStock: true,
  },
  {
    id: "CLO008",
    name: "Áo Real Madrid 2025/26 Khách",
    category: "clothes",
    subCategory: "jersey",
    price: 250000,
    image: real2526khach,
    description: "Áo đấu sân khách Real Madrid mùa giải 2025/26",
    brand: "Real Madrid",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 9, M: 0, L: 24, XL: 46, XXL: 31 },
    colors: ["Đen"],
    inStock: true,
  },
  {
    id: "CLO009",
    name: "Áo Tottenham 2025/26",
    category: "clothes",
    subCategory: "jersey",
    price: 329000,
    image: tot2526,
    description: "Áo đấu Tottenham mùa giải 2025/26",
    brand: "Tottenham",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 17, M: 38, L: 29, XL: 5, XXL: 0 },
    colors: ["Trắng"],
    inStock: true,
  },
  {
    id: "CLO010",
    name: "Áo Tottenham 2025/26 Khách",
    category: "clothes",
    subCategory: "jersey",
    price: 329000,
    image: tot2526khach,
    description: "Áo đấu sân khách Tottenham mùa giải 2025/26",
    brand: "Tottenham",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeStock: { S: 0, M: 44, L: 36, XL: 21, XXL: 8 },
    colors: ["Xanh navy"],
    inStock: true,
  },

  // Giày bóng đá
  {
    id: "SHO001",
    name: "Adidas Copa Gloro",
    category: "shoes",
    subCategory: "football",
    price: 1890000,
    image: adidasCopaGloro,
    description: "Giày bóng đá Adidas Copa Gloro - Da thật cao cấp",
    brand: "Adidas",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 12, "40": 28, "41": 0, "42": 35, "43": 19, "44": 6 },
    colors: ["Đen"],
    inStock: true,
  },
  {
    id: "SHO002",
    name: "Adidas F50 League",
    category: "shoes",
    subCategory: "football",
    price: 2290000,
    image: adidasF50League,
    description: "Giày bóng đá Adidas F50 League - Tốc độ vượt trội",
    brand: "Adidas",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 0, "40": 15, "41": 42, "42": 38, "43": 7, "44": 23 },
    colors: ["Cam đen"],
    inStock: true,
  },
  {
    id: "SHO003",
    name: "Adidas F50 Messi",
    category: "shoes",
    subCategory: "football",
    price: 2590000,
    image: adidasF50Messi,
    description: "Giày bóng đá Adidas F50 Messi - Phiên bản đặc biệt",
    brand: "Adidas",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 25, "40": 0, "41": 31, "42": 47, "43": 14, "44": 0 },
    colors: ["Xanh dương"],
    inStock: true,
  },
  {
    id: "SHO004",
    name: "Mizuno Morelia Neo Sala",
    category: "shoes",
    subCategory: "football",
    price: 1990000,
    image: mizunoMoreliaNeoSala,
    description:
      "Giày bóng đá Mizuno Morelia Neo Sala - Cảm giác chạm bóng tuyệt vời",
    brand: "Mizuno",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 8, "40": 33, "41": 26, "42": 0, "43": 40, "44": 11 },
    colors: ["Trắng xanh"],
    inStock: true,
  },
  {
    id: "SHO005",
    name: "Mizuno Morelia Sala Elite",
    category: "shoes",
    subCategory: "football",
    price: 2190000,
    image: mizunoMoreliaSalaElite,
    description: "Giày bóng đá Mizuno Morelia Sala Elite - Cao cấp nhất",
    brand: "Mizuno",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 0, "40": 19, "41": 45, "42": 29, "43": 0, "44": 16 },
    colors: ["Đen vàng"],
    inStock: true,
  },
  {
    id: "SHO006",
    name: "Nike Mercurial Superfly 10",
    category: "shoes",
    subCategory: "football",
    price: 2790000,
    image: nikeMerSuperfly10,
    description: "Giày bóng đá Nike Mercurial Superfly 10 - Tốc độ đỉnh cao",
    brand: "Nike",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 22, "40": 37, "41": 10, "42": 50, "43": 0, "44": 28 },
    colors: ["Cam"],
    inStock: true,
  },
  {
    id: "SHO007",
    name: "Nike Mercurial Vapor 16 Academy",
    category: "shoes",
    subCategory: "football",
    price: 1590000,
    image: nikeMerVaper16Aca,
    description: "Giày bóng đá Nike Mercurial Vapor 16 Academy",
    brand: "Nike",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 5, "40": 0, "41": 34, "42": 18, "43": 43, "44": 9 },
    colors: ["Xanh lá"],
    inStock: true,
  },
  {
    id: "SHO008",
    name: "Nike Mercurial Vapor 15 Pro",
    category: "shoes",
    subCategory: "football",
    price: 2390000,
    image: nikeMerVapor15Pro,
    description: "Giày bóng đá Nike Mercurial Vapor 15 Pro",
    brand: "Nike",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 0, "40": 26, "41": 48, "42": 21, "43": 13, "44": 0 },
    colors: ["Đen trắng"],
    inStock: true,
  },
  {
    id: "SHO009",
    name: "Nike Tiempo Legend Academy",
    category: "shoes",
    subCategory: "football",
    price: 1690000,
    image: nikeTiempoLegendAca,
    description: "Giày bóng đá Nike Tiempo Legend Academy - Kiểm soát bóng tốt",
    brand: "Nike",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 30, "40": 44, "41": 0, "42": 36, "43": 17, "44": 4 },
    colors: ["Đen"],
    inStock: true,
  },
  {
    id: "SHO010",
    name: "Puma Future 8 Pro",
    category: "shoes",
    subCategory: "football",
    price: 2290000,
    image: pumaFuture8Pro,
    description: "Giày bóng đá Puma Future 8 Pro - Linh hoạt tối đa",
    brand: "Puma",
    sizes: ["39", "40", "41", "42", "43", "44"],
    sizeStock: { "39": 14, "40": 0, "41": 27, "42": 49, "43": 32, "44": 20 },
    colors: ["Xanh dương"],
    inStock: true,
  },

  // Giày cầu lông
  {
    id: "SHO011",
    name: "Kawasaki 3307",
    category: "shoes",
    subCategory: "badminton",
    price: 890000,
    image: kawasaki3307,
    description: "Giày cầu lông Kawasaki 3307 - Êm ái và bền bỉ",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 18, "39": 35, "40": 0, "41": 41, "42": 24, "43": 7 },
    colors: ["Xanh trắng"],
    inStock: true,
  },
  {
    id: "SHO012",
    name: "Kawasaki 3324",
    category: "shoes",
    subCategory: "badminton",
    price: 950000,
    image: kawasaki3324,
    description: "Giày cầu lông Kawasaki 3324",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 0, "39": 22, "40": 47, "41": 15, "42": 0, "43": 38 },
    colors: ["Đỏ đen"],
    inStock: true,
  },
  {
    id: "SHO013",
    name: "Kawasaki K065",
    category: "shoes",
    subCategory: "badminton",
    price: 790000,
    image: kawasakiK065,
    description: "Giày cầu lông Kawasaki K065 - Nhẹ và linh hoạt",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 9, "39": 0, "40": 31, "41": 44, "42": 19, "43": 12 },
    colors: ["Trắng xanh"],
    inStock: true,
  },
  {
    id: "SHO014",
    name: "Kawasaki K065 Đen",
    category: "shoes",
    subCategory: "badminton",
    price: 790000,
    image: kawasakiK065Den,
    description: "Giày cầu lông Kawasaki K065 - Phiên bản đen",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 27, "39": 50, "40": 16, "41": 0, "42": 33, "43": 0 },
    colors: ["Đen"],
    inStock: true,
  },
  {
    id: "SHO015",
    name: "Kawasaki K086",
    category: "shoes",
    subCategory: "badminton",
    price: 850000,
    image: kawasakiK086,
    description: "Giày cầu lông Kawasaki K086",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 0, "39": 13, "40": 39, "41": 28, "42": 6, "43": 45 },
    colors: ["Xanh navy"],
    inStock: true,
  },
  {
    id: "SHO016",
    name: "Kawasaki K173",
    category: "shoes",
    subCategory: "badminton",
    price: 990000,
    image: kawasakiK173,
    description: "Giày cầu lông Kawasaki K173 - Đế chống trượt tốt",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 21, "39": 36, "40": 0, "41": 48, "42": 11, "43": 25 },
    colors: ["Xanh lá"],
    inStock: true,
  },
  {
    id: "SHO017",
    name: "Kawasaki K176",
    category: "shoes",
    subCategory: "badminton",
    price: 990000,
    image: kawasakiK176,
    description: "Giày cầu lông Kawasaki K176",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 4, "39": 0, "40": 29, "41": 42, "42": 17, "43": 0 },
    colors: ["Đỏ trắng"],
    inStock: true,
  },
  {
    id: "SHO018",
    name: "Kawasaki K1841",
    category: "shoes",
    subCategory: "badminton",
    price: 1090000,
    image: kawasakiK1841,
    description: "Giày cầu lông Kawasaki K1841 - Cao cấp",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 0, "39": 24, "40": 46, "41": 33, "42": 0, "43": 19 },
    colors: ["Cam đen"],
    inStock: true,
  },
  {
    id: "SHO019",
    name: "Kawasaki K2B50-A3308",
    category: "shoes",
    subCategory: "badminton",
    price: 1190000,
    image: kawasakiK2b50A3308,
    description: "Giày cầu lông Kawasaki K2B50-A3308 - Chuyên nghiệp",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 16, "39": 40, "40": 23, "41": 0, "42": 37, "43": 8 },
    colors: ["Xanh vàng"],
    inStock: true,
  },
  {
    id: "SHO020",
    name: "Kawasaki K367",
    category: "shoes",
    subCategory: "badminton",
    price: 890000,
    image: kawasakiK367,
    description: "Giày cầu lông Kawasaki K367",
    brand: "Kawasaki",
    sizes: ["38", "39", "40", "41", "42", "43"],
    sizeStock: { "38": 34, "39": 0, "40": 20, "41": 50, "42": 14, "43": 26 },
    colors: ["Xanh đen"],
    inStock: true,
  },
];

// Helper functions
export const getProductById = (id: string | number): Product | undefined => {
  return products.find((product) => product.id === String(id));
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductsBySubCategory = (subCategory: string): Product[] => {
  return products.filter((product) => product.subCategory === subCategory);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter((product) => product.brand === brand);
};

export const searchProducts = (keyword: string): Product[] => {
  const lowerKeyword = keyword.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerKeyword) ||
      product.brand.toLowerCase().includes(lowerKeyword) ||
      product.description.toLowerCase().includes(lowerKeyword)
  );
};
