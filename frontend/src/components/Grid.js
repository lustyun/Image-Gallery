import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ImagePopup from "./ImagePopup";

const Grid = () => {
    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState("");
    const [isEditing, setIsEditing] = useState({});
    const [editedFileNames, setEditedFileNames] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Function to open the popup
    const handleOpenPopup = (item) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    // Function to close the popup
    const handleClosePopup = () => {
        setSelectedItem(null);
        setIsPopupOpen(false);
    };

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user && user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (!user) navigate("/login");

        axios
            .get("http://localhost:5000/api/get", config)
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
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
    const handleEditClick = (fileName, _id) => {
        setIsEditing((prevIsEditing) => ({
            ...prevIsEditing,
            [_id]: true,
        }));
        setEditedFileNames((prevEditedFileNames) => ({
            ...prevEditedFileNames,
            [_id]: fileName,
        }));
    };

    const handleEditedFileNameChange = (value, _id) => {
        setEditedFileNames((prevEditedFileNames) => ({
            ...prevEditedFileNames,
            [_id]: value,
        }));
    };

    // Function to handle saving changes
    const handleSaveChanges = async (_id) => {
        const editedFileName = editedFileNames[_id];
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

                setPhotos((prevPhotos) =>
                    prevPhotos.map((photo) =>
                        photo._id === _id
                            ? { ...photo, fileName: editedFileName }
                            : photo
                    )
                );
                setIsEditing((prevIsEditing) => ({
                    ...prevIsEditing,
                    [_id]: false,
                }));
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
            <div className="gridHeader">
                <h1>{user && user.name}'s Gallery</h1>
                <h4>{user && user.email}</h4>
            </div>
            <div className="grid">
                {photos.map(({ fileName, photo, _id }) => (
                    <div key={_id} className="grid__item">
                        {photo.endsWith(".mp4") || photo.endsWith(".avi") ? (
                            <video
                                controls
                                onClick={() =>
                                    handleOpenPopup({ fileName, photo })
                                }>
                                <source
                                    src={`http://localhost:5000/uploads/${photo}`}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={`http://localhost:5000/uploads/${photo}`}
                                alt="grid_image"
                                onClick={() =>
                                    handleOpenPopup({ fileName, photo })
                                }
                            />
                        )}
                        <div className="imageInfo">
                            {isEditing[_id] &&
                            editedFileNames[_id] !== undefined ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedFileNames[_id]}
                                        onChange={(e) =>
                                            handleEditedFileNameChange(
                                                e.target.value,
                                                _id
                                            )
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
                                            handleEditClick(fileName, _id)
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
            <ImagePopup
                isOpen={isPopupOpen}
                handleClose={handleClosePopup}
                selectedItem={selectedItem}
            />
            <Button setUpdateUI={setUpdateUI} />
        </>
    );
};

export default Grid;
