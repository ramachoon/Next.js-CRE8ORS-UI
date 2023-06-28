import { FC, useRef } from "react"
import Image from "next/image"
import { useMediaQuery } from "usehooks-ts"
import useShakeEffect from "../../hooks/useShakeEffect"
import { StageData } from "./types"

interface StageProps {
  stageData: StageData
  stageNumber: number
  slideWidth: number
  slideHeight: number
  imgWidth: number
  imgHeight: number
  selectedIndex: number
}

const Stage: FC<StageProps> = ({
  stageData,
  stageNumber,
  slideHeight,
  slideWidth,
  imgWidth,
  imgHeight,
  selectedIndex,
}) => {
  const shakeRef = useRef()

  const isReponsive = useMediaQuery("(max-width: 1150px)")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isXs = useMediaQuery("(max-width: 393px)")
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]

  const shouldBeLocked =
    new Date(stageData.date).getTime() - new Date().getTime() >= 0 || !stageData.date

  useShakeEffect({
    ref: shakeRef,
    isEnabled: shouldBeLocked || !stageData.date,
  })

  const getBottomTranslateY = () => {
    if (isXs) return -30
    if (isMobile) return -35

    return 0
  }

  const getTopTranslateY = () => {
    if (isXs) return 25
    if (isMobile) return 30

    return 0
  }

  const getTransform = () => {
    if (selectedIndex === 15 && stageNumber === 0) {
      return getBottomTranslateY()
    }

    if (selectedIndex === 16 && stageNumber === 1) {
      return getBottomTranslateY()
    }

    if (selectedIndex === 0 && stageNumber === 15) {
      return getTopTranslateY()
    }

    if (selectedIndex === 1 && stageNumber === 16) {
      return getTopTranslateY()
    }

    if (stageNumber === selectedIndex - 2) {
      return getTopTranslateY()
    }

    if (stageNumber === selectedIndex + 2) {
      return getBottomTranslateY()
    }

    return 0
  }

  return (
    <div
      className="relative
            cursor-grab flex justify-center items-center relative"
      style={{
        width: `${slideWidth}px`,
        height: `${slideHeight}px`,
        transform: `translateY(${getTransform()}px)`,
      }}
    >
      <a
        href={shouldBeLocked ? "/roadmap" : stageData.link}
        target={shouldBeLocked ? "_self" : "_blank"}
        rel="noreferrer"
        onClick={(e) => {
          if (shouldBeLocked) e.preventDefault()
        }}
      >
        <div
          className="relative z-[1] rounded-[10px] md:!rounded-[20px]
                  [&>div]:rounded-[10px] [&>div]:md:!rounded-[20px]
                  hover:scale-[1.02] transition duration-[500ms] shake"
          style={{
            backgroundImage: `url('${stageData.backImg}')`,
            boxShadow: shouldBeLocked || !stageData.date ? "0px 0px 8px 4px rgb(0, 0, 0)" : "",
            backgroundSize: `${imgWidth}px ${imgHeight}px`,
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
          }}
          ref={shakeRef}
        >
          {shouldBeLocked && (
            <div className="absolute w-[100%] h-[100%] backdrop-blur-[10px] top-0 left-0 z-[2]  pointer-events-none" />
          )}
          <div
            className="absolute w-[100%] h-[100%] z-[1] top-0 left-0
                      bg-gradient-to-r from-[#000000ed] via-[transparent] to-[#000000ed]"
          />

          <div className="absolute w-[100%] h-[100%] z-[1] top-0 left-0 z-[3]">
            <div
              className="font-[eigerdals] pl-3 text-white opacity-[0.3]
                xl:pl-8
                md:pl-6
                pl-2 
              "
              style={{
                fontSize: isReponsive ? `${(250 / 257) * imgHeight}px` : "250px",
                lineHeight: isReponsive ? `${(261 / 257) * imgHeight}px` : "261px",
              }}
            >
              {stageData.date ? stageNumber + 1 : "XX"}
            </div>
          </div>

          <div
            className="absolute w-[100%] h-[100%] flex items-end
                      left-0 top-0 z-[7] pointer-events-none"
            style={{
              boxShadow: shouldBeLocked || !stageData.date ? "inset 0px 0px 18px 5px" : "",
            }}
          >
            <div
              className="text-white uppercase px-3 pb-2 md:p-6 font-[quicksand] font-[650]"
              style={{
                fontSize: `${(28 / 1065) * imgWidth}px`,
              }}
            >
              {stageData.date ? stageData.label : "[REDACTED]"}
            </div>
          </div>
          <div
            className="absolute w-[100%] h-[100%] flex flex-col items-end justify-between
                      left-0 top-0 z-[5] p-3 md:p-6 pointer-events-none"
          >
            <Image
              src={
                shouldBeLocked || !stageData.date
                  ? "/assets/Roadmap/lock.svg"
                  : "/assets/Roadmap/unlock.svg"
              }
              width={
                shouldBeLocked || !stageData.date
                  ? (36 / 1065) * slideWidth
                  : (47.44 / 1065) * slideWidth
              }
              height={
                shouldBeLocked || !stageData.date
                  ? (47.25 / 1065) * slideWidth
                  : (46 / 1065) * slideWidth
              }
              alt="not found image"
            />
            <div
              className="font-[quicksand] text-white font-[700] uppercase"
              style={{
                fontSize: `${(28 / 1065) * imgWidth}px`,
              }}
            >
              {
                // eslint-disable-next-line no-nested-ternary
                stageData.date
                  ? `${
                      months[
                        parseInt(
                          stageData.date.slice(
                            stageData.date.length - 5,
                            stageData.date.length - 2,
                          ),
                          10,
                        ) - 1
                      ]
                    } ${
                      stageData.certain
                        ? parseInt(
                            stageData.date.slice(stageData.date.length - 2, stageData.date.length),
                            10,
                          )
                        : ""
                    }`
                  : "???????????"
              }
            </div>
          </div>
          <pre
            className="z-[4] w-[100%] h-[100%] absolute left-0 top-0 
            xl:pl-8 xl:pr-20 xl:py-8
            md:px-6 md:pt-6
            xs:px-3 xs:pt-3
            px-3 pt-3
            font-quicksand 
            text-[5px] xs:text-[6.5px] md:text-[13.5px] xl:text-[19px] 
            text-white hover:opacity-[1] opacity-0 
            rounded-[10px] md:rounded-[20px]
            hover:bg-gradient-to-r hover:from-[#000000cf] hover:via-[#00000080] hover:to-[#000000cf]
            bg-transparent
            transition duration-[200ms]"
          >
            <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{stageData.text}</div>
          </pre>
        </div>
      </a>
    </div>
  )
}

export default Stage
