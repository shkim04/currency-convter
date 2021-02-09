import React, { useEffect, useState } from "react";
const { currencies, convert } = require('exchange-rates-api');

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();

let currency = Object.keys(currencies)
let priorityCurr = currency.filter(el => { return el === "KRW" || el === "EUR" || el === "USD"})
let restCurr = currency.filter(el => { return el !== priorityCurr.includes(el)})
let currencyOptions = [...priorityCurr, "-------", ...restCurr];

export default function Converter() {
    const [curr, setCurr] = useState(currencyOptions)
    const [amount, setAmount] = useState("1")
    const [result, setResult] = useState("")
    const [fromCurr, setFromCurr] = useState(currencyOptions[0])
    const [toCurr, setToCurr] = useState(currencyOptions[1])
    
    console.log(amount, fromCurr, toCurr);

    useEffect(async() => {
        try {
            let convertedAmount = await convert(parseInt(amount), fromCurr, toCurr, `${year}-${month}-${date}`);
            if(amount === "") {
                setResult("")
            } else {
                setResult(convertedAmount.toFixed(2).toString())
            }
        }
        catch(error) {
            console.log(error)
        }
    }, [amount, fromCurr, toCurr])

    function amountHanlder(e) {
        setAmount(e.target.value)
    }

    function fromCurrHandler(e) {
        e.preventDefault();
        setFromCurr(e.target.value)
    }

    function toCurrHandler(e) {
        e.preventDefault();
        setToCurr(e.target.value)
    }

    function exchangeCurr() {
        setFromCurr(toCurr)
        setToCurr(fromCurr)
    }

    return (
        <div className="converter-container">
            <div id="input-amount" className="part-divider">
                <span className="label">Amount: </span>
                <input className="input-value" value={amount} onChange={amountHanlder} />
            </div>
            <div id="currency" className="part-divider">
                <select id="from-currency" value={fromCurr} onChange={fromCurrHandler}>
                    {
                        curr.map((fromCurr, index) => {
                            return <option 
                                        key={index} 
                                        value={fromCurr}
                                    >
                                        {fromCurr}
                                    </option>
                        })
                    }
                </select>
                <button className="exchange-currencies" onClick={exchangeCurr}>
                    <i className="fas fa-exchange-alt"></i>
                </button>
                <select id="to-currency" value={toCurr} onChange={toCurrHandler}>
                    {
                        curr.map((toCurr, index) => {
                            return <option 
                                        key={index} 
                                        value={toCurr}
                                    >
                                        {toCurr}
                                    </option>
                        })
                    }
                </select>
            </div>
            <div className="output-display part-divider">{result}</div>
        </div>
    )
}
