import Modal from "react-modal/lib/components/Modal"
import React, { useState } from "react"

export default function Login(props) {
    const { isOpen, onClose, setProfile } = props
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)

    const login = () => {
        if (!phone) {
            setError("Enter phone number")
            return
        }
        setError("")
        setSending(true)
        fetch("https://rummykub-be.herokuapp.com/api/user/p/" + phone)
            .then((res) => res.json())
            .then((data) => {
                setSending(false)
                if (!data.data) {
                    setError(data.message)
                } else {
                    setProfile(data.data)
                    localStorage.setItem("phone", phone)
                    onClose()
                }
            })
            .catch((err) => {
                setError(`${err}`)
                setSending(false)
            })
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="My dialog" className="mymodal auth-modal" overlayClassName="myoverlay auth-overlay" closeTimeoutMS={500} ariaHideApp={false}>
            <div className="" style={{ width: "100%" }}>
                <div className="custom-modal-header">
                    <p>Login</p>
                    <div className="close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                    </div>
                </div>
                <div className="">
                    <div className="form-group">
                        <label className="input__label">
                            Phone
                            <span className="required ms-1 st-fs-12"> *</span>
                        </label>
                        <input
                            type="number"
                            className="input__field"
                            placeholder="Enter phone number"
                            onChange={(e) => { setPhone(e.target.value) }} />
                    </div>
                    {error && <div>{error}</div>}
                </div>
                <div className=" btn-group">
                    <button className="btn-cancel" type="button" onClick={onClose} disabled={sending}>
                        Cancel
                    </button>
                    <button className="btn-primary" type="button" onClick={login} disabled={sending}>
                        Login
                    </button>
                </div>
            </div>
        </Modal>
    )
}
