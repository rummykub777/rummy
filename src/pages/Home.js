import React, { useEffect, useState } from "react"
import Cards from "../components/Cards"
import LockKey from "../components/LockKey"
import Login from "../components/Login"
import LoginButton from "../components/LoginButton"
import Navbar from "../components/Navbar"
import UserInfo from "../components/UserInfo"
import Alert from "../components/Alert"

export default function Home() {
    const [openModal, setOpenModal] = useState(false)
    const [profile, setProfile] = useState(null)
    const [isAlert, setIsAlert] = useState(false)

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
        }

    }, [])
    return (<>
        {openModal && <Login
            isOpen={openModal}
            onClose={() => setOpenModal(!openModal)}
            setProfile={(p) => { setProfile(p) }}
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
            <Cards profile={profile} setOpenModal={setOpenModal} />
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
        </section>
    </>
    )
}
