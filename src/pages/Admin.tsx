import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHome } from "@/components/admin/AdminHome";
import { UserManagement } from "@/components/admin/UserManagement";
import { CourseManagement } from "@/components/admin/CourseManagement";
import { PaymentManagement } from "@/components/admin/PaymentManagement";
import { CouponManagement } from "@/components/admin/CouponManagement";
import { Settings } from "@/components/admin/Settings";
import { Footer } from "@/components/Footer";

type AdminView = "home" | "users" | "courses" | "payments" | "coupons" | "settings";

export default function Admin() {
  const [currentView, setCurrentView] = useState<AdminView>("home");

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <AdminHome />;
      case "users":
        return <UserManagement />;
      case "courses":
        return <CourseManagement />;
      case "payments":
        return <PaymentManagement />;
      case "coupons":
        return <CouponManagement />;
      case "settings":
        return <Settings />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
