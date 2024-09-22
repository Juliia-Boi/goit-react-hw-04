import css from "../ImageCard/ImageCard.module.css";

export default function ImageCard({ image, onImageClick }) {
  const { urls, alt_description } = image;

  return (
    <div className={css.imageContainer}>
      <img
        src={urls.small}
        alt={alt_description}
        width="360"
        height="239"
        className={css.image}
        onClick={() => onImageClick(image)}
      />
    </div>
  );
}
