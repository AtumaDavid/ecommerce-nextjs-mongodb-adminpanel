import {
  FaInfoCircle,
  FaImage,
  FaThLarge,
  //   FaEllipsisV,
  FaGift,
  FaVideo,
  FaShippingFast,
  FaGlobe,
} from "react-icons/fa";

// import { ProductDetail, DropdownItemProps, ProductTabName } from "./types";
import { DropdownItemProps, ProductTabName } from "./types";

export const PRIMARY_TABS = [
  { tab: "Information" as ProductTabName, icon: FaInfoCircle },
  { tab: "Images" as ProductTabName, icon: FaImage },
  { tab: "Variation" as ProductTabName, icon: FaThLarge },
];

export const DROPDOWN_ITEMS: DropdownItemProps[] = [
  { tab: "Offer", icon: FaGift, color: "text-gray-500" },
  { tab: "Video", icon: FaVideo, color: "text-gray-500" },
  { tab: "Shipping & Return", icon: FaShippingFast, color: "text-gray-500" },
  { tab: "SEO", icon: FaGlobe, color: "text-gray-500" },
];
