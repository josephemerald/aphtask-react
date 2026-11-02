function SearchTerm({ searchTerm, setSearchTerm}){
    return (
        <div className="container my-3 search-container">
            <label htmlFor="task-search" className="visually-hidden">
                Search Tasks
            </label>
            <input id="task-search"type="text" className="form-control w-50 m-auto" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/> 
            
        </div>
    )
}

export default SearchTerm