previewImg = document.getElementById('img-preview');
inputFile = document.getElementById('fileupload');
inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            previewImg.setAttribute('src', reader.result);

            removeImgButton = document.createElement('button');
            removeImgButton.setAttribute('class', 'btn btn-default');
            removeImgButton.setAttribute('id', 'removeImgButton');
            removeImgButton.innerText = 'remove image';

            uploadDiv = document.getElementById('uploadDiv');
            if (document.getElementById('removeImgButton') === null) {
                uploadDiv.appendChild(removeImgButton);
            }

            removeImgButton.addEventListener('click', ($event) => {
                document.getElementById('fileupload').value = '';
                $event.preventDefault();
                uploadDiv.removeChild(removeImgButton);
                previewImg.setAttribute('src', './img/picPH.png');
            });
        });
        reader.readAsDataURL(file);
    }
});