// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");

  const [output, setOutput] = useState("");

  function handleAmountChange(e) {
    setAmount(Number(e.target.value));
  }

  function handleConvertFrom(e) {
    setConvertFrom(e.target.value);
  }

  function handleConvertTo(e) {
    setConvertTo(e.target.value);
  }

  useEffect(
    function () {
      async function convertAmount() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`
        );

        const data = await res.json();

        // console.log(data.rates[convertTo]);
        setOutput(JSON.stringify(data.rates[convertTo]));
      }

      if (convertFrom === convertTo) return setOutput(amount);

      convertAmount();
    },
    [amount, convertFrom, convertTo]
  );

  return (
    <div className="app">
      <div className="amt">
        <label>Enter Amount</label>
        <input type="text" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="convert">
        <select value={convertFrom} onChange={handleConvertFrom}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={convertTo} onChange={handleConvertTo}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>
        {output} {convertTo}
      </p>
    </div>
  );
}
