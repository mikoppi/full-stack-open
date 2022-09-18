import React from "react";
import { useDispatch } from "react-redux";
import { placeFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(placeFilter(value));
  };

  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      <form>
        <label>filter
          <input onChange={handleChange} type="text" name="filter" />
        </label>
      </form>
    </div>
  );
};

export default Filter;
