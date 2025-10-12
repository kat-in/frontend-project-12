import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import cn from 'classnames'
import { useContext, useEffect, useRef } from 'react'
import { ModalContext } from '../../../contexts/ModalContext'
import { useTranslation } from 'react-i18next'

const ModalContainer = ({ formik }) => {
  const { isModal, setIsModal, modalMode, modalData } = useContext(ModalContext)
  const inputEl = useRef(null)
  const { t } = useTranslation()

  const handleCloseModal = () => {
    formik.resetForm()
    setIsModal(false)
  }

  const inputClassnames = cn('mb-2', 'form-control', { 'is-invalid': formik.errors.name })
  const input = modalMode === 'remove' ? <p className="lead">{t('chat.areYouShure:')}</p> : <input ref={inputEl} onChange={formik.handleChange} value={formik.values.name} name="name" id="name" className={inputClassnames} />
  const buttonColor = modalMode === 'remove' ? 'danger' : 'primary'

  useEffect(() => {
    if (isModal && inputEl.current) {
      inputEl.current.focus()
    }
    if (modalMode === 'rename' && inputEl.current) {
      inputEl.current.select()
    }
    if (isModal) formik.resetForm()
  }, [isModal, modalMode])

  return (
    <Modal show={isModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalData.name}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {input}
          <label className="visually-hidden" htmlFor="name">{t('chat.channelName')}</label>
          <div className="invalid-feedback">{formik.errors.name}</div>
          <Modal.Footer style={{ borderTop: 'none' }}>
            <Button onClick={handleCloseModal} variant="secondary">{modalData.cancel}</Button>
            <Button type="submit" variant={buttonColor}>{modalData.submit}</Button>
          </Modal.Footer>
        </Modal.Body>
      </form>
    </Modal>
  )
}

export default ModalContainer
