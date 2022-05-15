self.addEventListener("install", (event) => {
    console.log("install event sw", event)
})

self.addEventListener("activate", (event) => {
    console.log("activate event sw", event)
})
