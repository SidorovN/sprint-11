import Api from './Api'
import Card from './Card'
import CardList from './CardList'
import FormValidator from './FormValidator'
import UserInfo from './UserInfo'

(function () {
  const user = {
    name: ' не Jaques Causteau',
    job: 'Sailor, Researcher'
  }
  const config =  {
    url:'https://praktikum.tk/',
    id: 'e7098e96-20e3-4827-936a-69dd99849c81',
    cohort: 'cohort11',

    headers: {
      authorization: 'e7098e96-20e3-4827-936a-69dd99849c81'
    }}
  const errorMessages = {
    valueMissing: 'Заполните это поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка'
  };

  const addForm = document.forms.new
  const userForm = document.forms.edit
  const addButton = document.querySelector('.user-info__button_type_add')
  const editButton = document.querySelector('.user-info__button_type_edit')

  const addFormValidator = new FormValidator(addForm, errorMessages)
  const userFormValidator = new FormValidator(userForm, errorMessages)
  const userInfo = new UserInfo(
    user.name,
    user.job,
    /* REVIEW: Можно лучше:
    
    Вынести поиск элементов с классами.user-info__name и .user-info__job в константы в начале скрипта 
    */
    document.querySelector('.user-info__name'),
    document.querySelector('.user-info__job')
  )

  const api = new Api(config)

  api.getUser()
  .then(res => {
    userInfo.setUserInfo(res.name,res.about);
  })
  .catch((err) => {
    console.error(err)
  });

  api.getServerCards()
  .then(res => {
    cardList.render(res);
  })
  .catch((err) => {
    console.error(err)
  });



  /* REVIEW: Можно лучше:
    
  Вынести поиск элементов с классами .popup_type_card, .popup_type_add и .popup_type_edit вынести в константы в начале скрипта 
  */
  const cardPopup = new Popup(
    document.querySelector('.popup_type_card'),
  )

  const addPopup = new Popup(
    document.querySelector('.popup_type_add'),
    addButton,
  )

  const userPopup = new Popup(
    document.querySelector('.popup_type_edit'),
    editButton,
  )

  const showCard = (link) => {
    popupImage.setAttribute('src', link)
    cardPopup.open()
  }
  const createCard = card => new Card(card, showCard).create()

  const cardList = new CardList(
    document.querySelector('.places-list'),
    createCard
  );

  const popupImage = cardPopup.popup.querySelector('.popup__image')

  const setEditValues = () => {
    userFormValidator.setSubmitButtonState(true)
    userFormValidator.resetErrors()
    const {name, job} = userInfo.getUserInfo()
    userForm.elements.username.value = name
    userForm.elements.about.value = job
  }

  const setAddValues = () => {
    addFormValidator.setSubmitButtonState(false)
    addFormValidator.resetErrors()
    addForm.elements.cardname.value = ''
    addForm.elements.link.value = ''
  }


  addButton.addEventListener('click', setAddValues)
  editButton.addEventListener('click', setEditValues)

  addForm.addEventListener('submit', (event) => {
    event.preventDefault()
    cardList.addCard({
      name: addForm.elements.cardname.value,
      link: addForm.elements.link.value,
    })
    addPopup.close()
  })

  userForm.addEventListener('submit', (event) => {
    event.preventDefault()
    api.postUser(userForm.elements.username.value,userForm.elements.about.value)
    .then(res => {
      userInfo.setUserInfo(res.name,res.about);
      userPopup.close()
    })
    .catch(err=>console.error(err))
  })
})()


/** REVIEW:
 * 
 * В целом по работе: 
 * 
 * Все критические ошибки были исправлены, отличная работа! Спасибо за усилия и старания, удачи в следующем спринте и 
 * успехов в дальнейшем обучении
 * 
 * Можно лучше: 1) Все указанные "можно лучше" с предыдущего спринта
 * 2) Вынести поиск элементов с классами.user-info__name и .user-info__job в константы в начале скрипта 
 * 3) Повторяющийся код разбора ответа можно вынести в отдельный метод класса и переиспользовать для всех запросов
 * к API 
 */