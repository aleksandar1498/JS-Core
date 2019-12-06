let storage = (()=>{
	function saveData(key, value) {
		sessionStorage.setItem(key, value);
	}

	function getData(key){
	  return sessionStorage.getItem(key);
	}

	function saveUser(data){
	  saveData("userId",data._id);
	  saveData("authtoken", data._kmd.authtoken);
	}

	function removeUser(){
	  sessionStorage.clear();
	}

	function isAuth(){
		return sessionStorage.getItem('authtoken') !== null;
	}
	
	 return {
        saveData,
        getData,
        saveUser,
		removeUser,
        isAuth
    }
})();

