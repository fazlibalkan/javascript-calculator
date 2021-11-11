
function App() {

    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState(expression);


    function display (symbol) {
        //setExpression(prev => prev + symbol);
        //setAnswer(prev => prev + symbol);

        setExpression( (prevValue) => {
            //if there is an operator on the written text
            if (/[+*-/]/.test(symbol) && /[+*-/]/.test(prevValue[prevValue.length - 1])) {
                let newValue;

                if (/[-]/.test(symbol)) {
                    newValue = prevValue.slice(0, prevValue.length) + symbol;
                } else {
                    let count = 0;
                    for (let i = 0; i < prevValue.length; i++) {
                        if (isNaN(+prevValue[i])) {
                            count++;
                        } else {
                            count = 0;
                        }
                    }
                    newValue = prevValue.slice(0, prevValue.length - count) + symbol; 
                }
                setExpression(newValue);
            } else {
                if (prevValue) {
                    prevValue = prevValue + "";
                let valArr = prevValue.split(/[+*/-]/g);
                    let lastNum = valArr[valArr.length - 1];
                    if (!isNaN(lastNum) && /[.]/.test(lastNum) && symbol === ".") {
                        symbol = "";
                    }
                }
                setExpression((prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, "."));
            }
        });

        setAnswer((prevValue) => (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, "."));
    }

    const calculate = () => {
        
        setExpression(eval(expression));
        setAnswer(eval(expression));
    };

    const allClear = () => {
        setExpression("");
        setAnswer(0);
    };
    

    return (
        <div className="container">
            <div className="grid">
                <div className="dis" id="display">
                <input class="expression" disabled placeholder="0" value={expression} ></input>
                <div className="answer" >{answer}</div>
                </div>
                <div onClick={allClear} className="padButton AC red" id="clear">AC</div>
                <div onClick={() => display("/")} className="padButton div" id="divide">/</div>
                <div onClick={() => display("*")} className="padButton times" id="multiply">x</div>
                <div onClick={() => display("7")} className="padButton seven dark-grey" id="seven">7</div>
                <div onClick={() => display("8")} className="padButton eight dark-grey" id="eight">8</div>
                <div onClick={() => display("9")} className="padButton nine dark-grey" id="nine">9</div>
                <div onClick={() => display("-")} className="padButton minus" id="subtract">-</div>
                <div onClick={() => display("4")} className="padButton four dark-grey" id="four">4</div>
                <div onClick={() => display("5")} className="padButton five dark-grey" id="five">5</div>
                <div onClick={() => display("6")} className="padButton six dark-grey" id="six">6</div>
                <div onClick={() => display("+")} className="padButton plus" id="add">+</div>
                <div onClick={() => display("1")} className="padButton one dark-grey" id="one">1</div>
                <div onClick={() => display("2")} className="padButton two dark-grey" id="two">2</div>
                <div onClick={() => display("3")} className="padButton three dark-grey" id="three">3</div>
                <div onClick={calculate} className="padButton equal blue" id="equals">=</div>
                <div onClick={() => display("0")} className="padButton zero dark-grey" id="zero">0</div>
                <div onClick={() => display(".")} className="padButton dot" id="decimal">.</div>
            </div>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById("root"));