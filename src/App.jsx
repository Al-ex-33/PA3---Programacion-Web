import { CourseProvider } from "./context/CourseContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <CourseProvider>
      <AppRoutes />
    </CourseProvider>
  );
}

export default App;
