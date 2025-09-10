import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Footer from './components/Footer';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleChanged = ()=>{
    setShowFinished(!showFinished)
  }

  const saveToLS = (newToDos) => {
    localStorage.setItem("todos", JSON.stringify(newToDos))
  }

  const handleSave = () => {
    if (todo) {
      const newToDos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newToDos);
      setTodo("");
      saveToLS(newToDos);
    }
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e, itemId) => {
    let t = todos.filter((item) => item.id == itemId)
    setTodo(t[0].todo)
    let newToDos = todos.filter((item) => {
      return item.id != itemId
    })
    setTodos(newToDos)
    saveToLS(newToDos)
  }

  const handleDelete = (e, itemId) => {
    let newToDos = todos.filter((item) => {
      return item.id != itemId
    })
    setTodos(newToDos)
    saveToLS(newToDos)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id == id;
    })
    let newToDos = [...todos]
    newToDos[index]['isCompleted'] = !newToDos[index]['isCompleted']
    setTodos(newToDos)
    saveToLS(newToDos)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-violet-100 mx-auto my-6 p-4 rounded-2xl min-h-100 md:w-1/2 flex-grow">
        {/* add to do text  */}
        <h1 className='m-2 font-bold md:text-3xl text-lg text-center'>iTask – All your todos, all in one place</h1>
        <div>
          <h2 className='md:text-xl text-lg font-bold m-2'>Add a Todo</h2>
        </div>

        {/* input type box and save button  */}
        <div className="flex items-center">
          <input
            type="text"
            className="w-full border rounded-2xl m-2 px-4 py-2 text-xl font-bold bg-white"
            value={todo}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
          <button
            onClick={handleSave}
            className="border p-2 w-20 rounded-2xl bg-blue-700 text-white hover:font-bold hover:text-lg">
            Save
          </button>
        </div>

        {/* Your todos text */}
        <div>
          <input type="checkbox" 
          onChange={toggleChanged}
          checked={showFinished} name="checkbox" id="" className='m-2'/> 
          <label htmlFor="checkbox" className='md:text-xl text-lg'>Show Finished</label>
          <h1 className='md:text-xl text-lg font-bold m-2'>Your Todos</h1>
        </div>
        {/* list of todos to display */}
        {todos.length === 0 && <div className='m-2'>No Todos to Display</div>}
        {todos.map((item) => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className='flex gap-4 m-2'>
            {/* {check box } */}
            <input type="checkbox" checked={item.isCompleted} name={item.id} onChange={handleCheckbox} id="" />
            <div className={`w-full md:text-xl text-lg ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
            {/* edit and delete button  */}
            <div className='flex gap-3 h-full'>
              <button
                onClick={(e) => { handleEdit(e, item.id) }}
                className='bg-blue-700 text-white text-sm p-3 py-2 rounded-md'><FaEdit /></button>
              <button
                onClick={(e) => { handleDelete(e, item.id) }}
                className='bg-blue-700 text-white text-sm p-3 py-2 rounded-md'><MdDelete /></button>
            </div>
          </div>
        })}


      </div>
      <Footer />
    </div>
  )
}

export default App
