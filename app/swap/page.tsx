"use client"

import {Button, Input, message, Select} from "antd";
import {useContractContext} from "@/common/providers/ContractProviders";
import {useState} from "react";
import {validateUserBalance} from "@/common/utils/validateUserBalance";
import {TokenEnums} from "@/common/enums/TokenEnums";
import {contractToken} from "@/common/constants/ContractConstants";

export default function SwapPage() {
  const {contract, address, web3} = useContractContext()
  const [tokenState, setTokenState] = useState<{ tokenOut: TokenEnums, tokenIn: TokenEnums }>(
    {
      tokenIn: TokenEnums.TE,
      tokenOut: TokenEnums.JU
    }
  )

  const tokenList = [
    {
      label: "Juki token",
      value: TokenEnums.JU
    }, {
      label: "Test token",
      value: TokenEnums.TE
    }, {
      label: "native token",
      value: TokenEnums.NATIVE
    },
  ]

  const [amountSwap, setAmountSwap] = useState(0)

  const handleSwapToken = async () => {
    try {
      await Promise.all([async () => await validateUserBalance(web3.utils.toWei(amountSwap, "ether"), address, tokenState.tokenOut), async () => await validateUserBalance(web3.utils.toWei(amountSwap, "ether"), address, tokenState.tokenIn)])
      if (tokenState.tokenIn === TokenEnums.NATIVE) {
        const res =
          await contract.methods.swap(contractToken[tokenState.tokenIn].address, contractToken[tokenState.tokenOut].address,amountSwap).send({
            from: address,
            value: amountSwap.toString()
          })
        console.log(res)

        return
      }
      console.log(contractToken[tokenState.tokenIn].address, contractToken[tokenState.tokenOut].address, amountSwap)
      const res =
        await contract.methods.swap(contractToken[tokenState.tokenIn].address, contractToken[tokenState.tokenOut].address, amountSwap).send({from: address})
      message.success("Swap token successfully")
    } catch (e) {
      console.log({e})
    }
  }

  return <div>
    Swap page

    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "40px"}}>
      <div style={{textAlign: "center"}}>
        <Select defaultValue={tokenState.tokenIn} value={tokenState.tokenIn} onChange={e => {
          console.log({e})
          setTokenState(prev => ({...prev, tokenIn: e}))
        }}
                options={tokenList} style={{minWidth: "160px"}}/>
        <h3>Contract</h3>
      </div>
      <div style={{width: "50px"}}
           onClick={() => setTokenState(state => ({tokenOut: state.tokenIn, tokenIn: state.tokenOut}))}>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="swap">
          <g data-name="Layer 2" fill="#fff" className="color000000 svgShape">
            <path
              d="M4 9h13l-1.6 1.2a1 1 0 0 0-.2 1.4 1 1 0 0 0 .8.4 1 1 0 0 0 .6-.2l4-3a1 1 0 0 0 0-1.59l-3.86-3a1 1 0 0 0-1.23 1.58L17.08 7H4a1 1 0 0 0 0 2zm16 7H7l1.6-1.2a1 1 0 0 0-1.2-1.6l-4 3a1 1 0 0 0 0 1.59l3.86 3a1 1 0 0 0 .61.21 1 1 0 0 0 .79-.39 1 1 0 0 0-.17-1.4L6.92 18H20a1 1 0 0 0 0-2z"
              data-name="swap" fill="#fff" className="color000000 svgShape"></path>
          </g>
        </svg>

      </div>
      <div style={{textAlign: "center"}}>
        <Select defaultValue={tokenState.tokenOut} onChange={e => setTokenState(prev => ({...prev, tokenOut: e}))}
                options={tokenList} style={{minWidth: "160px"}}/>
        <h3>User</h3>
      </div>
      <Input style={{maxWidth: "200px"}} placeholder={"Enter amount swap"} type={"number"} value={amountSwap}
             onChange={e => setAmountSwap(+e.target.value)}/>
      <Button type={"primary"} htmlType={"submit"} onClick={handleSwapToken}>Swap</Button>
    </div>
  </div>
}