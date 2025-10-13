import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../store/slices/authSlice'
import { useAddUserMutation } from '../../api/usersApi'
import { useTranslation } from 'react-i18next'

const SignUpForm = () => {
  const { t } = useTranslation()
  const [addUser] = useAddUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(t('validation.required')).min(3, t('validation.minUsername')),
      password: Yup.string().required('validation.required').min(6, t('validation.minPassword')),
      confirmPassword: Yup.string().required('validation.required').oneOf([Yup.ref('password'), null], t('validation.confirm')),
    }),
    onSubmit: async (values) => {
      try {
        const response = await addUser({ username: values.username, password: values.password }).unwrap()
        dispatch(setCredentials(response))
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', response.username)
        navigate('/')
      }
      catch (err) {
        if (err.status === 409) {
          setError('Логин занят!')
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('auth.registration')}</h1>
      <div className="form-floating mb-3">
        <input onChange={formik.handleChange} value={formik.values.username} placeholder="От 3 до 20 символов" name="username" autoComplete="username" id="username" className="form-control" />
        <label className="form-label" htmlFor="username">{formik.errors.username ?? t('auth.username')}</label>
        <div className="invalid-feedback m-0 p-0">{formik.errors.username}</div>
      </div>
      <div className="form-floating mb-3">
        <input onChange={formik.handleChange} value={formik.values.password} placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" autoComplete="new-password" type="password" id="password" className="form-control" />
        {/* <div className="invalid-tooltip">Обязательное поле</div> */}
        <label className="form-label" htmlFor="password">{formik.errors.password ?? t('auth.password')}</label>
      </div>
      <div className="form-floating mb-4">
        <input onChange={formik.handleChange} value={formik.values.confirmPassword} placeholder="Пароли должны совпадать" name="confirmPassword" autoComplete="new-password" type="password" id="confirmPassword" className="form-control" />
        {/* <div className="invalid-tooltip"></div> */}
        <label className="form-label" htmlFor="confirmPassword">{formik.errors.confirmPassword ?? t('auth.confirmPassword')}</label>
      </div>
      <button type="submit" className="w-100 btn btn-outline-primary">{t('auth.signUp')}</button>
      {error ? <div className="text-danger">{error}</div> : null}
    </form>

  )
}

export default SignUpForm
