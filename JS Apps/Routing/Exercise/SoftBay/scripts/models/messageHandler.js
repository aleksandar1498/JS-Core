let notify = (()=>{
const showInfo = function showInfo(message) {
        let infoBox = $('#successNotification');
        infoBox.html(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 5000);
    }

const showError = function showError(message) {
        let errorBox = $('#errorNotification');
        errorBox.html(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 5000);
    }
const loadingBox = (function showLoading() {
        let loadingBox = $('#loadingNotification');
        return {
			show : function(){
				$('#loadingNotification').show();
			},
			hide : function(){
				$('#loadingNotification').hide();
			}
		}
		})();
		
		return{
			showInfo,
			showError,
			loadingBox
		}
})();