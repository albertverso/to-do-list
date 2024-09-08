import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function AppRouter() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === "/Login"; 

    return (
        <>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/todo-list/" element={<Navigate to="/Login" />} />
                <Route path="/" element={<Navigate to="/Login" />}></Route>
                {/* <Route path="*" element={<PageNotFound></PageNotFound>} /> */}
                <Route
                    path="/Login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/Home"
                    element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
            {!hideHeaderFooter && <Footer/>}
        </>
    )
}