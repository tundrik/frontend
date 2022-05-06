import { useStore } from "effector-react"

import { ArrowIcon } from "@/svg"
import { Label, Switch, Input, Select, SelectStatic} from "../../ui"
import { Location, ProjectSearch } from "./location"
import { $type_enum, setType, createInputPrice, createInputPhone } from "./init"
import { Images } from "@/media/uploader"

import { ESTATE, DEMAND, RESIDENTIAL, HOUSE, GROUND, COMMERCIAL } from "../../utils"

const estate_type_enum_options = [
  { value: "undefined", label: "Тип недвижимости" },
  { value: RESIDENTIAL, label: "Квартира, апартамент, жилое помещение" },
  { value: HOUSE, label: "Дом, дача, коттедж" },
  { value: GROUND, label: "Участок" },
  { value: COMMERCIAL, label: "Коммерция" },
]

const getOptions = (type_enum) => {
  switch (type_enum) {
    case RESIDENTIAL:
      return  [
        {value: "1", label: "Жилое помещение"},
        {value: "2", label: "Квартира"},
        {value: "3", label: "Апартамент"},
      ]
    case HOUSE:
      return [
        {value: "4", label: "Дом"},
        {value: "5", label: "Дача"},
        {value: "6", label: "Коттедж"},
        {value: "7", label: "Таунхаус"},
      ]
    case GROUND:
      return [
        {value: "8", label: "Поселений (ИЖС)"},
        {value: "9", label: "Сельхозназначения (СНТ, ДНП)"},
        {value: "10", label: "Промназначения"},
      ]
    case COMMERCIAL:
      return [
        {value: "11", label: "Гостиница"},
        {value: "12", label: "Офисное помещение"},
        {value: "13", label: "Помещение общественного питания"},
        {value: "14", label: "Помещение свободного назначения"},
        {value: "15", label: "Производственное помещение"},
        {value: "16", label: "Складское помещение"},
        {value: "17", label: "Торговое помещение"},
        {value: "18", label: "Автосервис"},
        {value: "19", label: "Здание"},
      ]
      
    default:
      return []
  }
}


export const EstateForm = () => {
  const type_enum = useStore($type_enum)
  const InputPhone = createInputPhone()
  const InputPrice = createInputPrice({label: "Цена", name: "price"})
  return (
    <>
      <Label title="Данные собственника" />
      <Input label="Имя" name="first_name" type="text" />
      <InputPhone />
      <Label title="Тип недвижимости" />
      <Select
            name="type_enum"
            value={type_enum}
            event={(e) => setType(e.target.value)}
            options={estate_type_enum_options}
          />
      <Label title="Вид объекта" />
      <SelectStatic name="object_type" options={getOptions(type_enum)} />
      <ProjectSearch />    
      <Location />

      {type_enum !== "ground" && (
        <>
          <Label title="О доме" />
          <Input label="Этажность" name="floors" type="number" />
        </>
      )}
      {(type_enum === HOUSE || type_enum == GROUND) && (
        <>
          <Label title="Комуникации" />
          <Switch label="Есть электричество" name="has_electricity" />
          <Switch label="Есть водопровод" name="has_water" />
          <Switch label="Есть газ" name="has_gas" />
          <Switch label="Есть канализация" name="has_sewerage" />
        </>
      )}
      {type_enum !== GROUND && type_enum !== HOUSE && (
        <>
          <Switch label="Есть лифт" name="has_lift" />
          <Switch label="Есть мусоропровод" name="has_rubbish_chute" />
          <Switch label="Закрытая територия" name="has_closed_area" />
        </>
      )}

      {type_enum === "house" && (
        <>
          <Label title="Материал стен" />
          <div>
            <select className="system din1 tap" name="walls_type">
              <option>Кирпич</option>
              <option>Брус</option>
              <option>Бревно</option>
              <option>Газоблоки</option>
              <option>Металл</option>
              <option>Пеноблоки</option>
              <option>Сэндвич-панели</option>
              <option>Экспериментальные материалы</option>
            </select>
            <div className="selectIcon">
              <ArrowIcon />
            </div>
          </div>
        </>
      )}

      <Label title="Данные объекта" />
      <InputPrice />

      {type_enum !== GROUND && (
        <>
          <Input label="Площадь" name="square" type="number" />
        </>
      )}

      {(type_enum === HOUSE || type_enum == GROUND) && (
        <>
          <Input label="Площадь участка (соток)" name="square_ground" type="number" />
        </>
      )}

      {type_enum === HOUSE && (
        <>
          <Label title="Статус участка" />
          <div>
            <select className="system din1 tap" name="status">
                  <option value="izhs">ИЖС</option>
                  <option value="snt">СНТ</option>
            </select>
            <div className="selectIcon">
              <ArrowIcon />
            </div>
          </div>
        </>
      )}


      {type_enum === RESIDENTIAL && (
        <>
          <Input label="Этаж" name="floor" type="number" />
        </>
      )}

      {type_enum === RESIDENTIAL && (
        <>
          <Label title="Количество комнат" />
          <div>
            <select className="system din1 tap" name="rooms" defaultValue="12">
              <option value="12">Свободная планировка</option>
              <option value="11">Студия</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10 и боллее</option>
            </select>
            <div className="selectIcon">
              <ArrowIcon />
            </div>
          </div>
        </>
      )}

      {type_enum !== GROUND &&  (
        <>
          <Label title="Ремонт" />
          <div>
            <select className="system din1 tap" name="renovation">
              <option value="0">Требуется</option>
              <option value="1">Косметический</option>
              <option value="2">Евро</option>
              <option value="3">Дизайнерский</option>
            </select>
            <div className="selectIcon">
              <ArrowIcon />
            </div>
          </div>
        </>
      )}
      <Label title="Выгрузка" />
      <Switch label="Показывать на сайте" name="has_site" value={true} />
      <Switch label="Avito" name="has_avito" value={false} />
      <Switch label="Yandex" name="has_yandex" value={false} />
      <Switch label="Cian" name="has_cian" value={false} />
      <Switch label="DomClick" name="has_domclick" value={false} />
      <Label title="Описание объекта" />
      <textarea type="text" className="dcript din1" name="comment" />
      <Label title="Фотографии" />
      <Images maxFiles={18} allowMultiple={true}/>
    </>
  )
}
