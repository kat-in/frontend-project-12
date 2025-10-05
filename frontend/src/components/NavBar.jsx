import React from 'react'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
    const navigate = useNavigate()
    
    const goToLogin = () => {
    navigate('/login')
  }
 
    return (
        <>
            <div className='shadow-sm navbar navbar-expand-lg navbar-ligth bg-white'>
                <div className='container'>
                    <div className='d-flex w-100 justify-content-between'>
                        <h1 className='text-center '>Чатик</h1>
                        {/* Кнопка выхода скрыта d-none. Показать d-flex*/}
                        <div className='d-none p-2 justify-content-end w-50 col-2'>
                            <button onClick={goToLogin} className='btn btn-primary button class="btn btn-primary w-25'>Выход</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar