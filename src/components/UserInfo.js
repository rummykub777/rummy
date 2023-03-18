export default function UserInfo({ profile, setProfile }) {
    return (<div className="user_profile"
        onClick={() => {
            localStorage.setItem("phone", "")
            setProfile(null)
        }}>
        <div className="user_container">
            <img src="/assets/users.png" height={150} width={150} alt="user" />
            <img src="/assets/star.png" className="star" height={20} width={20} alt="user" />
        </div>
        <div className="user_info">
            <div className="user_heading">User Name</div>
            <div className="user_name">{profile.userName}</div>
        </div>
    </div>
    )
}