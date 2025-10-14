import { useFormik } from 'formik'
import { useAddMessageMutation } from '../../../api/messagesApi'
import { useTranslation } from 'react-i18next'
import ArrowIcon from '../../icons/ArrowIcon'
import leoProfanity from 'leo-profanity'
import notify from '../../../utils/notify'

const MessageForm = ({ channelId, username }) => {
  const [addMessage] = useAddMessageMutation()
  const { t } = useTranslation()
  const handleSubmitAddMessage = async (values) => {
    const cleanMessage = leoProfanity.clean(values.body)
    try {
      await addMessage({ body: cleanMessage, channelId, username }).unwrap()
      formik.resetForm()
    }
    catch (err) {
      const errorMessage = err?.data?.message || err?.error || 'Ошибка отправки сообщения'
      notify(errorMessage, 'error')
    }
  }

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: handleSubmitAddMessage,
  })

  return (
    <div className="px-5 py-3">
      <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input name="body" aria-label="Новое сообщение" placeholder={t('chat.inputMessage')} className="border-0 p-0 ps-2 form-control" autoComplete="off" onChange={formik.handleChange} value={formik.values.body} />
          <button type="submit" disabled={!formik.values.body.trim()} className="btn btn-group-vertical">
            <ArrowIcon />
            <span className="visually-hidden">{t('chat.submit')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
