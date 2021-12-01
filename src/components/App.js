import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [buttonTitle, setButtonTitle] = React.useState({
    avatar: 'Сохранить',
    profile: 'Сохранить',
    place: 'Создать',
    confirmation: 'Да',
  });

  React.useEffect(() => {
    api.getPageInfo()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => alert(`Не удалось получить информацию. Ошибка: ${err}`));
  }, []);

  React.useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isConfirmationPopupOpen ||
      selectedCard
      ) {
        const handleEscPress = (evt) => {
          if (evt.key === 'Escape') {
            closeAllPopups();
          }
        }

        document.addEventListener('keydown', handleEscPress);

        return () => document.removeEventListener('keydown', handleEscPress);
      }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmationPopupOpen,
    selectedCard
  ]);

  function handleUpdateAvatar(avatar) {
    setButtonTitle({
      ...buttonTitle,
      avatar: 'Сохранение...'
    });

    api.setUserAvatar(avatar)
      .then(avatar => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
      .finally(() => setButtonTitle({
        ...buttonTitle,
        avatar: 'Сохранить'
      }));
  }

  function handleUpdateUser(user) {
    setButtonTitle({
      ...buttonTitle,
      profile: 'Сохранение...'
    });

    api.setUserInfo(user)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => alert(`Упс. Что-то пошло не так. Ошибка: ${err}`))
      .finally(() => setButtonTitle({
        ...buttonTitle,
        profile: 'Сохранить'
      }));
  }

  function handleAddPlaceSubmit(newCard) {
    setButtonTitle({
      ...buttonTitle,
      place: 'Сохранение...'
    });

    api.addCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => alert(`Не удалось добавить элемент. Ошибка: ${err}`))
      .finally(() => setButtonTitle({
        ...buttonTitle,
        place: 'Создать'
      }));
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setButtonTitle({
      ...buttonTitle,
      confirmation: 'Удаление...'
    });

    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards(state => state.filter(currentCard =>
          currentCard._id === deletedCard._id ? null : currentCard
        ));
        setDeletedCard(null);
        closeAllPopups();
      })
      .catch(err => alert(`Не удалось удалить элемент. Ошибка: ${err}`))
      .finally(() => setButtonTitle({
        ...buttonTitle,
        confirmation: 'Да'
      }));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.toggleLike(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(currentCard =>
          currentCard._id === card._id ? newCard : currentCard
        ));
      })
      .catch(err => alert(`Не удалось переключить лайк. Ошибка: ${err}`));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(deletedCard) {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(deletedCard);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onCardDelete={handleDeleteClick}
        onCardLike={handleCardLike}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/* <!-- форма редактирования аватара --> */}
      <EditAvatarPopup
        buttonTitle={buttonTitle.avatar}
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      {/* <!-- форма редактирования профиля --> */}
      <EditProfilePopup
        buttonTitle={buttonTitle.profile}
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      {/* <!-- форма добавления карточки места --> */}
      <AddPlacePopup
        buttonTitle={buttonTitle.place}
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      {/* <!-- форма подтверждения удаления карточки места --> */}
      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        titleModifier=" form__title_type_confirmation"
        buttonTitle={buttonTitle.confirmation}
        buttonState={true}
        onSubmit={handleCardDelete}
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>
      {/* <!-- форма отображения иллюстрации --> */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
