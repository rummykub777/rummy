import React, { useEffect, useState } from "react"
import Cards from "../components/Cards"
import LockKey from "../components/LockKey"
import Login from "../components/Login"
import LoginButton from "../components/LoginButton"
import Navbar from "../components/Navbar"
import UserInfo from "../components/UserInfo"
import Alert from "../components/Alert"
import { Link } from "react-router-dom"

export default function Home() {
    const [openModal, setOpenModal] = useState(false)
    const [profile, setProfile] = useState(null)
    const [isAlert, setIsAlert] = useState(false)
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const phone = localStorage.getItem("phone")
        if (phone) {
            fetch("https://rummykub-be.herokuapp.com/api/user/p/" + phone)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.data) {
                    } else {
                        setProfile(data.data)
                    }
                })
                .catch((err) => { })
            fetchRooms()
        }
    }, [])

    const fetchRooms = () => {
        setLoading(true)
        fetch("https://rummykub-be.herokuapp.com/api/room/public")
            .then((res) => res.json())
            .then((data) => {
                if (!data.data) {
                } else {
                    setRooms(data.data)
                    setLoading(false)
                }
            })
            .catch((err) => { })
    }
    return (<>
        {openModal && <Login
            isOpen={openModal}
            onClose={() => setOpenModal(!openModal)}
            setProfile={(p) => {
                setProfile(p)
                fetchRooms()
            }}
        />}

        {isAlert && <Alert
            isOpen={isAlert}
            onClose={() => setIsAlert(!isAlert)}
        />}

        {/* Desktop */}
        <section className="rummy desktop_view">
            <div className="header">
                <div className="header_container">
                    {!profile ? <LoginButton setOpenModal={setOpenModal} /> :
                        <UserInfo profile={profile}
                            setProfile={(p) => { setProfile(p) }}
                        />}
                    <Navbar profile={profile} setIsAlert={setIsAlert} />
                    <LockKey setIsAlert={setIsAlert} />
                </div>
            </div>
            <Cards profile={profile} setOpenModal={setOpenModal} loading={loading} rooms={rooms} />

        </section>

        {/* Mobile */}
        <section className="mobile_view">
            <div className="header">
                <Navbar profile={profile} setIsAlert={setIsAlert} />
                <div className="header_container">
                    {!profile ? <LoginButton setOpenModal={setOpenModal} profile={profile} />
                        : <UserInfo profile={profile}
                            setProfile={(p) => { setProfile(p) }}
                        />}
                    <LockKey setIsAlert={setIsAlert} />
                </div>
            </div>
            <Cards profile={profile} setOpenModal={setOpenModal} />

            {loading ? "" : (rooms && rooms.length > 0 ? <div id="public"><div className="rooms">
                {rooms.map((e, i) => {
                    return <div className="card" key={i}>
                        <div>
                            <div><span>Code: </span>{e.code}</div>
                            <div><span>Cost: </span>{e.roomCost}</div>
                        </div>
                        <div>
                            <Link to={`/game?code=${e.code}`} style={{ textDecoration: "none" }} className="btn-primary">Join</Link>
                        </div>
                    </div>
                })}
            </div> </div> : "")
            }
        </section>
    </>
    )
}
