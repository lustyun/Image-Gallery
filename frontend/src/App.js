import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";
import Navbar from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";

function App() {
    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user && user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/get", config)
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data);
            })
            .catch((err) => console.log(err));
    }, [updateUI]);

    return (
        <>
            <Router>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Grid
                                    setUpdateUI={setUpdateUI}
                                    setPhotos={setPhotos}
                                    photos={photos}
                                />
                            }></Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
