import React, { useState, useEffect } from "react";
import { crearAviso } from "../services/CrearAvisoService";
import { obtenerAvisos } from "../services/ObtenerAvisosService";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import DropdownRol from "./DropdownRol";

const TablonMaestro = () => {
    const [aviso, setAviso] = useState("");
    const [avisos, setAvisos] = useState([]);
    const { id } = useParams();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const cargarAvisos = async () => {
            try {
                const data = await obtenerAvisos(id, token);
                setAvisos(data);
            } catch (error) {
                console.error("Error al cargar avisos:", error);
            }
        };

        cargarAvisos();
    }, [id, token]);

    const handlePublicarAviso = async () => {
        if (!aviso.trim()) {
            alert("Por favor escribe un mensaje.");
            return;
        }

        try {
            await crearAviso(
                {
                    message: aviso,
                    subject: id,
                },
                token
            );

            const dataActualizada = await obtenerAvisos(id, token);
            setAvisos(dataActualizada);

            setAviso("");
        } catch (error) {
            console.error("Error al crear el aviso:", error);
            alert("Error al publicar aviso.");
        }
    };

    return (
        <Navbar
            actionButton={<DropdownRol />}
            navItems={[
                { label: "Temas", href: `/temas/${id}` },
                { label: "Tareas", href: `/maestro/clase/tarea/${id}` },
                { label: "Material", href: `/material/clase/${id}` },
            ]}
        >
            <div className="container mt-4">
                <h2>Tablón del Maestro</h2>

                {/* Crear Aviso */}
                <section className="mt-4">
                    <h4>Crear Aviso</h4>
                    <div className="card shadow-sm p-3 mb-4">
                        <textarea
                            className="form-control mb-2"
                            rows="4"
                            placeholder="Escribe un aviso para tus alumnos..."
                            value={aviso}
                            onChange={(e) => setAviso(e.target.value)}
                        ></textarea>
                        <button
                            className="btn btn-primary"
                            onClick={handlePublicarAviso}
                        >
                            Publicar Aviso
                        </button>
                    </div>
                </section>

                {/* Lista de avisos */}
                <section className="mt-5">
                    <h4>Avisos Publicados</h4>
                    {avisos.length === 0 ? (
                        <p>No hay avisos publicados aún.</p>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {avisos.map((a, i) => (
                                <div key={i} className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">📢 Aviso</h5>
                                        <p className="card-text">{a.message}</p>
                                    </div>
                                    <div className="card-footer text-muted text-end small">
                                        {a.created_at
                                            ? new Date(a.created_at).toLocaleString()
                                            : "Fecha desconocida"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </Navbar>
    );
};

export default TablonMaestro;
