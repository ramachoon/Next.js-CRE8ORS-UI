import { useEffect, useState } from "react"
import { BigNumber } from "ethers"
import { useRouter } from "next/router"
import ImageCard from "./ImageCard"
import balanceOfParticipationRewards from "../../lib/balanceOfParticipationRewards"
import truncateEthAddress from "../../lib/truncateEthAddress"

const NUMBER_OF_TOKENS = "0"

function CollectorPage() {
  const router = useRouter()
  const { collectorId } = router.query
  const [balance, setBalance] = useState(NUMBER_OF_TOKENS)

  useEffect(() => {
    const init = async () => {
      const response = await balanceOfParticipationRewards(collectorId as string)
      if (response.error) return
      setBalance(response.toString())
    }

    init()
  })

  return (
    <div className="mt-3 flex flex-col">
      <div className="flex flex-col items-center justify-around text-4xl text-white pt-10 h-[75vh]">
        <div>CRE8OR Profile - {truncateEthAddress(collectorId as string)}</div>
        {BigNumber.from(balance).gt(0) && (
          <div className="flex flex-col items-center gap-5">
            <ImageCard
              imageUrl="https://nftstorage.link/ipfs/bafybeiaoglcj47pklfmwnxp6sd352y4fndr3ojopof7f3ciiaogshcz3au"
              title={`Participation Rewards: ${balance.toString()}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectorPage