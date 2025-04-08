import React, { useState, useEffect } from "react";
import { getCarreras } from "../services/ObtenerCarrerasService";
import { postClase } from "../services/CrearClaseService";
import { useNavigate } from "react-router-dom";

const CrearClase = () => {
    const [carreras, setCarreras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [careerId, setCareerId] = useState("");
    const [grade, setGrade] = useState("");

    const navigate = useNavigate();

    //cargar carreras
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                setLoading(true);
                const response = await getCarreras();
                setCarreras(response);
            } catch (error) {
                alert("Error al obtener las carreras: " + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCarreras();
    }, []);

    //manejar envio
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            description,
            career_id: careerId,
            grade,
        };

        setLoading(true);
        setError(null);

        try {
            await postClase(data);
            navigate("/maestro/dashboard");
        } catch (error) {
            console.error("Error:", error);
            setError("Hubo un problema al crear la clase. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && carreras.length === 0) return <div>Cargando...</div>;

    return (
        <div className="container mt-4">
            <h2>Crear Clase</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre de la clase
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Descripción
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="careerId" className="form-label">
                        Carrera
                    </label>
                    <select
                        id="careerId"
                        className="form-select"
                        value={careerId}
                        onChange={(e) => setCareerId(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una carrera</option>
                        {carreras.map((career) => (
                            <option key={career.id} value={career.id}>
                                {career.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="grade" className="form-label">
                        Grado
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Crear Clase"}
                </button>
            </form>
        </div>
    );
};

export default CrearClase;
