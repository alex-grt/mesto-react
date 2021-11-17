function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="place">
      <button
        className="place__button-delete"
        type="button"
        aria-label="кнопка Удалить"
      ></button>
      <div className="place__image-cover">
        <img
          className="place__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
      </div>
      <div className="place__caption">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__cover-like">
          <button
            className="place__button-like"
            type="button"
            aria-label="кнопка Лайк"
          ></button>
          <p className="place__counter-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
