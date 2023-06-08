import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState, useEffect } from "react"
import CustomConnectWallet from "../CustomConnectWallet"
import DiscordIcon from "../DiscordIcon"
import { ToggleButton } from "../../shared/Button"
import { useTheme } from "../../providers/ThemeProvider"

const DesktopMenu = () => {
  const { onChangeThemeConfig, themeMode } = useTheme()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const onToggle = () => {
    setIsDarkMode(!isDarkMode)
    onChangeThemeConfig()
  }

  useEffect(() => {
    setIsDarkMode(themeMode !== "light")
  }, [themeMode])

  return (
    <div className="flex flex-row text-sm uppercase font-quicksand gap-x-12">
      <div className="flex items-center pr-4">
        <a href="https://reserve.cre8ors.com/" target="_blank" rel="noreferrer">
          <div className="font-bold cursor-pointer dark:text-white text-black">Reserve List</div>
        </a>
      </div>
      <div className="flex items-center font-quicksand font-bold">
        <div className="pr-2 text-[#9C9C9C]">light</div>
        <ToggleButton onClick={onToggle} value={isDarkMode} id="light_dark_switch" />
        <div className="pl-2 text-[#9C9C9C]">dark</div>
      </div>
      <div className="relative">
        <button
          type="button"
          className={`font-bold rounded-lg bg-[black] dark:bg-white dark:text-[black] text-white uppercase text-sm w-[134px] h-[40px] ${
            isMenuOpen && "shadow-md"
          } ${!isMenuOpen && "!bg-transparent dark:!text-[white] !text-[black]"}`}
          onClick={toggleMenu}
        >
          Explore
          {!isMenuOpen && <ChevronDownIcon className="inline w-4 h-5 align-middle" />}
          {isMenuOpen && <ChevronUpIcon className="inline w-4 h-5 align-middle" />}
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-[45px] z-200 inline-flex flex-col items-center uppercase justify-between space-y-4 p-4 bg-[black] dark:bg-white shadow-md rounded-lg  font-quicksand text-sm">
            <div className="text-gray-400 cursor-not-allowed ">Allowlist</div>
            <a href="/leaderboard" target="_blank" rel="noreferrer">
              <div className="cursor-pointer text-white dark:text-[black]">Leaderboard</div>
            </a>
            <a
              href="https://opensea.io/collection/cre8orscollective"
              target="_blank"
              rel="noreferrer"
            >
              <div className="cursor-pointer text-white dark:text-[black]">Collective</div>
            </a>
            <a href="/teams" target="_blank" rel="noreferrer">
              <div className="cursor-pointer text-white dark:text-[black]">Founders</div>
            </a>
            <a href="https://opensea.io/collection/cre8ors-relics" target="_blank" rel="noreferrer">
              <div className="cursor-pointer text-white dark:text-[black]">Relics</div>
            </a>
            <a href="https://cre8ors.beehiiv.com/" target="_blank" rel="noreferrer">
              <div className="cursor-pointer text-white dark:text-[black]">Blog</div>
            </a>
            <div className="text-gray-400 cursor-not-allowed">Warehouse</div>
            <div className="text-gray-400 cursor-not-allowed">Profiles</div>
          </div>
        )}
      </div>
      <DiscordIcon />
      <a href="https://twitter.com/Cre8orsNFT" target="_blank" rel="noreferrer">
        <div className="pt-2 pl-10 cursor-pointer ">
          <Image
            src={`${
              themeMode === "light" ? "/Icons/TWITTER.svg" : "/assets/Header/white_twitter.png"
            }`}
            width={24}
            height={19}
            alt="twitter"
          />
        </div>
      </a>
      <div className="px-4 pt-2">
        <CustomConnectWallet />
      </div>
    </div>
  )
}

export default DesktopMenu
