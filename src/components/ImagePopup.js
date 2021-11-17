function ImagePopup(props) {
  return (
    <div
      className={`popup popup_background_deep${
        props.card ? " popup_opened" : ''
      }`}
    >
      <div className="illustration">
        <button
          className="popup__button-close"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={props.onClose}
        ></button>
        <figure className="illustration__illustration page__reset-alignment">
          <img
            className="illustration__image"
            src={props.card ? props.card.link : ''}
            alt={props.card ? props.card.name : ''}
          />
          <figcaption className="illustration__caption">
            {props.card ? props.card.name : ''}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
