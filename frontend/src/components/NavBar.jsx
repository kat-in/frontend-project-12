import { useSelector } from "react-redux"
import { removeCredentials } from "../store/slices/authSlice"
import { useDispatch } from "react-redux"


const NavBar = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    
    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch(removeCredentials())
    }

    const logoutButton = token ? <button onClick={handleLogout} type="button" className="btn btn-primary">Выйти</button> : null

    return (
        <>
            <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
                <div className='container'>
                    <a className='navbar-brand' href='/'>Чатик</a>
                    {logoutButton}
                </div>
            </nav>
        </>
    )
}

export default NavBar