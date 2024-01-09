import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
export default function ExampleCardBlog(props) {
  const { exampleBlog } = props;
  return (
    <section>
      <Link
        to={`/blog/${exampleBlog.id}`}
        className="row ms-5"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div className="col-8">
          <div className="titleExamplePost mb-3">{exampleBlog.title}</div>
          <p>{exampleBlog.summary}</p>
        </div>
        <div className="col-3">
          <img
            className="imageExamplePost"
            src={`/assets/img/${exampleBlog.image}`}
            alt="Camello guapo"
          />
        </div>
      </Link>
      <div className="separator" />
    </section>
  );
}
