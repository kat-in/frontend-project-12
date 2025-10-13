import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../store/slices/authSlice'
import { useAddUserMutation } from '../../api/usersApi'
import { useTranslation } from 'react-i18next'
import { Button, Col, Row, Form, Container, Image } from 'react-bootstrap'

const SignUpForm = () => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [addUser] = useAddUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().required(t('validation.required')).min(3, t('validation.minUsername')),
      password: Yup.string().required(t('validation.required')).min(6, t('validation.minPassword')),
      confirmPassword: Yup.string().required(t('validation.required')).oneOf([Yup.ref('password'), null], t('validation.confirm')),
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
          formik.setStatus(t('auth.userExists'))
          formik.setFieldError('username', ' ')
          formik.setFieldError('password', ' ')
          formik.setFieldError('confirmPassword', t('auth.userExists'))
          inputRef.current.focus()
          inputRef.current.select()
        } else {
          formik.setFieldError('confirmPassword', t('auth.userExists'))
        }
      }
    },
  })

  useEffect(() => {
    if (inputRef) inputRef.current.focus()
  }, [])

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md="6">
            <Image src="/images/chat.png" className="img-fluid overflow-hidden" roundedCircle alt={t('auth.signUp')} />
          </Col>
          <Col md="6">
            <Form.Group
              as={Col}
              controlId="username"
              className="position-relative mb-3"
            >
              <h1 className="text-center mb-4">{t('auth.registration')}</h1>

              <Form.Label visuallyHidden>{t('auth.username')}</Form.Label>
              <Form.Control
                ref={inputRef}
                style={{ height: '60px' }}
                type="text"
                name="username"
                placeholder={t('auth.username')}
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
                value={formik.values.password}
                placeholder={t('auth.password')}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="confirmPassword"
              className="position-relative"
            >
              <Form.Label visuallyHidden>{t('auth.confirmPassword')}</Form.Label>
              <Form.Control
                style={{ height: '60px' }}
                type="password"
                name="confirmPassword"
                className="mt-3"
                value={formik.values.confirmPassword}
                placeholder={t('auth.confirmPassword')}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}  </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Button variant="outline-primary" disabled={formik.isSubmitting} className="mt-3 mb-3 w-100" type="submit">{t('auth.signUp')}</Button>
            </Form.Group>
          </Col>
        </Row>

      </Form>
    </Container>
  )
}

export default SignUpForm
