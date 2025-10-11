import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }
    return (
        <>
            <div class='container'>
                <div class='col p-4 justify-content-center m-auto align-tems-center'>
                    <h3 class='text-center'>Страница не найдена</h3>
                    <p class='text-center'>Но вы можете перейти на <a onClick={goToHome} href="">главную страницу</a></p>
                </div>

            </div>

        </>
    )
}

export default NotFound