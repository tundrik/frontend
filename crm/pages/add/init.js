import { createEffect, createStore, createEvent, forward, sample } from "effector"
import { useStore } from "effector-react"
import { formattedPhone, formattedPrice } from "../../utils"
import { fetchAlert } from "../../api"
import { AddRoute, NavigatorRoute } from "../../router/config"
import { $files, setFiles } from "@/media/uploader"

const sendFormNodeFx = createEffect(async ({ e, files }) => {
    const formData = new FormData(e.target)
    for (let variable of files) {
        formData.append("image", variable.file)
    }
    return await fetchAlert({ formData: formData })
})

const submitForm = createEvent()
submitForm.watch((e) => {
    e.preventDefault()
})

sample({
    clock: submitForm,
    source: $files,
    fn: (files, e) => ({ files, e }),
    target: sendFormNodeFx,
})

const responseFx = createEffect(async (value) => {
    NavigatorRoute.navigate({
        method: "replace",
        params: {
            node: value.type_node,
        },
    })
    setFiles([])
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
                <input className="tre" name="phone" type="tel" value={value} onChange={handleChangePhone} />
            </label>
        )
    }
    return InputPhone
}

export const createInputPrice = ({ label, name }) => {
    const setPrice = createEvent()
    const $price = createStore("").on(setPrice, (_, state) => state)
    const handleChangePrice = setPrice.prepend((e) => formattedPrice(e.target.value))
    const InputPrice = () => {
        const value = useStore($price)
        return (
            <label className="system din1">
                <div className="lsy">{label}</div>
                <input className="tre" name={name} type="text" value={value} onChange={handleChangePrice} />
            </label>
        )
    }
    return InputPrice
}

export { sendFormNodeFx, $type_enum, setType, submitForm }
