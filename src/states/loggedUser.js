import { reactive } from 'vue'

const loggedUser = reactive({
    token: undefined,
    email: undefined,
    nome: undefined,
    cognome: undefined
})

function setLoggedUser (data) {
    loggedUser.token = data.token;
    loggedUser.email = data.email;
    loggedUser.nome = data.nome;
    loggedUser.cognome = data.cognome;
}

function clearLoggedUser () {
    loggedUser.token = undefined;
    loggedUser.email = undefined;
    loggedUser.nome = undefined;
    loggedUser.cognome = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser } 