import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice.js'
import { useLoginUserMutation } from '../services/usersApi.js';


const LoginForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUser] = useLoginUserMutation()
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Обязательное поле'),
      password: Yup.string().required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values).unwrap();
        dispatch(setCredentials(response));
        navigate('/');
      }
      catch (err) {
        setError(err.data.message)
      }

    }
  })


  return (
    <form onSubmit={formik.handleSubmit} className='col-12 align-tems-center'>
      <h2 className="text-center mb-4">Войти</h2>
      <input onChange={formik.handleChange} value={formik.values.username} type="text" name="username" className={`form-control  ${formik.touched.username && formik.errors.username ? 'is-invalid' : 'mb-4'
        }`} placeholder="Ваш ник" />
      <div className="invalid-feedback m-0 p-0">{formik.errors.username}</div>
      <input onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className={`form-control  ${formik.touched.password && formik.errors.password ? 'is-invalid' : 'mb-4'
        }`} placeholder="Пароль" />
      <div className="invalid-feedback m-0 p-0">{formik.errors.password}</div>
      <button className='w-50 mb-3 btn btn-outline-primary m-2' type="submit">Войти</button>
      {error ? <div className="text-danger">{error}</div> : null}
    </form>

  )
}

export default LoginForm