"use client"

import {Button, Form, Input, message} from "antd";
import {useContractContext} from "@/common/providers/ContractProviders";

export default function RatePage() {
  const {contract, address, web3} = useContractContext()
  const handleRate = async ({rate, digits, token1, token2}: {
    token1: string,
    token2: string,
    rate: number,
    digits: number
  }) => {
    try {
      console.log(contract.methods)
      const res = await contract.methods.setRate(token1, token2, rate, digits).send({from:address})
      console.log(res)
      message.success("Set rate successfully")
    } catch (e) {
      console.log({e})
      message.error("Set rate failed")
    }
  }

  return <div>
    <h2>Set Rate between 2 tokens</h2>
    <div style={{maxWidth:"500px"}}>
      <Form layout={"vertical"} onFinish={handleRate}>
        <Form.Item name={'token1'}>
          <Input style={{background: "transparent", border: "unset", borderBottom: "2px solid #fff", color: "#fff"}}
                 placeholder={"Enter token 1"}/>
        </Form.Item>
        <Form.Item name={'token2'}>
          <Input style={{background: "transparent", border: "unset", borderBottom: "2px solid #fff", color: "#fff"}}
                 placeholder={"Enter token 2"}/>
        </Form.Item>
        <Form.Item name={'rate'}>
          <Input style={{background: "transparent", border: "unset", borderBottom: "2px solid #fff", color: "#fff"}}
                 placeholder={"Enter amount"} type={"number"}/>
        </Form.Item>
        <Button htmlType={"submit"} type={"primary"}>Handle swap</Button>
      </Form>
    </div>
  </div>
}