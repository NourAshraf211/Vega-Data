var images = document.querySelectorAll('img');
var contains = document.querySelectorAll('.drag-contain');
var chartlist = document.querySelector('.chart-list');
var places = document.querySelectorAll('.place');

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
    this.className += ' opacity';
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
    } else if (this.className == 'chart-list') {
        for (var list of places)
            if (list.childElementCount == 0) {
                list.append(it);
                break;
            }
    }
}
