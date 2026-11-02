function Stats({ totalTasks, completedTasks, importantTasks}){
    return (
        <section className="container my-3" aria-labelledby="stats-heading">
           <h4 className="text-center my-3" id="stats-heading">Stats</h4>
           <div className="d-flex gap-3 flex-wrap justify-content-center">
            <div className="card p-3 text-center stats-card">
                <h5>Total Tasks:</h5> 
                <span className="badge bg-primary mt-2">{totalTasks}</span>
                
            </div>
            
           
            <div className="card p-3 text-center stats-card">
                <h5>Completed Tasks:</h5> 
                <span className="badge bg-success mt-2">{completedTasks}</span></div>
            
            
           
            <div className="card p-3 text-center stats-card">
                <h5>Important Tasks:</h5> 
                <span className="badge bg-danger mt-2">{importantTasks}</span></div>
         
         </div>
        </section>
    )
}



export default Stats