import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHomeScreen() {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState();

  const loadBlogExamples = () => {
    axios
      .get('http://localhost:3000/blog')
      .then((r) => {
        setBlogList(r.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteBlog = (id) => {
    axios
      .delete(`http://localhost:3000/blog/${id}`)
      .then((r) => {
        loadBlogExamples();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadBlogExamples();
  }, []);

  return (
    <div className="container-custom">
      {blogList ? (
        <>
          <h3>Listado de post del blog</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col-1">#</th>
                <th scope="col-1">Imagen</th>
                <th scope="col-3">Titulo</th>
                <th scope="col-6">Resumen</th>
                <th scope="col-1">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {blogList?.map((blog) => (
                <tr key={blog.id}>
                  <th scope="row">{blog.id}</th>
                  <td>
                    <img
                      src={`/assets/img/${blog.image}`}
                      alt="Descripción de la imagen"
                      className="rounded-circle"
                      style={{ maxHeight: '80px', maxWidth: '80px' }}
                    />
                  </td>
                  <td>{blog.title}</td>
                  <td>{blog.summary}</td>
                  <td>
                    <div className="d-inline">
                      <i
                        className="ri-pencil-fill me-3 primary pointer"
                        title="Editar"
                        onClick={() => navigate(`/admin/editPost/${blog.id}`)}
                      ></i>
                      <i
                        className="ri-delete-bin-7-line text-danger pointer"
                        title="Eliminar"
                        onClick={() => handleDeleteBlog(blog.id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>Sin blogs</h1>
      )}
    </div>
  );
}
