"use client"

import {Button, Form, Input} from "antd";
import {ContractContext, useContractContext} from "@/common/providers/ContractProviders";
import {useContext} from "react";
import {ethers} from "ethers";

export default function SwapPage() {
  const {contract, address, web3} = useContractContext()

  const handleSwapToken = async ({token2, token1, amount}: { token1: string, token2: string, amount: number }) => {
    try {
      console.log(web3.utils)
      console.log({token2, token1, amount: web3?.utils?.toWei(+amount, 'ether')})
      const res =
        await contract.methods.swap(token1, token2, web3.utils.toWei(+amount, 'ether')).send({from: address})
      console.log({res})
      console.log("done")
    } catch (e) {
      console.log({e})
    }
  }

  return <div>
    Swap page

    <div style={{width: "40%", display: "flex", gap: "50px",color:"#fff !important"}}>
      <Form layout={"vertical"} onFinish={handleSwapToken}>
        <Form.Item name={'token1'}>
          <Input style={{background:"transparent",border:"unset",borderBottom:"2px solid #fff",color:"#fff"}} placeholder={"Enter token 1"}/>
        </Form.Item>
        <Form.Item name={'token2'}>
          <Input style={{background:"transparent",border:"unset",borderBottom:"2px solid #fff",color:"#fff"}} placeholder={"Enter token 2"}/>
        </Form.Item>
        <Form.Item name={'amount'}>
          <Input style={{background:"transparent",border:"unset",borderBottom:"2px solid #fff",color:"#fff"}} placeholder={"Enter amount"} type={"number"}/>
        </Form.Item>
        <Button htmlType={"submit"} type={"primary"}>Handle swap</Button>
      </Form>
    </div>
  </div>
}