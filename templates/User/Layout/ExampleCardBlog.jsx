import { Link } from 'react-router-dom';

export default function ExampleCardBlog(props) {
  const { exampleBlog } = props;

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <section>
      <Link
        to={`/blog/${exampleBlog.id}`}
        className="row ms-5"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div className="col-8">
          <h3 className="titleExamplePost mb-3">{exampleBlog.title}</h3>

          <p
            dangerouslySetInnerHTML={{
              __html: truncateString(exampleBlog.content, 500),
            }}
          />
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
