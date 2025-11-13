import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { InstructorSidebar } from "@/components/instructor/InstructorSidebar";
import { InstructorHome } from "@/components/instructor/InstructorHome";
import { ManageCourses } from "@/components/instructor/ManageCourses";
import { CourseEditor } from "@/components/instructor/CourseEditor";
import { StudentProgress } from "@/components/instructor/StudentProgress";
import { Messages } from "@/components/instructor/Messages";
import { CertificateManager } from "@/components/instructor/CertificateManager";
import { Footer } from "@/components/Footer";

type InstructorView = "home" | "courses" | "course-editor" | "students" | "messages" | "certificates";

export default function Instructor() {
  const [currentView, setCurrentView] = useState<InstructorView>("home");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleEditCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView("course-editor");
  };

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <InstructorHome />;
      case "courses":
        return <ManageCourses onEditCourse={handleEditCourse} />;
      case "course-editor":
        return <CourseEditor courseId={selectedCourseId} onBack={() => setCurrentView("courses")} />;
      case "students":
        return <StudentProgress />;
      case "messages":
        return <Messages />;
      case "certificates":
        return <CertificateManager />;
      default:
        return <InstructorHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        <InstructorSidebar currentView={currentView} onViewChange={setCurrentView} />
        
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
