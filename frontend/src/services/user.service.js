import { currentUser } from "../data/user";
import * as jose from "jose";

class UserService {
    static userLogin(token) {
        const decodedToken = jose.decodeJwt(token);
        currentUser.set({
            loggedIn: true,
            username: decodedToken.user.username,
            _id: decodedToken.user._id,
            token: token
        });
    }
}

export default UserService;
