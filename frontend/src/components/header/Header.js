import "./Header.css";
import { Button } from "@mui/material";
import SignupModalPage from "../signup-modal-page/SignupModalPage";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import LoginModalPage from "../login-modal-page/LoginModalPage";
import { currentUser } from "../../data/user";

const Header = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const user = currentUser.use();

    const loginClick = () => {
        setLoginModalOpen(true);
    }
    const signupClick = () => {
        setSignupModalOpen(true);
    }
    const logoutClick = () => {
        currentUser.set({
            loggedIn: false,
            username: '',
            _id: '',
            token: ''
        });
        alert('You are loged out!');
    }
    const closeModals = () => {
        setLoginModalOpen(false);
        setSignupModalOpen(false);
    }
    return (
        <div className="container">
            <Modal open={loginModalOpen}>
                <LoginModalPage closeModal={closeModals} />
            </Modal>
            <Modal open={signupModalOpen}>
                <SignupModalPage closeModal={closeModals} />
            </Modal>
            <h2>Numberz</h2>
            {!user.loggedIn
                ? <div className="controlls">
                    <Button variant="outlined" onClick={loginClick}>Log in</Button>
                    <Button variant="outlined" onClick={signupClick}>Sign up</Button>
                </div>
                : <div className="controlls">
                    <p><b>{user.username}</b></p>
                    <Button className="logout-btn" variant="outlined" color="secondary" onClick={logoutClick}>Log out</Button>
                </div>
            }
        </div>
    )
}

export default Header;
