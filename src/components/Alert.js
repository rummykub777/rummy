import Modal from "react-modal/lib/components/Modal"
import React from "react"

export default function Alert(props) {
    const { isOpen, onClose } = props

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="My dialog" className="mymodal alert-modal" overlayClassName="myoverlay auth-overlay" closeTimeoutMS={500} ariaHideApp={false}>
            <div className="" style={{ width: "100%" }}>
                <div className="custom-modal-header">
                    <div className="close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                    </div>
                    <p>Coming Soon</p>

                </div>
            </div>
        </Modal>
    )
}
