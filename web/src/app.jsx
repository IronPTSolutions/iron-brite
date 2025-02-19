import Navbar from "./components/ui/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  SearchPage,
  EventDetailPage,
  LoginPage,
  CreateEventPage,
} from "./pages";
import { PrivateRoute } from "./guards";
import RegisterPage from "./pages/register";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route
          path="/create-event"
          element={
            <PrivateRoute role="admin">
              <CreateEventPage />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
