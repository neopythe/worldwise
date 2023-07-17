import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import AuthProvider from "@/context/FakeAuthContext";
import CitiesProvider from "@/context/CitiesContext";

import AppLayout from "@/pages/AppLayout";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import PageNotFound from "@/pages/PageNotFound";
import Pricing from "@/pages/Pricing";
import Product from "@/pages/Product";
import ProtectedRoute from "@/pages/ProtectedRoute";

import CityDetails from "@/components/City";
import CityList from "@/components/CityList";
import CountryList from "@/components/CountryList";
import Form from "@/components/Form";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />{" "}
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<CityDetails />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
