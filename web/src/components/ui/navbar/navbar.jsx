import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/auth-context';

function Navbar() {
  const { user, logout } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">Iron Brite</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {user?.role === "admin" && (<li className="nav-item"><Link className="nav-link active" aria-current="page" to="/create-event">Create Event</Link></li>)}
          </ul>
          <ul className='navbar-nav'>
            { user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/profile">{user.email}</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => logout()}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;