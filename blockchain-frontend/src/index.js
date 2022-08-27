import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

///////////////////

import ethers from 'ethers';

window.onload = connect;

async function connect() {
	const { ethereum } = window;

	if (!ethereum) {
		alert("please install metamask!");
		return;
	}

	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const provider = new ethers.providers.Web3Provider(ethereum); // to request metamask
	const signer = provider.getSigner();

	if (accounts.length === 0) {
		alert("No Account :(");
		return;
	}
}
////////////////

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
