import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [datetime, setDatetime] = useState('')
    const [description, setDescription] = useState('')
    const [transactions, setTransactions] = useState('')

    async function getTransactions(){
        const url = process.env.REACT_APP_API_URL+'transactions'
        const response = await fetch(url)
        return await response.json()
    }
    useEffect(() => {
        getTransactions().then(transactions => {
            setTransactions(transactions)
        })
    }, []);

    const sel_refcode = [
        {value:'', text:''},
        {value:'inc', text:'inc'},
        {value:'exp-001', text:'exp-001'},
        {value:'exp-002', text:'exp-002'},
        {value:'exp-003', text:'exp-003'},
        {value:'exp-004', text:'exp-004'}
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

    let balance = 0
    for(const transaction of transactions){
        if(transaction.refcode === "inc"){
            balance += transaction.money
        }else{
            balance -= transaction.money
        }
    }

    balance = balance.toFixed(2)

  return (
    <main>
      <h1>Money Management</h1>
        <h1>฿{balance}</h1>
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
            {transactions.length > 0 && transactions.map(transaction => (
                <div className="transaction">
                    <div className="left">
                        <div className="desc">{transaction.description}</div>
                        <div className="refcode">{transaction.refcode}</div>
                    </div>
                    <div className="right">
                        <div className={"spend "+(transaction.refcode === "inc"?'green':'red')}>{(transaction.refcode === "inc"?'+':'-')+transaction.money}</div>
                        <div className="datetime_trans">{transaction.datetime}</div>
                    </div>
                </div>
            ))}

        </div>
    </main>
  );
}

export default App;
