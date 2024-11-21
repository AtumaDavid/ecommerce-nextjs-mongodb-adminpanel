// types/product.ts
export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  status: "Active" | "Inactive";
  description: string;
  barcode: number;
  tax: "No Vat" | "Vat-5" | "Vat-10" | "Vat-20";
  canPurchasable: string;
  showStockOut: string;
  refundable: string;
  maxPurchaseQuantity: string;
  lowStockWarning: string;
  unit: string;
  weight?: string;
  tags: string[];
}

export type SortField = keyof Pick<
  Product,
  "name" | "category" | "buyingPrice" | "sellingPrice" | "status"
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

//  ASDFG
export interface ProductFormData {
  name: string;
  sku: string;
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
}

interface CategoryInfo {
  gender: string;
  category: string;
  subcategory: string;
}
