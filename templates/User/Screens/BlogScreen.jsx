import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function BlogScreen() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState();

  const loadSelectedBlog = () => {
    axios
      .get(`http://localhost:3000/blog/${blogId}`)
      .then((r) => {
        setBlog(r.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadSelectedBlog();
  }, []);

  return (
    <>
      {blog ? (
        <article className="container blogContainer">
          <div className="summary mt-3">
            <div className="summaryImage">
              <img
                className="blogImage"
                src={`/assets/img/${blog.image}`}
                alt="hola"
              />
            </div>
            <h2>{blog.title}</h2> <span dangerouslySetInnerHTML={{ __html:blog.content}} />
          </div>
          <Link to={`/`} className="btn btn-secondary mb-5">
            Volver al home
          </Link>
        </article>
      ) : (
        <div>Contenido no encontrado</div>
      )}
    </>
  );
}
