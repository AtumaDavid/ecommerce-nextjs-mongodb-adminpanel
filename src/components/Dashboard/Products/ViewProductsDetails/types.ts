import { IconType } from "react-icons";

export type ProductTabName =
  | "Information"
  | "Images"
  | "Variation"
  | "Offer"
  | "Video"
  | "Shipping & Return"
  | "SEO";

export interface TabButtonProps {
  tab: ProductTabName;
  icon: IconType;
  activeTab: ProductTabName;
  onTabChange: (tab: ProductTabName) => void;
  children?: React.ReactNode;
}

export interface DropdownItemProps {
  tab: ProductTabName;
  icon: IconType;
  color: string;
}
