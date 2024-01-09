import axios from 'axios';
import ExampleCardBlog from '../Layout/ExampleCardBlog';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [exampleBlogs, setExampleBlogs] = useState();

  const loadBlogExamples = () => {
    axios
      .get('http://localhost:3000/blog')
      .then((r) => {
        setExampleBlogs(r.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadBlogExamples();
  }, []);

  return (
    <div>
      <main>
        <div className="container">
          <div className="separator" />
          {exampleBlogs?.map((exampleBlog) => (
            <ExampleCardBlog key={exampleBlog.id} exampleBlog={exampleBlog} />
          ))}
        </div>
      </main>
    </div>
  );
}
