import { useState } from "react";

const tabContent = {
  Home: "This is your home dashboard. Overview and stats go here.",
  Address: "Manage your shipping and billing addresses.",
  Orders: "View your past and current orders.",
  Profile: "Edit your profile information here.",
  Settings: "Adjust your account settings, preferences, etc.",
  Logout: "You're about to leave us... 😢",
};

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="container pt-15 m-auto">
      <div className="py-3 mt-5">
        <h1 className="heading text-4xl">Welcome to your dashboard!</h1>
      </div>

      <div className="flex mt-5 relative border rounded-md mb-5 h-full overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-48 border-r sticky top-0 bg-gray-50">
          {Object.keys(tabContent).map((tab) => (
            <div
              key={tab}
              className={`tab px-4 py-3 cursor-pointer border-b text-left ${
                activeTab === tab
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-lg">{tabContent[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};
