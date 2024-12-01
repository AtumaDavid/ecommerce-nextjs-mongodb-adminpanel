// types/product.ts
export interface Product {
  _id: number;
  name: string;
  // sku: string;
  categoryInfo: CategoryInfo;
  images: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  status: "Active" | "Inactive";
  description: string;
  barcode: string;
  tax: "No Vat" | "Vat-5" | "Vat-10" | "Vat-20";
  canPurchasable: string;
  showStockOut: string;
  refundable: string;
  maxPurchaseQuantity: string;
  lowStockWarning: string;
  unit: string;
  weight?: string;
  tags: string[];
  createdAt: Date;
}

export type SortField = keyof Pick<
  Product,
  | "name"
  | "category"
  | "buyingPrice"
  | "sellingPrice"
  | "status"
  | "createdAt"
  | "categoryInfo"
>;

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface TableControlsProps {
  onSearch: (query: string) => void;
  onAddProduct: () => void;
  searchQuery: string;
  onExport: (type: "print" | "excel") => void;
}

export interface ProductTableProps {
  products: Product[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  formatPrice: (price: number) => string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

//  PRODUCT FORM
export interface ProductFormData {
  _id?: number;
  images: string;
  name: string;
  // sku: string;
  categoryInfo: CategoryInfo;
  barcode: string;
  buyingPrice: string;
  sellingPrice: string;
  tax: "No Vat" | "Vat-5" | "Vat-10" | "Vat-20";
  status: string;
  canPurchasable: string;
  showStockOut: string;
  refundable: string;
  maxPurchaseQuantity: string;
  lowStockWarning: string;
  unit: string;
  weight?: string;
  tags: string[];
  description: string;
  createdAt?: Date;
}

interface CategoryInfo {
  gender: string;
  category: string;
  subcategory: string;
}
