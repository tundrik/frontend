import { useStore } from "effector-react"

import { EstateForm } from "./form"
import { SelectedAdd } from "./selected"
import { ArrowIcon } from "@/svg"
import { StaticLoader, Label, Input, Switch, SelectStatic, Select } from "../../ui"
import { Location, createSearch } from "../search"
import { AddRoute } from "../../router/config"
import { sendFormNodeFx, $type_enum, setType, submitForm, createInputPrice, createInputPhone } from "./init"
import { Images } from "@/media/uploader"
import { RESIDENTIAL, HOUSE, GROUND, COMMERCIAL } from "../../utils"

const demand_type_enum_options = [
    { value: RESIDENTIAL, label: "Квартира" },
    { value: HOUSE, label: "Дом" },
    { value: GROUND, label: "Участок" },
    { value: COMMERCIAL, label: "Коммерция" },
]

const type_enum_options = [
    { value: "ЖК", label: "Жилой комплекс" },
    { value: "КП", label: "Коттеджный поселок" },
]
const deal_options = [
    { value: "bay", label: "Покупка" },
    { value: "rent", label: "Аренда" },
]

const role_options = [
    { value: "realtor", label: "Риэлтор" },
    { value: "mini_boss", label: "Руководитель" },
]

const ProjectForm = () => {
    const InputPrice = createInputPrice({ label: "Минимальная цена", name: "price" })
    const InputPriceSquare = createInputPrice({ label: "Минимальная цена за м²", name: "price_square" })
    return (
        <>
            <Location />
            <Label title="О доме" />
            <Input label="Этажность" name="floors" type="number" />
            <Switch label="Есть лифт" name="has_lift" />
            <Switch label="Закрытая територия" name="has_closed_area" />
            <Label title="Данные комплекса" />
            <SelectStatic label="Тип комплекса" name="type_enum" options={type_enum_options} />
            <Input label="Название" name="project_name" type="text" />
            <InputPrice />
            <InputPriceSquare />
            <Input label="Минимальная площадь" name="square" type="number" />
            <Label title="Описание комплекса" />
            <textarea type="text" className="dcript din1" name="comment" />
            <Label title="Фотографии" />
            <Images maxFiles={18} allowMultiple={true} />
        </>
    )
}

const EmployeeForm = () => {
    const InputPhone = createInputPhone()
    const defaultObject = {
        value: "",
        id: "",
    }
    const SearchInput = createSearch({ defaultObject, name: "manager", placeholder: "Поиск руководителя" })
    return (
        <>
            <Label title="Данные сотрудника" />
          
            <Input label="Имя" name="first_name" type="text" />
            <Input label="Фамилия" name="last_name" type="text" />
            <InputPhone />
            <SelectStatic label="Роль сотрудника" name="role" options={role_options} />
            <Switch label="Активен" name="has_active" value={true} />
            <Label title="Руководитель" />
            <SearchInput />
            <Label title="Фото профиля" />
            <Images maxFiles={1} allowMultiple={false} />
        </>
    )
}

const DemandForm = () => {
    const type_enum = useStore($type_enum)
    const InputPhone = createInputPhone()
    const InputPrice = createInputPrice({ label: "Бюджет", name: "price" })
    return (
        <>
            <Label title="Данные клиента" />
            <Input label="Имя" name="first_name" type="text" />
            <InputPhone />
            <Label title="Данные заявки" />
            <SelectStatic label="Тип сделки" name="deal" options={deal_options} />
            <Select
                label="Категория"
                name="type_enum"
                value={type_enum}
                event={(e) => setType(e.target.value)}
                options={demand_type_enum_options}
            />

            <InputPrice />

            {type_enum !== "ground" && (
                <>
                    <Input label="Желаемая площадь" name="square" type="number" />
                </>
            )}

            {(type_enum === "house" || type_enum == "ground") && (
                <>
                    <Input label="Желаемая площадь участка (соток)" name="square_ground" type="number" />
                </>
            )}
            <Label title="Детали заявки" />
            <textarea type="text" className="dcript din1" name="comment" />
        </>
    )
}

const renderSwitchForm = (param) => {
    switch (param) {
        case "project":
            return {
                title: "Новый комплекс",
                Form: ProjectForm,
            }
        case "employee":
            return {
                title: "Новый сотрудник",
                Form: EmployeeForm,
            }
        case "demand":
            return {
                title: "Новая заявка",
                Form: DemandForm,
            }
        case "estate":
            return {
                title: "Новый объект",
                Form: EstateForm,
            }
        default:
            return {
                title: "Новый объект",
                Form: EstateForm,
            }
    }
}

const Header = ({ title }) => {
    const pending = useStore(sendFormNodeFx.pending)
    return (
        <>
            <header className="batwen header">
                <div className="basisHeader L" />
                <div className="b s">{title}</div>
                <div className="basisHeader R">
                    <button className="pointer b blue s" type="submit" form="node" disabled={pending}>
                        Готово
                    </button>
                </div>
            </header>
            {pending && <StaticLoader style="loaderSticky" />}
        </>
    )
}

export const AddPage = () => {
    const { params } = useStore(AddRoute.match)
    const { title, Form } = renderSwitchForm(params?.node)
    return (
        <>
            <div className="nav">
                <SelectedAdd />
            </div>
            <main className="main">
                <section className="window">
                    <Header title={title} />
                    <form className="f1" autoComplete="off" id="node" onSubmit={submitForm}>
                        <Form />
                    </form>
                </section>
            </main>
        </>
    )
}
