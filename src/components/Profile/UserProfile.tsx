import React from "react";
// import Image from "next/image";

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="w-[120px] h-[120px] rounded-full border-2 border-primary mb-4 overflow-hidden">
        <div className="w-full h-full bg-primary flex items-center justify-center">
          {/* Placeholder avatar - you can replace with actual image */}
          <div className="w-full h-full bg-primary-light">img</div>
        </div>
      </div>
      <h2 className="text-2xl font-medium text-gray-900 mb-1">Will Smith</h2>
      <p className="text-gray-500">+880125333344</p>
    </div>
  );
};

export default UserProfile;
