
import React from 'react'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <div className="container">
      <div className='row justify-content-center pb-5 pt-5 mt-5 mb-5 shadow-sm navbar navbar-expand-lg navbar-ligth bg-white'>

        <div className="col-md-4 col-lg-3">
          <div className="p-4 text-white text-center rounded mb-3">
            <img src='public/img/chat.png' alt="chat" className="img-fluid overflow-hidden img-circle" />
          </div>
        </div>
        <div className="col-md-4 col-lg-3">
          <div className="p-4 text-dark text-center rounded mb-3">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='card-footer p-4 text-center'>Нет аккаунта? <a href="#">Регистрация</a></div>
    </div>

  )
}

export default LoginPage