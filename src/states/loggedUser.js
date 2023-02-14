import { reactive } from 'vue'

const loggedUser = reactive({
    token: undefined,
    email: undefined
})

function setLoggedUser (data) {
    loggedUser.token = data.token;
    loggedUser.email = data.email;
}

function clearLoggedUser () {
    loggedUser.token = undefined;
    loggedUser.email = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser } 