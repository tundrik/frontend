import { createStore, createEvent } from "effector"
import { useStore } from "effector-react"


import { FilePond, registerPlugin } from "react-filepond"

import "filepond/dist/filepond.min.css"

import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"


// Register the plugins
registerPlugin(FilePondPluginImagePreview)


export const setFiles = createEvent()
export const $files = createStore([])
  .on(setFiles, (_, state) => state)

export const Images = ({ maxFiles, allowMultiple }) => {
  const files = useStore($files)

  const test = (files, origin, target) => {
    setFiles(files)
    console.log(origin)
    console.log(target)
  }
  return (
    <FilePond
      iconProcess=""
      files={files}
      onupdatefiles={setFiles}
      onreorderfiles={test}
      allowMultiple={allowMultiple}
      allowReorder={true}
      storeAsFile={true}
      instantUpload={false}
      imageEditAllowEdit={false}
      maxFiles={maxFiles}
      server="http://localhost:8000/add/employee/"
      name="files"
      labelIdle='Перетащить фото или <span class="filepond--label-action">Выбрать</span>'
    />
  )
}
