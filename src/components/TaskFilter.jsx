function TaskFilter({activeFilter, setActiveFilter}){
 
    const filters = [
        { value: 'all', label: 'All' },
        { value: 'completed', label: 'Completed Tasks' },
        { value: 'important', label: 'Important Tasks' },
        { value: 'today', label: 'Tasks Today'}
    ];
    
    return (
        <div className="task-filter" role="group"aria-label="Filter Tasks">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    type="button"
                    className={activeFilter === filter.value ? 'btn btn-primary'
                    : 'btn btn-secondary' }
                    aria-pressed={activeFilter === filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    >
                        {filter.label}
                    </button>
            ))}
        </div>
    )
}


export default TaskFilter;