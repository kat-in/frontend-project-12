import { useFormik } from "formik"
import * as Yup from 'yup';
import cn from 'classnames'
import { useAddChannelMutation } from "../services/channelsApi";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { ChannelContext } from "../contexts/ChannelContext";

const Modal = () => {
    const dispatch = useDispatch()
    const [addChannel] = useAddChannelMutation()
    const { isModal, setIsModal, modalMode, setModalMode, modalData, setModalData } = useContext(ModalContext)
    const { setActiveChannelId } = useContext(ChannelContext)

    const modalModeFormik = (modalMode) => {
        switch (modalMode) {
            case 'add': {
                const formik = useFormik({
                    initialValues: { name: '' },
                    validationSchema: Yup.object({
                        name: Yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
                    }),
                    onSubmit: async (values) => {
                        try {
                            const response = await addChannel(values).unwrap();
                            formik.resetForm();
                            setActiveChannelId(response.id)
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                })
                return formik
            }
            case 'remove': {
                const formik = useFormik({
                    onSubmit: async (values) => {
                        console.log('удалить', modalData.channelId)
                        // try {
                        //     const response = await addChannel(values).unwrap();
                        //     formik.resetForm();
                        //     setActiveChannelId(response.id)
                        // }
                        // catch (err) {
                        //     console.log(err)
                        // }
                    }
                })
                return formik
            }
              case 'rename': {
                const formik = useFormik({
                    initialValues: { name:'' },
                    validationSchema: Yup.object({
                        name: Yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
                    }),
                    onSubmit: async (values) => {
                        try {
                            const response = await addChannel(values).unwrap();
                            setActiveChannelId(response.id)
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                })
                return formik
            }
            default:
                throw new Error('Нет такого модального окна')
        }
    }

    const formik = modalModeFormik(modalMode)

    const handleCloseModal = () => {
        formik.resetForm()
        setIsModal(false)
    }


    const modalIsShown = cn('fade', 'modal', { 'show': isModal, 'd-block': isModal })
    const modalBackdrop = isModal ? <div className='fade, modal-backdrop show'></div> : null
    const inputClassnames = cn('mb-2', 'form-control', { 'is-invalid': formik.errors.name })
    const input = modalMode === 'remove' ? <p className='lead'>Уверены?</p> : <input onChange={formik.handleChange} value={formik.values.name} name="name" id="name" className={inputClassnames} />
    const submitClassList = modalMode === 'remove' ? 'btn btn-danger' : 'btn btn-primary'


    return (
        <>
            {modalBackdrop}
            <div role="dialog" aria-modal="true" className={modalIsShown} tabIndex="-1" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{modalData.name}</div>
                            <button onClick={handleCloseModal} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    {input}
                                    <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                    <div className="d-flex justify-content-end">
                                        <button onClick={handleCloseModal} type="button" className="me-2 btn btn-secondary">{modalData.cancel}</button>
                                        <button type="submit" className={submitClassList}>{modalData.submit}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Modal

