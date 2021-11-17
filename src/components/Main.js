import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [ userAvatar, setUserAvatar ] = React.useState('');
  const [ userName, setUserName ] = React.useState('');
  const [ userDescription, setUserDescription ] = React.useState('');
  const [ cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    api.getPageInfo()
      .then(([ user, cards ]) => {
        setUserAvatar(user.avatar);
        setUserName(user.name);
        setUserDescription(user.about);
        setCards(cards);
      })
      .catch((err) => alert(`Упс. Не удалось получить информацию. Ошибка: ${err}`));
  }, []);

  return (
    <main className="content page__content">
      {/* <!-- секция Profile --> */}
      <section className="profile content__profile">
        <div className="profile-card">
          <div
            className="profile-card__avatar-cover"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile-card__avatar"
              src={userAvatar}
              alt="аватар пользователя"
            />
            <div className="profile-card__avatar-edit"></div>
          </div>
          <div className="profile-card__info">
            <div className="profile-card__title-cover">
              <h1 className="profile-card__title">{userName}</h1>
              <button
                className="button-open profile-card__button-edit"
                type="button"
                aria-label="кнопка Редактировать"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile-card__text">{userDescription}</p>
          </div>
        </div>
        <button
          className="button-open profile__button-add"
          type="button"
          aria-label="кнопка Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      {/* <!-- секция Places --> */}
      <section className="places content__places" aria-label="Куда поехать?">
        <ul className="places-grid undecorated-list page__reset-alignment">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
