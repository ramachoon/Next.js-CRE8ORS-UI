import axios from "axios"
import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

const getNFTs = async (address: string, contractAddresses: string[], chainId: number = 5) => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const { data } = await axios.get(`${getAlchemyBaseUrl(chainId)}nft/v2/${alchemyKey}/getNFTs`, {
    params: {
      owner: address,
      contractAddresses,
    },
  })
  return data
}

export default getNFTs
