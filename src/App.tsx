import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "@/pages/Homepage";
import Pricing from "@/pages/Pricing";
import Product from "@/pages/Product";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
