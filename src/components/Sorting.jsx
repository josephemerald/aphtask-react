function Sorting({ sortOption, setSortOption}){
    return (
    <div className="container mt-3 mb-3 sorting-container">
        <label htmlFor="task-sorting" className="form-label">
            Sort tasks
        </label>
        <select id="task-sorting"className="form-select w-50 m-auto" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="none">Sort by</option>
            <option value="dateDesc">Date Descending</option>
            <option value="dateAsc">Date Ascending</option>
            <option value="priorityDesc">Priority Descending</option>
        </select>
    </div>
    );
}


export default Sorting;