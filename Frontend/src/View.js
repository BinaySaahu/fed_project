import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function View() {
  const [user, setUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;
  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/view", {
        params: { userId },
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="view">
      <h2>Name: {user.user_name}</h2>
      <h2>Roll Number: {user.roll_number}</h2>
      <h2>College: {user.college_name}</h2>
    </div>
  );
}

export default View;
