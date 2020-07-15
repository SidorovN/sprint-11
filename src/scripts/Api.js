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
    .then(res => {
      if (!res.ok) {
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
