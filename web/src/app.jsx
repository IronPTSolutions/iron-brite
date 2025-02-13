import Navbar from './components/ui/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import { HomePage, SearchPage, EventDetailPage, LoginPage, CreateEventPage } from './pages';
import { PrivateRoute } from './guards';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path='/events/:id' element={<EventDetailPage />} />
        <Route path='/create-event' element={<PrivateRoute role="admin"><CreateEventPage /></PrivateRoute>} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App
