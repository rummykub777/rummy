import React, { useEffect, useState } from "react"
import Cards from "../components/Cards"
import LockKey from "../components/LockKey"
import Login from "../components/Login"
import LoginButton from "../components/LoginButton"
import Navbar from "../components/Navbar"
import UserInfo from "../components/UserInfo"

export default function Home() {
    const [openModal, setOpenModal] = useState(false)
    const [profile, setProfile] = useState(null)

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

        {/* Desktop */}
        <section className="rummy desktop_view">
            <div className="header">
                <div className="header_container">
                    {!profile ? <LoginButton setOpenModal={setOpenModal} /> :
                        <UserInfo profile={profile}
                            setProfile={(p) => { setProfile(p) }}
                        />}
                    <Navbar profile={profile} />
                    <LockKey />
                </div>
            </div>
            <Cards />
        </section>

        {/* Mobile */}
        <section className="mobile_view">
            <div className="header">
                <Navbar profile={profile} />
                <div className="header_container">
                    {!profile ? <LoginButton setOpenModal={setOpenModal} profile={profile} />
                        : <UserInfo profile={profile}
                            setProfile={(p) => { setProfile(p) }}
                        />}
                    <LockKey />
                </div>
            </div>
            <Cards />
        </section>
    </>
    )
}
