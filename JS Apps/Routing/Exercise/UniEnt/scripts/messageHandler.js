
export const showInfo = function showInfo(message) {
        let infoBox = $('#successBox');
        infoBox.html(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 5000);
    }

export const showError = function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.html(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 5000);
    }