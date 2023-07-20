import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import AuthProvider from "@/context/FakeAuthContext";
import CitiesProvider from "@/context/CitiesContext";

import ProtectedRoute from "@/pages/ProtectedRoute";

import CityDetails from "@/components/City";
import CityList from "@/components/CityList";
import CountryList from "@/components/CountryList";
import Form from "@/components/Form";
import SpinnerFullPage from "@/components/SpinnerFullPage";

// Dynamic imports

const AppLayout = lazy(() => import("@/pages/AppLayout"));
const Homepage = lazy(() => import("@/pages/Homepage"));
const Login = lazy(() => import("@/pages/Login"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Product = lazy(() => import("@/pages/Product"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
