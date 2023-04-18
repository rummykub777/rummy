import { Link } from "react-router-dom"

const Cards = ({ profile, setOpenModal, loading, rooms }) => {
    return <div className="rummy-wrapper">
        <div className="body_container">
            <div className="app_logo"><img src="/assets/logo.png" alt="rummy" /></div>

            {profile ? <div className="rummy_side_container">
                <div className="rummy_cards">
                    <Link to={"/game"} ><div className="rummy_card"><img src="/assets/card1.png" alt="card" /></div></Link>
                    <Link to={"/public"} ><div className="rummy_card"><img src="/assets/card2.png" alt="card" /></div></Link>
                </div>
                <div id="public">
                    {loading ? "" : (rooms && rooms.length > 0 ? <div className="rooms">
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
                    </div> : "")
                    }
                </div>
            </div> :
                <div className="rummy_cards" onClick={() => setOpenModal(true)}>
                    <div className="rummy_card"><img src="/assets/card1.png" alt="card" /></div>
                    <div className="rummy_card"><img src="/assets/card2.png" alt="card" /></div>
                </div>}
        </div>
    </div >
}

export default Cards