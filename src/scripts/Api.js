export default class Api {

  constructor(config) {
    this.url = config.url;
    this.headers = config.headers
    this.cohort = config.cohort
    this.id = config.id
  }

  getUser = () => {
    return fetch(`${this.url}${this.cohort}/users/me`,{
      headers: this.headers
    })
     /** REVIEW: Можно лучше:
     * 
     * Повторяющийся код разбора ответа можно вынести в отдельный метод класса и переиспользовать для всех запросов
     * к API 
     */
    .then(res => {
      if (!res.ok) {
         /** REVIEW: Можно лучше:
         * 
         * return Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
         */
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    
  }

  getServerCards() {
      return fetch(`${this.url}${this.cohort}/cards`,{
        headers: this.headers
      })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }

  postUser=(name,about)=> {
      return fetch(`${this.url}${this.cohort}/users/me`,{
        method: 'PATCH',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })   .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
      .then(res=>this.getUser())
  }


}
