import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const Home        = lazy(() => import("./pages/Home"));
const Cars        = lazy(() => import("./pages/Cars"));
const CarDetails  = lazy(() => import("./pages/CarDetails"));
const Login       = lazy(() => import("./pages/Login"));
const Register    = lazy(() => import("./pages/Register"));
const MyBookings  = lazy(() => import("./pages/MyBookings"));
const Admin       = lazy(() => import("./pages/AdminDashboard"));
const GoogleSuccess = lazy(() => import("./pages/GoogleSuccess"));

const Loader = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh", color:"#64748b", fontSize:"0.9rem" }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background:"#1e293b", color:"#f0f0f5", border:"1px solid rgba(255,255,255,0.08)", fontSize:"0.88rem" },
          success: { iconTheme: { primary:"#22c55e", secondary:"#fff" } },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          <Route path="/cars" element={<Suspense fallback={<Loader />}><Cars /></Suspense>} />
          <Route path="/cars/:id" element={<Suspense fallback={<Loader />}><CarDetails /></Suspense>} />
          <Route path="/my-bookings" element={<ProtectedRoute><Suspense fallback={<Loader />}><MyBookings /></Suspense></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><Suspense fallback={<Loader />}><Admin /></Suspense></AdminRoute>} />
        </Route>
        <Route path="/login" element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<Loader />}><Register /></Suspense>} />
        <Route path="/auth/google/success" element={<Suspense fallback={<Loader />}><GoogleSuccess /></Suspense>} />
        <Route path="*" element={
          <div style={{ textAlign:"center", padding:"120px 20px", color:"#64748b" }}>
            <h1 style={{ fontSize:"4rem", color:"#2563eb" }}>404</h1>
            <p style={{ marginTop:12 }}>Page not found.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}
export default App;
