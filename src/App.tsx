import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import type { City } from "@/types";

import AppLayout from "@/pages/AppLayout";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import PageNotFound from "@/pages/PageNotFound";
import Pricing from "@/pages/Pricing";
import Product from "@/pages/Product";

import CityDetails from "@/components/City";
import CityList from "@/components/CityList";
import CountryList from "@/components/CountryList";
import Form from "@/components/Form";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
      .then((response) => response.json())
      .then((data: City[]) => {
        setCities(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" replace />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<CityDetails />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
