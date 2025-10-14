import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../store/slices/authSlice.js'
import { useLoginUserMutation } from '../../api/usersApi.js'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect } from 'react'
import { Button, Col, Row, Form, Container, Image } from 'react-bootstrap'
import validationSchema from '../../validation/index.js'

const LoginForm = () => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUser] = useLoginUserMutation()
  const [error, setError] = useState(null)

  const handleSubmitLogin = async (values) => {
    try {
      const response = await loginUser(values).unwrap()
      dispatch(setCredentials(response))
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.username)
      navigate('/')
    }  
    catch (err) {
      setError(err.data.message)
    }
  }

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: validationSchema(t, 'login'),
    onSubmit: handleSubmitLogin,
  })

  useEffect(() => {
    if (inputRef) inputRef.current.focus()
  }, [])

  return (

    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <Image src="/images/chat.png" className="img-fluid overflow-hidden" roundedCircle alt={t('auth.logIn')} />
          </Col>
          <Col md="6">
            <Form.Group
              as={Col}
              controlId="username"
              className="position-relative mb-3"
            >
              <h1 className="text-center mb-4">{t('auth.logIn')}</h1>
              <Form.Label visuallyHidden>{t('auth.yourNikname')}</Form.Label>
              <Form.Control
                ref={inputRef}
                style={{ height: '60px' }}
                type="text"
                name="username"
                autoComplete="off"
                placeholder={t('auth.yourNikname')}
                value={formik.values.username}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="password"
              className="position-relative"
            >
              <Form.Label visuallyHidden>{t('auth.password')}</Form.Label>
              <Form.Control
                style={{ height: '60px' }}
                type="password"
                name="password"
                autoComplete="off"
                value={formik.values.password}
                placeholder={t('auth.password')}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.password || !!error}
              />
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password || t(`errors.${error}`)}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Button variant="outline-primary" className="mt-3 mb-3 w-100" type="submit">{t('auth.logIn')}</Button>
            </Form.Group>
          </Col>
        </Row>

      </Form>
    </Container>

  )
}

export default LoginForm
