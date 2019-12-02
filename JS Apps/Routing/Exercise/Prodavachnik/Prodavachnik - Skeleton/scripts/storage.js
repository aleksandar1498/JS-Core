let storage = (()=>{
	function saveData(key,appKey, value) {
		localStorage.setItem(key+appKey, JSON.stringify(value));
	}

	function getData(key,appKey){
	  return localStorage.getItem(key+appKey);
	}

	function saveUser(data){
	  saveData("userInfo",data);
	  saveData("authToken", data._kmd.authtoken);
	}

	function removeUser(){
	  localStorage.clear();
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

