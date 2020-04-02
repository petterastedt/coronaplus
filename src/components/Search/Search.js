import React from 'react'

const Search = props => {
  const handleOnChange = (e) => {
		e.preventDefault()
		props.searchFilter(e.target.value)
  }

  return (
    <div className="search">
      <input
        className="search-field"
        placeholder="Search country.."
        onChange={(e) => handleOnChange(e)}
        autoComplete="off"
      />
    </div>
  )
}

export default Search
