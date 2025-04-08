import React, { useEffect, useState } from "react";
import { getTemas } from "../services/ObtenerTemasService";
import { useParams } from "react-router-dom";

const ListarTemas = () => {
    const { id } = useParams(); 
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTemas = async () => {
            try {
                const data = await getTemas(id, token);
                console.log(data.data)
                setTemas(data.data);
            } catch (err) {
                setError("Error al cargar los temas.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemas();
    }, []);

    if (loading) return <p>Cargando temas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h3>📚 Temas de la Clase</h3>
            {temas.length === 0 ? (
                <p>No hay temas disponibles.</p>
            ) : (
                <div className="row">
                    {temas.map((tema) => (
                        <div className="col-md-4" key={tema.id}>
                            <div className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{tema.name}</h5>
                                    <p className="card-text">
                                        {tema.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListarTemas;
