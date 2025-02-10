import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value});
}

async function handleSubmit(e){
    e.preventDefault();
    let resp;
    try{
        const res = await fetch("http://task-manager-backend-ogdl.onrender.com/api/user/register",
            {  body: JSON.stringify(formData),
                headers:{"Content-Type":"application/json"},
                method:"POST",
            }
        )

        if (!res.ok) {
            throw new Error("Registration failed");
        }

        resp = await fetch("http://task-manager-backend-ogdl.onrender.com/api/user/login",{
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
            method:"POST",
        })

        if(!resp.ok){
            throw new Error("Registration failed");
        }
        
        let data = await resp.json();
        localStorage.setItem("token",data.token);

        navigate("/task")
    }
    catch(error){
        alert("user exists (or) validation error(password should be greater than 5 and unique email)");
    }
}

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="name" className="form-label">Username:</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                id="name" 
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label">Email:</label>
              <input 
                type="email" 
                name="email" 
                placeholder="example@gmail.com" 
                id="email" 
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="password" className="form-label">Password:</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter your password"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-success w-100">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
