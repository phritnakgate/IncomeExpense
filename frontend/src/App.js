import './App.css';
import {useState} from "react";

function App() {
    const [datetime, setDatetime] = useState('')
    const [description, setDescription] = useState('')

    const sel_refcode = [
        {value:'', text:''},
        {value:'inc', text:'inc'},
        {value:'ex1', text:'exp-001'},
        {value:'ex2', text:'exp-002'},
        {value:'ex3', text:'exp-003'},
        {value:'ex4', text:'exp-004'}
    ]
    const [refcode, setRefcode] = useState('')
    const select_refcode = event =>{
        // console.log(event.target.value)
        setRefcode(event.target.value)
    }

    const [money, setMoney] = useState('')

    function addNewTransaction(ev) {
        ev.preventDefault()
        const url = process.env.REACT_APP_API_URL+'addtransaction'
        // console.log(url)
        fetch(url, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({datetime, refcode, description, money})
        }).then(response => {
            response.json().then(json =>{
                console.log("Completed", json)
            })
        })
    }

  return (
    <main>
      <h1>Money Management</h1>
        <h1>฿400<span>.00</span></h1>
        <form onSubmit={addNewTransaction}>
            <div className="datetime_form">
                <input type="datetime-local"
                       onChange={event => setDatetime(event.target.value)}/>
            </div>
            <div className="description_form">
                <select value={refcode} onChange={select_refcode}>
                    {sel_refcode.map(rc =>(
                        <option key={rc.value} value={rc.value}>{rc.text}</option>
                    ))}
                </select>
                <input type="text"
                       value={description}
                       onChange={event => setDescription(event.target.value)}
                       placeholder={'desc'}/>
            </div>
            <div className="spend_form">
                <input type="number"
                       value={money}
                       onChange={event => setMoney(event.target.value)}
                       placeholder={'0.00'}/>
            </div>
            <button type="submit">Add New Transaction</button>
        </form>
        <div className="transactions">
            <div className="transaction">
                <div className="left">
                    <div className="desc">Description</div>
                    <div className="refcode">Refcode</div>
                </div>
                <div className="right">
                    <div className="spend green">+฿100</div>
                    <div className="datetime_trans">2023-07-27</div>
                </div>
            </div>
            <div className="transaction">
                <div className="left">
                    <div className="desc">Description</div>
                    <div className="refcode">Refcode</div>
                </div>
                <div className="right">
                    <div className="spend red">-฿100</div>
                    <div className="datetime_trans">2023-07-27</div>
                </div>
            </div>
        </div>
    </main>
  );
}

export default App;
