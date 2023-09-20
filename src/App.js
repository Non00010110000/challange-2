import { GiButtonFinger } from "react-icons/gi";
import { useForm } from "react-hook-form";
import "./App.css";
import { useState } from "react";

function App() {
  const { register, handleSub } = useForm();
  const [dayInputValue, setDayInputValue] = useState("");
  const [monthInputValue, setMonthInputValue] = useState("");
  const [yearInputValue, setYearInputValue] = useState("");
  const [dayErrorMessage, setDayErrorMessage] = useState("");
  const [monthErrorMessage, setMonthErrorMessage] = useState("");
  const [yearErrorMessage, setYearErrorMessage] = useState("");
  const [ageYears, setAgeYears] = useState("--");
  const [ageMonths, setAgeMonths] = useState("--");
  const [ageDays, setAgeDays] = useState("--");

  const calculateAge = () => {
    const today = new Date();
    const selectedDate = new Date(yearInputValue, monthInputValue - 1, dayInputValue);
  
    let ageYears = today.getFullYear() - yearInputValue;
    let ageMonths = today.getMonth() - monthInputValue;
    let ageDays = today.getDate() - dayInputValue;
  
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }
  
    if (ageDays < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      ageDays += lastMonth.getDate();
      ageMonths--;
    }
  
    setAgeYears(ageYears);
    setAgeMonths(ageMonths);
    setAgeDays(ageDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dayInputValue === "") {
      setDayErrorMessage("This field is required");
    } else {
      setDayErrorMessage("");
    }

    if (monthInputValue === "") {
      setMonthErrorMessage("This field is required");
    } else {
      setMonthErrorMessage("");
    }

    if (yearInputValue === "") {
      setYearErrorMessage("This field is required");
    } else {
      setYearErrorMessage("");
    }
    
    calculateAge();
  };
  
  return (
    <div className="main">
      <div className="history">
        <h6 className={`h6 ${dayErrorMessage && "-err"}`}> DAY</h6>
        <h6 className={`h6 ${monthErrorMessage && "-err"}`}>MONTH</h6>
        <h6 className={`h6 ${yearErrorMessage && "-err"}`}>YEAR</h6>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            max={30}
            min={1}
            className={`i ${dayErrorMessage !== "" ? "error" : ""}`}
            placeholder="DD"
            value={dayInputValue}
            onChange={(e) => setDayInputValue(e.target.value)}
            type="number"
          />
          {dayErrorMessage && <p className="error-msg">{dayErrorMessage}</p>}

          <input
            max={12}
            min={1}
            className={`i ${monthErrorMessage !== "" ? "error" : ""}`}
            placeholder="MM"
            value={monthInputValue}
            onChange={(e) => setMonthInputValue(e.target.value)}
            type="number"
          />
          {monthErrorMessage && (
            <p className="error-msg">{monthErrorMessage}</p>
          )}

          <input
            max={2003}
            min={1950}
            className={`i ${yearErrorMessage !== "" ? "error" : ""}`}
            placeholder="YYYY"
            value={yearInputValue}
            onChange={(e) => setYearInputValue(e.target.value)}
            type="number"
          />
          {yearErrorMessage && (
            <p className="error-msg">{yearErrorMessage}</p>
          )}

          <button type="submit" className="circle-button">
            <GiButtonFinger />
          </button>
        </form>
        <hr></hr>
      </div>
      <div className="details">
        <h1>
          <i>{ageYears}</i> years
        </h1>
        <h1>
          <i>{ageMonths}</i> months
        </h1>
        <h1>
          <i>{ageDays}</i> days
        </h1>
      </div>
    </div>
  );
}

export default App;