import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/* <!-- форма редактирования аватара --> */}
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        titleModifier=""
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="form__cover-input">
          <input
            className="form__input form__input_asgmt_link"
            name="avatar"
            id="input-link-avatar"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__error" id="input-link-avatar-error"></span>
        </div>
      </PopupWithForm>
      {/* <!-- форма редактирования профиля --> */}
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        titleModifier=""
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="form__cover-input">
          <input
            className="form__input form__input_asgmt_name"
            name="name"
            id="input-name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__error" id="input-name-error"></span>
        </div>
        <div className="form__cover-input">
          <input
            className="form__input form__input_asgmt_about"
            name="about"
            id="input-about"
            type="text"
            placeholder="Профессиональная деятельность"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__error" id="input-about-error"></span>
        </div>
      </PopupWithForm>
      {/* <!-- форма добавления карточки места --> */}
      <PopupWithForm
        name="place"
        title="Новое место"
        titleModifier=""
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="form__cover-input">
          <input
            className="form__input form__input_asgmt_name-place"
            name="name"
            id="input-name-place"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__error" id="input-name-place-error"></span>
        </div>
        <div className="form__cover-input">
          <input
            className="form__input form__input_asgmt_link"
            name="link"
            id="input-link"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__error" id="input-link-error"></span>
        </div>
      </PopupWithForm>
      {/* <!-- форма подтверждения удаления карточки места --> */}
      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        titleModifier=" form__title_type_confirmation"
        buttonTitle="Да"
      ></PopupWithForm>
      {/* <!-- форма отображения иллюстрации --> */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
