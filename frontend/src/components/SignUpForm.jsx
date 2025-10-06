import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setCredentials } from "../store/slices/authSlice";
import { useAddUserMutation } from "../services/usersApi"


const SignUpForm = () => {
  const [addUser] = useAddUserMutation()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
    const formik = useFormik({
            initialValues: { username: '', password:'', confirmPassword:''},
            validationSchema: Yup.object({
                  username: Yup.string().required('Обязательное поле').min(3,'Не меньше 3 символов'),
                  password: Yup.string().required('Обязательное поле').min(5,'Не меньше 5 символов'),
                  confirmPassword: Yup.string().required('Обязательное поле').oneOf([Yup.ref('password'), null], 'Пароль должен совпадать'),
                }),
            onSubmit: async (values) => {
                try {
                  const response = await addUser({username: values.username, password: values.password}).unwrap();
                  dispatch(setCredentials(response));
                  navigate('/');
                }
                catch (err) {
                if (err.status === 409){
                  setError('Логин занят!')
                }
                }
              }
    
        })

    return (
        <form onSubmit={formik.handleSubmit} className="w-50">
            <h1 className="text-center mb-4">Регистрация</h1>
            <div className="form-floating mb-3">
                <input onChange={formik.handleChange} value={formik.values.username} placeholder="От 3 до 20 символов" name="username" autoComplete="username" id="username" className="form-control is-invalid" />
                <label className="form-label" htmlFor="username">{formik.errors.username ?? 'Имя пользователя'}</label>
                {/* <div placement="right" className="invalid-tooltip">Обязательное поле</div> */}
            </div>
            <div className="form-floating mb-3">
                <input onChange={formik.handleChange} value={formik.values.password} placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" autoComplete="new-password" type="password" id="password" className="form-control" />
                {/* <div className="invalid-tooltip">Обязательное поле</div> */}
                <label className="form-label" htmlFor="password">{formik.errors.password ?? 'Пароль'}</label>
            </div>
            <div className="form-floating mb-4">
                <input onChange={formik.handleChange} value={formik.values.confirmPassword} placeholder="Пароли должны совпадать" name="confirmPassword" autoComplete="new-password" type="password" id="confirmPassword" className="form-control" />
                {/* <div className="invalid-tooltip"></div> */}
                <label className="form-label" htmlFor="confirmPassword">{formik.errors.confirmPassword ?? 'Подтвердите пароль'}</label>
            </div>
            <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
            {error ? <div className="text-danger">{error}</div> : null}
        </form>

    )
}

export default SignUpForm