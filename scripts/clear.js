document.getElementById('clear-btn').addEventListener('click', function () {
document.getElementById('file-input').value = '';
document.getElementById('preview-img').src = 'images/image_preview.png';
document.getElementById('text-output').value = '';
document.getElementById('process-btn').disabled = true;
document.getElementById('copy-btn').disabled = true;
});
