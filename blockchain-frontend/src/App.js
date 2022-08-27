import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

import ciondigital from './ciondigital.png';


import { contract } from './index';



let districts = ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"];

function formSubmitted(e) {
	e.preventDefault();
}

function App() {
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);

	return (<>
		{
			show1 ?
				<Alert variant="success" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setShow1(false)} dismissible>
					<Alert.Heading className="px-5">Scheme Applied Successfully</Alert.Heading>
					<p className='px-5 mb-0'>
						some message here
					</p>
				</Alert>
				:
				""
		}
		{
			show2 ?
				<Alert variant="info" style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }} onClose={() => setShow2(false)} dismissible>
					<Alert.Heading className="px-5">Requested For Claim</Alert.Heading>
					<p className='px-5 mb-0'>
						some message here
					</p>
				</Alert>
				:
				""
		}
		<div className="main py-5">
			<div className="child py-4 px-2 p-sm-5">
				<center>
					<img src={ciondigital} className="w-25 mb-5" />
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
						<button className="btn btn-outline-dark border m-3 m-sm-0 me-sm-4" type="submit" onClick={() => { setShow1(true); setShow2(false) }}>
							Apply Scheme
						</button>

						<button className="btn btn-outline-dark border" onClick={() => { setShow1(false); setShow2(true) }}>
							Request Claim
						</button>
					</div>
				</form>

			</div>
		</div>
	</>);
}

export default App;
