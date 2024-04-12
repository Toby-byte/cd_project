'use strict';

const rowTemplate = () => {
    const trTemplate = document.createElement('tr');

    const tdAuthor = document.createElement('td');
    tdAuthor.classList.add('container');
    const tdTitle = document.createElement('td');
    tdTitle.classList.add('container');
    const tdYear = document.createElement('td');
    tdYear.classList.add('container');

    
    const tdImage = document.createElement('td');
    tdImage.classList.add('img-container');
    const imgBook = document.createElement('img');
    imgBook.classList.add('book-image');
    tdImage.appendChild(imgBook);

    const imgDelete = document.createElement('img');
    imgDelete.src = 'delete-icon.png'; // Set this to the path of your delete icon image
    imgDelete.classList.add('delete');
    const tdDelete = document.createElement('td');
    tdDelete.appendChild(imgDelete);
    tdDelete.classList.add('container');
    
    trTemplate.appendChild(tdAuthor);
    trTemplate.appendChild(tdTitle);
    trTemplate.appendChild(tdYear);
    trTemplate.appendChild(tdImage);
    trTemplate.appendChild(tdDelete);

    return trTemplate;
}

const tableRowTemplate = rowTemplate();

document.querySelector('#frmCD').addEventListener('submit', function(e) {
    e.preventDefault();

    const author = e.target.txtAuthor.value;
    const title = e.target.txtTitle.value;
    const year = parseInt(e.target.txtYear.value);
    const fileInput = e.target.fileImage.files[0];

    const trNew = tableRowTemplate.cloneNode(true);
    trNew.querySelector('td:nth-of-type(1)').innerText = author;
    trNew.querySelector('td:nth-of-type(2)').innerText = title;
    trNew.querySelector('td:nth-of-type(3)').innerText = year;

    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            trNew.querySelector('img.book-image').src = event.target.result;
        };
        reader.readAsDataURL(fileInput);
    } else {
        trNew.querySelector('img.book-image').src = 'placeholder-image.png'; // Fallback image or hide the image
    }

    trNew.querySelector('img.delete').addEventListener('click', function() {
        this.parentElement.parentElement.remove();
    });

    document.querySelector('table > tbody').appendChild(trNew);
    document.querySelector('table').classList.add('visible');

    this.reset(); // The form is reset
});