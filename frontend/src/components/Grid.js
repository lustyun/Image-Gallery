import React from "react";
import Button from "./Button";
import axios from "axios"; // Import Axios

const Grid = ({ photos, setPhotos, setUpdateUI }) => {
    const handleDelete = async (photoId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user && user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
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

    return (
        <>
            <h1>Our Gallery</h1>
            <div className="grid">
                {photos.map(({ fileName, photo, _id }) => (
                    <div key={_id} className="grid__item">
                        <img
                            src={`http://localhost:5000/uploads/${photo}`}
                            alt="grid_image"
                        />
                        <button onClick={() => handleDelete(_id)}>
                            Delete
                        </button>
                        <h2>{fileName}</h2>
                    </div>
                ))}
            </div>
            <Button setUpdateUI={setUpdateUI} />
        </>
    );
};

export default Grid;
