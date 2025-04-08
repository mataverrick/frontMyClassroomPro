// src/components/Login.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card bg-dark text-white"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">
                                        Login
                                    </h2>
                                    <p className="text-white-50 mb-5">
                                        Please enter your login and password!
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="form-control form-control-lg"
                                                required
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="typeEmailX"
                                            >
                                                Email
                                            </label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="form-control form-control-lg"
                                                required
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="typePasswordX"
                                            >
                                                Password
                                            </label>
                                        </div>

                                        <button
                                            className="btn btn-outline-light btn-lg px-5"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </form>
                                </div>

                                <div>
                                    <p className="mb-0">
                                        Don't have an account?{" "}
                                        <a
                                            href="#!"
                                            className="text-white-50 fw-bold"
                                        >
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
