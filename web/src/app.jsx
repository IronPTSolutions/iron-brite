import Navbar from './components/ui/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import { HomePage, SearchPage, EventDetailPage, LoginPage } from './pages';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/events/:id' element={<EventDetailPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App
