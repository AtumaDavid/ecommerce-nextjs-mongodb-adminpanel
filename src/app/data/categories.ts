// src/data/categories.ts

export const CategoriesData = {
  Men: {
    name: "Men",
    image: "/men-cover.png",
    clothing: [
      "Hoodies & Sweatshirts",
      "Jackets & Vests",
      "Pants & Tights",
      "Shorts",
      "Tops & T-shirts",
    ],
    shoes: ["Basket Ball", "Running", "Sandals & Slides", "Sneakers", "Soccer"],
    accessories: ["Bags & Backpacks", "Hats & Beanies", "Socks", "Underwear"],
  },
  Women: {
    name: "Women",
    image: "/women-cover.png",
    clothing: [
      "Dresses & Skirts",
      "Hoodies & Sweatshirts",
      "Pants",
      "Tights & Leggings",
      "Tops & T-shirts",
    ],
    shoes: ["Running", "Sneakers", "Training & Gym"],
    accessories: ["Bags & Backpacks", "Hats", "Socks"],
  },
  Juniors: {
    name: "Juniors",
    image: "/juniors-cover.png",
    clothing: ["Hoodies & Sweatshirts", "Shorts", "Tops & T-shirts"],
    shoes: ["Basket Ball", "Running", "Sneakers"],
    accessories: ["Bags & Backpacks", "Hats"],
  },
} as const;

export const Categories = Object.keys(CategoriesData).map(
  (key) => CategoriesData[key as keyof typeof CategoriesData]
);
