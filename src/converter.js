import React, { useEffect, useState } from "react";
const { currencies, convert } = require('exchange-rates-api');

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();

export default function Converter() {
    const [curr, setCurr] = useState([])
    const [input, setInput] = useState("")
    const [result, setResult] = useState("")
    const [inputCurr, setInputCurr] = useState("")
    const [targetCurr, setTargetCurr] = useState("")
    
    useEffect(() => {
        console.log("changed detected")
        let currency = Object.keys(currencies)
        let priorityCurr = currency.filter(el => { return el === "KRW" || el === "EUR" || el === "USD"})
        let restCurr =currency.filter(el => { return el !== priorityCurr.includes(el)})
        let currencyOptions = [...priorityCurr, "--", ...restCurr];
        setCurr(currencyOptions);
        setInputCurr(currencyOptions[0]);
        setTargetCurr(currencyOptions[1]);
    }, [])

    function convertCurrency() {
        const converted = async () => {
            let convertedAmount = await convert(parseInt(input), inputCurr, targetCurr, `${year}-${month}-${date}`);
            setResult(convertedAmount.toFixed(2).toString())
        }
        converted();
    }

    function inputHanlder(e) {
        setInput(e.target.value)
    }

    function inputCurrHandler(e) {
        e.preventDefault();
        setInputCurr(e.target.value)
    }

    function targetCurrHandler(e) {
        e.preventDefault();
        setTargetCurr(e.target.value)
    }

    function exchangeCurr() {
        setInputCurr(targetCurr)
        setTargetCurr(inputCurr)
    }

    return (
        <div className="converter-container">
            <div id="input-amount" className="part-divider">
                <span className="label">Amount: </span>
                <input className="input-value" onChange={inputHanlder} />
            </div>
            <div id="currency" className="part-divider">
                <select id="input-currency" value={inputCurr} onChange={inputCurrHandler}>
                    {
                        curr.map((inputCurr, index) => {
                            return <option 
                                        key={index} 
                                        value={inputCurr}
                                    >
                                        {inputCurr}
                                    </option>
                        })
                    }
                </select>
                <button className="exchange-currencies" onClick={exchangeCurr}>
                    <i className="fas fa-exchange-alt"></i>
                </button>
                <select id="target-currency" value={targetCurr} onChange={targetCurrHandler}>
                    {
                        curr.map((targetCurr, index) => {
                            return <option 
                                        key={index} 
                                        value={targetCurr}
                                    >
                                        {targetCurr}
                                    </option>
                        })
                    }
                </select>
            </div>
            <div className="output-display part-divider">{result}</div>
            <button 
                className="convert part-divider" 
                onClick={convertCurrency}
            >
                Convert
            </button>
        </div>
    )
}
