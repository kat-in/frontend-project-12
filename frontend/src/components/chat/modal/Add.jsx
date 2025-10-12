import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAddChannelMutation } from '../../../api/channelsApi'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ModalContext } from '../../../contexts/ModalContext'
import { ChannelContext } from '../../../contexts/ChannelContext'
import ModalContainer from './ModalContainer'
import { useTranslation } from 'react-i18next'
import notify from '../../../utils/notify'
import leoProfanity from 'leo-profanity'

const Add = () => {
  const { t } = useTranslation()
  const [addChannel] = useAddChannelMutation()
  const { setIsModal } = useContext(ModalContext)
  const channels = useSelector(state => state.allChannels)
  const { setActiveChannelId } = useContext(ChannelContext)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.min'))
        .max(20, t('validation.max'))
        .test(
          'Unique',
          t('modal.isUnique'),
          value => !channels.some(ch => ch.name === value)
        ),
    }),
    onSubmit: async (values) => {
      if (!navigator.onLine) {
        notify(t('errors.offLine'), 'error')
        return
      }
      if (leoProfanity.check(values.name)) {
        notify(t('errors.badWord'), 'error')
        return
      }
      try {
        const response = await addChannel(values).unwrap()
        formik.resetForm()
        setIsModal(false)
        setActiveChannelId(response.id)
        notify(t('toast.addChannel'), 'success')
      }
      catch (err) {
        notify(err, 'error')
      }
    },
  })

  return <ModalContainer formik={formik} />
}

export default Add
