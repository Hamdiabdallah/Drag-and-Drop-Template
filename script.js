const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listeArray = [];


// Drag Functionality
let dragItem ;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax','aaaaaaaaaaaaa'];
    progressListArray = ['Work on projects', 'Listen to music'];
    onHoldListArray = ['Being uncool','zzzzzzzzzz'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    
  }
}
// getSavedColumns()
// updateSavedColumns()

// Set localStorage Arrays
function updateSavedColumns() {
  listeArray = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
  const arrayNames = ['backlog','progress','complete','onHold'] ;
  arrayNames.forEach((arrayName,index) => {
    localStorage.setItem(`${arrayName}Items`,JSON.stringify(listeArray[index]));
  })
  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item; 
  listEl.draggable = true
  listEl.setAttribute('ondragstart','drag(event)')
  // append 
  columnEl.appendChild(listEl)


}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {

  // Check localStorage once
  if(!updatedOnLoad){
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent ='';
  backlogListArray.forEach((backlogItem,index) =>{
    createItemEl(backlogList,0,backlogItem,index)
  })
  // Progress Column
  progressList.textContent ='';
  progressListArray.forEach((progressItem,index) =>{
    createItemEl(progressList,0,progressItem,index)
  })
  // Complete Column
  completeList.textContent ='';
  completeListArray.forEach((completeItem,index) =>{
    createItemEl(completeList,0,completeItem,index)
  })
  // On Hold Column
  onHoldList.textContent ='';
  onHoldListArray.forEach((onHoldItem,index) =>{
    createItemEl(onHoldList,0,onHoldItem,index)
  })
  // Run getSavedColumns only once, Update Local Storage


}
// column allows for item to drop 
function allowDrop(e){
  e.preventDefault()
}
// when item start dragging 
function drag(e){
  e.preventDefault()
  // remove background color & padding
  listColumns.forEach(column => {
    column.classList.remove('over')
  })
}
// when item enter column area
function dragEnter(column){
listColumns[column].classList.add('over')
}
// on load Dom 

updateDOM()

