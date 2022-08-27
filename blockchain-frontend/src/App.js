import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  return (
    <div className="main">
      <div className="child">
        <h3>CION DIGITAL INSURANCE SCHEME</h3><hr />
        <Form>
          <Form.Group className="mb-12" controlId="formBasicEmail">
            <Form.Label>Premium</Form.Label>
            <Form.Control type="number" placeholder="Enter premium amount" />
          </Form.Group>
          <br />
          <label for="exampleDataList" className="form-label">Select District</label>
          <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
          <datalist id="datalistOptions" >
            <option value="Ahmednagar" />
            <option value="Akola" />
            <option value="Amravati" />
            <option value="Aurangabad" />
            <option value="Beed" />
          </datalist>
          <br />

          <Button variant="primary" type="submit" style={{ margin: "20px" }}>
            Apply Scheme
          </Button>

          <Button variant="primary" >
            Request Claim
          </Button>
        </Form>

      </div>
    </div>
  );
}

export default App;
