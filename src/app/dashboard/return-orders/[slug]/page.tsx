import Invoice from "@/components/Dashboard/Orders/ViewReturnOrderDetails";
import React from "react";

export default function page() {
  return (
    <div>
      <Invoice
        customer={{
          name: "Will Smith",
          phone: "125333344",
          email: "customer@example.com",
        }}
        reference="12313131"
        date="05:55 PM, 18-11-2024"
        reason="Ordered the wrong product or size"
        products={[
          {
            name: "Team Red Hoodie (White | S)",
            unitCost: 80,
            quantity: 1,
            discount: 0,
            taxes: 16,
            subtotal: 96,
          },
          {
            name: "Ultimate Hat (Black | M)",
            unitCost: 50,
            quantity: 1,
            discount: 0,
            taxes: 7.5,
            subtotal: 57.5,
          },
        ]}
        createdDate="05:55 PM, 18-11-2024"
      />
    </div>
  );
}
