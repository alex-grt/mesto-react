function ImagePopup(props) {
  return (
    <div className={`popup popup_type_illustration popup_background_deep${props.card[1] ? ' popup_opened': ''}`}>
      <div className="illustration">
        <button className="popup__button-close" type="button"
        aria-label="кнопка Закрыть" onClick={props.onClose}></button>
        <figure className="illustration__illustration page__reset-alignment">
          <img className="illustration__image" src={props.card[0].link} alt={props.card[0].name} />
          <figcaption className="illustration__caption">{props.card[0].name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
