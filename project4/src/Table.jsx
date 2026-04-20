"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Table() {
    return (<>
            <div className="boardRow">
                {/*Top row is multiples of 3*/}
                <button className="tableSquare">3</button>;
                <button className="tableSquare">6</button>;
                <button className="tableSquare">9</button>;
                <button className="tableSquare">12</button>;
                <button className="tableSquare">15</button>;
                <button className="tableSquare">18</button>;
                <button className="tableSquare">21</button>;
                <button className="tableSquare">24</button>;
                <button className="tableSquare">27</button>;
                <button className="tableSquare">30</button>;
                <button className="tableSquare">33</button>;
                <button className="tableSquare">36</button>;
            </div>

            <div className="boardRow">
                {/*Middle row is 2 + mult. of 3*/}
                <button className="tableSquare">2</button>;
                <button className="tableSquare">5</button>;
                <button className="tableSquare">8</button>;
                <button className="tableSquare">11</button>;
                <button className="tableSquare">14</button>;
                <button className="tableSquare">17</button>;
                <button className="tableSquare">20</button>;
                <button className="tableSquare">23</button>;
                <button className="tableSquare">26</button>;
                <button className="tableSquare">29</button>;
                <button className="tableSquare">32</button>;
                <button className="tableSquare">35</button>;
            </div>

            <div className="boardRow">
                {/*Bottom row is 1 + mult. of 3*/}
                <button className="tableSquare">1</button>;
                <button className="tableSquare">4</button>;
                <button className="tableSquare">7</button>;
                <button className="tableSquare">10</button>;
                <button className="tableSquare">13</button>;
                <button className="tableSquare">16</button>;
                <button className="tableSquare">19</button>;
                <button className="tableSquare">22</button>;
                <button className="tableSquare">25</button>;
                <button className="tableSquare">28</button>;
                <button className="tableSquare">31</button>;
                <button className="tableSquare">34</button>;
            </div>
        </>);
}
exports.default = Table;
