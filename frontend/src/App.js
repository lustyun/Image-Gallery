import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";
import Navbar from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Grid />}></Route>
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
