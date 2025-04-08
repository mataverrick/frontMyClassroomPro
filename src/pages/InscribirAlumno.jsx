import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAlumnos } from "../services/ObtenerAlumnosService";
import { postAlumno } from "../services/InscribirAlumno";

const InscribirAlumno = () => {
    const { id } = useParams();
    const [alumnos, setAlumnos] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState("");

    //recuperar alumnos,falta modificarlo para que se pueda buscar
    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await getAlumnos();
                setAlumnos(response); 
            } catch (error) {
                console.error("Error al obtener alumnos:", error);
            }
        };
        fetchAlumnos();
    }, []);

    const handleAgregarAlumno = async (e) => {
        e.preventDefault();
        if (!selectedAlumno) return;

        const token = localStorage.getItem("token");

        try {
            await postAlumno(id,selectedAlumno)
            alert("Alumno inscrito con éxito");
        } catch (error) {
            console.error("Error al inscribir alumno:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Inscribir Alumno a la Clase {id}</h3>
            <form onSubmit={handleAgregarAlumno}>
                <div className="mb-3">
                    <label htmlFor="alumno" className="form-label">Selecciona un alumno:</label>
                    <select
                        id="alumno"
                        className="form-select"
                        value={selectedAlumno}
                        onChange={(e) => setSelectedAlumno(e.target.value)}
                        required
                    >
                        <option value="">-- Selecciona --</option>
                        {alumnos.map((alumno) => (
                            <option key={alumno.id} value={alumno.id}>
                                {alumno.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Inscribir Alumno</button>
            </form>
        </div>
    );
};

export default InscribirAlumno;
