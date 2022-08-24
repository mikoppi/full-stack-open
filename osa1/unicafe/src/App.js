import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ text, value }) => (
  <div>
    <p>
      {text} {value}
    </p>
  </div>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h1>statistics</h1>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text="good" value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text="neutral" value={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text="bad" value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text="all" value={good + neutral + bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine
                text="average"
                value={(good + bad * -1) / (good + neutral + bad)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine
                text="positive"
                value={(good / (good + neutral + bad)) * 100 + " %"}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h1>give feedback</h1>
            </td>
          </tr>
          <tr>
            <td>
              <Button handleClick={() => setGood(good + 1)} text="good" />
              <Button
                handleClick={() => setNeutral(neutral + 1)}
                text="neutral"
              />
              <Button handleClick={() => setBad(bad + 1)} text="bad" />
            </td>
          </tr>
          <tr>
            <td>
              <Statistics good={good} neutral={neutral} bad={bad} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
