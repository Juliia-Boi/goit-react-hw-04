import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.imageGallery}>
      {images &&
        images.map((image) => (
          <li key={image.id} className={css.imageGalleryItem}>
            <ImageCard image={image} onImageClick={onImageClick} />
          </li>
        ))}
    </ul>
  );
}
