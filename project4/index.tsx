import React, { StrictMode, Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";

interface MyListProps {
    maxItems?: number;
    children?: React.JSX.Element | React.JSX.Element[];
}

class MyListState {
    nClicks : number = 0;
}

class MyList extends Component<MyListProps, MyListState> {
    constructor(props: MyListProps) {
        super(props);
        this.state = new MyListState();
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
        let newState = new MyListState();
        newState.nClicks = this.state.nClicks + 1;
        this.setState( newState );
    }
}


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


class RouletteTable extends Component {
    override render(): ReactNode {
        return (
        <div>
            <p>Welcome to the Roulette table!</p>

            <MyTable maxItems={36}>
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

            <MyList maxItems={3}>
                <li>one</li>
                <li>two</li>
                <li>three</li>
            </MyList>
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
        <RouletteTable/>
    </StrictMode>
);