import { Formik, Form, Field } from 'formik';

const LoginForm = () => {
    return (
    <Formik
  initialValues={{ username: "", password: "" }}
  onSubmit={({ setSubmitting }) => {
    console.log("Form is validated! Submitting the form...");
    setSubmitting(false);
  }}
>
  {() => (
    
    <Form className='col-12 col-md-12 mt-3 mt-md-0'>
      <h2 class="text-center mb-4">Войти</h2>
      <div className="form-group">
        <Field
          type="username"
          name="username"
          className="form-control"
          placeholder="Ваш ник"
        />
      </div>
      <div className="form-group">
        <Field
          type="password"
          name="password"
          className="form-control"
          placeholder="Пароль"
        />
      </div>
       <button className='w-100 mb-3 btn btn-outline-primary' type="submit">Войти</button>
    </Form>
  )}
</Formik>
)
}

export default LoginForm