import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { MyCourses } from "@/components/dashboard/MyCourses";
import { CoursePlayer } from "@/components/dashboard/CoursePlayer";
import { Certificates } from "@/components/dashboard/Certificates";
import { StudentProfile } from "@/components/dashboard/StudentProfile";
import { Footer } from "@/components/Footer";

type DashboardView = "home" | "courses" | "course-player" | "certificates" | "profile";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>("home");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleViewCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView("course-player");
  };

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <DashboardHome onViewCourse={handleViewCourse} />;
      case "courses":
        return <MyCourses onViewCourse={handleViewCourse} />;
      case "course-player":
        return <CoursePlayer courseId={selectedCourseId} onBack={() => setCurrentView("courses")} />;
      case "certificates":
        return <Certificates />;
      case "profile":
        return <StudentProfile />;
      default:
        return <DashboardHome onViewCourse={handleViewCourse} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
        
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
