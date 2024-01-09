import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLoginScreen() {
    const navigate = useNavigate();
  const [tempLogedUser, setTempLogedUser] = useState(true);
  const ruta = window.location.pathname;

  const handleLoginAdminUser = (payload) => {
    axios
      .get('http://localhost:3000/users')
      .then((r) => {
        r.data.map((u) => {
          if (u.user === payload.user && u.password === payload.password) {
            setTempLogedUser(true);
          } else {
            setTempLogedUser(false);
            alert('Error, introduzca usuario o contraseña correcta');
          }
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (ruta !== '/admin' && !tempLogedUser) {
      navigate('/admin');
    }
  }, [tempLogedUser]);

  if (!tempLogedUser)
    return (
      <div className="mt-5">
        <Formik
          initialValues={{
            user: '',
            password: '',
          }}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
          onSubmit={(v) => handleLoginAdminUser(v)}
        >
          {({ setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="wrapper fadeInDown">
                <div id="formContent">
                  <div className="fadeIn first primary">
                    <i
                      className="ri-login-box-fill"
                      style={{ fontSize: '50px' }}
                    ></i>
                  </div>
                  <Field
                    type="text"
                    className="fadeIn second"
                    name="user"
                    placeholder="Usuario"
                    onChange={(v) => setFieldValue('user', v.target.value)}
                  />
                  <Field
                    type="text"
                    id="password"
                    className="fadeIn third"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(v) => setFieldValue('password', v.target.value)}
                  />
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value="Log In"
                  />
                  <div id="formFooter">
                    <div
                      className="underlineHover primary"
                      onClick={() => alert('Pues te jodes')}
                    >
                      Olvidaste la contraseña?
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  else
    return (
      <>
        <div className="container-fluid">
          <div className="row h-100">
            <div className="col-1 bg-light sidebar">
              <h2 className="text-center mb-5">
                <i className="ri-bell-fill"></i>
              </h2>
              <ul>
                <li>
                  <Link to={`/admin`} className="linkNavbar">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to={`/admin/newPost`} className="linkNavbar">
                    Nuevo post
                  </Link>
                </li>
                <li>
                  <Link to={`/`} className="linkNavbar">
                    Acceso como usuario
                  </Link>
                </li>
                <li>
                  <a href="#">Enlace 3</a>
                </li>
              </ul>
            </div>
            <div className="col-11 content">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
}
