import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiShoppingTag } from "react-icons/ci";
import { FaThLarge } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { RiProductHuntLine, RiRefund2Line } from "react-icons/ri";

interface DashboardSidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}
export default function Sidebar({
  openSidebar,
  setOpenSidebar,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  // const [activeLink, setActiveLink] = useState<string>("/dashboard");

  const sideBarSections = [
    {
      title: "Product & Stocks",
      items: [
        {
          icon: <RiProductHuntLine />,
          label: "Products",
          link: "/dashboard/products",
        },
        {
          icon: <RiProductHuntLine />,
          label: "Categories",
          link: "/dashboard/categories",
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          icon: <CiShoppingTag />,
          label: "View Orders",
          link: "/dashboard/orders",
        },
        {
          icon: <MdOutlineRemoveShoppingCart />,
          label: "Return Orders",
          link: "/dashboard/return-orders",
        },
        {
          icon: <RiRefund2Line />,
          label: "Return &  Refunds",
          link: "/dashboard/return-and-refund",
        },
      ],
    },
  ];
  return (
    <div className="h-full bg-white shadow-md w-64">
      <div className="p-4 scroll h-[90vh] overflow-x-hidden overflow-y-scroll">
        <Link
          href={"/dashboard"}
          className={`${
            pathname === "/dashboard"
              ? "bg-primary text-white font-semibold"
              : ""
          } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
          onClick={() => {
            // setActiveLink("Dashboard");
            setOpenSidebar(true);
          }}
        >
          <FaThLarge />
          <span className={`${!openSidebar && "hidden"} md:inline`}>
            Dashboard
          </span>
        </Link>
        {sideBarSections?.map((item, index) => (
          <div className="mt-4" key={index}>
            <h2 className="text-xs text-gray-500 font-semibold">
              {item?.title}
            </h2>
            <div className="mt-2">
              {item?.items?.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className={`${
                    item?.link === pathname
                      ? "bg-primary text-white font-semibold"
                      : ""
                  } flex items-center space-x-2 p-2 rounded-md cursor-pointer`}
                  // onClick={() => setActiveLink(item?.link)}
                >
                  {item.icon}
                  <span className="md:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
