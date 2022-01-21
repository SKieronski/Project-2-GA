import React from "react";

const SearchForm = ({handleSubmit}) => {

    return(
        <form className="Form-search" onSubmit={handleSubmit}>
            <label htmlFor="queryType">Search By:</label>
            <select className="Form-select" id="queryType">
                <option value="performer">Performer</option>
                <option value="city">City</option>
            </select>
            <label htmlFor="searchString">Search:</label>
            <input 
                type="search"
                id="searchString"
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SearchForm;