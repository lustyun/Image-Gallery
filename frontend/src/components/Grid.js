import React from "react";

const Grid = ({ photos, setPhotos }) => {
    const handleDelete = async (photoId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/delete/${photoId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
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
                {photos.map(({ photo, _id }) => (
                    <div key={_id} className="grid__item">
                        <button onClick={() => handleDelete(_id)}>
                            Delete
                        </button>
                        <img
                            src={`http://localhost:5000/uploads/${photo}`}
                            alt="grid_image"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Grid;
