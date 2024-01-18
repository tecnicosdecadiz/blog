import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function UserHeader() {
  const [darkTheme, setDarkTheme] = useState(false)

    return (
      <div className={`${darkTheme ? 'darkTheme' : undefined}`}>
        <header className="header-user-blog">
          <h1>Blog del Camello Portugues</h1>
        </header>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => setDarkTheme(!darkTheme)}
        >
          Cambiar a modo Oscuro
        </button>
        <Outlet />
      </div>
    );
}