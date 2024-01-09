import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

export default function EditPostScreen() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [validationSchema] = useState(
    Yup.object().shape({
      title: Yup.string().required('El campo no puede estar vacío'),
      summary: Yup.string().required('El campo no puede estar vacío'),
      image: Yup.string().required('El campo no puede estar vacío'),
      content: Yup.string().required('El campo no puede estar vacío'),
    })
  );

  const loadBlogExamples = () => {
    axios
      .get(`http://localhost:3000/blog/${blogId}`)
      .then((r) => {
        setBlog(r.data);
      })
      .catch((err) => console.log('falla'));
  };

  useEffect(() => {
    loadBlogExamples();
  }, []);

  const handleEditBlog = (payload) => {
    console.log(payload);
    let tempPayload = { ...payload };
    tempPayload.image = payload.image.name;
    axios
      .patch(`http://localhost:3000/blog/${blogId}`, tempPayload)
      .then((r) => {
        navigate('/admin');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-custom">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Editar nuevo Post</h5>
          {blog ? (
            <Formik
              initialValues={{
                title: blog.title,
                summary: blog.summary,
                image: blog.image,
                content: blog.content,
              }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              enableReinitialize
              onSubmit={(v) => handleEditBlog(v)}
            >
              {({ setFieldValue, values, handleSubmit, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-9">
                      <div className="mt-3">
                        <Field
                          type="text"
                          name="title"
                          placeholder="Titulo"
                          onChange={(v) =>
                            setFieldValue('title', v.target.value)
                          }
                        />
                        {errors.title && (
                          <div className="text-danger">{errors.title}</div>
                        )}
                      </div>

                      <div className="mt-3">
                        <Field
                          type="text"
                          name="summary"
                          placeholder="Resumen"
                          onChange={(v) =>
                            setFieldValue('summary', v.target.value)
                          }
                        />
                        {errors.summary && (
                          <div className="text-danger">{errors.summary}</div>
                        )}
                      </div>

                      <Editor
                        apiKey="wqj4yfvv9bb5f6qctzwzi8ud8pr2bxzm6n6931uhd7m6x0fo"
                        value={values.content}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'preview',
                            'anchor',
                            'searchreplace',
                            'visualblocks',
                            'code',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                            'code',
                            'help',
                            'wordcount',
                          ],
                          toolbar:
                            'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={(r) => setFieldValue('content', r)}
                      />

                      {errors.content && (
                        <div className="text-danger">{errors.content}</div>
                      )}
                    </div>
                    <div className="col-3">
                      <div
                        className="card mt-3 m-5 pointer"
                        onClick={() => console.log('x')}
                      >
                        {values.image ? (
                          <div style={{ width: '400px', height: '400px' }}>
                            <img
                              className="card-img-top"
                              src={`/assets/img/${values.image}`}
                            />
                          </div>
                        ) : (
                          <div
                            className="text-center"
                            style={{ fontSize: '300px' }}
                          >
                            <i className="ri-file-image-line primary"></i>
                          </div>
                        )}

                        <Field
                          type="file"
                          id="file"
                          name="file"
                          onChange={(v) => {
                            setFieldValue('image', v.currentTarget.files[0]);
                          }}
                        />
                        {errors.image && (
                          <div className="text-danger">{errors.image}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div onClick={handleSubmit} className="btn btn-primary mt-3">
                    Actualizar
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <>Cargando</>
          )}
        </div>
      </div>
    </div>
  );
}
