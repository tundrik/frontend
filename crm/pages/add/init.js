import { createEffect, createStore, createEvent, forward } from "effector"
import { useStore } from "effector-react"
import { formattedPhone, formattedPrice } from "../../utils"
import { fetchAlert } from "../../api"
import { NavigatorRoute } from "../../router/config"


const sendFormNodeFx = createEffect(async (e) => {
    const formData = new FormData(e.target)
    return await fetchAlert({ formData: formData })
})

const submitForm = createEvent()
submitForm.watch((e) => {
    e.preventDefault()
})

forward({
    from: submitForm,
    to: sendFormNodeFx,
})

const responseFx = createEffect(async (value) => {
    if (value.type_node) {
        NavigatorRoute.navigate({
            method: "replace",
            params: {
                node: value.type_node,
            },
        })
    }
    return true
})

forward({
    from: sendFormNodeFx.doneData,
    to: responseFx,
})

const setType = createEvent()
const $type_enum = createStore("residential").on(setType, (_, state) => state)

export const createInputPhone = () => {
    const setPhone = createEvent()
    const $phone = createStore("").on(setPhone, (_, state) => state)
    const handleChangePhone = setPhone.prepend((e) => formattedPhone(e.target.value))
    const InputPhone = () => {
        const value = useStore($phone)
        return (
            <label className="system din1">
                <div className="lsy">Телефон</div>
                <input
                    className="tre"
                    name="phone"
                    type="tel"
                    value={value}
                    onChange={handleChangePhone}
                    placeholder="Введите телефон"
                />
            </label>
        )
    }
    return InputPhone
}

export const createInputPrice = ({ label, name, placeholder = "Введите цену" }) => {
    const setPrice = createEvent()
    const $price = createStore("").on(setPrice, (_, state) => state)
    const handleChangePrice = setPrice.prepend((e) => formattedPrice(e.target.value))
    const InputPrice = () => {
        const value = useStore($price)
        return (
            <label className="system din1">
                <div className="lsy">{label}</div>
                <input
                    className="tre"
                    name={name}
                    type="text"
                    value={value}
                    onChange={handleChangePrice}
                    placeholder={placeholder}
                />
            </label>
        )
    }
    return InputPrice
}

export { sendFormNodeFx, $type_enum, setType, submitForm }
