import { useState, FC } from "react"
import Image from "next/image"

interface HoverImageChangeProps {
  alt: string
  hoveredSrc: string
  regSrc: string
  width: number
  height: number
}
const HoverImageChange: FC<HoverImageChangeProps> = ({
  alt,
  hoveredSrc,
  regSrc,
  width,
  height,
}) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
    >
      <Image src={hovered ? hoveredSrc : regSrc} width={width} height={height} alt={alt} />
    </div>
  )
}

export default HoverImageChange