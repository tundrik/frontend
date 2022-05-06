import { useStore } from "effector-react"
import { createEffect, createStore, createEvent, forward } from "effector"
import { debounce } from "patronum/debounce"

import { LoaderButtom } from "@/ui"
import { host, fetchAbort } from "../../api"
import { AddRoute } from "../../router/config"


/*  Комплекс */
const defaultProject = {
  project_name: "",
  project_id: "",
}
const searchProjectFx = createEffect(async (value) => {
  return await fetchAbort({ key: "project", cursor: `${host}/search/projects/?g=${value}` })
})
const setValueProject = createEvent()
const setItemProject = createEvent()
const $projectSelected = createStore(defaultProject)
  .on(setValueProject, (_, state) => ({ project_name: state }))
  .on(setItemProject, (_, state) => state)
  .reset(AddRoute.close)

const setItemsProjects = createEvent()
const resetItemsProjects = createEvent()
const $itemsProjects = createStore([])
  .on(setItemsProjects, (_, state) => state)
  .reset(resetItemsProjects)

const responseSearchProjectFx = createEffect(async (value) => {
  if (value.suggestions) {
    console.log(value)
    setItemsProjects(value.suggestions)
  }
  return true
})

forward({
  from: searchProjectFx.doneData,
  to: responseSearchProjectFx,
})

debounce({
  source: setValueProject,
  timeout: 200,
  target: searchProjectFx,
})


export const ProjectSearch = () => {
  const itemsProjects = useStore($itemsProjects)
  const projectSelected = useStore($projectSelected)
  const pending = useStore(searchProjectFx.pending)
  const { project_name, project_id } = projectSelected

  const HandleClick = (item) => {
    console.log(item)
    setItemProject({
      project_name: item.value,
      project_id: item.project_id,
    })
    resetItemsProjects()
  }

  const items = itemsProjects.map((item, index) => {
    return (
      <li className="liadr" key={index} onClick={() => HandleClick(item)}>
        {item.value}
      </li>
    )
  })

  return (
    <div>
      <label className="lbl lab din1">Комплекс</label>
      <input
        className="system din1 sE"
        name="project_name"
        type="text"
        value={project_name}
        onChange={(e) => setValueProject(e.target.value)}
        placeholder="Введите название комплекса"
      />
      <div>
        <ul className="uladr">
          {items}
          {pending && <LoaderButtom pending={pending} />}
        </ul>
      </div>
      <input readOnly className="none" name="project_id" value={project_id} />
    </div>
  )
}










/*  Адрес */
const defaultData = {
  address: "",
  lat: "",
  lng: "",
  house: "",
  street: "",
  street_type: "",
}

const sendFx = createEffect(async (address) => {
  console.log(address)
  return await fetchAbort({ key: "location", cursor: `${host}/search/suggestions/?g=${address}` })
})

const setField = createEvent()
const setValue = createEvent()
const $addressItems = createStore(defaultData)
  .on(setField, (_, state) => ({ address: state }))
  .on(setValue, (_, state) => state)
  .reset(AddRoute.close)

const handleChange = setField.prepend((e) => e.target.value)

const setSuggestions = createEvent()
const resetSuggestions = createEvent()
const $suggestions = createStore([])
  .on(setSuggestions, (_, state) => state.suggestions)
  .reset(resetSuggestions)

const responseFx = createEffect(async (value) => {
  if (value.suggestions) {
    console.log(value)
    setSuggestions(value)
  }
  return true
})

forward({
  from: sendFx.doneData,
  to: responseFx,
})

debounce({
  source: setField,
  timeout: 400,
  target: sendFx,
})

export const Location = () => {
  const suggestions = useStore($suggestions)
  const addressItems = useStore($addressItems)
  const pending = useStore(sendFx.pending)
  const { address, lat, lng, house, street, street_type } = addressItems

  const HandleClick = (item) => {
    console.log(item)
    setValue({
      address: item.value,
      lat: item.data.geo_lat,
      lng: item.data.geo_lon,
      house: item.data.house,
      street_type: item.data.street_type_full,
      street: item.data.street,
    })
    resetSuggestions()
  }

  const items = suggestions.map((item, index) => {
    return (
      <li className="liadr" key={index} onClick={() => HandleClick(item)}>
        {item.value}
      </li>
    )
  })

  return (
    <div>
      <label className="lbl lab din1">Адрес</label>
      <input
        className="system din1 sE"
        name="address"
        type="text"
        value={address}
        onChange={handleChange}
        placeholder="Введите адрес"
      />

      <div>
        <ul className="uladr">
          {items}
          {pending && <LoaderButtom pending={pending} />}
        </ul>
      </div>
      <input readOnly className="none" name="lat" value={lat} />
      <input readOnly className="none" name="lng" value={lng} />
      <input readOnly className="none" name="house" value={house} />
      <input readOnly className="none" name="street" value={street} />
      <input readOnly className="none" name="street_type" value={street_type} />
    </div>
  )
}

