import { createStore, createEvent } from "effector"

import { FilePond, registerPlugin } from "react-filepond"

import "filepond/dist/filepond.min.css"

import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

import { host } from "../api"

// Register the plugins
registerPlugin(FilePondPluginImagePreview)

const plusProcess = createEvent()
const minusProcess = createEvent()
export const $process = createStore(0)
   .on(plusProcess, n => n + 1)
   .on(minusProcess, n => n - 1)

const getSurce = (node_type, source) => {
    switch (node_type) {
        case "project":
            return `https://storage.yandexcloud.net/graph/420/${source}.jpeg`

        case "estate":
            return `https://storage.yandexcloud.net/graph/420/${source}.jpeg`

        case "employee":
            return `https://storage.yandexcloud.net/graph/profile/${source}.jpeg`
    }
}

const getSize = (node_type) => {
    switch (node_type) {
        case "project":
            return [18, true]
        case "estate":
            return [18, true]
        case "employee":
            return [1, false]
        default:
            return [18, true]
    }
}

export const Images = ({ node_type, mediaImages = [] }) => {
    const [maxFiles, allowMultiple] = getSize(node_type)
    const process = (process) => {
        console.log("process", process)
    }
    const remove = async (error, file) => {
        console.log(error)
        console.log(file)
        const formData = new FormData()
        formData.append("server_id", file.serverId)
        const response = await fetch(`${host}/media/${node_type}/`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
    }

    return (
        <FilePond
            files={mediaImages}
            allowMultiple={allowMultiple}
            onprocessfiles={process}
            maxFiles={maxFiles}
            onremovefile={remove}
            maxParallelUploads={18}
            itemInsertInterval={0}
            allowReorder={true}
            server={{
                load: (source, load, error, progress, abort, headers) => {
                    plusProcess()
                    var myRequest = new Request(getSurce(node_type, source))
                    fetch(myRequest, { mode: "cors" }).then(function (response) {
                        response.blob().then(function (myBlob) {
                            load(myBlob)
                            minusProcess()
                        })
                    })
                },
                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    plusProcess()

                    const controller = new AbortController()
                    const signal = controller.signal

                    const formData = new FormData()
                    formData.append(fieldName, file, file.name)

                    const promise = new Promise(async (resolve, reject) => {
                        const response = await fetch(`${host}/upload/${node_type}/`, {
                            method: "POST",
                            credentials: "include",
                            body: formData,
                            signal,
                        })
                        if (!response.ok) {
                            error("oh no")
                            reject("Ошибка сети")
                        }

                        const { message } = await response.json()
                        minusProcess()
                        load(message)
                        resolve(message)
                    })

                    return {
                        abort: () => {
                            controller.abort()
                            minusProcess()   
                            abort()
                        },
                    }
                },
                revert: (uniqueFileId, load, error) => {
                    load()
                },
            }}
            name="files"
            styleButtonProcessItemPosition="left"
            styleLoadIndicatorPosition="left"
            styleProgressIndicatorPosition="left"
            labelIdle='Перетащить фото или <span class="filepond--label-action">Выбрать</span>'
            labelTapToUndo=""
            labelFileProcessing="Загрузка на сервер"
            labelFileProcessingComplete=""
            labelFileProcessingAborted=""
            labelTapToCancel=""
        />
    )
}
