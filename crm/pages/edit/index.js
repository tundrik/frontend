import React, { memo } from "react"
import { useStore } from "effector-react"

import { StaticLoader, DisplayLoader, Form, BackButton, Label } from "../../ui"
import { sudden, $entity, onSubmitNode, sendFormNodeFx } from "./init"

import { Images, $process } from "../../media"

const FormProject = memo(({ form, extra }) => (
    <>
        <Form form={form} />
        <Label title="Фотографии" />
        <Images node_type="project" mediaImages={extra.mediaImages}/>
        <input readOnly className="none" name="type_enum" value={extra.type_enum} />
    </>
))

const FormEstate = memo(({ form, extra }) => (
    <>
        <Form form={form} />
        <Label title="Фотографии" />
        <Images node_type="estate" mediaImages={extra.mediaImages}/>
        <input readOnly className="none" name="type_enum" value={extra.type_enum} />
        <input readOnly className="none" name="customer_pk" value={extra.customer_pk} />
    </>
))

const FormEmployee = memo(({ form, extra }) => {
    return (
        <>
            <Form form={form} />
            <Label title="Фото профиля" />
            <Images node_type="employee" mediaImages={extra.mediaImages}/>
        </>
    )
})

const FormDemand = ({ form, extra }) => (
    <>
        <Form form={form} />
        <input readOnly className="none" name="type_enum" value={extra.type_enum} />
        <input readOnly className="none" name="customer_pk" value={extra.customer_pk} />
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
    const process_len = useStore($process)
    const process = process_len > 0
    const title =  process ? "Фотографии еще не загружены" : "Отправить форму"
    return (
        <main className="main">
            <section className="window">
                <header className="batwen header">
                    <div className="basisHeader L">
                        <BackButton />
                    </div>
                    <div className="b s">Редактирование</div>
                    <div className="basisHeader R">
                        <button className="pointer b blue s" type="submit" form="node" disabled={pending || process} title={title}>
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
