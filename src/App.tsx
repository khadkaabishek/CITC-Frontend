import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AIRegistrationPage from './pages/AIRegistrationPage';
import JoinClubPage from './pages/JoinClubPage';
import ScrollToTop from './components/ScrollToTop';
import formbricks from "@formbricks/js";

if (typeof window !== "undefined") {
  formbricks.setup({
    environmentId: "cmkea24meoa7gad010xyamzmr",
    appUrl: "https://app.formbricks.com",
  });
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/register/ai" element={<AIRegistrationPage />} />
        <Route path="/join" element={<JoinClubPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
