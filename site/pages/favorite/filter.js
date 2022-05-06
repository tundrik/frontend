import { useStore } from "effector-react"

import { FavoriteRoute } from "../../router/config"
import { Label, Select } from "../../ui"

const node_type_options = [
    { value: "estate", label: "Объекты" },
    { value: "project", label: "Комплексы" },
  ]

export const Filter = () => {
    const match = useStore(FavoriteRoute.match)
    const params = match?.params || {}
    const { node_type } = params
    const navigate = (name, value) => {
      let selected = {}
      selected[name] = value
      FavoriteRoute.navigate({ method: "replace", params: { ...params, ...selected } })
    }

    const handlerSelect = (e, name) => {
      const val = e.target.value
      const value = val === "undefined" ? undefined : val
      navigate(name, value)
    }
  
    return (
      <>
        <Label title="Ваше избранное" />
        <Select
              name="node_type"
              value={node_type}
              event={(e) => handlerSelect(e, "node_type")}
              options={node_type_options}
            />
      </>
    )
  }
  