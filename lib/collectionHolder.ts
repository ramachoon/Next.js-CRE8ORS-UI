import { Signer, ethers } from "ethers"
import { Multicall, ContractCallResults, ContractCallContext } from "ethereum-multicall"
import collectionHolderAbi from "./abi-collection-holder.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"
import getNFTs from "./alchemy/getNFTs"
import friendAndFamilyAbi from "./abi-friend-family.json"
import minterUtilitiesAbi from "./abi-minter-utilities.json"

export const getPassports = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}

export const getPassportIds = async (address: string) => {
  const response = await getPassports(address)

  return response
}

export const freeMintClaimed = async (passportId: Array<number | string>) => {
  const contractInterface = new ethers.utils.Interface(collectionHolderAbi)
  const calls = passportId.map((id) => ({
    target: process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    callData: contractInterface.encodeFunctionData("freeMintClaimed", [id]),
  }))
  return calls
}

export const aggregateReads = async (passportIds: Array<number | string>, address: string) => {
  const calls = passportIds.map((id) => ({
    reference: "freeMintClaimed",
    methodName: "freeMintClaimed",
    methodParameters: [id],
  }))

  const discountCalls = [
    {
      reference: "discount",
      methodName: "hasDiscount",
      methodParameters: [address],
    },
  ]

  const quantityLeftCalls = [
    {
      reference: "quantityLeft",
      methodName: "quantityLeft",
      methodParameters: [
        process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
        process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
        process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
        address,
      ],
    },
  ]
  const multicall = new Multicall({
    ethersProvider: getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    tryAggregate: true,
  })
  const contractCallContext: ContractCallContext[] = [
    {
      reference: "discount",
      contractAddress: process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
      abi: friendAndFamilyAbi,
      calls: discountCalls,
    },
    {
      reference: "quantityLeft",
      contractAddress: process.env.NEXT_PUBLIC_MINTER_UTILITY,
      abi: minterUtilitiesAbi,
      calls: quantityLeftCalls,
    },
  ]
  if (calls.length > 0) {
    contractCallContext.push({
      reference: "freeMintClaimed",
      contractAddress: process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
      abi: collectionHolderAbi,
      calls,
    })
  }
  const results: ContractCallResults = await multicall.call(contractCallContext)
  return results
}

export const getAvailableFreeMints = async (
  passportIds: Array<number | string>,
  address: string,
) => {
  const results = await aggregateReads(passportIds, address)
  const availablePassportIds = results?.results?.freeMintClaimed?.callsReturnContext.map((call) => {
    if (call.returnValues[0] === false) {
      return parseInt(call.methodParameters[0], 16)
    }
    return null
  })
  const discount = results?.results?.discount?.callsReturnContext[0]?.returnValues[0]
  const quantityLeft = results?.results?.quantityLeft?.callsReturnContext[0]?.returnValues[0].hex
  return {
    passports: availablePassportIds?.filter((id) => id !== null),
    discount,
    quantityLeft: parseInt(quantityLeft, 16),
  }
}
export const mintByCollectionHolder = async (signer: Signer, passportIds: any) => {
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    collectionHolderAbi,
    signer,
  )
  try {
    const address = await signer.getAddress()
    const tx = await contract.mint(
      passportIds,
      process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS,
      address,
    )

    await tx.wait()

    return { error: false }
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}