let auth = (() => {
	function isAuth(){
		return sessionStorage.getItem('authtoken') !== null;
	}
    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('teamId', userInfo.teamId);
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
		sessionStorage.removeItem('userId');
		sessionStorage.removeItem('firstName');
		sessionStorage.removeItem('authtoken');
		sessionStorage.removeItem('username');
		sessionStorage.removeItem('lastName');
		
        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    function handleError(reason) {
        if(!reason.ok){
            throw new Error(reason.statusText);
        }
        return reason;
        
    }

    function showInfo(message) {
        let infoBox = $('#successBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 5000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 5000);
    }

    return {
		isAuth,
        login,
        register,
        logout,
        saveSession,
        showInfo,
        showError,
        handleError
    }
})()