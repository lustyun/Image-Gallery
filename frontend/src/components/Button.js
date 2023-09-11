import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import Modal from "react-modal";

const Button = ({ setUpdateUI }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = () => {
        if (selectedFile) {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user && user.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const formData = new FormData();
            formData.append("photo", selectedFile);
            formData.append("fileName", fileName);

            axios
                .post("http://localhost:5000/api/save", formData, config)
                .then((res) => {
                    console.log(res.data);
                    setUpdateUI(res.data._id);
                    closeModal();
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            <label className="button" onClick={openModal}>
                <AiFillPlusCircle />
            </label>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="File Upload Modal"
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "500px", // Adjust the width as needed
                        height: "500px",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                        background: "white",
                    },
                }}>
                <h2 className="modal-title">Enter Filename</h2>
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="modal-input"
                />
                <input
                    type="file"
                    name="file_picker"
                    id="file_picker"
                    onChange={(e) => handleFileChange(e)}
                    className="modal-input"
                />
                <button onClick={handleSave} className="modal-button">
                    Save
                </button>
                <button
                    onClick={closeModal}
                    className="modal-button">
                    Cancel
                </button>
            </Modal>
        </div>
    );
};

export default Button;
