import { SidebarLayout } from "../../components/common/SideBar";

export default function CourseDetail() {
  return (
    <SidebarLayout>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      {/* rest of content */}
    </SidebarLayout>
  );
}
