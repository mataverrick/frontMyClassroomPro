import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CrearTema = () => {
    const { id } = useParams(); 
    const token = localStorage.getItem("token");

    const [formulario, setFormulario] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/teacher/subject/topic",
                {
                    ...formulario,
                    subject: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Tema creado con éxito");
            setFormulario({ name: "", description: "" });
        } catch (error) {
            console.error("❌ Error al crear tema:", error);
            alert("Error al crear el tema.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear Nuevo Tema</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nombre del Tema</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formulario.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={formulario.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-success">
                    Crear Tema
                </button>
            </form>
        </div>
    );
};

export default CrearTema;
