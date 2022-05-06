import { useStore } from "effector-react"


import { NavigatorRoute } from "../../router/config"
import { $search } from "../../router/index"
import { Label, Switch, Select } from "../../ui"
import { ESTATE, DEMAND, RESIDENTIAL, HOUSE, GROUND, COMMERCIAL } from "../../utils"


const get_serch_placeholder = (node) => {
  switch (node) {
    case "project":
      return "Название комплекса или ID"

    case "demand":
      return "Детали заявки или ID"

    case "estate":
      return "Адрес или ID"
  }
}

const sort_options = [
  { value: "undefined", label: "Актуальные" },
  { value: "price", label: "Дешевле" },
  { value: "price_square", label: "Дешевле за м²" },
  { value: "price_square_ground", label: "Дешевле за сотку" },
  { value: "-price", label: "Дороже" },
  { value: "-price_square", label: "Дороже за м²" },
  { value: "-price_square_ground", label: "Дороже за сотку" },
  { value: "square", label: "Меньше м²" },
  { value: "square_ground", label: "Меньше соток" },
  { value: "-square", label: "Больше м²" },
  { value: "-square_ground", label: "Больше соток" },
]


const type_enum_options = [
  { value: "undefined", label: "Тип недвижимости" },
  { value: RESIDENTIAL, label: "Квартира" },
  { value: HOUSE, label: "Дом" },
  { value: GROUND, label: "Участок" },
  { value: COMMERCIAL, label: "Коммерция" },
]

const get_price_max_options = (node) => {
  const label = node === DEMAND ? "Бюджет до" : "Стоимость до"
  return [
    { value: "undefined", label: label },
    { value: "6000000", label: "до 6 млн" },
    { value: "8000000", label: "до 8 млн" },
    { value: "10000000", label: "до 10 млн" },
    { value: "12000000", label: "до 12 млн" },
    { value: "14000000", label: "до 14 млн" },
    { value: "16000000", label: "до 16 млн" },
    { value: "18000000", label: "до 18 млн" },
    { value: "20000000", label: "до 20 млн" },
    { value: "25000000", label: "до 25 млн" },
    { value: "30000000", label: "до 30 млн" },
  ]
}

const square_max_options = [
  { value: "undefined", label: "Площадь до" },
  { value: "25", label: "до 25 м²" },
  { value: "30", label: "до 30 м²" },
  { value: "35", label: "до 35 м²" },
  { value: "40", label: "до 40 м²" },
  { value: "45", label: "до 45 м²" },
  { value: "50", label: "до 50 м²" },
  { value: "55", label: "до 55 м²" },
  { value: "60", label: "до 60 м²" },
  { value: "65", label: "до 65 м²" },
  { value: "70", label: "до 70 м²" },
  { value: "80", label: "до 80 м²" },
  { value: "90", label: "до 90 м²" },
  { value: "100", label: "до 100 м²" },
  { value: "120", label: "до 120 м²" },
  { value: "150", label: "до 150 м²" },
  { value: "180", label: "до 180 м²" },
  { value: "200", label: "до 200 м²" },
]

const square_ground_max_options = [
  { value: "undefined", label: "Площадь участка до" },
  { value: "4", label: "до 4 соток" },
  { value: "6", label: "до 6 соток" },
  { value: "8", label: "до 8 соток" },
  { value: "10", label: "до 10 соток" },
  { value: "12", label: "до 12 соток" },
  { value: "14", label: "до 14 соток" },
  { value: "16", label: "до 16 соток" },
  { value: "20", label: "до 20 соток" },
]

export const Filter = () => {
  const match = useStore(NavigatorRoute.match)
  const search = useStore($search)
  const params = match?.params || {}
  const {
    node,
    type_enum = "undefined",
    has_main,
    has_site,
    has_avito,
    has_yandex,
    has_cian,
    has_domclick,
    price_max = "undefined",
    square_max = "undefined",
    square_ground_max = "undefined",
    sort = "undefined",
  } = params

  const navigate = (name, value) => {
    let selected = {}
    selected[name] = value
    if(name === "type_enum") {
      if(value !== GROUND && value !== HOUSE) {
        selected["square_ground_max"] = undefined
      }
      if(value === GROUND) {
        selected["square_max"] = undefined
      }
    }
    NavigatorRoute.navigate({ method: "replace", params: { ...params, ...selected } })
  }
  const handleSearch = (val) => {
    NavigatorRoute.navigate({ method: "replace", params: params, search: `search=${val}` })
  }

  const handlerSelect = (e, name) => {
    const val = e.target.value
    const value = val === "undefined" ? undefined : val
    navigate(name, value)
  }

  const handlerSwitch = (e, name) => {
    const val = e.target.checked
    const value = val === false ? undefined : "on"
    navigate(name, value)
  }
  if (node === "employee") return <Label title="Фильтр" />
  return (
    <>
      <Label title="Поиск" />
      <input
        className="system din1 sE"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        name="address"
        type="text"
        placeholder={get_serch_placeholder(node)}
      />
      <Label title="Сортировка" />
      <Select
            name="sort"
            value={sort}
            event={(e) => handlerSelect(e, "sort")}
            options={sort_options}
          />
      <Label title="Фильтр" />
      <Switch
        label="Показывать только мои"
        name="has_main"
        value={has_main}
        event={(e) => handlerSwitch(e, "has_main")}
      />
      {node !== "project" && (
        <>
          <Select
            name="type_enum"
            value={type_enum}
            event={(e) => handlerSelect(e, "type_enum")}
            options={type_enum_options}
          />
        </>
      )}
      <Select
        name="price_max"
        value={price_max}
        event={(e) => handlerSelect(e, "price_max")}
        options={get_price_max_options(node)}
      />

      {type_enum !== "ground" && (
        <Select
          name="square_max"
          value={square_max}
          event={(e) => handlerSelect(e, "square_max")}
          options={square_max_options}
        />
      )}

      {(type_enum === "ground" || type_enum === "house") && (
          <Select
            name="square_ground_max"
            value={square_ground_max}
            event={(e) => handlerSelect(e, "square_ground_max")}
            options={square_ground_max_options}
          />
      )}

      {node === ESTATE && (
        <>
          <Label title="Выгрузка" />
          <Switch label="Сайт" name="has_site" value={has_site} event={(e) => handlerSwitch(e, "has_site")} />
          <Switch label="Avito" name="has_avito" value={has_avito} event={(e) => handlerSwitch(e, "has_avito")} />
          <Switch label="Yandex" name="has_yandex" value={has_yandex} event={(e) => handlerSwitch(e, "has_yandex")} />
          <Switch label="Cian" name="has_cian" value={has_cian} event={(e) => handlerSwitch(e, "has_cian")} />
          <Switch label="DomClick" name="has_domclick" value={has_domclick} event={(e) => handlerSwitch(e, "has_domclick")} />
        </>
      )}
    </>
  )
}
