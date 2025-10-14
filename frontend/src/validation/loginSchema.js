import * as Yup from 'yup'

export default (t) => Yup.object({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
})
