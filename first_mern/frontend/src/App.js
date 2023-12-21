import './App.css';
import {useState,useEffect} from "react";
import Axios from "axios";

function App() {
  const [list,setList]=useState([]);
  const[name,setName]=useState("")
  const[username,setUsername]=useState("")

  useEffect(() => {
    Axios.get("http://localhost:3000/getUsers").then((response) =>
    {
      setList(response.data);
    })
  }, [])

  const createUser =()=>{
    Axios.post("http://localhost:3000/createUser",{name:name,username:username}).then((response)=>
    {alert("success")})
    .catch((error) => {
      console.error("Error creating user:", error);
    });
  };
  return (
    <div className="App">
     <div className="usersdisplay">
    {list.map((user) => {
      return (
        <div key={user.id}>
          <h1>Name: {user.name}</h1>
          <h1>Username: {user.username}</h1>
        </div>
      );
    })}
  </div>
      <div>
        <input type="text" placeholder="name" onChange={(event)=>{setName(event.target.value)}}/>
        <input type="text" placeholder="username" onChange={(event)=>{setUsername(event.target.value)}}/>

        <button onClick={createUser}>createuser</button>
      </div>
    </div>
  );
}

export default App;
