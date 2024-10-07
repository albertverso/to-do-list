import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import { useEffect, useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import animation from '/animation.gif';
import { RiLoopRightFill } from "react-icons/ri";
import { getWakeUp } from "./services/authService";

export default function AppRouter() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === "/Login" || location.pathname === "/not-found"; 
    const [loading, setLoading] = useState(true);

    function ScrollToTopOnRouteChange() {
        const { pathname } = useLocation();
      
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return null;
    }

    useEffect(() => {
        const wakeUpApi = async () => {
            const response = await getWakeUp();
            if (response.status === 200) {
                console.log(response);
                setLoading(false); // Quando a API responder, o loading é desativado
            }
        };
    
        wakeUpApi(); // Chama a função que acorda a API
    }, []);

    return (
        
        <>  
            
            {loading ? 
            <div className="dark:bg-[#190028] h-full">        
                <div className="flex flex-col items-center justify-center h-screen">
                    <img src={animation} alt="" width={200} />    
                    <div className="flex flex-col items-center justify-center font-semibold text-2xl dark:text-white  text-[#655a7c] gap-2">
                        <p>Carregando</p>
                        <RiLoopRightFill className="animate-spin" size={24} />
                        <p>Por favor, aguarde...</p>
                    </div>
                </div>
            </div>
            :     
            <div className="dark:bg-[#190028] h-full">
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
            }
        
        
        </>


    )
}