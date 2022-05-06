import { useStore } from "effector-react"

import {
  ExploreIcon,
  ExploreActiveIcon,
  AddIcon,
  AddActiveIcon,
  UserActiveIcon,
  UserIcon,
  SavedIcon,
  SavedActiveIcon,
} from "@/svg"

import { NavigatorRoute, AddRoute, KitRoute } from "../router/config"

export const TabProject = () => {
  const match = useStore(NavigatorRoute.match)
  const to = () => {
    NavigatorRoute.navigate({
      method: "replace",
      params: {
        node: "project",
        has_main: match?.params.has_main,
      },
    })
  }
  const Icon = match?.params.node === "project" ? ExploreActiveIcon : ExploreIcon
  return (
    <button className="tab" onClick={() => to()}>
      <Icon />
      <div className="sub">Комплексы</div>
    </button>
  )
}

export const TabEstate = () => {
  const match = useStore(NavigatorRoute.match)
  const to = () => {
    NavigatorRoute.navigate({
      method: "replace",
      params: {
        node: "estate",
        has_main: match?.params.has_main,
      },
    })
  }
  const Icon = match?.params.node === "estate" ? ExploreActiveIcon : ExploreIcon
  return (
    <button className="tab" onClick={() => to()}>
      <Icon />
      <div className="sub">Объекты</div>
    </button>
  )
}

export const TabDemand = () => {
  const match = useStore(NavigatorRoute.match)
  const to = () => {
    NavigatorRoute.navigate({
      method: "replace",
      params: {
        node: "demand",
        has_main: match?.params.has_main,
      },
    })
  }
  const Icon = match?.params.node === "demand" ? ExploreActiveIcon : ExploreIcon
  return (
    <button className="tab" onClick={() => to()}>
      <Icon />
      <div className="sub">Заявки</div>
    </button>
  )
}

export const TabEmployee = () => {
  const match = useStore(NavigatorRoute.match)
  const to = () => {
    NavigatorRoute.navigate({
      method: "replace",
      params: {
        node: "employee",
      },
    })
  }
  const Icon = match?.params.node === "employee" ? UserActiveIcon : UserIcon
  return (
    <button className="tab" onClick={() => to()}>
      <Icon />
      <div className="sub">Сотрудники</div>
    </button>
  )
}

export const TabKit = () => {
  const match = useStore(KitRoute.match)
  const to = () => {
    KitRoute.navigate({
      method: "replace",
    })
  }
  const Icon = match ? SavedActiveIcon : SavedIcon
  return (
    <button className="tab" onClick={() => to()}>
      <Icon />
      <div className="sub">Подборки</div>
    </button>
  )
}

export const TabAdd = () => {
  const match = useStore(AddRoute.match)
  const to = () => {
    AddRoute.navigate({
   //   method: "replace",
      params: {
        node: "estate",
      },
    })
  }
  const Icon = match ? AddActiveIcon : AddIcon
  return (
    <button className="tab" onClick={() => to()}>
      <Icon />
      <div className="sub">Добавить</div>
    </button>
  )
}
