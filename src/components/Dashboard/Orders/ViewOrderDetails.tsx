import React from "react";
import { FiClock, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

// Types
interface OrderItem {
  name: string;
  variant: string;
  size: string;
  price: number;
}

interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderDetails {
  orderId: string;
  date: string;
  paymentType: string;
  orderType: string;
  status: {
    payment: "paid" | "unpaid";
    order: "pending" | "processing" | "completed";
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
  shippingAddress: Address;
  billingAddress: Address;
}

// Status Badge Component
const StatusBadge: React.FC<{
  type: string;
  status: string;
}> = ({ type, status }) => {
  const getStatusColor = () => {
    if (type === "payment") {
      return status === "paid"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600";
    }
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <span
      className={`${getStatusColor()} px-3 py-1 rounded-full text-sm font-medium`}
    >
      {status}
    </span>
  );
};

// Order Item Component
const OrderItem: React.FC<{
  item: OrderItem;
}> = ({ item }) => (
  <div className="flex items-center py-4 border-b last:border-0">
    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-4">
      <img
        src="https://via.placeholder.com/64"
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-gray-900">{item.name}</h3>
      <p className="text-sm text-gray-500">
        {item.variant} | {item.size}
      </p>
      <p className="text-gray-700">₦{item.price.toFixed(2)}</p>
    </div>
  </div>
);

// Address Card Component
const AddressCard: React.FC<{
  title: string;
  address: Address;
}> = ({ title, address }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="flex items-center mb-3">
      <FiUser className="text-gray-500 mr-2" />
      <span className="font-medium">{address.name}</span>
    </div>
    <div className="space-y-2 text-gray-600">
      <p className="flex items-center">
        <FiMail className="mr-2" />
        {address.email}
      </p>
      <p className="flex items-center">
        <FiPhone className="mr-2" />
        {address.phone}
      </p>
      <p className="flex items-start">
        <FiMapPin className="mr-2 mt-1 flex-shrink-0" />
        <span>{address.address}</span>
      </p>
    </div>
  </div>
);

// Order Summary Component
const OrderSummary: React.FC<{
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
}> = ({ subtotal, tax, discount, shipping }) => {
  const total = subtotal + tax - discount + shipping;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₦{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₦{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₦{shipping.toFixed(2)}</span>
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Order Details Page Component
const OrderDetailsPage: React.FC = () => {
  // Sample data - in real app would come from props or API
  const orderData: OrderDetails = {
    orderId: "1811243",
    date: "05:55 PM, 18-11-2024",
    paymentType: "Cash On Delivery",
    orderType: "Delivery",
    status: {
      payment: "unpaid",
      order: "pending",
    },
    items: [
      {
        name: "Air Hoodie",
        variant: "Black",
        size: "S",
        price: 100.0,
      },
      {
        name: "Ultra Bounce Shoes",
        variant: "Black",
        size: "S",
        price: 80.0,
      },
      {
        name: "Essential Hat",
        variant: "Black",
        size: "S",
        price: 60.0,
      },
    ],
    subtotal: 240.0,
    tax: 28.0,
    discount: 0.0,
    shipping: 10.0,
    shippingAddress: {
      name: "Will Smith",
      email: "customer@example.com",
      phone: "+880125333344",
      address:
        "House:3, Road:1, Block:C, Mirpur 2, Dhaka, Dhaka, Bangladesh, 1216",
    },
    billingAddress: {
      name: "Will Smith",
      email: "customer@example.com",
      phone: "+880125333344",
      address:
        "House:3, Road:1, Block:C, Mirpur 2, Dhaka, Dhaka, Bangladesh, 1216",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Order ID:{" "}
                <span className="text-purple-600">#{orderData.orderId}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="flex items-center text-gray-500">
                  <FiClock className="mr-1" />
                  {orderData.date}
                </span>
                <StatusBadge type="payment" status={orderData.status.payment} />
                <StatusBadge type="order" status={orderData.status.order} />
              </div>
              <div className="mt-2 text-gray-600">
                <p>Payment Type: {orderData.paymentType}</p>
                <p>Order Type: {orderData.orderType}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Reject
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Accept
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="divide-y">
                {orderData.items.map((item, index) => (
                  <OrderItem key={index} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <OrderSummary
              subtotal={orderData.subtotal}
              tax={orderData.tax}
              discount={orderData.discount}
              shipping={orderData.shipping}
            />
            <AddressCard
              title="Shipping Address"
              address={orderData.shippingAddress}
            />
            <AddressCard
              title="Billing Address"
              address={orderData.billingAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
