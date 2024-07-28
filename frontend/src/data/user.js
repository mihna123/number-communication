import { entity } from "simpler-state";

export const currentUser = entity({
    _id: '',
    loggedIn: false,
    username: '',
    token: ''
});
