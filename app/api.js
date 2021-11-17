const API = 'http://192.168.1.34:3000'
//const API = 'http://localhost:3000'

export const checkLogin = async (email,passwd) => {
    return fetch(API + '/usuario/check/' + email, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contraseña: passwd
        })
    });
}