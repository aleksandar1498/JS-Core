let storage = (()=>{
	function saveData(key, value) {
		localStorage.setItem(key, value);
	}

	function getData(key){
	  return localStorage.getItem(key);
	}

	function saveUser(data){
	  saveData("username",data.username);
	  saveData("userId",data._id);
	  saveData("authtoken", data._kmd.authtoken);
	}

	function removeUser(){
		localStorage.clear();
	}

	function isAuth(){
		return localStorage.getItem('authtoken') !== null;
	}
	
	 return {
        saveData,
        getData,
        saveUser,
		removeUser,
        isAuth
    }
})();

