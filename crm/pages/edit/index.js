import { useStore } from "effector-react"

import { StaticLoader, DisplayLoader, Form, BackButton, Label } from "../../ui"
import { createSearch } from "../search"

import { sudden, $entity, onSubmitNode, sendFormNodeFx } from "./init"

import { Images } from "@/media/uploader"

const FormProject = ({ form }) => (
    <>
        <Form form={form} />
        <Label title="Сменить фотографии" />
        <Images maxFiles={18} allowMultiple={true} />
    </>
)

const FormEstate = ({ form, extra }) => (
    <>
        <Form form={form} />
        <Label title="Сменить фотографии" />
        <Images maxFiles={18} allowMultiple={true} />
        <input readOnly className="none" name="type_enum" value={extra.type_enum} />
    </>
)

const FormEmployee = ({ form, extra }) => {
    return (
        <>
            <Form form={form} />
            <Label title="Сменить фото профиля" />
            <Images maxFiles={1} allowMultiple={false} />
        </>
    )
}

const FormDemand = ({ form, extra }) => (
    <>
        <Form form={form} />
        <input readOnly className="none" name="type_enum" value={extra.type_enum} />
    </>
)
const renderSwitchForm = (param) => {
    switch (param) {
        case "project":
            return FormProject

        case "employee":
            return FormEmployee

        case "demand":
            return FormDemand

        case "estate":
            return FormEstate
    }
}

const Body = () => {
    const { type_node, form, extra } = useStore($entity)
    const pending = useStore(sendFormNodeFx.pending)
    const FormNode = renderSwitchForm(type_node)
    return (
        <>
            <div className={pending ? "none" : ""}>
                <FormNode form={form} extra={extra}/>
            </div>
            {pending && <StaticLoader />}
        </>
    )
}

export const EditPage = () => {
    const pending = useStore(sendFormNodeFx.pending)
    return (
        <main className="main">
            <section className="window">
                <header className="batwen header">
                    <div className="basisHeader L">
                        <BackButton />
                    </div>
                    <div className="b s">Редактирование</div>
                    <div className="basisHeader R">
                        <button className="pointer b blue s" type="submit" form="node" disabled={pending}>
                            Готово
                        </button>
                    </div>
                </header>
                <form className="f1" autoComplete="off" id="node" onSubmit={onSubmitNode}>
                    <DisplayLoader sudden={sudden}>
                        <Body />
                    </DisplayLoader>
                </form>
            </section>
        </main>
    )
}
