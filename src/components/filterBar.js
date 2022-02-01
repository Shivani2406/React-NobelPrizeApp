import React, { useState } from "react";

const FilterBar = ({
  categories,
  onCategoryFilter,
  onYearFilter,
  onToYearFilter
}) => {
  const [filters, setFilters] = useState({
    category: "",
    from: "",
    to: "",
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "category":
        onCategoryFilter(value);
        break;
      case "from":
        onYearFilter(value, "from");
        break;
      case "to":
        onToYearFilter(value, "to");
        break;
      default:
        break;
    }
  };

  return (
    <div className="row my-5">
      <div className="col">
        <h5 className="border-bottom">Filters</h5>
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="category">Category</label>
        <select
          className="form-control"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="">Select</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="startYear">From Year</label>
        <input
          type="number"
          className="form-control"
          id="startYear"
          onChange={handleInput("from")}
        />
      </div>
      <div className="col-sm-12 my-2">
        <label htmlFor="endYear">To Year</label>
        <input
          type="number"
          className="form-control"
          id="endYear"
          onChange={handleInput("to")}
        />
      </div>
      
      
    </div>
  );
};

export default FilterBar;