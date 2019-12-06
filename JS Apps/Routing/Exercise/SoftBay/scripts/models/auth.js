let auth = (() => {
	function isAuth(){
		return sessionStorage.getItem('authtoken') !== null;
	}
  

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };
		
        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(username, password, repeatPassword,firstName,lastName) {
		
        let userData = {
            username,
            password,
			firstName,
			lastName
        };

        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };
		
        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    return {
		isAuth,
        login,
        register,
        logout
    }
})()