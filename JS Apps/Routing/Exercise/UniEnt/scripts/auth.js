
    // user/login
export const login = function login(username, password) {
        let userData = {
            username,
            password
        };
		
        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
export const register = function register(username, password) {
		
        let userData = {
            username,
            password,
        };
		
        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
export const logout = function logout(){
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };
		storage.removeUser();
		
        return requester.post('user', '_logout', 'kinvey', logoutData);
    }



   export const handleError = function handleError(reason) {
        if(!reason.ok){
            throw new Error(reason.statusText);
        }
        return reason;
        
    }

