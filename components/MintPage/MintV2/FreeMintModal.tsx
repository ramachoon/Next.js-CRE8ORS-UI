import { Button } from "../../../shared/Button"
import Modal from "../../../shared/Modal"
import { useMintProvider } from "../../../providers/MintProvider"
import usePassportMintDay from "../../../hooks/mintDay/usePassportMintDay"

const FreeMintModal = ({ isModalVisible, toggleModal, onSuccess, setIsMintLoading }) => {
  const {
    checkNetwork,
    freeMintCount,
    hasPassport,
    hasUnclaimedFreeMint,
    hasFriendAndFamily,
    refetchInformation,
  } = useMintProvider()
  const { freeMintPassportHolder, freeMintFamilyAndFriend } = usePassportMintDay()
  const isPassportMint = hasPassport && hasUnclaimedFreeMint

  const handleMint = async () => {
    if (!checkNetwork()) return
    toggleModal()

    setIsMintLoading(true)

    if (isPassportMint || hasFriendAndFamily) {
      const response = await (isPassportMint
        ? freeMintPassportHolder(onSuccess)
        : freeMintFamilyAndFriend(onSuccess))
      if (!response?.error) await refetchInformation()
    }

    setIsMintLoading(false)
  }

  return (
    <Modal isVisible={isModalVisible} onClose={toggleModal} showCloseButton>
      <div
        className="rounded-[15px] md:rounded-[20px]
                  md:px-16 md:py-20
                  p-10
                  flex-col flex justify-center items-center
                  gap-y-[30px]
                  bg-[url('/assets/Mint/MintNow/MintCoreModal/combination_bg.png')]
                  bg-cover bg-black dark:bg-white"
      >
        <pre
          className="font-eigerdals 
                  text-[22px] samsungS8:text-[25px] xs:text-[28px] xl:text-[45px] 
                  uppercase text-center
                  leading-[103.3%] dark:text-black text-white"
        >
          {`You have ${freeMintCount || 0}\nfree mint${freeMintCount > 1 ? "s" : ""}`}
        </pre>
        <Button
          id="mint_now"
          className="!w-[200px] !h-[50px]
                  !font-eigerdals font-bold !bg-black 
                  text-[15px] xl:text-[24px] 
                  !rounded-[10px]
                  !text-black dark:!text-white
                  dark:!bg-black !bg-white"
          onClick={handleMint}
        >
          Mint Now
        </Button>
      </div>
    </Modal>
  )
}

export default FreeMintModal