import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BotonPorRol = () => {
    const { authData } = useAuth();
    const navigate = useNavigate();

    if (authData.role === 1) {
        return (
            <button
                className="btn btn-outline-light"
                onClick={() => navigate("/maestro/crear-clase")}
            >
                + Crear Clase
            </button>
        );
    }

    if (authData.role === 2) {
        return (
            <button
                className="btn btn-outline-light"
                onClick={() => navigate("/alumno/inscribirse")}
            >
                + Inscribirse a Clase
            </button>
        );
    }

    return null;
};

export default BotonPorRol;
