import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children, actionButton, navItems }) => {
    const { authData, logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <a className="navbar-brand text-white" href="#">
                    Classroom
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo02"
                >
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link text-white"
                                href="/maestro/dashboard"
                            >
                                Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link text-white"
                                onClick={logout}
                                href="/"
                            >
                                Logout
                            </a>
                        </li>

                        {/* elementos  pasados por props */}
                        {navItems?.map((item, index) => (
                            <li key={index} className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to={item.href}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {/* Menú según rol */}
                        {authData.role === 1 && (
                            <>
                                {/* Puedes agregar aquí opciones exclusivas para admin */}
                            </>
                        )}

                        {authData.role === 2 && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">
                                        Mis Clases
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">
                                        Tareas
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex my-2 my-lg-0">{actionButton}</div>
                </div>
            </nav>
            <div className="container mt-4">{children}</div>
        </div>
    );
};

export default Navbar;
