import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { ethers } from 'ethers';

import ciondigital from './ciondigital.png';

import { contract } from './index';

let districts = ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"];

function App() {
	const [alert, setAlert] = useState(false);
	const [heading, setHeading] = useState("");
	const [text, setText] = useState("");
	const [type, setType] = useState("");
	const [timeout, setTime] = useState("");


	var showAlertDuration = 5000;

	function setAlertComponent(heading, text, type) {
		setHeading(heading);
		setText(text);
		setType(type);

		setAlert(true);
		autoHide();
	}

	function autoHide() {
		clearInterval(timeout);
		setTime(setTimeout((alert) => {
			alert(false);
		}, showAlertDuration, setAlert));
	}

	function formSubmitted(e) {
		e.preventDefault();
		const district = e.target.district

		if (districts.includes(district.value)) {
			contract.registerFarmer(district.value)
				.then(d => {
					setAlertComponent("Farmer registered", "", "success");
				})
				.catch(e => {
					let error = e.error.data.message.split(": ")[1];
					console.log(error)
					setAlertComponent("Unable to register", error, "warning");
				});
		} else {
			setAlertComponent("Please Select Available District", "", "danger");
			district.focus();
		}

	}

	function applyScheme() {
		const premium = document.getElementById("premium");
		if (premium.value) {
			contract.payPremium({ value: ethers.utils.parseEther(premium.value) })
				.then(d => {
					setAlertComponent("Successfully applied to scheme", "", "success");
				})
				.catch(e => {
					let error = e.error.data.message.split(": ")[1];
					console.log(error)
					setAlertComponent("Problem to apply a scheme", error, "warning");
				});
		} else {
			setAlertComponent("Please enter Premium first", "", "danger");
			premium.focus();
		}
	}
	function requestClaim() {
		contract.claimInsurance()
			.then(d => {
				setAlertComponent("Congratulations, Claim is successfully send to you", "", "success");
			})
			.catch(e => {
				let error = e.error.data.message.split(": ")[1];
				console.log(error)
				setAlertComponent("Unable to request for claim", error, "warning");
			});
	}

	return (<>
		{
			alert ?
				<Alert variant={type} id="alert" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setAlert(false)} dismissible>
					<Alert.Heading className="px-5 m-0">{heading}</Alert.Heading>
					<p className='px-5 m-0'>{text}</p>
				</Alert>
				:
				""
		}
		<div className="main py-5">
			<div className="child py-4 px-2 p-sm-5">
				<center className="logo">
					<img src={ciondigital} alt="ciondigital" className="mb-5" />
				</center>
				<h3 className='text-secondary border-bottom pb-4 mb-4'>INSURANCE SCHEME</h3>
				<form onSubmit={formSubmitted}>
					<div className=' mb-4'>
						<label htmlFor="district" className="form-label">Select District</label>
						<input className="form-control" autoComplete='false' list="districtOptions" id="district" name="district" placeholder="Type to search..." />
						<datalist id="districtOptions" >
							{
								districts.map((district, key) => {
									return <option key={key} value={district} />
								})
							}
						</datalist>
					</div>
					<div className="input-group">
						<label htmlFor="premium" className="input-group-text">Premium ₹</label>
						<input type="numbert" id="premium" name="premium" className="form-control" />
					</div>
					<br />
					<div className='mt-sm-4 text-center text-sm-center'>
						<button className="btn btn-outline-dark border m-3 m-sm-0 me-sm-4">
							Register
						</button>

						<button type='button' onClick={applyScheme} className="btn btn-outline-primary border m-3 m-sm-0 me-sm-4">
							Apply Scheme
						</button>

						<button type='button' onClick={requestClaim} className="btn btn-outline-success border">
							Request Claim
						</button>
					</div>
				</form>

			</div>
		</div>
	</>);
}

export default App;
