import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries }) => {
  const [showCountry, setShowCountry] = useState([]);

  const handleClick = (country) => {
    setShowCountry(showCountry.concat(country));
  };
  return (
    <div>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length <= 10 && countries.length > 1 && showCountry.length===0? (
        <>
          {countries.map((country) => (
            <div key={country.area}>
              <p key={country.name.common}>{country.name.common}</p>
              <button key={country.area} onClick={() => handleClick(country)}>
                show
              </button>
            </div>
          ))}
        </>
      ) : (
        <CountryInfo
          country={showCountry.length === 1 ? showCountry[0] : countries[0]}
        />
      )}
    </div>
  );
};

export default Countries;
