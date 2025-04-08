import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DropdownRol = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Acciones
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(`/maestro/clase/ver-alumnos/${id}`);
                        }}
                    >
                        Ver Alumnos
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(`/maestro/clase/inscribir-alumno/${id}`);
                        }}
                    >
                        Inscribir Alumno
                    </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(`/maestro/clase/registrar-tema/${id}`);
                        }}
                    >
                        Registrar Tema
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(`/maestro/clase/agregar-tarea/${id}`);
                        }}
                    >
                        Agregar Tarea
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(`/maestro/clase/publicar-material/${id}`);
                        }}
                    >
                        Publicar Material de Clase
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default DropdownRol;
