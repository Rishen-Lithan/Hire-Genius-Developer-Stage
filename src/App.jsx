import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";
import CodeTest from "./stages/CodeTest";
import MethodsTest from "./stages/MethodsTest";
import KeyTest from "./stages/KeyTest";
import FinalStage from "./stages/FinalStage";

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/info' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/codes' element={<CodeTest />} />
                  <Route path='/methods' element={<MethodsTest />} />
                  <Route path='/keys' element={<KeyTest />} />
                  <Route path='/final-stage' element={<FinalStage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
