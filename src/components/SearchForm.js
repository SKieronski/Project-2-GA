import React from "react";

const SearchForm = ({handleSubmit, handleChange, formState}) => {

    return(
        <form className="Form-search" onSubmit={handleSubmit}>
            <label htmlFor="queryType">Search By:</label>
            <select className="Form-select" id="queryType" onChange={handleChange} value={formState.queryType}>
                <option value="">Choose from below</option> 
                <option value="performer">Performer</option>
                <option value="city">City</option>
                required
            </select>
            <label htmlFor="searchString">Search:</label>
            <input 
                type="search"
                id="searchString"
                onChange={handleChange}
                value={formState.searchString}
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SearchForm;