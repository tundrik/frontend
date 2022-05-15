import React, { useState, useRef, useEffect } from "react"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
import { CloseIcon, SearchIcon } from "@/svg"

export const setPresentation = createEvent()
export const $presentation = createStore(null).on(setPresentation, (_, props) => props)

const ButtonClose = () => (
  <button className="pointer close" onClick={() => setPresentation(null)}>
    <CloseIcon />
  </button>
)

const w = window
const now = Date.now

function ease(k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}
function scrollElement(x, y) {
  this.scrollLeft = x
  this.scrollTop = y
}
function step(context) {
  const time = now()
  let value
  let currentY
  let elapsed = (time - context.startTime) / context.duration

  elapsed = elapsed > 1 ? 1 : elapsed

  value = ease(elapsed)

  currentY = context.startY + (context.y - context.startY) * value

  context.method.call(context.scrollable, currentY)

  if (currentY !== context.y) {
    w.requestAnimationFrame(step.bind(w, context))
  }
}

const Slider = ({ images, width, presentation = false }) => {
  const ref = useRef()

  const [image_width, setImageWidth] = useState(width)

  useEffect(() => {
    console.log(width)
    if (!width) {
      setImageWidth(ref.current.offsetWidth)
    }
  }, [width]);

  const IMG_WIDTH = image_width

  const [currentIndex, setCurrentIndex] = useState(0)
  const [movement, setMovement] = useState(0)

  const [overflow, setOverflow] = useState("auto")

  const sliceEnd = currentIndex + 2
  const sliceStart = currentIndex < 3 ? 0 : sliceEnd - 3
  const slide = images.slice(sliceStart, sliceEnd)

  const maxLength = images.length - 1
  const maxMovement = maxLength * IMG_WIDTH

  const transitionTo = (index, duration) => {
    setCurrentIndex(index)
    const { scrollLeft } = ref.current
    let to = index * IMG_WIDTH
    setMovement(to)
    smoothScroll(ref.current, scrollLeft, to, duration)
  }

  const handleMovementEnd = (e) => {
    const { scrollLeft } = ref.current
    if (scrollLeft <= 0 || scrollLeft >= maxMovement) {
      return
    }
    setOverflow("hidden")
    setTimeout(() => {
      setOverflow("auto")
    }, 100)
    const endPosition = scrollLeft / IMG_WIDTH
    const endPartial = endPosition % 1
    const endingIndex = endPosition - endPartial
    const deltaInteger = endingIndex - currentIndex
    let nextIndex = endingIndex
    if (deltaInteger >= 0) {
      console.log(endPartial)
      if (endPartial >= 0.05) {
        nextIndex += 1
      }
    } else if (deltaInteger < 0) {
      console.log(endPartial)
      nextIndex = currentIndex - Math.abs(deltaInteger)
      if (endPartial >= 0.95) {
        nextIndex += 1
      }
    }
    let duration
    if (endPartial > 0.5) {
      duration = 1 - endPartial
    } else {
      duration = endPartial
    }
    duration = duration * 1000
    duration = Math.min(230, duration)
    transitionTo(nextIndex, duration)
  }

  const smoothScroll = (el, scrollLeft, to, duration) => {
    step({
      scrollable: el,
      method: scrollElement,
      startTime: now(),
      startY: scrollLeft,
      duration: duration,
      y: to,
    })
  }

  return (
    <div className={presentation ? "presentation" : ""}>
      <div className={presentation ? "limitedPresent" : "limited"}>
        <div
          ref={(node) => (ref.current = node)}
          className={presentation ? "slider rad" : "slider"}
          style={{
            overflowX: overflow,
          }}
          onTouchEnd={handleMovementEnd}
        >
          <div className="row f1">
            {slide.map((src, index) => {
              return (
                <picture
                  title="Смотреть фото"
                  className="slide"
                  key={src.ranging}
                  style={{
                    transform: `translateX(${IMG_WIDTH * (sliceStart + index)}px)`,
                  }}
                >
                  <img
                    className="slide"
                    sizes={`${IMG_WIDTH}px`}
                    src={presentation ? src.presentation : src.linkPart}
                    width="100%"
                    height="100%"
                    decoding="auto"
                    alt="alt"
                  />
                </picture>
              )
            })}
          </div>
          
        </div>
        {!presentation && <div className="hovlimit" onClick={() => setPresentation(images)}><SearchIcon size={32}/></div>}
      </div>
      {movement !== 0 && (
          <button
            className={presentation ? "move Pleft" : "move left"}
            onClick={() => {
              transitionTo(currentIndex - 1, 200)
            }}
          >
            <div className="lMu" />
          </button>
        )}
        {movement !== maxMovement && (
          <button
            className={presentation ? "move Pright" : "move right"}
            onClick={() => {
              transitionTo(currentIndex + 1, 200)
            }}
          >
            <div className="rMu" />
          </button>
        )}


      <div className={presentation ? "dots" : "none"}>
        {images.map((_, index) => {
          return <div key={index} className={`dot ${index <= currentIndex ? "dotActive" : ""}`} />
        })}
      </div>
      <div className={presentation ? "none" : "counts"}>
        {currentIndex + 1}/{maxLength + 1}
      </div>
    </div>
  )
}

export const Presentation = () => {
  const presentation = useStore($presentation)
  if (!presentation) return null
  return (
    <div className="presentationMask">
      <ButtonClose />
      <Slider images={presentation} width={1000} presentation={true} />
    </div>
  )
}


function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}


export const SmallPresentation = ({ images }) => {
  const { width } = useWindowSize();
  return <Slider images={images} width={width > 660 ? 300: width} />
}
export const DetaliPresentation = ({ images }) => {
  return <Slider images={images}/>
}

