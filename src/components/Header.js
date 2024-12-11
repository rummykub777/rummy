import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const phone = localStorage.getItem("phone");
    if (phone) {
      fetch("https://rummy777-e2631948f8d9.herokuapp.com/api/user/p/" + phone)
        .then((res) => res.json())
        .then((data) => {
          if (!data.data) {
          } else {
            setProfile(data.data);
          }
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <header className="public-header">
      <div className="header-container">
        <div className="app-logo">
          <Link to="/" className="back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.125 21.1L6.7 12.7q-.15-.15-.213-.325T6.425 12q0-.2.062-.375T6.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"
              />
            </svg>
          </Link>
          <Link to="/" className="back">
            <div>
              <img src="../assets/Logo2.png" alt="rummy" />
            </div>
          </Link>
        </div>
        <div className="user-name">{profile ? profile?.userName : ""}</div>
      </div>
    </header>
  );
}
