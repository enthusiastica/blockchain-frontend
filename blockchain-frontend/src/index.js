import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

///////////////////

import { ethers } from 'ethers';
import abi from './abi.json' // change it only if backend is updated

const contract_address = "0x1A2B5e4a6D75d331034196a01011C5a217C74D9d"; // add address in single or double quotes ("", '')

var contract;
var userAddress;

window.onload = connect;

async function connect() {
	const { ethereum } = window;

	if (!ethereum) {
		console.log("Metamask not found")
		alert("please install metamask!");
		return;
	}

	console.log("Requesting account to metamask.....")

	try {
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

		const provider = new ethers.providers.Web3Provider(ethereum); // to request metamask
		const signer = provider.getSigner();

		if (accounts.length === 0) {
			alert("No Account :(");
			return;
		}

		userAddress = accounts[0];
		console.log(userAddress); // getting address of logged in user

		contract = new ethers.Contract(contract_address, abi, signer); // creating reference to blockchain contract
		console.log(contract);

		// let op1 = await contract.setDay(1);
		// let op2 = await contract.c_day();
		// console.log("setDay: ", op1);
		// console.log("c_day : ", op2);
	} catch (e) {
		// alert(e)
		console.log("error: ", e);
	}
}
////////////////

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

export { contract, userAddress }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();