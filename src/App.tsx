import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { WorkPage } from "./pages/WorkPage";
import { CaseStudy } from "./pages/CaseStudy";
import { ContactPage } from "./pages/ContactPage";
import { ProcessPage } from "./pages/ProcessPage";
import { NotFound } from "./pages/NotFound";
import { ScrollToHash } from "./components/ScrollToHash";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToHash />
        <div className="relative min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col justify-between">
          {/* Custom Interactive Desktop Cursor */}
          <CustomCursor />

          {/* Global Navigation Header */}
          <Navbar />

          {/* Main Content Router */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<CaseStudy />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Site Footer */}
          <Footer />
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
