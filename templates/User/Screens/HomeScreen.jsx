import axios from 'axios';
import ExampleCardBlog from '../Layout/ExampleCardBlog';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function HomeScreen() {
  const { page } = useParams();
  const [exampleBlogs, setExampleBlogs] = useState();
  const [currentPage, setCurrentPage] = useState(page);
  const [category, setCategory] = useState();

  const loadBlogExamples = () => {
    console.log(
      `http://localhost:3000/blog?_page=${currentPage}&_limit=3${category}`
    );
    axios
      .get(
        `http://localhost:3000/blog?_page=${currentPage}&_limit=3${category}`
      )
      .then((r) => {
        setExampleBlogs(r.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
    loadBlogExamples();
  }, [page, category]);

  return (
    <div>
      <main>
        <div className="container">
          <select
            className="form-select"
            onChange={(v) => setCategory(v.target.value)}
          >
            <option value="">Sin Filtro</option>
            <option value="&category=1">Con joroba</option>
            <option value="&category=2">Sin Joroba</option>
          </select>
          <div className="separator" />
          {exampleBlogs?.map((exampleBlog) => (
            <ExampleCardBlog key={exampleBlog.id} exampleBlog={exampleBlog} />
          ))}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="1">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="1">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="2">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="3">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="4">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
