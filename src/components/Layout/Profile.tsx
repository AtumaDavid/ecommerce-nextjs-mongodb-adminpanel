import Link from "next/link";
import React from "react";
import {
  FaKey,
  FaLock,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaUndoAlt,
  FaUser,
} from "react-icons/fa";

type MenuItems = {
  icon: JSX.Element;
  label: string;
};

type User = {
  avatarUrl: string;
  name: string;
  phone: string;
};

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  const menuItems: MenuItems[] = [
    {
      icon: <FaLock className="mr-2" />,
      label: "Order History",
    },
    {
      icon: <FaUndoAlt className="mr-2" />,
      label: "Return Orders",
    },
    {
      icon: <FaUser className="mr-2" />,
      label: "Account Info",
    },
    {
      icon: <FaKey className="mr-2" />,
      label: "Change Password",
    },
    {
      icon: <FaMapMarkedAlt className="mr-2" />,
      label: "Address",
    },
    {
      icon: <FaSignOutAlt className="mr-2" />,
      label: "Logout",
    },
  ];
  return (
    <div className="w-full">
      <div className="flex space-x-4 items-center mb-4 border-b p-2">
        <div>
          {/* <Image/> */}
          <img
            src={user.avatarUrl}
            alt="profile avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div>
          {/* <h2 className="text-lg font-semibold">name</h2> */}
          <h2 className="text-lg font-semibold">{user.name}</h2>
          {/* <p className="text-sm text-gray-500">user.phone</p> */}
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
      </div>

      <div className="ml-4">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-1 block">
              <Link
                href={"/account"}
                className="flex items-center text-neutral-dark"
              >
                {item.icon}
                <span className="ms-2">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
