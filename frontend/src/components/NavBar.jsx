import React from 'react'


const NavBar = () => {

    return (
        <>
            <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
                <div className='container'>
                    <a className='navbar-brand' href='/'>Чатик</a>
                    <button type="button" className="btn btn-primary">Выйти</button>
                </div>
            </nav>
        </>
    )
}

export default NavBar