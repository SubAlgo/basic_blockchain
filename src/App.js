import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Subalgo from './artifacts/contracts/Subalgo.sol/Subalgo.json'
import Token from './artifacts/contracts/Token.sol/Token.json'


const subAlgoAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const tokenAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
function App() {
  const [name, setNameValue] = useState('')
  const [lastname, setLastnameValue] = useState('')

  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState(0)

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transacion = await contract.transfer(userAccount, amount);
      await transacion.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(subAlgoAddress, Subalgo.abi, provider)
      try {
        const n = await contract.getName()
        const l = await contract.getLastname()
        const data = n + " " + l
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

  async function setSubalgoLastname() {
    if (!lastname) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(subAlgoAddress, Subalgo.abi, signer);
      const transaction = await contract.setLastname(lastname);
      await transaction.wait();
      fetchData();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchData}>FetchData</button>
        <div>
          <label>Set Name</label>
          <input 
            onChange={e => setNameValue(e.target.value)} 
            placeholder="Set name" 
          />
          <button onClick={setSubalgoName}>Set name</button>
        </div>

        <div>
          <label>Set Lastname</label>
          <input 
            onChange={e => setLastnameValue(e.target.value)} 
            placeholder="Set lastname" 
          />
          <button onClick={setSubalgoLastname}>Set Lastname</button>
        </div>
        <br />

        <div>
          <button onClick={getBalance}>Get Balance</button>
          <div>
            <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID"></input>
            <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
            <p>
            <button onClick={sendCoins}>Send coins</button>
            </p>
          </div>
        </div>
        
        

      </header>
    </div>
  );
}

export default App;
