let images = document.querySelectorAll('img');
let contains = document.querySelectorAll('.drag-contain');
let chartlist = document.querySelector('.chart-list');
let places = document.querySelectorAll('.place');

// Empty array to store the images
let arrayOfImages = [];

// Check if theres images in Local Storage
if (sessionStorage.getItem("photos")) {
    arrayOfImages = JSON.parse(sessionStorage.getItem("photos"));
}

//get data from local storage
getDataFromLocalStorage();


// Events
for (var image of images) {
    image.addEventListener('dragstart', dragStart);
    image.addEventListener('dragend', dragEnd);
}

for (const contain of contains) {
    contain.addEventListener('dragover', dragOver);
    contain.addEventListener('dragenter', dragEnter);
    contain.addEventListener('dragleave', dragLeave);
    contain.addEventListener('drop', dragDrop);
}

chartlist.addEventListener('dragover', dragOver);
chartlist.addEventListener('dragenter', dragEnter);
chartlist.addEventListener('dragleave', dragLeave);
chartlist.addEventListener('drop', dragDrop);


//Drag functions
function dragStart(e) {
    //this.className += ' opacity';
    //setTimeout(() => (this.className += ' opacity') , 0);
    it = e.target;
}

function dragEnd() {
    this.className = '';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered'
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    this.classList.remove('hovered');
    if (this.className == 'drag-contain') {
        if (!this.hasChildNodes()) {
            this.append(it);
        } else {
            for (var list of places)
                if (list.childElementCount == 0) {
                    list.append(this.firstChild);
                    this.append(it);
                    break;
                }
        }
        const photo = {
            id: this.getAttribute('id'),
            img: it.getAttribute('src'),
        };

        //push photo to array of images
        var res = updateArray(photo, arrayOfImages);
        if (!res) {
            arrayOfImages.push(photo);
            for(var i = 0; i<(arrayOfImages.length-1); i++){
                if(arrayOfImages[i].img == photo.img){
                    arrayOfImages.splice(i, 1);
                }
            }
        }
        //updateArrayImg(photo, arrayOfImages);
        console.log(arrayOfImages);

        //Add photos to Local Storage
        addDataToLocalStorage(arrayOfImages);
        /*******************************************************/
    } else if (this.className == 'chart-list') {
        for (var list of places)
            if (list.childElementCount == 0) {
                list.append(it);
                break;
            }
    }
}


function updateArray(photo, array) {
    var flag = false
    for (var data of array) {
        if (data.id == photo.id) {
            for(var i = 0; i<array.length; i++){
                if(array[i].img == photo.img){
                    array.splice(i, 1);
                }
            }
            data.img = photo.img;
            flag = true;
        }
    }
    return flag;
}

function addElementsToPageFrom(drags) {
    for (var data of drags) {
        for (var container of contains) {
            if (data.id == container.getAttribute('id')) {
                //console.log(data.id);
                for (var image of images) {
                    if (data.img == image.getAttribute('src')) {
                        //console.log(container);
                        container.append(image);
                    }
                }
            }
        }
    }
}

// Local storage funcions

function addDataToLocalStorage(arrayOfImages) {
    window.sessionStorage.setItem("photos", JSON.stringify(arrayOfImages));
}

function getDataFromLocalStorage() {
    let data = window.sessionStorage.getItem("photos");
    if (data) {
        let drags = JSON.parse(data);
        addElementsToPageFrom(drags);
    }
}
