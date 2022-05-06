import { useStore } from "effector-react"

import { EstateForm } from "./form"
import { SelectedAdd } from "./selected"
import { ArrowIcon } from "@/svg"
import { StaticLoader, Label, Input, Switch } from "../../ui"
import { Location } from "./location"
import { AddRoute } from "../../router/config"
import { sendFormNodeFx, $type_enum, setType, submitForm, createInputPrice, createInputPhone } from "./init"
import { Images } from "@/media/uploader"

const ProjectForm = () => {
    const InputPrice = createInputPrice({ label: "Минимальная цена", name: "price" })
    const InputPriceSquare = createInputPrice({ label: "Минимальная цена за м²", name: "price_square" })
    return (
        <>
            <Label title="Тип комплекса" />
            <div>
                <select className="system din1 tap" name="type_enum" defaultValue="ЖК">
                    <option value="ЖК">Жилой комплекс</option>
                    <option value="КП">Коттеджный поселок</option>
                </select>
                <div className="selectIcon">
                    <ArrowIcon />
                </div>
            </div>
            <Location />
            <Label title="О доме" />
            <Input label="Этажность" name="floors" type="number" />
            <Switch label="Есть лифт" name="has_lift" />
            <Switch label="Закрытая територия" name="has_closed_area" />
            <Label title="Данные комплекса" />
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
    return (
        <>
            <Label title="Данные сотрудника" />
            <Input label="Имя" name="first_name" type="text" />
            <Input label="Фамилия" name="last_name" type="text" />
            <InputPhone />
            <Label title="Роль сотрудника" />
            <div>
                <select className="system din1 tap" name="role" defaultValue="realtor">
                    <option value="realtor">Риэлтор</option>
                    <option value="mini_boss">Руководитель</option>
                </select>
                <div className="selectIcon">
                    <ArrowIcon />
                </div>
            </div>
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
            <div>
                <select
                    className="system din1 tap"
                    name="type_enum"
                    defaultValue={type_enum}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="residential">Заявка на квартиру</option>
                    <option value="house">Заявка на дом</option>
                    <option value="ground">Заявка на участок</option>
                    <option value="commercial">Заявка на коммерцию</option>
                </select>
                <div className="selectIcon">
                    <ArrowIcon />
                </div>
            </div>
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
