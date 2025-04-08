import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CrearTarea = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [formulario, setFormulario] = useState({
        title: "",
        description: "",
        topic: "",
        limit: "",
    });

    const formatearFecha = (fecha) => {
        const date = new Date(fecha); // Crear un objeto Date a partir de la fecha

        const year = date.getFullYear(); // Año con 4 dígitos
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes (agregar 1 porque getMonth() devuelve 0-11)
        const day = String(date.getDate()).padStart(2, "0"); // Día
        const hours = String(date.getHours()).padStart(2, "0"); // Hora (formatear con 2 dígitos)
        const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutos (formatear con 2 dígitos)

        // Formato: YYYY-MM-DD HH:mm
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const [temas, setTemas] = useState([]); // Para almacenar los temas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTemas = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/auth/subject/topics/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTemas(response.data.data);
            } catch (err) {
                setError("Error al cargar los temas.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemas();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación de que todos los campos estén completos
        if (!formulario.title || !formulario.description || !formulario.topic || !formulario.limit) {
            alert("Por favor, completa todos los campos.");
            return;
        }
    
        // Convertir la fecha al formato deseado
        const fechaFormateada = formatearFecha(formulario.limit);
    
        // Convertir los valores a enteros donde sea necesario
        const datos = {
            title: formulario.title,
            description: formulario.description,
            topic: parseInt(formulario.topic), // Asegurando que 'topic' sea un número
            subject: parseInt(id), // Asegurando que 'subject' sea un número
            limit: fechaFormateada, // Usar la fecha formateada
        };
    
        console.log(datos); // Verificación de los datos que se enviarán
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/teacher/subject/assignment",
                datos,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                alert("✅ Tarea creada con éxito");
                setFormulario({
                    title: "",
                    description: "",
                    topic: "",
                    limit: "",
                });
            }
        } catch (error) {
            console.error("❌ Error al crear tarea:", error);
            alert("Ocurrió un error al crear la tarea.");
        }
    };
    

    if (loading) return <p>Cargando temas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h2>Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formulario.title}
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

                <div className="mb-3">
                    <label className="form-label">Tema</label>
                    <select
                        className="form-control"
                        name="topic"
                        value={formulario.topic}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id}>
                                {tema.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha Límite</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="limit"
                        value={formulario.limit}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Crear Tarea
                </button>
            </form>
        </div>
    );
};

export default CrearTarea;
