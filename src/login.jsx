import { useState } from "react";
import { useNavigate } from "react-router-dom";

let Login = ()=>{

    let[formData,setFormData] = useState({email:"",password:""});
    const  navigate = useNavigate();

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await fetch("https://task-manager-backend-2-kfxd.onrender.com/api/user/login",
            {  body: JSON.stringify(formData),
                headers:{"Content-Type":"application/json"},
                method:"POST",
            })
            let data = await res.json()
            console.log(data);
            localStorage.setItem("token",data.token);
            if(res.ok){
                alert("Login Successfull");
                navigate("/task")
            }
            else{
                alert("Mismatch password or email");
            }
        }
        catch(error){
            alert("Details mismatched");
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{width:"400px"}}>
                <h2>Login:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" id="email" name="email" className="form-control" onChange={handleChange}></input>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="pass" className="form-label">Password:</label>
                            <input type="password" id="pass" name="password" className="form-control" onChange={handleChange}></input>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <button className="btn btn-success w-100" onChange={handleChange}>Login</button>
                        </div>
                    </div>

                    <p>
                        Have You Registered? <a href="/register">Register Here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login