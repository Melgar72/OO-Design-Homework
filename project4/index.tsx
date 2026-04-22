import React, { StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { useState } from "react";

interface TableProps {
    maxItems?: number;
    children?: React.JSX.Element | React.JSX.Element[];
}

class TableState {
    nClicks : number = 0;
}

class MyTable extends Component<TableProps, TableState> {
    constructor(props: TableProps) {
        super(props);
        this.state = new TableState();
        this.addClick = this.addClick.bind(this);
    }

    override render(): ReactNode {
        const children = React.Children.toArray(this.props.children);
        const result = []
        const nChildren = this.props.maxItems ?? children.length;
    
        for( let child = 0; child < Math.min(nChildren, children.length); child++ ) {
            result.push( children[child] );
        }

        result.push( <li>You have clicked {this.state.nClicks} times.</li> );

        return <ul onClick={this.addClick}>{result}</ul>
    }

    addClick(): void {
        let newState = new TableState();
        newState.nClicks = this.state.nClicks + 1;
        this.setState( newState );
    }
}

{/* https://www.typescriptlang.org/docs/handbook/jsx.html#value-based-elements */}

const Square2 = (value : {value: number}) => {
    const [selected, setSelected] = useState(Boolean);
    const [style, setStyle] = useState("square");

    const standardStyle = () => {
        if(value.value % 2 > 0){setStyle("redSquare");}   
        else {setStyle("blackSquare");}
    }

    const changeStyle = () => {
        if(style == "selected"){standardStyle();}
        else{setStyle("selected")};
    }

    function handleClick(){
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        
        // changeStyle();

        if(selected == true){
            setSelected(false);
        }
        else if(selected == false){
            setSelected(true);
        }
        
        changeStyle();
        console.log('clicked', value, selected, style);
    }

    if(style == "square"){
        standardStyle();
        return (
        <button 
            className={style}
            onClick={handleClick}
            >
                {value.value}
        </button>
        );
    }
    
    return (
    <button 
        className={style}
        onClick={handleClick}
        >
            {value.value}
    </button>
    );
}

{/** Used prior to function component, value-based element
     Issues with setting type to value

function Square({value}) {

    const [selected, setSelected] = useState(Boolean);

    function handleClick(){
        // toggle boolean : selected
        // set color blue (?)
        // add/remove from list of values to be submitted
        if(selected == true){setSelected(false);}
        else if(selected == false){setSelected(true);}

        console.log('clicked', value, selected);

    }
    return (
    <button 
        className="square"
        onClick={handleClick}
        >
            {value}
        </button>
    );
}

*/}

class SquareState{
    selected : boolean = false;
}

class Board extends Component{
    override render(): ReactNode{
        return(
        <div>

            <p>Welcome to the Roulette table!</p>

            <div className="board-row">
                <Square2 value={3}/>
                <Square2 value={6}/>
                <Square2 value={9}/>
                <Square2 value={12}/>
                <Square2 value={15}/>
                <Square2 value={18}/>
                <Square2 value={21}/>
                <Square2 value={24}/>
                <Square2 value={27}/>
                <Square2 value={30}/>
                <Square2 value={33}/>
                <Square2 value={36}/>
            </div>
            <div className="board-row">
                <Square2 value={2}/>
                <Square2 value={5}/>
                <Square2 value={8}/>
                <Square2 value={11}/>
                <Square2 value={14}/>
                <Square2 value={17}/>
                <Square2 value={20}/>
                <Square2 value={23}/>
                <Square2 value={26}/>
                <Square2 value={29}/>
                <Square2 value={32}/>
                <Square2 value={35}/>
            </div>
            <div className="board-row">
                <Square2 value={1}/>
                <Square2 value={4}/>
                <Square2 value={7}/>
                <Square2 value={10}/>
                <Square2 value={13}/>
                <Square2 value={16}/>
                <Square2 value={19}/>
                <Square2 value={22}/>
                <Square2 value={25}/>
                <Square2 value={28}/>
                <Square2 value={31}/>
                <Square2 value={34}/>
            </div>
        </div>
        );
    }
}


class RouletteTable extends Component {
    override render(): ReactNode {
        return (
        <div>
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
        </div>
        )
    }
}

const rootElem = document.getElementById('root');

if( rootElem == null ) {
    alert('you forgot to put a root element in your HTML file.');
}

const root = createRoot( rootElem as HTMLElement );

root.render(
    <StrictMode>
        <Board/>
    </StrictMode>
);