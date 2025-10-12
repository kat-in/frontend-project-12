const SignUpPage = ({ children }) => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row d-flex p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="/images/chat.png" className="rounded-circle mg-fluid overflow-hidden" alt="Войти" />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
