import { useEffect, useState } from "react";
import { searchImg } from "../image-api";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topic) return;

    async function getPhotos() {
      setLoading(true);
      setError(null);
      try {
        const res = await searchImg(topic, page);

        if (res.photos.length === 0) {
          toast.error("No images found for this query.");
          setError("No images found for this query.");
          return;
        }

        setPhotos((prevPhotos) => [...prevPhotos, ...res.photos]);
        setTotalPages(res.totalPages);
      } catch (error) {
        setError(error.message || "Something went wrong");
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, [topic, page]);

  const handleSearchSubmit = (newTopic) => {
    if (newTopic.trim() === "") {
      toast.error("Please enter a valid search query!");
      setError("Please enter a valid search query!");
      return;
    }

    setTopic(newTopic);
    setPage(1);
    setPhotos([]);
    setError(null);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image) => {
    setSelectedPhoto(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchSubmit} />
      <Toaster position="top-right" />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}{" "}
      {photos.length > 0 && (
        <>
          <ImageGallery images={photos} onImageClick={openModal} />
          {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      <ImageModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        selectedImage={selectedPhoto}
      />
    </div>
  );
}
