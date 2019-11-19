<script>
const appKey = "kid_BJXTsSi-e";
const appSecretKey = "447b8e7046f048039d95610c1b039390";
const user = "guest";
const pass = "guest";
const basicUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock";
const loginUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/login";

fetch(loginUrl,{
	method : "POST",
	headers : {
		"Content-Type":"application/json",
		"Authorization": btoa(`${${user}:${pass}}`);
	}
	body:{
		"username":user,
		"password":pass
	}
}.then(res => {
	console.log(res);
});
</script>