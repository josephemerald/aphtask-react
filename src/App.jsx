import { useState, useEffect} from 'react'
import TaskCard from './components/TaskCard'
import AddTask from './components/AddTask'
import TaskFilter from './components/TaskFilter'
import Stats from './components/Stats'
import SearchTerm from './components/SearchTerm'
import Sorting from './components/Sorting'
import './App.css'

function isValidDeadline(deadline) {
  if (typeof deadline !== 'string') {
    return false;
  }

  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
   
  if(!datePattern.test(deadline)) {
    return false;
  }

  const [year, month, day] = deadline.split('-').map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function App() {
  const dateToday = getLocalDate(); // get today's date
  const [taskTitle, setTaskTitle] = useState('');// state for title
  const [taskDescription, setTaskDescription] = useState(''); // state for description
  const [taskPriority, setTaskPriority] = useState('Low'); // state for priority
  const [taskDeadline, setTaskDeadline] = useState(dateToday); // state for deadline

  const [taskError, setTaskError] = useState(''); // state for error
  const [taskEdit, setTaskEdit] = useState(null); // state for edit task
  const [activeFilter, setActiveFilter] = useState('all'); // state for active filter
  const [searchTerm, setSearchTerm] = useState(''); // state for search term
  const [sortOption, setSortOption] = useState('none'); // state for sorting option

 

  const [tasks, setTasks] = useState(() => {
    let savedTasks;

    //safely read local storage
    try {
      savedTasks = localStorage.getItem('tasks');
    } catch (error) {
      console.error('Unable to read saved tasks');
      return[];
    }

    // check whether saved data exists 

    if(savedTasks !== null) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
          return [];
        }

        // validate every task 

        const validTasks = parsedTasks.every((task) => 
        task !== null && 
        typeof task === 'object' && 
        !Array.isArray(task) &&
        typeof task.id === 'number' &&
        task.id > 0 && 
        Number.isInteger(task.id) &&
        Number.isSafeInteger(task.id) &&
        Number.isFinite(task.id) &&
        typeof task.title === 'string' &&
        task.title.trim() !== '' &&
        typeof task.description === 'string' &&
        task.description.trim() !== '' &&
        typeof task.priority === 'string' &&
        task.priority.trim() !== '' &&
        ['Low', 'Medium', 'High'].includes(task.priority) &&
        isValidDeadline(task.deadline) &&
        typeof task.completed === 'boolean'
        );

        const uniqueIds = new Set(parsedTasks.map((task) => task.id)).size
        === parsedTasks.length;
        // existing validation 

        if (validTasks && uniqueIds) {
          return parsedTasks;
        }

        return [];

        
      } catch (error) {
        console.error('Unable to parse saved tasks:', error);
        return [];
      }}

    return [
      {
         id: 1,
         title: 'Task 1',
         description: 'This is the first task',
         priority: 'High',
         deadline: dateToday,
         completed: false
      },
    ];
  });

  const toggleCompleted = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed
          };
        }

        return task;
      }))
  }

  const deleteTask = (id) => {
      setTasks((previousTasks) => 
      previousTasks.filter((task) => task.id !== id)
    );
  }

  const cancelEdit = () => {
    setTaskEdit(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('Low');
    setTaskError('');
    setTaskDeadline(dateToday);
  }

  const editTask = (task) => {
    setTaskEdit(task);
    setTaskTitle(task.title.trim().replace(/\s+/g, ' ')); // remove multiple spaces
    setTaskDescription(task.description.trim().replace(/\s+/g, ' ')); // remove multiple spaces
    setTaskPriority(task.priority);
    setTaskDeadline(task.deadline);
  }


  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Unable to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault(); // prevent form submission from reloading
    
    setTaskError(''); // reset error state

    if(taskTitle.trim() === "" && taskDescription.trim() === ""){
      setTaskError('Title and Description are required');
      return;
    }

    if(taskTitle.trim() === ""){
      setTaskError('Title is required');
      return;
    }

    if(taskDescription.trim() === ""){
      setTaskError('Description is required');
      return;
    }


    if(taskEdit){
      setTasks((previousTasks) => 
        previousTasks.map((task) => {
        if(task.id === taskEdit.id){
          return {
            ...task,
            title: taskTitle.trim().replace(/\s+/g, ' '), // remove multiple spaces
            description: taskDescription.trim().replace(/\s+/g, ' '), // remove multiple spaces  
            priority: taskPriority,
            deadline: taskDeadline
          };
        };
        return task;
      }));

      setTaskEdit(null);
      setTaskTitle('');
      setTaskDescription('');
      setTaskPriority('Low');
      setTaskDeadline(dateToday);
    }else {

    setTasks((previousTasks) => [
      ...previousTasks, {
      id: Date.now(),
      title: taskTitle.replace(/\s+/g, ' '), // remove multiple spaces
      description: taskDescription.replace(/\s+/g, ' '), // remove multiple spaces  
      priority: taskPriority,
      deadline: taskDeadline,
      completed: false

    }]);

    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('Low');
    setTaskDeadline(dateToday);
    
   }

  } // end of add task function


  // Filter tasks based on active filter 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed);
  const importantTasks = tasks.filter((task) => task.priority === 'High');
  const todayTasks = tasks.filter((task) => task.deadline === dateToday);
  const filteredTasks = activeFilter === 'all' ? tasks : activeFilter === 'completed' ? completedTasks : activeFilter === 'important' ? importantTasks : todayTasks;

  const displayedTasks = filteredTasks.filter((task) => {
    const title = (task?.title ?? '').trim().toLowerCase().replace(/\s+/g, ' '); // remove multiple spaces;
    const description = (task?.description ?? '').trim().toLowerCase().replace(/\s+/g, ' '); // remove multiple spaces;
    const search = searchTerm.trim().toLowerCase().replace(/\s+/g, ' '); // remove multiple spaces;

    return title.includes(search) || description.includes(search);
  });

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1
  };

   const dateDesc = (a, b) => {
    return new Date(b.deadline) - new Date(a.deadline);
   };

   const dateAsc = (a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
   };

   const priorityDesc = (a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
   }

   const sortedTasks = [...displayedTasks].sort((a, b) => {
    if(sortOption === 'dateDesc'){
      return dateDesc(a, b);
    } else if (sortOption === 'dateAsc'){
      return dateAsc(a, b);
    } else if (sortOption === 'priorityDesc'){
      return priorityDesc(a , b);
    } else {
      return 0;
    }
   })

  return (
 

     <main className="app-container">

      <div>
        <Stats totalTasks={totalTasks} completedTasks={completedTasks.length} importantTasks={importantTasks.length} />
      </div>

      <div>
        <SearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div>
        <Sorting sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      
      <div className="d-flex justify-content-center">
         <TaskFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      </div>

      <div className="task-layout">

      <section className="task-list-section">
      <div className="task-list-grid">
       {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} editTask={editTask} toggleCompleted={toggleCompleted} deleteTask={deleteTask}/>
      )) 
    ) : (
      <h4 className="text-muted w-100 text-align-center m-2"> <small>No Tasks Found</small></h4>
    )
    }
      </div>
      </section>

      <section className="task-form-section">
      <div className="d-flex justify-content-center">
        <AddTask addTask={addTask} taskEdit={taskEdit} cancelEdit={cancelEdit}taskError={taskError} taskTitle={taskTitle} taskDeadline={taskDeadline}taskDescription={taskDescription} taskPriority={taskPriority} setTaskTitle={setTaskTitle} setTaskDescription={setTaskDescription} setTaskPriority={setTaskPriority} setTaskDeadline={setTaskDeadline} />
      </div>
      </section>

      </div>

      </main>

  
  )
}

export default App
