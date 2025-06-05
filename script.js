const modal = document.getElementById('qrModal');
const modalImage = document.getElementById('modalImage');
const closeWechat = document.getElementById('closeWechat');

function showWechatQR() {
    if (modal && modalImage) {
        modalImage.src = "wechat.jpg";
        modal.style.display = "flex";
    }
}

function showAlipayQR() {
    if (modal && modalImage) {
        modalImage.src = "alipay.jpg";
        modal.style.display = "flex";
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = "none";
    }
}

if (closeWechat) {
    closeWechat.onclick = closeModal;
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
