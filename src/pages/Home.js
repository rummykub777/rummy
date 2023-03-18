import React, { useState } from "react"
import Login from "../components/Login"
export default function Home() {
    const [openModal, setOpenModal] = useState(false)
    return (<>
        {openModal && <Login
            isOpen={openModal}
            onClose={() => setOpenModal(!openModal)}
        />}
        <section className="rummy desktop_view">
            <div className="header">
                <div className="header_container">
                    <div className="user_profile" onClick={() => { setOpenModal(true) }}>
                        <div className="user_container">
                            <img src="/assets/users.png" height={150} width={150} alt="user" />
                            <img src="/assets/star.png" height={20} width={20} alt="user" />
                        </div>
                        <div className="user_info">
                            <div className="user_heading">User Name</div>
                            <div className="user_name">Eli Mark</div>
                        </div>
                    </div>
                    <div className="nav_bar">
                        <img src="/assets/nav.png" className="nav_bg_img" alt="rummy" />
                        <div className="nav_container">
                            <div className="">
                                <img src="/assets/trophy.png" alt="rummy" />
                                <p>100</p>
                            </div>
                            <div className="">
                                <img src="/assets/coin.png" alt="rummy" />
                                <p>100</p>
                            </div>
                        </div>
                    </div>
                    <div className="lock_key">
                        <img src="/assets/lock.png" height={32} width={32} alt="user" />
                    </div>
                </div>
            </div>
            <div className="rummy-wrapper">
                <div className="body_container">
                    <div className="app_logo"><img src="/assets/logo.png" alt="rummy" /></div>
                    <div className="rummy_cards">
                        <div className="rummy_card"><img src="/assets/card1.png" alt="card" /></div>
                        <div className="rummy_card"><img src="/assets/card2.png" alt="card" /></div>
                    </div>
                </div>
            </div>
        </section>
        <section className="mobile_view">
            <div className="header">
                <div className="nav_bar">
                    <img src="/assets/nav.png" className="nav_bg_img" alt="rummy" />
                    <div className="nav_container">
                        <div className="">
                            <img src="/assets/trophy.png" alt="rummy" />
                            <p>100</p>
                        </div>
                        <div className="">
                            <img src="/assets/coin.png" alt="rummy" />
                            <p>100</p>
                        </div>
                    </div>
                </div>
                <div className="header_container">
                    <div className="user_profile" onClick={() => { setOpenModal(true) }}>
                        <div className="user_container">
                            <img src="/assets/users.png" height={150} width={150} alt="user" />
                            <img src="/assets/star.png" className="star" height={20} width={20} alt="user" />
                        </div>
                        <div className="user_info">
                            <div className="user_heading">User Name</div>
                            <div className="user_name">Eli Mark</div>
                        </div>
                    </div>

                    <div className="lock_key">
                        <img src="/assets/lock.png" height={32} width={32} alt="user" />
                    </div>
                </div>
            </div>
            <div className="rummy-wrapper">
                <div className="body_container">
                    <div className="app_logo"><img src="/assets/logo.png" alt="rummy" /></div>
                    <div className="rummy_cards">
                        <div className="rummy_card"><img src="/assets/card1.png" alt="card" /></div>
                        <div className="rummy_card"><img src="/assets/card2.png" alt="card" /></div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}
