import React from "react";
import Users from "./Users";
import { useState } from "react";
import Posts from "./Posts";
import Side from "./Side";
import ContactTable from "./Contact";
import OrdersTable from "./Orders";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Users");
  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="bg-background h-screen">
      <div className="flex bg-background  text-blue">
        <Side onSelectMenuItem={handleSelectMenuItem} />
<<<<<<< HEAD
        <div className="flex-grow  p-8">
=======
        <div className="flex-grow p-8">
>>>>>>> f8a88c976d836e5d179d5bb4e4b71b1c06fabbb9
          {selectedMenuItem && (
            <div>
              {selectedMenuItem === "Users" && <Users />}
              {selectedMenuItem === "Posts" && <Posts />}
              {selectedMenuItem === "Contact" && <ContactTable />}
              {selectedMenuItem === "Orders" && <OrdersTable />}

              {/* Add more conditions for other menu items */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
