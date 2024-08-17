import React, { useEffect, useState } from "react";

export default function TestCurrency() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [currencyRate, setCurrencyRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  console.log("From Currency: ", fromCurrency);
  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * currencyRate;
  } else {
    toAmount = amount;
    fromAmount = amount / currencyRate;
  }
  const fetchCurrency = async () => {
    const response = await fetch("https://api.frankfurter.app/latest?");
    const data = await response.json();
    // const data = await JSON.parse(responseJson)
    setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
    setFromCurrency(data.base);
    setToCurrency(Object.keys(data.rates)[0]);
    setCurrencyRate(Object.values(data.rates)[0]);
    console.log("Currency List: ", data);
  };

  const fetchExchangeRate = async () => {
    const response = await fetch(
      `https://api.frankfurter.app/latest?base=${fromCurrency}&to=${toCurrency}`
    );
    const data = await response.json();
    setCurrencyRate(Object.values(data.rates));
    console.log("Currency Rate: ", data);
  };
  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleFromCurrency = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToCurrency = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <>
      <div style={{ background: "#333", width: "80%", padding: 50, borderRadius: 10, boxShadow: '6px 10px 10px #000'}}>
        <h3 style={{ fontWeight: "bold", fontSize: 22 }}>Currencyt Exchange</h3>
        <div style={{marginBottom: 10}}>
          <input
            type="number"
            value={fromAmount}
            onChange={handleFromCurrency}
            style={{borderWidth: 2, borderColor: 'royalblue', backgroundColor: '#fff', color: '#000', padding: 10, borderRadius: 10}}
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            style={{marginLeft: 10, padding: 10, borderRadius: 10, backgroundColor: 'royalblue'}}
          >
            {currencyOptions.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <input type="number" value={toAmount} onChange={handleToCurrency} style={{borderWidth: 2, borderColor: 'royalblue', backgroundColor: '#fff', color: '#000', padding: 10, borderRadius: 10}}/>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            style={{marginLeft: 10, padding: 10, borderRadius: 10, backgroundColor: 'royalblue'}}
          >
            {currencyOptions.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
