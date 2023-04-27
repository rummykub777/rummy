
const Navbar = ({ profile = {}, setIsAlert }) => {
    let points = profile?.points || 0

    if (points > 1000 * 1000 * 1000 * 1000) {
        points = (parseInt(points / (1000 * 1000 * 1000 * 1000))) + "T+"
    } else if (points > 1000 * 1000 * 1000) {
        points = (parseInt(points / (1000 * 1000 * 1000))) + "B+"
    } else if (points > 1000 * 1000) {
        points = (parseInt(points / (1000 * 1000))) + "M+"
    } else if (points > 1000) {
        points = (parseInt(points / 1000)) + "K+"
    }

    return <div className="nav_bar">
        <img src="/assets/nav.png" className="nav_bg_img" alt="rummy" />
        <div className="nav_container">
            <div className="" onClick={() => setIsAlert(true)}>
                <img src="/assets/trophy.png" alt="rummy" />
                <p>0</p>
            </div>
            <div className="" onClick={() => setIsAlert(true)}>
                <img src="/assets/coin.png" alt="rummy" />
                <p>{points}</p>
            </div>
        </div>
    </div>
}

export default Navbar