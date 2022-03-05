import React from "react";

const ShortCountryInfo = ({ country, handleCountryClick }) => {
    return (
        <>
        <p>{country.name.common} <button onClick={() => handleCountryClick(country.name.common)}>Show</button></p>
        </>
    )
}

export default ShortCountryInfo

