import { createContext, useState, useEffect, useMemo, useContext } from "react"

import { useRouter } from "next/router"
import { useUserProvider } from "./UserProvider"
import { updateUserInfo } from "../lib/userInfo"
import useCre8orNumber from "../hooks/mintDay/useCre8orNumber"
import { useAccount } from "wagmi"

const ProfileContext = createContext<Partial<any> | null>(null)

export const ProfileProvider = ({ children }) => {
  const routerAddress = useRouter().query.address as string
  const { userInfo, getUserData, getUserSimilarProfiles } = useUserProvider()
  const { address } = useAccount()
  const { cre8orNumber } = useCre8orNumber({ address: routerAddress || address })

  const [isHiddenEditable, setIsHiddenEditable] = useState(false)
  const [expandedMore, setExpandedMore] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editedUserName, setEditedUserName] = useState("")
  const [editedTwitterHandle, setEditedTwitterHandle] = useState("")
  const [editedLocation, setEditedLocation] = useState("")
  const [editedAskedMeAbout, setEditedAskedMeAbout] = useState("")
  const [editedINeedHelpWith, setEditedINeedHelpWith] = useState("")
  const [editedBio, setEditedBio] = useState("")
  const [loading, setLoading] = useState(false)

  const saveProfile = async () => {
    setIsEditable(false)
    setLoading(true)
    const response = await updateUserInfo({
      address: routerAddress,
      twitterHandle: editedTwitterHandle,
      location: editedLocation,
      iNeedHelpWith: editedINeedHelpWith,
      askMeAbout: editedAskedMeAbout,
      bio: editedBio,
      username: editedUserName,
    })

    if (response) {
      await getUserData(routerAddress)
      await getUserSimilarProfiles(routerAddress)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (userInfo) {
      setEditedUserName(userInfo.username)
      setEditedTwitterHandle(userInfo.twitterHandle)
      setEditedLocation(userInfo.location)
      setEditedAskedMeAbout(userInfo.askMeAbout)
      setEditedINeedHelpWith(userInfo.iNeedHelpWith)
      setEditedBio(userInfo.bio)
    }
  }, [isEditable, userInfo])

  const provider = useMemo(
    () => ({
      cre8orNumber,
      editedAskedMeAbout,
      editedUserName,
      editedBio,
      editedINeedHelpWith,
      editedLocation,
      editedTwitterHandle,
      expandedMore,
      isEditable,
      isHiddenEditable,
      setExpandedMore,
      setEditedUserName,
      setEditedAskedMeAbout,
      setEditedBio,
      setEditedINeedHelpWith,
      setEditedTwitterHandle,
      setEditedLocation,
      setIsEditable,
      setIsHiddenEditable,
      saveProfile,
      loading,
    }),
    [
      cre8orNumber,
      editedAskedMeAbout,
      editedUserName,
      editedBio,
      editedINeedHelpWith,
      editedLocation,
      editedTwitterHandle,
      expandedMore,
      isEditable,
      isHiddenEditable,
      setExpandedMore,
      setEditedUserName,
      setEditedAskedMeAbout,
      setEditedBio,
      setEditedINeedHelpWith,
      setEditedTwitterHandle,
      setEditedLocation,
      setIsEditable,
      setIsHiddenEditable,
      saveProfile,
      loading,
    ],
  )

  return <ProfileContext.Provider value={provider}>{children}</ProfileContext.Provider>
}

export const useProfileProvider = () => useContext(ProfileContext)
