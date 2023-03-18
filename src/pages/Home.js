import React, { useState } from "react"
import Cards from "../components/Cards"
import LockKey from "../components/LockKey"
import Login from "../components/Login"
import LoginButton from "../components/LoginButton"
import Navbar from "../components/Navbar"
// import UserInfo from "../components/UserInfo"

export default function Home() {
    const [openModal, setOpenModal] = useState(false)
    return (<>
        {openModal && <Login
            isOpen={openModal}
            onClose={() => setOpenModal(!openModal)}
        />}

        {/* Desktop */}
        <section className="rummy desktop_view">
            <div className="header">
                <div className="header_container">
                    <LoginButton setOpenModal={setOpenModal} />
                    {/* <UserInfo /> */}
                    <Navbar />
                    <LockKey />
                </div>
            </div>
            <Cards />
        </section>

        {/* Mobile */}
        <section className="mobile_view">
            <div className="header">
                <Navbar />
                <div className="header_container">
                    <LoginButton setOpenModal={setOpenModal} />
                    {/* <UserInfo /> */}
                    <LockKey />
                </div>
            </div>
            <Cards />
        </section>
    </>
    )
}
