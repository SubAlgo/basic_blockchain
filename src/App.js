import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Subalgo from './artifacts/contracts/Subalgo.sol/Subalgo.json'
//import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const subAlgoAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [name, setNameValue] = useState('')
  //const [greeting, setGreetingValue] = useState()


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(subAlgoAddress, Subalgo.abi, provider)
      try {
        const data = await contract.getName()
        //const l = await contract.getLastname()
        //const data = n + " " + l
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function setSubalgoName() {
    if (!name) return
    if (typeof window.ethereum !== 'undefined') {
      console.log('param: ', name)
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider })
      const signer = provider.getSigner()
      console.log(signer)
      const contract = new ethers.Contract(subAlgoAddress, Subalgo.abi, signer)
      const transaction = await contract.setName(name)
      await transaction.wait()
      fetchData()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchData}>FetchData</button>
        <button onClick={setSubalgoName}>Set name</button>
        <input 
          onChange={e => setNameValue(e.target.value)} 
          placeholder="Set name" 
        />
        

      </header>
    </div>
  );
}

export default App;
