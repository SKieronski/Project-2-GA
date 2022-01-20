import React from "react";

const SearchForm = () => {

    return(
        <form className="Form-search">
            <input placeholder="Enter an Artist or Location"
                type="text"
                name="searchString"
                required
            />
        </form>
    )
}

export default SearchForm;