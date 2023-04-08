/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Loading from "../components/Loading"

export default function Public() {
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const phone = localStorage.getItem("phone")
        if (!phone) {
            navigate("/")
        } else {
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

    return <>
        <Header />

        <div className="" id="public">
            {loading ? <Loading /> : (rooms && rooms.length > 0 ? <div className="rooms">
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
            </div> : <p style={{ textAlign: "center", color: "white", width: "100%" }}>No Data Found</p>)
            }
        </div>
    </>
}