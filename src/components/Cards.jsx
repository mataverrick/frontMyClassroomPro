import React, { useEffect, useState } from "react";
import { getSubjects } from "../services/ClasesService";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const subjects = await getSubjects();
                setData(subjects);
                console.log(subjects);
                setLoading(false);
            } catch (error) {
                alert(error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (id)=>{
        navigate(`/maestro/clase/${id}`);
    }

    if (loading) return <div>cargando</div>;
    
    return (
        <div className="container d-flex flex-wrap gap-3">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="card"
                    style={{ width: "18rem", cursor: "pointer" }}
                    onClick={() => handleClick(item.id)}
                >
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {item.grade}
                        </h6>
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
