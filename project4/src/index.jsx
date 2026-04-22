"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = require("react-dom/client");
class TableState {
    constructor() {
        this.nClicks = 0;
    }
}
class MyTable extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = new TableState();
        this.addClick = this.addClick.bind(this);
    }
    render() {
        var _a;
        const children = react_1.default.Children.toArray(this.props.children);
        const result = [];
        const nChildren = (_a = this.props.maxItems) !== null && _a !== void 0 ? _a : children.length;
        for (let child = 0; child < Math.min(nChildren, children.length); child++) {
            result.push(children[child]);
        }
        result.push(<li>You have clicked {this.state.nClicks} times.</li>);
        return <ul onClick={this.addClick}>{result}</ul>;
    }
    addClick() {
        let newState = new TableState();
        newState.nClicks = this.state.nClicks + 1;
        this.setState(newState);
    }
}
function Square({ value }) {
    function handleClick() {
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        return <button className="square" style={{ color: "blue" }}>{value}</button>;
    }
    return <button className="square">{value}</button>;
}
class SquareState {
    constructor() {
        this.selected = false;
    }
}
class Board extends react_1.Component {
    render() {
        return (<div>

            <p>Welcome to the Roulette table!</p>

            <div className="board-row">
                <Square value="3"/>
                <Square value="6"/>
                <Square value="9"/>
                <Square value="12"/>
                <Square value="15"/>
                <Square value="18"/>
                <Square value="21"/>
                <Square value="24"/>
                <Square value="27"/>
                <Square value="30"/>
                <Square value="33"/>
                <Square value="36"/>
            </div>
            <div className="board-row">
                <Square value="2"/>
                <Square value="5"/>
                <Square value="8"/>
                <Square value="11"/>
                <Square value="14"/>
                <Square value="17"/>
                <Square value="20"/>
                <Square value="23"/>
                <Square value="26"/>
                <Square value="29"/>
                <Square value="32"/>
                <Square value="35"/>
            </div>
            <div className="board-row">
                <Square value="1"/>
                <Square value="4"/>
                <Square value="7"/>
                <Square value="10"/>
                <Square value="13"/>
                <Square value="16"/>
                <Square value="19"/>
                <Square value="22"/>
                <Square value="25"/>
                <Square value="28"/>
                <Square value="31"/>
                <Square value="34"/>
            </div>
        </div>);
    }
}
class RouletteTable extends react_1.Component {
    render() {
        return (<div>
            <p>Welcome to the Roulette table!</p>

            <MyTable maxItems={3}>
            <div className="board-row">
                <button className="square">3</button>
                <button className="square">6</button>
                <button className="square">9</button>
                <button className="square">12</button>
                <button className="square">15</button>
                <button className="square">18</button>
                <button className="square">21</button>
                <button className="square">24</button>
                <button className="square">27</button>
                <button className="square">30</button>
                <button className="square">33</button>
                <button className="square">36</button>
            </div>
            <div className="board-row">
                <button className="square">2</button>
                <button className="square">5</button>
                <button className="square">8</button>
                <button className="square">11</button>
                <button className="square">14</button>
                <button className="square">17</button>
                <button className="square">20</button>
                <button className="square">23</button>
                <button className="square">26</button>
                <button className="square">29</button>
                <button className="square">32</button>
                <button className="square">35</button>
            </div>
            <div className="board-row">
                <button className="square">1</button>
                <button className="square">4</button>
                <button className="square">7</button>
                <button className="square">10</button>
                <button className="square">13</button>
                <button className="square">16</button>
                <button className="square">19</button>
                <button className="square">22</button>
                <button className="square">25</button>
                <button className="square">28</button>
                <button className="square">31</button>
                <button className="square">34</button>
            </div>
            </MyTable>
        </div>);
    }
}
const rootElem = document.getElementById('root');
if (rootElem == null) {
    alert('you forgot to put a root element in your HTML file.');
}
const root = (0, client_1.createRoot)(rootElem);
root.render(<react_1.StrictMode>
        <Board />
    </react_1.StrictMode>);
