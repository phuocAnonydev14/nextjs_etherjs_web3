import tokenTestAbi from "@/common/contracts/tokenTestabi.json"
import {tokenTestAddress} from "@/common/contracts/tokenTestaddress"
import {TokenEnums} from "@/common/enums/TokenEnums";
import {tokenJukiAddress} from "@/common/contracts/tokenJuki";
import tokenJukiAbi from "@/common/contracts/tokenJukiabi.json"

export const contractToken = {
  [TokenEnums.JU]:{
    address: tokenJukiAddress,
    abi: tokenJukiAbi
  },
  [TokenEnums.TE]:{
    address: tokenTestAddress,
    abi: tokenTestAbi
  }
}