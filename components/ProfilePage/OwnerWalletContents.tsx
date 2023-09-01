import { useProfileProvider } from "../../providers/ProfileContext"
import Media from "../../shared/Media"
import { CRE8OR } from "./types"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import ProfileToken from "./ProfileToken"
import { useCallback, useState } from "react"
import useCheckNetwork from "../../hooks/useCheckNetwork"
import useERC721Transfer from "../../hooks/useERC721Transfer"
import { useUserProvider } from "../../providers/UserProvider"
import { useAccount } from "wagmi"
import { useDrop } from 'react-dnd'
import { ItemTypes } from "./ItemTypes"
import TransferLoadingModal from "./TransferLoadingModal"

const OwnerWalletContents = ({ setOpenTrainModal }) => {
  const { isEditable } = useProfileProvider()
  const { ownedNfts, setSelectedTrainTokenData } = useWalletCollectionProvider()
  const { smartWalletAddress } = useUserProvider()
  const { checkNetwork } = useCheckNetwork()
  const [isTransferring, setIsTransferring] = useState(false)
  const { transferERC721 } = useERC721Transfer()
  const { address } = useAccount()
  const { toggleProfileFormattedCollection } = useWalletCollectionProvider()

  const afterTransfer = async () => {
    await toggleProfileFormattedCollection()
  }

  const dropToSmartWallet = useCallback(
    async (item) => {
      if (item?.inOwnedWallet) return
      if (!checkNetwork()) return

      setIsTransferring(true)

      await transferERC721(
        item?.contractAddress,
        smartWalletAddress,
        address,
        item?.tokenId,
        afterTransfer,
      )

      setIsTransferring(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transferERC721, checkNetwork],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ERC721,
      drop: async (item: any) => {
        dropToSmartWallet(item)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [dropToSmartWallet],
  )

  return (
    <>
      <div
        className="grid grid-cols-3 xs:grid-cols-4 lg:grid-cols-6 
                    gap-x-[5px] lg:gap-x-[15px] gap-y-[5px] 
                    pt-[15px] mt-[20px]
                    h-[140px] lg:h-[287px] 
                    overflow-y-auto overflow-x-hidden
                    pr-2"
        ref={drop}
      >
        {ownedNfts.map((data, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="flex flex-col items-center gap-y-[5px]">
            <ProfileToken token={data} inOwnedWallet/>
            <div
              className="text-[6px] samsungS8:text-[7px] xs:text-[8px] lg:text-[12px] font-quicksand font-bold text-white
                                w-[30px] samsungS8:w-[40px] lg:!w-[90px] text-center
                                flex flex-col items-center gap-y-[2px]"
            >
              <div className="w-full break-words uppercase">
                {data.type === CRE8OR ? "CRE8ORS" : data.label}
                {data.type === CRE8OR ? ` #${data.tokenId}` : ""}
              </div>
              {isEditable && data.type === CRE8OR && data.getCre8ingStarted !== undefined && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrainTokenData({
                        id: data.tokenId,
                        isStake: !data.getCre8ingStarted,
                      })
                      setOpenTrainModal(true)
                    }}
                  >
                    <Media
                      type="image"
                      containerClasses={
                        data.getCre8ingStarted ? "w-[13.54px] h-[16.83px]" : "w-[14.8px] h-[17px]"
                      }
                      link={
                        data.getCre8ingStarted
                          ? "/assets/Profile/locked.svg"
                          : "/assets/Profile/unlocked.svg"
                      }
                      blurLink={
                        data.getCre8ingStarted
                          ? "/assets/Profile/locked.png"
                          : "/assets/Profile/unlocked.png"
                      }
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isTransferring && <TransferLoadingModal />}
    </>
  )
}

export default OwnerWalletContents
