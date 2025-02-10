import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid'
import './task.css';



function Task() {
  let [data, setData] = useState([]);
  let [text, setText] = useState("");
  let [edit,setEdit] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    async function fetchTasks(){ 
        if (!token) {
            return alert("Please log in first");
        }
      
      try{
        const response = await fetch("http://localhost:1234/tasks",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },})
      if(response.ok){
        const tasks = await response.json();
        console.log("FETCHED TASKS SUCCESSFULLY");
        setData(tasks);
      }
      else{
        console.log("failed to fetch tasks");
      }
    }
    catch(err){
      console.error("err:-",err);
    }
  }
  fetchTasks();
},[])

  function dataa(event) {
    setText(event.target.value);
  }

  async function setDataa(event) {
    event.preventDefault();
    if (text.trim()) {
      if(edit!==null){
        let updatedTask = {...data[edit],task:text};

        try{
            const response = await fetch(`http://localhost:1234/tasks/${updatedTask.id}`,{
              method:"PUT",
              headers:{'Content-Type':"application/json","Authorization": `${token}`},
              body:JSON.stringify(updatedTask),
            })

            if(response.ok){
              let updatedData = [...data];
              updatedData[edit] = updatedTask;
              setData(updatedData);
              setEdit(null);
              setText("");
              console.log("Task updated successfully");
            }
            else{
              console.log("Task not updated!!!");
            }
          }
        catch(err){
          console.log("error:-",err);
        }
        }

      else{
        const task = {id:nanoid(),task:text,completed:false};
        setData([...data,task]);
        try{
            const response = await fetch("http://localhost:1234/tasks",{
                  method:'POST',
                  headers:{'Content-Type':'application/json',"Authorization": `${token}`},
                  body:JSON.stringify(task),
              })

            if(response.ok){
                console.log('Task created successfully');
                setText("");
            }
            else{
                console.error('Failed to create task');
              }
      }
      catch(err){
        console.error('Error:',err);
      }
    }
  }
  }

 


  async function deleteData(ind){
    let id = String(data[ind].id);
    try {
      const response = await fetch(`http://localhost:1234/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,"Authorization": `${token}`},
      });
      if (response.ok) {
        setData(data.filter(data => data.id !== id));
        console.log('Task deleted successfully');
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function updateClick(index){
    setEdit(index);
    
    setText(data[index].task);
  }

  async function clickk(index){
    const newData = [...data];
    newData[index].completed = !newData[index].completed;
    try{
      const response = await fetch(`http://localhost:1234/tasks/${newData[index].id}`,{
        method:"PUT",
        headers:{'Content-Type':"application/json","Authorization": `${token}`},
        body:JSON.stringify(newData[index]),
      })

      if(response.ok){
        setData(newData);
        console.log("CheckBox updated successfully");
      }
      else{
        console.log("CheckBox not updated!!!");
      }
    }
  catch(err){
    console.log("error:-",err);
  }
    
    setData(newData);
  }


  return (
    <div className='mt-4'>
      <h1 className="text-center mb-4">Welcome to Task Manager</h1>

      <div className="row justify-content-center">
        <form onSubmit={setDataa} className="col-md-8">
          <div className="row align-items-center g-2">

            <div className="col-md-3 text-md-end text-center">
              <label htmlFor="todo" className="form-label mb-0 fw-semibold">Task:</label>
            </div>


            <div className="col-md-6">
              <input type="text" name="todobro" id="todo" value={text} onChange={dataa} className="form-control form-control-sm"/>
            </div>


            <div className="col-md-3 text-md-start text-center">
              <button type="submit" className="btn btn-success w-50 btn-sm">Add</button>
            </div>


          </div>
        </form>
      </div>

      <h3 className="mt-4">Tasks You Do:</h3>
      <ul className="list-group">
        {data.map((item, index) => (
          <li key={item.id} className="list-group-item mt-4"><span style={{textDecoration:item.completed?'line-through':'none'}}>{item.task}</span>
    
              <button className='btn mx-5' style={{ backgroundColor: '#e74c3c', color: 'white' }} onClick={()=>{updateClick(index)}}>Edit</button>    
              <button className='btn mx-3' style={{ backgroundColor: '#e74c3c', color: 'white' }} onClick={()=>{deleteData(index)}}>Delete</button>
              <input type='checkbox' onClick={()=>{clickk(index)}} checked={item.completed} className='mx-5 mt-3 form-check-input'></input>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;
