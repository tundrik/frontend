import { createStore, createEvent, createEffect, forward } from "effector"
import { useStore } from "effector-react"

import { host, fetchAbort } from "../../api"
import { AddRoute } from "../../router/config"

import { Label, Input, SwitchStatic, Select, SelectStatic } from "../../ui"

import { createInputPhone } from "./init"
import { Images } from "../../media"

/*
 const role_options = [
    { value: "realtor", label: "Риэлтор" },
    { value: "mini_boss", label: "Руководитель" },
    { value: "boss", label: "Директор" },
]

const setRole = createEvent()
const $role = createStore("realtor").on(setRole, (_, state) => state)

const miniBossFx = createEffect(async (value) => {
    return await fetchAbort({ key: "mini_boss", cursor: `${host}/search/manager/` })
})

const setManagerOptions = createEvent()
const $manager_options = createStore([]).on(setManagerOptions, (_, state) => state)

forward({
    from: miniBossFx.doneData,
    to: setManagerOptions,
})

forward({
    from: [AddRoute.navigate, AddRoute.open],
    to: miniBossFx,
})

    const role = useStore($role)
    const manager_options = useStore($manager_options)
    
             <Select
                label="Роль сотрудника"
                name="role"
                value={role}
                event={(e) => setRole(e.target.value)}
                options={role_options}
            />
            {role === "realtor" && <SelectStatic label="Отдел" name="manager" options={manager_options} />}
*/







export const EmployeeForm = () => {
    const InputPhone = createInputPhone()
    return (
        <>
            <Label title="Данные сотрудника" />
            <Input label="Имя" name="first_name" type="text" placeholder="Введите имя"/>
            <Input label="Фамилия" name="last_name" type="text" placeholder="Введите фамилию"/>
            <InputPhone />
            <Label title="Настройки" />
            <SwitchStatic label="Доступ в CRM" name="has_active" value={true} />
            <Label title="Фото профиля" />
            <Images node_type="employee" />
        </>
    )
}