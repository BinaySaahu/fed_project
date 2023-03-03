import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Form() {
    const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [roll, setRoll] = useState(null);
  const [college, setCollege] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/register`, {
        name,
        roll,
        college,
      });
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);
      const success = response.status === 201;
      if (success) {
        alert("Data submitted");
        navigate("/view");

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app_form">
      <h2>Registration</h2>
      <label htmlFor="">Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label htmlFor="">Roll Number</label>
      <input type="text" onChange={(e) => setRoll(e.target.value)} />
      <label htmlFor="">College Name</label>
      <input type="text" onChange={(e) => setCollege(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Form;
