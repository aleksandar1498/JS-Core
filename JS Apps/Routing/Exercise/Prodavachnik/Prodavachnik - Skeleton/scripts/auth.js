
    // user/login
const login = function login(username, password) {
        let userData = {
            username,
            password
        };
		
        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
const register = function register(username, password) {
		
        let userData = {
            username,
            password,
        };
		
        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
const logout = function logout(){
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };
		storage.removeUser();
		
        return requester.post('user', '_logout', 'kinvey', logoutData);
    }



const handleError = function handleError(reason) {
        if(!reason.ok){
            throw new Error(reason.statusText);
        }
        return reason;
        
    }

