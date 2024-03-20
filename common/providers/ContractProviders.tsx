"use client"
import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Contract, Web3} from "web3";
import abi from "@/common/contracts/contractAbi.json"
import {contractSwapAddress} from "@/common/contracts/contractAddress";
import {ethers} from "ethers";
import {RegisteredSubscription} from "web3-eth";

interface ContractContextVal {
  contract: Contract<typeof abi>,
  address: string,
  web3:  Web3<RegisteredSubscription>,
  balance: string
}

export const ContractContext = createContext<ContractContextVal>({} as ContractContextVal)

export const ContractProvider = ({children}: PropsWithChildren) => {
  const [web3, setWeb3] = useState< Web3<RegisteredSubscription>>({} as Web3<RegisteredSubscription>)
  const [address, setAddress] = useState<string>('')
  const [contract, setContract] = useState<Contract<typeof abi>>({} as Contract<typeof abi>)
  const [totalSupply, setTotalSupply] = useState<any>(0)
  const [balance, setBalance] = useState<string>('0')

  useEffect(() => {
    window.ethereum ?
      window.ethereum.request({method: "eth_requestAccounts"}).then((accounts: any) => {
        setAddress(accounts[0])
        let w3 = new Web3(window.ethereum)
        setWeb3(w3)

        let contract = new w3.eth.Contract(abi, contractSwapAddress)
        setContract(contract)
        console.log({contract})
        contract.methods.totalSupply().call().then((_supply) => {
          // Optionally set it to the state to render it using React
          setTotalSupply(_supply)
          console.log({_supply})
        }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }, [])

  useEffect(() => {
    getbalance()
  }, [contract, web3]);

  const getbalance = () => {
    // Requesting balance method
    window?.ethereum?.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    })
      .then((balance: any) => {
        // Setting balance
        return setBalance(ethers.formatEther(balance));
      })
  };

  const contractContextVal = {contract,address,web3,balance}

  return <ContractContext.Provider value={contractContextVal}>
    {children}
  </ContractContext.Provider>
}

export const useContractContext = () => useContext(ContractContext)