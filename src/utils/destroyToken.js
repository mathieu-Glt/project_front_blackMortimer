

async function destroyTokenUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

}

module.exports = {
    destroyTokenUser
}