import {Web3} from "web3";
import {contractSwapAddress} from "@/common/contracts/contractAddress"
import {TokenEnums} from "@/common/enums/TokenEnums";
import {contractToken} from "@/common/constants/ContractConstants";


export async function validateUserBalance(amount: string, userAddress: string, tokenOut: TokenEnums) {
  try {
    if (tokenOut === TokenEnums.NATIVE) {
      return
    }
    let w3 = new Web3(window.ethereum)
    const token = new w3.eth.Contract(contractToken[tokenOut].abi, contractToken[tokenOut].address)
    const tokenAllowance = await token.methods.allowance(userAddress, contractSwapAddress).call()
    if (tokenAllowance && +tokenAllowance > +amount) {
      return
    }

    await token.methods.approve(contractSwapAddress, amount).send({from: userAddress})
    setTimeout(() => {
    }, 1000)
  } catch (e) {
    console.log({e})
  }
}