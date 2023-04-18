/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import Cards from "../components/Cards"
import LockKey from "../components/LockKey"
import Login from "../components/Login"
import LoginButton from "../components/LoginButton"
import Navbar from "../components/Navbar"
import UserInfo from "../components/UserInfo"
import Alert from "../components/Alert"
import { Unity, useUnityContext } from "react-unity-webgl";
import Loading from "../components/Loading"

export default function Home() {
    const [page, setPage] = useState("home")
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

    const { unityProvider, isLoaded, sendMessage, unload } = useUnityContext({
        loaderUrl: "./unity/my.loader.js",
        dataUrl: "./unity/my.data.unityweb",
        frameworkUrl: "./unity/my.framework.js.unityweb",
        codeUrl: "./unity/my.wasm.unityweb",
    });

    useEffect(() => {
        if (isLoaded) {
            const query = new URLSearchParams(window.location.search);
            const code = query.get('code')
            sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
        }
    }, [isLoaded])

    return (<>
        {page === "home" && <>
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
                <Cards profile={profile} setOpenModal={setOpenModal} loading={loading} rooms={rooms} setPage={() => setPage("game")} />

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
                                {/* <Link to={`/game?code=${e.code}`} style={{ textDecoration: "none" }} className="btn-primary">Join</Link> */}
                                <div onClick={() => setPage("game")} style={{ textDecoration: "none" }} className="btn-primary">Join</div>
                            </div>
                        </div>
                    })}
                </div> </div> : "")
                }
            </section>
        </>}

        {page === "game" && <>
            <div style={{ backgroundColor: "#21002e" }}>
                {isLoaded && <div style={{ position: "relative" }}>
                    <svg
                        onClick={async () => {
                            await unload()
                            setPage("home")

                        }} className="game-close-btn" fill="#fff" height={20} width={20} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
                </div>}

                {!isLoaded && <Loading />}
                <Unity unityProvider={unityProvider} />
            </div>)
        </>}
    </>
    )
}
