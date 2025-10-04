
import React from 'react'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
    return (
        <div class="container">
 <div className='row justify-content-center pb-5 pt-5 mt-5 mb-5 shadow-sm navbar navbar-expand-lg navbar-ligth bg-white'>

    <div class="col-md-4 col-lg-3">
      <div class="p-4 text-white text-center rounded mb-3">
        <img src='public/img/chat.png' alt="chat"  class="img-fluid overflow-hidden img-circle" />
      </div>
    </div>
    <div class="col-md-4 col-lg-3">
      <div class="p-4 text-dark text-center rounded mb-3">
        <LoginForm/>
      </div>
    </div>
  </div>
    <div class='card-footer p-4 text-center'>Нет аккаунта? <a href="#">Регистрация</a></div>
</div>

    
    )
}

export default LoginPage