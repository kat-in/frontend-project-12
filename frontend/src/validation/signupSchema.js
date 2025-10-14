import * as Yup from 'yup'

export default t => Yup.object({
  username: Yup.string().required(t('validation.required')).min(3, t('validation.minMax')).max(20, t('validation.minMax')),
  password: Yup.string().required(t('validation.required')).min(6, t('validation.minPassword')),
  confirmPassword: Yup.string().required(t('validation.required')).oneOf([Yup.ref('password'), null], t('validation.confirm')),
})
