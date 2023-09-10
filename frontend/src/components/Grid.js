import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = () => {
    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedFileName, setEditedFileName] = useState("");

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

    const handleDelete = async (photoId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/delete/${photoId}`,
                config
            );

            if (response.status === 200) {
                // Photo deleted successfully, update your state to remove the deleted photo
                setPhotos((prevPhotos) =>
                    prevPhotos.filter((photo) => photo._id !== photoId)
                );
            } else {
                console.error("Failed to delete photo");
            }
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    // Function to handle editing
    const handleEditClick = (fileName) => {
        setIsEditing(true);
        setEditedFileName(fileName);
    };

    // Function to handle saving changes
    const handleSaveChanges = async (_id) => {
        try {
            // Send the update request to the server
            const response = await axios.put(
                `http://localhost:5000/api/update/${_id}`,
                { fileName: editedFileName },
                config
            );

            if (response.status === 200) {
                // Update was successful
                toast.success("Filename updated successfully.");

                // You can also update the UI here to reflect the changes
                // For example, you can update the filename in your local state
            } else {
                // Handle errors if the server request was not successful
                toast.error("Failed to update filename. Please try again.");
            }

            setIsEditing(false); // Exit edit mode
        } catch (error) {
            // Handle any network errors or exceptions
            toast.error("Failed to update filename. Please try again.");
        }
    };

    return (
        <>
            <h1>My Gallery</h1>
            <div className="grid">
                {photos.map(({ fileName, photo, _id }) => (
                    <div key={_id} className="grid__item">
                        <img
                            src={`http://localhost:5000/uploads/${photo}`}
                            alt="grid_image"
                        />
                        <div className="imageInfo">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedFileName}
                                        onChange={(e) =>
                                            setEditedFileName(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => handleSaveChanges(_id)}>
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2>{fileName}</h2>
                                    <button
                                        onClick={() =>
                                            handleEditClick(fileName)
                                        }>
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                        <FaTrash
                            className="deteleBtn"
                            onClick={() => handleDelete(_id)}
                        />
                    </div>
                ))}
            </div>
            <Button setUpdateUI={setUpdateUI} />
        </>
    );
};

export default Grid;
