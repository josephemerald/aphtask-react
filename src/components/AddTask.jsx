function AddTask({addTask, cancelEdit,taskEdit, taskError, taskTitle, taskDescription, taskDeadline, taskPriority, setTaskTitle, setTaskDescription, setTaskPriority, setTaskDeadline}) {
    return (
        <div className="card p-4 m-2 addtask-card">
            <h5 className="card-title">Add Task</h5>
            <form onSubmit={addTask} id="addtask-form">
                <label htmlFor="task-title" className="form-label">
                    Title
                </label>
                <input id="task-title" type="text" className="form-control mb-2" placeholder="Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                <label htmlFor="task-description" className="form-label">
                    Description
                </label>
                <textarea id="task-description" className="form-control mb-2" placeholder="Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} rows={3}/>
                
                <label htmlFor="priority" className="form-label">
                    Priority
                </label>
                <select id="priority" className="form-select mb-2" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label htmlFor="deadline" className="form-label">
                    Deadline
                </label>
                <input id="deadline" type="date" className="form-control mb-2" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
                {taskError && <p className="text-danger" role="alert">{taskError}</p>}
                <button type="submit" className="btn btn-primary mt-2 w-100"> {taskEdit ? 'Update Task' : 'Add Task'}</button>
                {taskEdit && <button type="button" className="btn btn-danger mt-2 w-100" onClick={cancelEdit}>Cancel Edit</button>}
            </form>
        </div>
    )
}


export default AddTask