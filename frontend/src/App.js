import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main>
      <h1>Money Management</h1>
        <h1>฿400<span>.00</span></h1>
        <form>
            <div className="datetime_form">
                <input type="datetime-local"/>
            </div>
            <div className="description_form">
                <select>
                    <option value="inc">inc</option>
                    <option value="exp-001">exp-001</option>
                    <option value="exp-002">exp-002</option>
                    <option value="exp-003">exp-003</option>
                    <option value="exp-004">exp-004</option>
                </select>
                <input type="text" placeholder={'desc'}/>
            </div>
            <div className="spend_form">
                <input type="text" placeholder={'0.00'}/>
            </div>
            <button type="submit">Add New Transaction</button>
        </form>
        <div className="transactions">
            <div className="transaction">
                <div className="left">
                    <div className="refcode">Refcode</div>
                    <div className="desc">Description</div>
                </div>
                <div className="right">
                    <div className="spend green">+฿100</div>
                    <div className="datetime_trans">2023-07-27</div>
                </div>
            </div>
            <div className="transaction">
                <div className="left">
                    <div className="refcode">Refcode</div>
                    <div className="desc">Description</div>
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
