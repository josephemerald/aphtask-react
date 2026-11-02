function TaskCard({task, editTask, toggleCompleted, deleteTask}){
    return (
       <div className="card p-4 task-card">
           <hr></hr>
           <div className="card-body text-start">
             <h5 className={task.completed ? "text-decoration-line-through" : "text-primary"}>Title: {task.title}</h5>
             <p className="card-text">Description: {task.description}</p>
             <p className="card-text">Priority: {task.priority}</p>
             <p className="card-text">Deadline: {task.deadline}</p>
             {task.completed ? <p className="text-success">Status: Completed</p> : <p className="text-danger">Status: Not Completed</p>}
             <button 
             aria-label={task.completed ? 
                `Mark ${task.title} as not completed`
                :
                `Mark ${task.title} as completed`
             }
             className={task.completed ? 
             "btn btn-sm btn-danger w-100 mt-3" 
             : 
             "btn btn-sm btn-success w-100 mt-3"} 
             onClick={() => toggleCompleted(task.id)}
             > 
                {task.completed ? "Mark as not Completed" : "Mark as Completed"}
                </button>
             <button className="btn btn-sm btn-warning w-100 mt-2" onClick={() => editTask(task)}> Edit Tasks</button>
             <button className="btn btn-sm btn-danger w-100 mt-2" onClick={() => deleteTask(task.id)}> Delete Tasks</button>
           </div>
       </div>
    )
}


export default TaskCard