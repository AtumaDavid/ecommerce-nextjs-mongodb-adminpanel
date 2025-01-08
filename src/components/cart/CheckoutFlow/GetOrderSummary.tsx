import axiosInstance from "@/lib/axiosInstance";

const GetOrderSummary = async () => {
  try {
    const response = await axiosInstance.get(`/cart`);
    console.log(response);

    // const order = response.data;
    // const subTotal = order.subTotal;
    // const tax = order.tax;
    // const discount = order.discount;
    // const shippingCharge = order.shippingCharge;
    // const total = order.total;

    // return {
    //   subTotal,
    //   tax,
    //   discount,
    //   shippingCharge,
    //   total,
    // };
  } catch (error) {
    console.error("Error fetching order summary:", error);
    return null;
  }
};

export default GetOrderSummary;
