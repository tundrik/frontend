import { useStore } from "effector-react"
import { CloseIcon, SelectedIcon } from "@/svg"
import { Pic, Label } from "../ui"

import {
    deleteNode,
    deleteKit,
    edit,
    $extra,
    setExtra,
    $alert,
    setAlert,
    $contact,
    setContact,
    $selected,
    setSelected,
    submitFormKit,
    $kits,
    copyText,
} from "./init"

const ButtonClose = () => (
    <button className="pointer" onClick={() => setSelected(null)}>
        <CloseIcon size="18" />
    </button>
)

const ModalSceleton = ({ isOpen, children }) => (
    <div className={isOpen ? "modalOpenMask modalMask" : "modalMask"}>
        <div className={isOpen ? "modal min modalOpen" : "modal min"}>{isOpen ? children : null}</div>
    </div>
)
const SelectedSceleton = ({ isOpen, children }) => (
    <div className={isOpen ? "modalOpenMask modalMask" : "modalMask"}>
        <div className={isOpen ? "modal max modalOpen" : "modal max"}>{isOpen ? children : null}</div>
    </div>
)

export const Selected = () => {
    const node_code = useStore($selected)
    const kits = useStore($kits)

    const items = kits.map((item) => (
        <li className="itemSelection" key={item.node_code}>
            <div className="pr14">{item.kit_name}</div>
            <div className="iconSelection">
                <input id={item.node_code} type="checkbox" name={item.node_code} />
                <label htmlFor={item.node_code} className="iconCheckbox">
                    <SelectedIcon />
                </label>
            </div>
        </li>
    ))

    return (
        <SelectedSceleton isOpen={node_code}>
            <>
                <div>
                    <header className="batwen din1">
                        <div className="L basisHeader">
                            <ButtonClose />
                        </div>
                        <div className="b">Выбрать подборки</div>
                        <div className="R basisHeader">
                            <button className="pointer b blue" type="submit" form="kit">
                                Готово
                            </button>
                        </div>
                    </header>
                </div>
                <form id="kit" onSubmit={submitFormKit} autoComplete="off">
                    <Label title="Новая подборка" />
                    <label className="system din1">
                        <input className="input" type="text" name="new_kit" placeholder="Введите название" />
                    </label>
                    <input className="none" type="text" name="node" defaultValue={node_code} />
                    <Label title="Ваши подборки" />
                    <ul className="bodySelected">{items}</ul>
                </form>
            </>
        </SelectedSceleton>
    )
}

export const Alert = () => {
    const alert = useStore($alert)
    const { title, body } = alert || {}
    return (
        <ModalSceleton isOpen={alert}>
            <div>
                <div className="title b">{title}</div>
                <div className="message" dangerouslySetInnerHTML={{ __html: body }}></div>
            </div>
            <button className="button bottom" onClick={() => setAlert(null)}>
                ОК
            </button>
        </ModalSceleton>
    )
}

export const Contact = () => {
    const contact = useStore($contact)
    const { pic, phone, name, role } = contact || {}
    return (
        <ModalSceleton isOpen={contact}>
            <div>
                <div className="picha">
                    <Pic size={86} url={pic} mr={0} />
                    <div className="b mt8">{name}</div>
                    <div className="e8">{role}</div>
                    <div className="mt8 blue ls">{phone}</div>
                </div>
            </div>
            <div className="button bottom" onClick={() => setContact(null)}>
                ОК
            </div>
        </ModalSceleton>
    )
}

const Estate = ({ node }) => (
    <>
        <div className="button сaB" onClick={() => deleteNode(node)}>
            Удалить объект
        </div>
        <div className="button" onClick={() => edit(node)}>
            Редактировать
        </div>
    </>
)

const Demand = ({ node }) => (
    <>
        <div className="button сaB" onClick={() => deleteNode(node)}>
            Удалить заявку
        </div>
        <div className="button" onClick={() => edit(node)}>
            Редактировать
        </div>
    </>
)

const Employee = ({ node }) => (
    <>
        <div className="button сaB" onClick={() => deleteNode(node)}>
            Удалить сотрудника
        </div>
        <div className="button" onClick={() => edit(node)}>
            Редактировать
        </div>
    </>
)

const Project = ({ node }) => (
    <>
        <div className="button сaB" onClick={() => deleteNode(node)}>
            Удалить комплекс
        </div>
        <div className="button" onClick={() => edit(node)}>
            Редактировать
        </div>
    </>
)

const Kit = ({ node_code }) => (
    <>
        <div className="button сaB" onClick={() => deleteKit(node_code)}>
            Удалить подборку
        </div>
        <div className="button" onClick={() => copyText(node_code)}>
            Скопировать ссылку
        </div>
    </>
)

const renderSwitchEntity = (param) => {
    switch (param) {
        case "estate":
            return Estate

        case "project":
            return Project

        case "demand":
            return Demand

        case "employee":
            return Employee

        case "kit":
            return Kit

        default:
            return Employee
    }
}

export const Extra = () => {
    const extra = useStore($extra)
    const Component = renderSwitchEntity(extra?.node_type)
    return (
        <ModalSceleton isOpen={extra}>
            <Component {...extra} />
            <button className="button bottom" onClick={() => setExtra(null)}>
                Отмена
            </button>
        </ModalSceleton>
    )
}
