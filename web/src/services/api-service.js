import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  withCredentials: true
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 &&
       window.location.pathname !== '/login') {
        localStorage.removeItem('user');
        window.location.assign('/login');
    } else {
      return Promise.reject(error);
    }
  }
)

const login = (user) => http.post('/sessions', user)

const listEvents = ({ city, limit, page }) => {

  limit = Number.isNaN(Number(limit)) || Number(limit) <= 0 ? 1 : limit;
  page = Number.isNaN(Number(page)) || Number(page) <= 0 ? undefined : page;

  return http.get('/events', { params: { city, limit, page }})
}

const getEvent = (id) => http.get(`/events/${id}`);

const deleteEvent = (id) => http.delete(`/events/${id}`);

export {
  login,
  listEvents,
  getEvent,
  deleteEvent
}