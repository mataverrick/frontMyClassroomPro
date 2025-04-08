import React, { useEffect, useState } from "react";
import { getAlumnos } from "../services/ObtenerAlumnosClaseService";
import { useParams } from "react-router-dom";

const ListarAlumnosClase = () => {
    const { id } = useParams();
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await getAlumnos(id);
                setAlumnos(response); // asegúrate de que response sea un array de alumnos
            } catch (error) {
                alert("Error al obtener alumnos: " + error);
            }
        };
        fetchAlumnos();
    }, []);

    return (
        <div className="container mt-4">
            <h3>Alumnos inscritos en la clase {id}</h3>
            {alumnos.length === 0 ? (
                <p>No hay alumnos inscritos aún.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno, index) => (
                            <tr key={alumno.id}>
                                <td>{index + 1}</td>
                                <td>{alumno.name}</td>
                                <td>{alumno.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListarAlumnosClase;
