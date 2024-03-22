import tokenTestAbi from "@/common/contracts/tokenTestabi.json"
import {tokenTestAddress} from "@/common/contracts/tokenTestaddress"
import {TokenEnums} from "@/common/enums/TokenEnums";
import {tokenJukiAddress} from "@/common/contracts/tokenJuki";
import tokenJukiAbi from "@/common/contracts/tokenJukiabi.json"
export const nativeContract = "0x0000000000000000000000000000000000000000"

export const contractToken = {
  [TokenEnums.JU]:{
    address: tokenJukiAddress,
    abi: tokenJukiAbi
  },
  [TokenEnums.TE]:{
    address: tokenTestAddress,
    abi: tokenTestAbi
  },[TokenEnums.NATIVE]:{
    address: nativeContract,
    abi: tokenTestAbi
  }
}

