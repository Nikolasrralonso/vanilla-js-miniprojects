const tools = document.querySelector('.tools');
const main = document.querySelector('.main');
const addBtn = document.getElementById('add');
const clearBtn = document.getElementById('clear');
const editBtn = document.querySelector('.edit');
const deleteBtn = document.querySelector('.delete');



addBtn.addEventListener('click', () => addNewNote());


// clear local storage

clearBtn.addEventListener('click', ()=> {
    localStorage.clear()
    location.reload(); 
});

const addNewNote = function(text=''){
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}" ></div>
        <textarea class="${text ? "hidden" : ""}" placeholder="What's on your mind?"></textarea>
        `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea') 

    textArea.value = text;
    main.innerHTML = text; 

    deleteBtn.addEventListener('click',()=>{
        note.remove();
        updateLocalStorage() // updating LS When removing note
    })

    editBtn.addEventListener('click',()=>{
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('input', (e)=>{
       const {value} = e.target
       main.innerHTML =marked(value);
       updateLocalStorage() // updating LS While typing note 
    })

// Add the note to the body Element

    document.body.appendChild(note);

    
}

// Local Storage

const updateLocalStorage = function(){
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach(note => notes.push(note.value));
    
    localStorage.setItem('notes', JSON.stringify(notes));
} 

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach(note => addNewNote(note))
}