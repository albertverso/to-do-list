import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

export default function AppRouter() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === "/Login" || location.pathname === "/not-found"; 

    function ScrollToTopOnRouteChange() {
        const { pathname } = useLocation();
      
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
      
        return null;
      }

    return (
        <div className="dark:bg-[#190028] h-full pb-8">
            <ScrollToTopOnRouteChange/>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/todo-list/" element={<Navigate to="/Login" />} />
                <Route path="/" element={<Navigate to="/Login" />}></Route>
                <Route path="*" element={<Navigate to="/not-found" />}></Route>
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
                    path="/not-found"
                    element={
                        <PublicRoute>
                            <PageNotFound />
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
                <Route
                    path="/Criar-Tarefas"
                    element={
                        <ProtectedRoute>
                            <CreateTask/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Editar-Tarefas"
                    element={
                        <ProtectedRoute>
                            <EditTask/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Favoritos"
                    element={
                        <ProtectedRoute>
                            <Favorites/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Profile"
                    element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
            {!hideHeaderFooter && <Footer/>}
        </div>
    )
}