import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  StarsCanvas,
} from "./components";

import ProjectsPage from "./pages/projects";

const HomePage = () => {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>

      <About />
      <Tech />

      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;