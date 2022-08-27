import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { ethers } from 'ethers';

import ciondigital from './ciondigital.png';

import { contract } from './index';

let districts = ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"];

function App() {
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);

	const [showErr1, setShowErr1] = useState(false);
	const [showErr2, setShowErr2] = useState(false);

	var showAlertDuration = 5000;

	function autoHide(alert) {
		setTimeout((alert) => {
			alert(false);
		}, showAlertDuration, alert);
	}

	function hideAll() {
		setShow1(false);
		setShow2(false);
		setShowErr1(false);
		setShowErr2(false);
	}

	function formSubmitted(e) {
		e.preventDefault();
		const premium = e.target.premium.value
		const district = e.target.district.value

		contract.registerFarmer(district)
			.then(d => {
				console.log(d)
				contract.payPremium({value:ethers.utils.parseEther(premium)})
					.then(d => {
						console.log(d)
						hideAll();
						setShow1(true);
						autoHide(setShow1);
					})
					.catch(e => {
						console.log(e);
						hideAll();
						setShowErr1(true);
						autoHide(setShowErr1);
					});
			})
			.catch(e => {
				console.log(e);
				hideAll();
				setShowErr1(true);
				autoHide(setShowErr1);
			});
	}

	function requestClaim() {
		contract.claimInsurance()
			.then(d => {
				console.log(d)
				hideAll();
				setShow2(true);
				autoHide(setShow2);
			})
			.catch(e => {
				console.log(e);
				hideAll();
				setShowErr2(true);
				autoHide(setShowErr2);
			});
	}

	return (<>
		{
			show1 ?
				<Alert variant="success" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setShow1(false)} dismissible>
					<Alert.Heading className="px-5 m-0">Scheme Applied Successfully</Alert.Heading>
					<p className='px-5 m-0'></p>
				</Alert>
				:
				""
		}
		{
			showErr1 ?
				<Alert variant="warning" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setShowErr1(false)} dismissible>
					<Alert.Heading className="px-5 m-0">Unable to pay premium</Alert.Heading>
					<p className='px-5 m-0'></p>
				</Alert>
				:
				""
		}

		{
			show2 ?
				<Alert variant="info" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setShow2(false)} dismissible>
					<Alert.Heading className="px-5 m-0">Requested For Claim</Alert.Heading>
					<p className='px-5 m-0'></p>
				</Alert>
				:
				""
		}
		{
			showErr2 ?
				<Alert variant="warning" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setShowErr2(false)} dismissible>
					<Alert.Heading className="px-5 m-0">Unable to request for claim</Alert.Heading>
					<p className='px-5 m-0'></p>
				</Alert>
				:
				""
		}
		<div className="main py-5">
			<div className="child py-4 px-2 p-sm-5">
				<center>
					<img src={ciondigital} alt="ciondigital" className="w-25 mb-5" />
				</center>
				<h3 className='text-secondary border-bottom pb-4 mb-4'>INSURANCE SCHEME</h3>
				<form onSubmit={formSubmitted}>
					<div className="input-group mb-4">
						<label htmlFor="premium" className="input-group-text">Premium ₹</label>
						<input type="number" id="premium" name="premium" className="form-control" />
					</div>
					<label htmlFor="district" className="form-label">Select District</label>
					<input className="form-control" autoComplete='false' list="districtOptions" id="district" name="district" placeholder="Type to search..." />
					<datalist id="districtOptions" >
						{
							districts.map((district, key) => {
								return <option key={key} value={district} />
							})
						}
					</datalist>
					<br />
					<div className='mt-sm-4 text-center text-sm-start'>
						<button className="btn btn-outline-dark border m-3 m-sm-0 me-sm-4" type="submit">
							Apply Scheme
						</button>

						<button type='button' onClick={requestClaim} className="btn btn-outline-dark border">
							Request Claim
						</button>
					</div>
				</form>

			</div>
		</div>
	</>);
}

export default App;
