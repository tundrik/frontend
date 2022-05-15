import { useStore } from "effector-react"


import { AddRoute } from "../../router/config"
import { ArrowIcon } from "@/svg"
import { Label } from "../../ui"
import { $viewer } from "../../init"

const to = (node) => {
  AddRoute.navigate({
    method: "replace",
    params: {
      node: node,
    },
  })
}

const Selected = ({ label, node, active }) => (
  <button className={active === node ? "system din1 tap2 active" : "system din1 tap2"} onClick={() => to(node)}>
    {label}
    <div className="selectIcon outgoing">
      <ArrowIcon />
    </div>
  </button>
)

export const SelectedAdd = () => {
  const match = useStore(AddRoute.match)
  const viewer = useStore($viewer)
  return (
    <>
      {match && (
        <div>
          <Label title="Создать" />
          <Selected label="Комплекс" node="project" active={match.params.node} />
          <Selected label="Объект" node="estate" active={match.params.node} />
          <Selected label="Заявку" node="demand" active={match.params.node} />
          {viewer.role === "boss" && <Selected label="Сотрудника" node="employee" active={match.params.node} />}
        </div>
      )}
    </>
  )
}
