function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_background_medium${
        props.isOpen ? ' popup_opened' : ''
      }`}
    >
      <div className="form">
        <button
          className="popup__button-close"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className={`form__title${props.titleModifier}`}>{props.title}</h2>
        <form
          className={`form__${props.name} form-area`}
          name={props.name}
          noValidate
        >
          {props.children}
          <button
            className="form__button-submit"
            type="submit"
            aria-label={`кнопка ${props.buttonTitle}`}
          >
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
