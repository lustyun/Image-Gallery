import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import authService from "../auth/authService";

function Login({ setAuthenticated }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const { email, password } = formData;

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            setAuthenticated(true);
            navigate("/");
        }
        // eslint-disable-next-line
    }, [isError, isSuccess, message, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const userData = {
            email,
            password,
        };

        try {
            const response = await authService.login(userData);

            if (response) {
                localStorage.setItem("user", JSON.stringify(response));
                setIsSuccess(true);
                setMessage("Login successful.");
                setIsError(false);
            } else {
                setIsError(true);
                setMessage("Authentication failed. Please try again.");
            }
        } catch (error) {
            setIsError(true);
            setMessage("Authentication failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to view images</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
