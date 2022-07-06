import { createEffect, createStore, createEvent, forward } from "effector"
import { useStore } from "effector-react"
import { NavigatorRoute } from "./router/config"
import { formattedPhone } from "./utils"
import { StaticLoader } from "./ui"
import { setCookie } from "./init"
import { host_base, fetchAlert } from "./api"


const sendFormNodeFx = createEffect(async (formData) => {
  return await fetchAlert({ method: "post", formData: formData, cursor: `${host_base}/login/`})
})

const onSubmitNode = sendFormNodeFx.prepend((e) => new FormData(e.target))
onSubmitNode.watch((e) => {
  e.preventDefault()
})

const responseFx = createEffect(async (response) => {
  if (response.access_token) {
    setCookie(response.access_token)
    NavigatorRoute.navigate({
      method: "replace",
      params: {
          node: "demand",
      },
    })
  }
  return true
})

forward({
  from: sendFormNodeFx.doneData,
  to: responseFx,
})

const $isPartCheck = createStore(false).on(sendFormNodeFx.doneData, (_, res) => res.success)

const setPhone = createEvent()
const $phone = createStore("").on(setPhone, (_, state) => state)

const handleChangePhone = setPhone.prepend((e) => formattedPhone(e.target.value))

const Login = () => {
  const isPartCheck = useStore($isPartCheck)
  const isPending = useStore(sendFormNodeFx.pending)
  const phone = useStore($phone)

  return (
    <form className="flog" onSubmit={onSubmitNode}>
      <div className="logi">
        <div className="titl">Вход в кабинет</div>
        <input
          className={isPartCheck ? "inp none" : "inp"}
          name="phone"
          type="tel"
          value={phone}
          onChange={handleChangePhone}
          placeholder="Телефон"
        />
        {isPartCheck && <input className="inp" name="pin" type="number" placeholder="PIN-код" />}

        <button className="knopca" type="submit">
          {isPartCheck ? "Отправить PIN-код" : "Получить PIN-код"}
        </button>
      </div>
      {isPending && <StaticLoader />}
    </form>
  )
}

export { Login as default }
