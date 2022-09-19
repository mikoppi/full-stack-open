import React from "react";
import { placeFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
 
  const handleChange = (event) => {
    const value = event.target.value;
    props.placeFilter(value);
  };

  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      <form>
        <label>
          filter
          <input onChange={handleChange} type="text" name="filter" />
        </label>
      </form>
    </div>
  );
};

const connectedFilter = connect(null, { placeFilter })(Filter);
export default connectedFilter;
