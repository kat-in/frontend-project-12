import React from "react";
import { useFormik } from "formik"
import * as Yup from 'yup';
import cn from 'classnames'
import { useAddChannelMutation, useRemoveChannelMutation, useEditChannelMutation } from "../api/channelsApi";
import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ModalContext } from "../contexts/ModalContext";
import { ChannelContext } from "../contexts/ChannelContext";

const Modal = () => {

    const [addChannel] = useAddChannelMutation()
    const [removeChannel] = useRemoveChannelMutation()
    const [editChannel] = useEditChannelMutation()
    const channels = useSelector(state => state.allChannels)

    const { isModal, setIsModal, modalMode, setModalMode, modalData, setModalData, isButtonDisabled, setIsButtonDisabled } = useContext(ModalContext)
    const { setActiveChannelId } = useContext(ChannelContext)
    const inputEl = useRef(null)

    useEffect(() => {
        if (isModal && inputEl.current) {
            inputEl.current.focus()
        }
        if (modalMode === 'rename' && inputEl.current) {
            inputEl.current.select()
        }
    }, [isModal, modalMode ])

    const modalModeFormik = (modalMode) => {
        switch (modalMode) {
            case 'add': {
                const formik = useFormik({
                    enableReinitialize: true,
                    initialValues: { name: '' },
                    validationSchema: Yup.object({
                        name: Yup.string()
                            .required('Обязательное поле')
                            .min(3, 'От 3 до 20 символов')
                            .max(20, 'От 3 до 20 символов')
                            .test(
                                'Уникальность',
                                'Такое имя уже существует',
                                (value) => !channels.some(ch => ch.name === value)
                            ),
                    }),
                    onSubmit: async (values) => {
                        try {
                            const response = await addChannel(values).unwrap();
                            formik.resetForm();
                            setIsModal(false)
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
                    onSubmit: async () => {
                        const id = modalData.channelId
                        try {
                            const response = await removeChannel(id).unwrap()
                            formik.resetForm()
                            setActiveChannelId('1')
                            setIsModal(false)
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                })
                return formik
            }
            case 'rename': {
                const formik = useFormik({
                    enableReinitialize: true,
                    initialValues: { name: modalData.channelName },
                    validationSchema: Yup.object({
                        name: Yup.string()
                            .required('Обязательное поле')
                            .min(3, 'От 3 до 20 символов')
                            .max(20, 'От 3 до 20 символов')
                            .test(
                                'Уникальность',
                                'Такое имя уже существует',
                                (value) => !channels.some(ch => ch.name === value && ch.id !== modalData.channelId)
                            ),
                    }),
                    onSubmit: async (values) => {
                        const id = modalData.channelId
                        try {
                            const response = await editChannel({ name: values.name, id }).unwrap();
                            formik.resetForm();
                            setIsModal(false)
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                })
                return formik
            }
            default:
                return null
        }
    }

    const formik = modalModeFormik(modalMode)

    const handleCloseModal = () => {
        formik.resetForm()
        setIsModal(false)
    }


    const modalIsShown = cn('fade', 'modal', { 'show': isModal, 'd-block': isModal })
    const modalBackdrop = isModal ? <div className='fade modal-backdrop show'></div> : null
    const inputClassnames = cn('mb-2', 'form-control', { 'is-invalid': formik.errors.name })
    const input = modalMode === 'remove' ? <p className='lead'>Уверены?</p> : <input ref={inputEl} onChange={formik.handleChange} value={formik.values.name} name="name" id="name" className={inputClassnames} />
    const submitClassList = modalMode === 'remove' ? 'btn btn-danger' : 'btn btn-primary'


    useEffect(() => {
        if (isModal) formik.resetForm();
    }, [modalMode])

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
                                        <button onClick={handleCloseModal} type="button" className='me-2 btn btn-secondary'>{modalData.cancel}</button>
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

