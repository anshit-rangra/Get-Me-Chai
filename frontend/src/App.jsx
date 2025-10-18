import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import abi from './assets/chai.json'
import { ethers } from 'ethers';
import Memos from './components/Memos';
import Buy from './components/Buy';

const App = () => {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account , setAccount] = useState(null)

  useEffect(() => {
    const connectWallet = async() => {
      const contractAddress = "0x7F3F1ee778d32162325Db26E1e5E8d980de4070D"
      const contractABI = abi
      try { 
        const { ethereum } = window;
        if(ethereum){
          const acc = await ethereum.request({method: "eth_requestAccounts"})
          

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });
        
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        setState({provider, signer, contract})
        setAccount(acc)
      }else{
        alert("Please install metamask")
      }
        
      } catch (error) {
        console.log(error)
      }
    }
    connectWallet()
  },[])



  return (
    <div>
      <h1>connected account - {account}</h1>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  )
}

export default App
