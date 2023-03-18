const LoginButton = ({ setOpenModal }) => {
    return <div className="user_profile" onClick={() => { setOpenModal(true) }}>
        <div className="user_info">
            <div className="user_heading">Login</div>
        </div>
    </div>
}

export default LoginButton