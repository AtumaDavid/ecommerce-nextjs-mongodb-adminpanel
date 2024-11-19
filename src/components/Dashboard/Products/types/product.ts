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
