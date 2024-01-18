import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

export default function AddPostScreen() {
  const navigate = useNavigate();

  const [validationSchema] = useState(
    Yup.object().shape({
      title: Yup.string().required('El campo no puede estar vacío'),
      image: Yup.string().required('El campo no puede estar vacío'),
      content: Yup.string().required('El campo no puede estar vacío'),
    })
  );

  const handleAddBlog = (payload) => {
    console.log(payload)
    let tempPayload = { ...payload };
    tempPayload.image = payload.image.name;
    axios
      .post('http://localhost:3000/blog', tempPayload)
      .then((r) => {
        navigate('/admin');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-custom">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Añadir nuevo Post</h5>
          <Formik
            initialValues={{
              title: '',
              image: null,
              content: '',
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={(v) => handleAddBlog(v)}
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
                        onChange={(v) => setFieldValue('title', v.target.value)}
                      />
                      {errors.title && (
                        <div className="text-danger">{errors.title}</div>
                      )}
                    </div>

                    <div className="mt-3">
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
                            src={URL.createObjectURL(values.image)}
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
                <div onClick={handleSubmit} className="btn btn-primary">
                  Go somewhere
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
