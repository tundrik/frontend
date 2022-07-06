import { createEvent, createEffect, createStore, sample, forward } from "effector"
import { useStore } from "effector-react"
import { CloseIcon } from "@/svg"
import { Pic, Label } from "../ui"
import { formattedPhone } from "../utils"
import { host, fetchAlert } from "../api"

export const setAlert = createEvent()
export const $alert = createStore(null).on(setAlert, (_, props) => props)

export const setContact = createEvent()
export const $contact = createStore(null).on(setContact, (_, props) => props)

export const setModalForm = createEvent()
export const $modal_form = createStore(null).on(setModalForm, (_, props) => props)

const sendFormFx = createEffect(async (e) => {
    const formData = new FormData(e.target)
    return await fetchAlert({ formData: formData, cursor: `${host}/features/` })
})

export const submitForm = createEvent()
submitForm.watch((e) => {
    e.preventDefault()
    setModalForm(null)
})

sample({
    clock: submitForm,
    target: sendFormFx,
})

const responseFormFx = createEffect(async (value) => {
    setAlert({
        title: "Сообщение",
        body: "Мы свяжемся с вами в ближайшее время",
    })
    return true
})

forward({
    from: sendFormFx.doneData,
    to: responseFormFx,
})

const createInputPhone = () => {
    const setPhone = createEvent()
    const $phone = createStore("").on(setPhone, (_, state) => state)
    const handleChangePhone = setPhone.prepend((e) => formattedPhone(e.target.value))
    const InputPhone = () => {
        const value = useStore($phone)
        return (
            <label className="m-system">
                <input
                    className="input"
                    name="phone"
                    type="tel"
                    value={value}
                    onChange={handleChangePhone}
                    placeholder="Номер телефона"
                />
            </label>
        )
    }
    return InputPhone
}

const ButtonClose = () => (
    <button className="pointer" onClick={() => setModalForm(null)}>
        <CloseIcon size="18" />
    </button>
)

const ModalSceleton = ({ isOpen, children }) => (
    <div className={isOpen ? "modalOpenMask modalMask" : "modalMask"}>
        <div className={isOpen ? "modal min modalOpen" : "modal min"}>{isOpen ? children : null}</div>
    </div>
)

const BigSceleton = ({ isOpen, children }) => (
    <div className={isOpen ? "modalOpenMask modalMask" : "modalMask"}>
        <div className={isOpen ? "modal max modalOpen" : "modal max"}>{isOpen ? children : null}</div>
    </div>
)

export const ModalForm = () => {
    const modal_form = useStore($modal_form)
    const InputPhone = createInputPhone()
    return (
        <BigSceleton isOpen={modal_form}>
            <>
                <div>
                    <header className="batwen">
                        <div className="L basisHeader">
                            <ButtonClose />
                        </div>
                        <div className="b m-logo">Liberty</div>
                        <div className="R basisHeader"></div>
                    </header>
                </div>
                <form id="action" onSubmit={submitForm} autoComplete="off">
                    <label className="m-system">
                        <input className="input" type="text" name="name" placeholder="Введите имя" />
                    </label>
                    <InputPhone />
                    <button className="button bottom" type="submit" form="action">
                        Отправить
                    </button>
                    <input className="none" type="text" name="type_form" defaultValue={"home"} />
                </form>
            </>
        </BigSceleton>
    )
}

export const Alert = () => {
    const alert = useStore($alert)
    const { title, body } = alert || {}
    return (
        <ModalSceleton isOpen={alert}>
            <div>
                <div className="title b">{title}</div>
                <div className="message" dangerouslySetInnerHTML={{ __html: body }}></div>
            </div>
            <button className="button bottom" onClick={() => setAlert(null)}>
                ОК
            </button>
        </ModalSceleton>
    )
}

export const Contact = () => {
    const contact = useStore($contact)
    const { pic, phone, name, role } = contact || {}
    return (
        <ModalSceleton isOpen={contact}>
            <div>
                <header className="batwen">
                    <div className="L basisHeader"></div>
                    <div className="b m-logo">Liberty</div>
                    <div className="R basisHeader"></div>
                </header>
                <div className="picha">
                    <Pic size={86} url={pic} mr={0} />
                    <div className="b mt8">{name}</div>
                    <div className="mt8 blue ls">
                        <a href={`tel:${phone}`}>{phone}</a>
                    </div>
                </div>
            </div>
            <div className="button bottom" onClick={() => setContact(null)}>
                ОК
            </div>
        </ModalSceleton>
    )
}
