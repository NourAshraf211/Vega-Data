var fills = document.querySelectorAll('img');
var contains = document.querySelectorAll('.drag-contain');


for(var fill of fills){
    fill.addEventListener('dragstart', dragStart);
    fill.addEventListener('dragend', dragEnd);
}

for(const contain of contains){
    contain.addEventListener('dragover' , dragOver);
    contain.addEventListener('dragenter' , dragEnter);
    contain.addEventListener('dragleave' , dragLeave);
    contain.addEventListener('drop' , dragDrop);
}



//Drag functions
function dragStart(e){
    //console.log('start');
    this.className += ' opacity';
    //setTimeout(() => (this.className += ' opacity') , 0);
    it = e.target;
    //console.log(e.target);
}

function dragEnd(){
    //console.log('end');
    this.className = '';
}

function dragOver(e){
    e.preventDefault();
    //console.log('over');
}
function dragEnter(e){
    e.preventDefault();
    this.className += ' hovered'
    //console.log('enter');
}
function dragLeave(){
    this.className = 'drag-contain';
    //console.log('leave');
}
function dragDrop(){
    this.className = 'drag-contain';
    //console.log(this.hasChildNodes);
    if(!this.hasChildNodes()){
        this.append(it);
    }
    else{
        //console.log('no');
        for(var list of document.querySelectorAll('.place')){
            //console.log(list.childNodes.length);
            //console.log(list.childElementCount);
            //console.log(list.childNodes.length);
            if(list.childElementCount == 0){
                console.log('yess');
                console.log(list);
                console.log(this.firstChild);
                list.append(this.firstChild);
                this.append(it);
                //console.log(list.innerHTML);
                break;
            }
            else{
                console.log('noooo');
            }
        }
        /*if(document.querySelector('.c'))
        document.querySelector('.chart-list').prepend (this.firstChild);
        this.append(it);*/
    }
    //console.log('drop');
}