import { useStore } from "effector-react"

import { Label, SwitchStatic, Input, Select, SelectStatic } from "../../ui"
import { createSelectProject, Suggest } from "../search"
import { $type_enum, setType, createInputPrice, createInputPhone } from "./init"
import { Images } from "../../media"

import { RESIDENTIAL, HOUSE, GROUND, COMMERCIAL } from "../../utils"

const estate_type_enum_options = [
    { value: RESIDENTIAL, label: "Квартира" },
    { value: HOUSE, label: "Дом, дача, коттедж" },
    { value: GROUND, label: "Участок" },
    { value: COMMERCIAL, label: "Коммерция" },
]

const rooms_options = [
    { value: "12", label: "Свободная планировка" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "Студия" },
]

const renovation_options = [
    { value: "1", label: "Требуется" },
    { value: "2", label: "Косметический" },
    { value: "3", label: "Евро" },
    { value: "4", label: "Дизайнерский" },
]
const status_options = [
    { value: "izhs", label: "ИЖС" },
    { value: "snt", label: "СНТ" },
]

const walls_type_options = [
    { value: "1", label: "Кирпич" },
    { value: "2", label: "Брус" },
    { value: "3", label: "Бревно" },
    { value: "4", label: "Газоблоки" },
    { value: "5", label: "Металл" },
    { value: "6", label: "Пеноблоки" },
    { value: "7", label: "Сэндвич-панели" },
    { value: "8", label: "Экспериментальные материалы" },
]

const getOptions = (type_enum) => {
    switch (type_enum) {
        case RESIDENTIAL:
            return [
                { value: "1", label: "Жилое помещение" },
                { value: "2", label: "Квартира" },
                { value: "3", label: "Апартамент" },
            ]
        case HOUSE:
            return [
                { value: "4", label: "Дом" },
                { value: "5", label: "Дача" },
                { value: "6", label: "Коттедж" },
                { value: "7", label: "Таунхаус" },
            ]
        case GROUND:
            return [
                { value: "8", label: "Поселений (ИЖС)" },
                { value: "9", label: "Сельхозназначения (СНТ, ДНП)" },
                { value: "10", label: "Промназначения" },
            ]
        case COMMERCIAL:
            return [
                { value: "11", label: "Гостиница" },
                { value: "12", label: "Офисное помещение" },
                { value: "13", label: "Помещение общественного питания" },
                { value: "14", label: "Помещение свободного назначения" },
                { value: "15", label: "Производственное помещение" },
                { value: "16", label: "Складское помещение" },
                { value: "17", label: "Торговое помещение" },
                { value: "18", label: "Автосервис" },
                { value: "19", label: "Здание" },
            ]

        default:
            return []
    }
}



export const EstateForm = () => {
    const type_enum = useStore($type_enum)
    const InputPhone = createInputPhone()
    const InputPrice = createInputPrice({ label: "Цена", name: "price" })
    const SelectProject = createSelectProject()
    return (
        <>
            <Label title="Основные" />
            <Select
                label="Категория"
                name="type_enum"
                value={type_enum}
                event={(e) => setType(e.target.value)}
                options={estate_type_enum_options}
            />
            <SelectStatic label="Тип объекта" name="object_type" options={getOptions(type_enum)} />
            <Label title="Местоположение" />
            <Suggest />
            <SelectProject />
            <div>
            {type_enum !== "ground" && (
                <>
                    <Label title="О доме" />
                    <Input label="Этажность" name="floors" type="number" placeholder="Введите этажность" />
                </>
            )}
            {type_enum === "house" && (
                <SelectStatic label="Материал стен" name="walls_type" options={walls_type_options} />
            )}
            {(type_enum === HOUSE || type_enum == GROUND) && (
                <>
                    <Label title="Комуникации" />
                    <SwitchStatic label="Есть электричество" name="has_electricity" />
                    <SwitchStatic label="Есть водопровод" name="has_water" />
                    <SwitchStatic label="Есть газ" name="has_gas" />
                    <SwitchStatic label="Есть канализация" name="has_sewerage" />
                </>
            )}
            {type_enum !== GROUND && type_enum !== HOUSE && (
                <>
                    <SwitchStatic label="Есть лифт" name="has_lift" />
                    <SwitchStatic label="Есть мусоропровод" name="has_rubbish_chute" />
                    <SwitchStatic label="Закрытая територия" name="has_closed_area" />
                </>
            )}
            </div>
            <Label title="Данные объекта" />
            <InputPrice />

            {type_enum !== GROUND && (
                <>
                    <Input label="Площадь" name="square" type="number" placeholder="Введите площадь" />
                    <SelectStatic label="Количество комнат" name="rooms" options={rooms_options} />
                    <SelectStatic label="Ремонт" name="renovation" options={renovation_options} />
                </>
            )}
            {(type_enum === RESIDENTIAL || type_enum === COMMERCIAL) && (
                <>
                    <Input label="Этаж" name="floor" type="number" placeholder="Введите этаж" />
                </>
            )}

            {(type_enum === HOUSE || type_enum == GROUND) && (
                <Input
                    label="Площадь участка (соток)"
                    name="square_ground"
                    type="number"
                    placeholder="Введите площадь участка"
                />
            )}

            {type_enum === HOUSE && <SelectStatic label="Статус участка" name="status" options={status_options} />}

            <Label title="Выгрузка" />
            <SwitchStatic label="Показывать на сайте" name="has_site" value={true} />
            <SwitchStatic label="Avito" name="has_avito" value={false} />
            <SwitchStatic label="Yandex" name="has_yandex" value={false} />
            <SwitchStatic label="Cian" name="has_cian" value={false} />
            <SwitchStatic label="DomClick" name="has_domclick" value={false} />
            <Label title="Данные собственника" />
            <Input label="Имя" name="first_name" type="text" placeholder="Введите имя" />
            <InputPhone />
            <Label title="Описание объекта" />
            <textarea type="text" className="dcript din1" name="comment" />
            <Label title="Фотографии" />
            <Images node_type="estate" />
        </>
    )
}
