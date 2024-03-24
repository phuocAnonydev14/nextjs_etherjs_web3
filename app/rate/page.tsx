"use client";

import { Button, Form, Input, message } from "antd";
import { useContractContext } from "@/common/providers/ContractProviders";
import { useEffect } from "react";

export default function RatePage() {
  const { contract, address, web3 } = useContractContext();

  const handleRate = async ({
    rate,
    digits,
    token1,
    token2,
  }: {
    token1: string;
    token2: string;
    rate: number;
    digits: number;
  }) => {
    try {
      console.log(address);

      const res = await contract.methods
        .setRate(token1, token2, rate, digits)
        .send({ from: address });
      message.success("Set rate successfully");
      console.log(res);
    } catch (e) {
      console.log(e);

      message.error("Set rate failed");
    }
  };

  useEffect(() => {
    async function listenToEvent() {
      try {
        console.log(contract.events);
        
        contract?.events
          ?.SetRate()
          ?.on("data", (event) => {
            console.log({ event });
            alert(event);
          })
          // @ts-ignore
          ?.on("error", (error) => {
            console.log(error);
          })
          ?.on("changed", (data: any) => {
            console.log({ data });
          });
      } catch (e) {
        console.log({ e });
      }
    }

    listenToEvent();
  }, [contract]);

  return (
    <div>
      <h2>Set Rate between 2 tokens</h2>
      <div style={{ maxWidth: "500px" }}>
        <Form layout={"vertical"} onFinish={handleRate}>
          <Form.Item name={"token1"}>
            <Input
              style={{
                background: "transparent",
                border: "unset",
                borderBottom: "2px solid #fff",
                color: "#fff",
              }}
              placeholder={"Enter token 1"}
            />
          </Form.Item>
          <Form.Item name={"token2"}>
            <Input
              style={{
                background: "transparent",
                border: "unset",
                borderBottom: "2px solid #fff",
                color: "#fff",
              }}
              placeholder={"Enter token 2"}
            />
          </Form.Item>
          <Form.Item name={"rate"}>
            <Input
              style={{
                background: "transparent",
                border: "unset",
                borderBottom: "2px solid #fff",
                color: "#fff",
              }}
              placeholder={"Enter amount"}
              type={"number"}
            />
          </Form.Item>
          <Button htmlType={"submit"} type={"primary"}>
            Rate
          </Button>
        </Form>
      </div>
    </div>
  );
}
