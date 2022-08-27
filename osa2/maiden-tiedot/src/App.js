import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled", response.data);
      setCountries(response.data);
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setNewFilter(e.target.value)
  };

  return (
    <div>
      <div>
        find countries
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      {loading || filteredCountries.length===0 ? null :<Countries countries={newFilter !== "" ? filteredCountries : countries} /> }
      
    </div>
  );
};

export default App;
