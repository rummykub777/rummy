
const Navbar = ({ profile = {}, setIsAlert }) => {
    return <div className="nav_bar">
        <img src="/assets/nav.png" className="nav_bg_img" alt="rummy" />
        <div className="nav_container">
            <div className="" onClick={() => setIsAlert(true)}>
                <img src="/assets/trophy.png" alt="rummy" />
                <p>0</p>
            </div>
            <div className="" onClick={() => setIsAlert(true)}>
                <img src="/assets/coin.png" alt="rummy" />
                <p>{profile?.points || 0}</p>
            </div>
        </div>
    </div>
}

export default Navbar