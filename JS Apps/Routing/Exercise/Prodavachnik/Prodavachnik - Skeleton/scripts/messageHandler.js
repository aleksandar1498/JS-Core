
const showInfo = function showInfo(message) {
        let infoBox = $('#successBox');
        infoBox.html(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 5000);
    }

const showError = function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.html(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 5000);
    }
const loadingBox = function showError(message) {
        let loadingBox = $('#loadingBox');
        return {
			show : function(){
				loadingBox.show();
			},
			hide : function(){
				loadingBox.hide();
			}
		}
    }