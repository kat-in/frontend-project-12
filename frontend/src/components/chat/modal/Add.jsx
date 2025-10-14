import { useFormik } from 'formik'
import { useAddChannelMutation, useGetChannelsQuery, channelsApi } from '../../../api/channelsApi'
import { useContext } from 'react'
import { ModalContext } from '../../../contexts/ModalContext'
import { ChannelContext } from '../../../contexts/ChannelContext'
import ModalContainer from './ModalContainer'
import { useTranslation } from 'react-i18next'
import notify from '../../../utils/notify'
import leoProfanity from 'leo-profanity'
import { useDispatch } from 'react-redux'
import validationSchema from '../../../validation'

const Add = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [addChannel] = useAddChannelMutation()
  const { setIsModal } = useContext(ModalContext)
  const { data: channels = [] } = useGetChannelsQuery()
  const { setActiveChannelId } = useContext(ChannelContext)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: '' },
    validationSchema: validationSchema(t, 'add', channels),
    onSubmit: async (values) => {
      const cleanChannel = leoProfanity.clean(values.name)
      try {
        const newChannel = await addChannel({ name: cleanChannel }).unwrap()
        dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
            draft.push(newChannel)
          }),
        )
        formik.resetForm()
        setIsModal(false)
        setActiveChannelId(newChannel.id)
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
