import { Outlet } from 'react-router-dom';

export default function UserHeader() {
    return (
      <>
        <header className="header-user-blog">
          <h1>Blog del Camello Portugues</h1>
        </header>
        
        <Outlet />
      </>
    );
}