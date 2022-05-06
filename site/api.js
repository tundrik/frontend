import { setAlert } from "./features"

export const host = "http://localhost:8000/site"
export const host_base = "http://localhost:8000"

const query = {}

export const getPathUrl = () => {
  return `${host}${window.location.pathname}${window.location.search}`
}

export function fetchAlert({ method = "post", formData, cursor }) {
  const url = cursor ? cursor : getPathUrl()

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        body: formData,
      })

      if (!response.ok) {
        const { message } = await response.json()
        setAlert({
          title: "Сообщение",
          body: message,
        })
        reject(message)
      } else {
        const data = await response.json()
        resolve(data)
      }
    } catch (exc) {
      console.log(exc)
      setAlert({
        title: "Ошибка сети",
        body: exc,
      })
      reject("Ошибка сети")
    }
  })
  return promise
}


export function fetchAbort({ key, cursor }) {
  if (query[key]) {
    query[key].cancel()
  }
  const controller = new AbortController()
  const signal = controller.signal

  const url = cursor ? cursor : getPathUrl()

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: "get",
        credentials: "include",
        signal,
      })
      if (!response.ok) {
        const { message } = await response.json()
        reject(message)
      }

      const data = await response.json()
      resolve(data)
    } catch (exc) {
      if (exc.name === "AbortError") {
        resolve({})
      } else {
        reject("Ошибка сети")
      }
    }
  })

  promise.cancel = () => controller.abort()

  query[key] = promise

  return promise
}
