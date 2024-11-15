export const formatProductUrl = ({
  category,
  subcategory,
  gender,
}: {
  category?: string;
  subcategory?: string;
  gender?: string;
}) => {
  const params = new URLSearchParams();

  // Include gender if provided
  if (gender) {
    params.set("gender", gender.toLowerCase());
  }

  // Include category if provided
  if (category) {
    params.set("category", category.toLowerCase());
  }

  // Include subcategory if provided
  if (subcategory) {
    params.set("subcategory", encodeURIComponent(subcategory));
  }

  return `/products?${params.toString()}`;
};
