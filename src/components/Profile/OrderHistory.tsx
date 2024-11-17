"use client";
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import { RiMoreLine } from "react-icons/ri";

type Order = {
  id: string;
  date: string;
  time: string;
  products: number;
  status: "Pending" | "Delivered";
  payment: "Paid" | "Unpaid";
  amount: number;
};

const orders: Order[] = [
  {
    id: "2310243",
    date: "23-10-2024",
    time: "02:54 PM",
    products: 3,
    status: "Pending",
    payment: "Unpaid",
    amount: 278.0,
  },
  {
    id: "2310242",
    date: "23-10-2024",
    time: "02:54 PM",
    products: 4,
    status: "Delivered",
    payment: "Paid",
    amount: 720.0,
  },
  {
    id: "2310241",
    date: "23-10-2024",
    time: "02:54 PM",
    products: 4,
    status: "Delivered",
    payment: "Paid",
    amount: 415.2,
  },
];

// Dropdown Context
const DropdownContext = createContext<{
  activeDropdown: string | null;
  toggleDropdown: (id: string) => void;
}>({
  activeDropdown: null,
  toggleDropdown: () => {},
});

const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };
  return (
    <DropdownContext.Provider value={{ activeDropdown, toggleDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

// Status Badge Component
const StatusBadge: React.FC<{ type: "status" | "payment"; value: string }> = ({
  value,
}) => {
  const getColors = () => {
    if (value === "Pending") return "bg-yellow-100 text-yellow-600";
    if (value === "Unpaid") return "bg-red-100 text-red-600";
    return "bg-green-100 text-green-600";
  };

  return (
    <span className={`${getColors()} py-1 px-3 rounded-full text-sm`}>
      {value}
    </span>
  );
};

// Dropdown Component
const Dropdown: React.FC<{ orderId: string }> = ({ orderId }) => {
  const { activeDropdown, toggleDropdown } = useContext(DropdownContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpen = activeDropdown === orderId;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        toggleDropdown(orderId);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, orderId, toggleDropdown]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown(orderId)}
        className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
      >
        <RiMoreLine size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {["View Details", "Cancel Order", "Track Order"].map((item) => (
              <button
                key={item}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => toggleDropdown(orderId)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Table Header Component
const OrderTableHeader: React.FC = () => (
  <thead>
    <tr>
      <th className="py-2">Order ID</th>
      <th className="py-2 hidden md:table-cell">Products</th>
      <th className="py-2">Status</th>
      <th className="py-2 hidden md:table-cell">Payment</th>
      <th className="py-2">Amount</th>
      <th className="py-2">Action</th>
    </tr>
  </thead>
);

// Table Row Component
const OrderTableRow: React.FC<{ order: Order }> = ({ order }) => (
  <tr className="border-t">
    <td className="py-2">
      <div>{order.id}</div>
      <div className="text-gray-500 text-sm">
        {order.time}, {order.date}
      </div>
    </td>
    <td className="py-2 hidden md:table-cell">{order.products} Product</td>
    <td className="py-2">
      <StatusBadge type="status" value={order.status} />
    </td>
    <td className="py-2 hidden md:table-cell">
      <StatusBadge type="payment" value={order.payment} />
    </td>
    <td className="py-2">${order.amount.toFixed(2)}</td>
    <td className="py-2">
      <Dropdown orderId={order.id} />
    </td>
  </tr>
);

// Pagination Component
const Pagination: React.FC<{
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}> = ({ totalItems, currentPage, itemsPerPage }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-4 text-gray-500">
      Showing <span className="font-semibold">{startItem}</span> to{" "}
      <span className="font-semibold">{endItem}</span> of{" "}
      <span className="font-semibold">{totalItems}</span> results
    </div>
  );
};

// Main Component
const OrderHistory: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-primary">Order History</h1>
    <div className="mt-6 bg-white rounded-lg shadow-lg p-4 lg:p-6 overflow-x-auto">
      <DropdownProvider>
        <table className="w-full text-left min-w-full">
          <OrderTableHeader />
          <tbody>
            {orders.map((order) => (
              <OrderTableRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </DropdownProvider>
      <Pagination
        totalItems={orders.length}
        currentPage={1}
        itemsPerPage={10}
      />
    </div>
  </div>
);

export default OrderHistory;
