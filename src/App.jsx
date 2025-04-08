import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext"; // Importa AuthProvider
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // importante para los dropdowns
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import CrearClase from "./pages/CrearClase";
import BotonPorRol from "./components/BotonPorRol";
import DropdownRol from "./components/DropdownRol";
import InscribirAlumno from "./pages/InscribirAlumno";
import ListarAlumnosClase from "./pages/ListarAlumnosClase";
import TablonMaestro from "./components/TablonMaestro";
import CrearTarea from "./pages/CrearTarea";
import CrearTema from "./pages/CrearTema";
import ListarTemas from "./pages/ListarTemas";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />

                    {/* rutas maestro */}
                    <Route
                        path="/maestro/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar actionButton={<BotonPorRol />}>
                                    <Cards></Cards>
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/maestro/crear-clase"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <CrearClase></CrearClase>
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maestro/clase/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <TablonMaestro />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maestro/clase/agregar-tarea/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <CrearTarea />
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maestro/clase/registrar-tema/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <CrearTema />
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />

                    {/*tablon principal */}
                    <Route
                        path="/maestro/clase/tarea/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>{/* <TablonMaestro /> */}</Navbar>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maestro/clase/inscribir-alumno/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <InscribirAlumno />
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maestro/clase/ver-alumnos/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <ListarAlumnosClase />
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maestro/clase/crear-tema/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <ListarAlumnosClase />
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/temas/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <Navbar>
                                    <ListarTemas />
                                </Navbar>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                {/* rutas maestro */}
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
