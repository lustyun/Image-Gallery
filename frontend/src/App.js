import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setAuthenticated(true);
    }, []);

    return (
        <>
            <Router>
                <div className="container">
                    <Header
                        setAuthenticated={setAuthenticated}
                        authenticated={authenticated}
                    />
                    <Routes>
                        <Route path="/" element={<Grid />}></Route>
                        <Route
                            path="/login"
                            element={
                                <Login setAuthenticated={setAuthenticated} />
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <Register setAuthenticated={setAuthenticated} />
                            }
                        />
                    </Routes>
                </div>
            </Router>
            <ToastContainer position="top-center" />
        </>
    );
}

export default App;
