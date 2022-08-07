import Note from "./models.js";


const NOTES_MAIN_STORE = "MAIN_STORE";
const NOTES_DELETED_STORE = "DELETED_STORE";
const root = document.getElementById('populate');
let cboxid = "";


//************ EVENTS ******************** */
populateData();
// When Add button clicked
document.getElementById('add').addEventListener('click', () => {
    let id = 0;
    let title = document.getElementById("text1").value;
    let desc = document.getElementById('desc').value;
    if (title == '') { alert('First enter title') }
    else if(desc == ''){alert('write some note pleasee') 

    }
    else {
        let note = new Note(id, title, desc);
        addNotes(note);
        populateData();
        document.location.reload(true);
        document.getElementById("text1").value = '';
        document.getElementById('desc').value = '';
        alert('Note Added');
    }
});
// when delete button clicked

root.querySelectorAll('._delete').forEach(element => {
    element.addEventListener('click', () => {
        const doDelete = confirm('Are you sure?');
        if (doDelete) {
            deleteNote(element.dataset.deleteId);
            populateData();
            document.location.reload(true);
        }
    });
});

// when edit button is clicked
root.querySelectorAll('.edit').forEach(element => {
    element.addEventListener('click', () => {
        document.getElementById('add').disabled = true;
        let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
        let id = element.dataset.editId;
        if (id) {
            let searched_item = main_data_array.filter(t => t.id == id);
            if (searched_item != null) {
                document.getElementById("text1").value = searched_item[0].title;
                document.getElementById("desc").value = searched_item[0].desc;
                document.querySelector('.edt').addEventListener('click', () => {
                    let title = document.getElementById("text1").value;
                    let desc = document.getElementById('desc').value;
                    if (title == '') { alert('First enter title') }
                    else {
                        let note = new Note(id, title, desc);
                        UpdateNotes(note);
                        populateData();
                        document.getElementById("text1").value = '';
                        document.getElementById('desc').value = '';
                        alert('Note Updated');
                        document.location.reload(true);
                    }
                });
            }
        }
    });
});

//when check box is checked
root.querySelectorAll(".cbox").forEach(element =>
    element.addEventListener('click', () => {
        if(element.checked == true) {
            cboxid += element.dataset.checkId;
            let x = cboxid.split('');
            console.log(x);
            document.querySelector(".delselect").addEventListener('click', () => {
                DeleteSelected(x);
                document.location.reload(true);
            });
        }else{
            cboxid='';
        }

    }));
//******************************************************* */
// root.querySelectorAll('.cbox').forEach(element => {
//     element.addEventListener('click', () => {
//         cboxid += element.dataset.checkId;
//         arr_numeric = cboxid.split('').map(element => {
//             return Number(element);
//         });
//         //id=element.dataset.checkid;

//         console.log(arr_numeric,"arr numeric");
//         document.querySelector('.delselect').addEventListener('click', DeleteSelected(arr_numeric));

//     })
// });

function DeleteSelected(ids) {
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE)|| '[]');
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) ||  '[]');
    for (let id of ids) {
        var delNotes = main_data_array.find(note => note.id == id);
    }

    let newArray = main_data_array.filter(t => t.id != delNotes.id);
    deleted_array.push(delNotes);
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify(deleted_array));
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(newArray));

}
    document.querySelector('.archive').addEventListener('click',()=>{
            root.style.visibility= "hidden";
    });
    document.querySelector('.show').addEventListener('click',()=>{
        root.style.visibility= "visible";
});

// function DeleteSelected(arr_numeric) {
//     let ids=arr_numeric;
//     let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');
//     let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
//      for(let id=0;id<ids.length;id++){
//         var delNotes = main_data_array.find(note=>note.id==ids[id]);
//         console.log(delNotes,"searc itemssss");

//         // if (delNotes!= null) {
//             for(let i=0; i<delNotes.length;i++){
//                 deleted_array.push(i);
//                 console.log(i,"iiiii of del note");
//             }
//         // }
//         const newArray = main_data_array.filter(note => note.id != delNotes.id);
//         localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(newArray));
//         localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify(deleted_array));
//      }
//     }

// function deleteSelected(idArray) {
//     let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
//     let searched_item = main_data_array.find(function (t) {
//         for (let i=0; i<idArray.length;i++) {
//             t.id == idArray[i];
//         }
//     });
//     console.log(searched_item, "search walaa items");
// if (searched_item != null) {
//     searched_item[0].title;
// }
// }

//when restore button is clicked
document.querySelector('.restoreall').addEventListener('click', () => {
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    for (let i of deleted_array) {
        main_data_array.push(i);
    }
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify([]));
    populateData();
    document.location.reload(true);
});

//***************************** END OF EVENTS  ********************** */
document.querySelectorAll('.clr')[0].addEventListener('click', clr);
function clr() {
    let ask = confirm("This will remove all of your data.");
    if (ask) {
        let sure = confirm("Are You Sure..?");
        if (sure) {
            localStorage.clear();
            populateData();
        }
    }

}


function populateData() {
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    if (main_data_array.length !== 0) {
        let str = "";
        let sno = 1;
        main_data_array.sort((a, b) => {
            return new Date(a._date) > new Date(b._date) ? -1 : 1;
        });
        main_data_array.forEach((element) => {
            str = str +
                `<div class="box2-2">
                <h3><input type="checkbox" data-check-id="${element.id}" class="cbox">${sno}</h3>
            <h3 class="note-title">${element.title}</h3>
            <p class="note">${element.desc}</p>
            <button class="_delete" data-delete-id="${element.id}">Delete Note</button>
            <button class="edit" data-edit-id="${element.id}">Edit Note</button>
            <p class="date">${element._date} </p>
            </div>`
            sno++;
        });
        root.innerHTML = str;
    } else { root.innerHTML = `<h1>No Notes Available...</h1>`; }
}

function GetMaxIdFromNotes(main_data_array) {
    let id = 0;
    for (let i = 0; i < main_data_array.length; i++) {
        id = main_data_array[i].id > id ? main_data_array[i].id : id;
    }
    return id;
}

function addNotes(note) {
    // Increment the latest ID
    note._date = new Date().toLocaleString();
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    note.id = GetMaxIdFromNotes(main_data_array) + 1;
    main_data_array.push(note);
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
}

function deleteNote(id) {
    console.log(id);
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');
    let searched_item = main_data_array.filter(t => t.id == id);
    //let index = main_data_array.findIndex(x => x.Id === id);
    if (searched_item != null) {
        deleted_array.push(searched_item[0]);
        //main_data_array.splice(index, 1);
    }
    const newNote = main_data_array.filter(note => note.id != id);
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(newNote));
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify(deleted_array));
}


function UpdateNotes(note) {

    note._date = new Date().toLocaleString();
    //get the data from local storage
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    // let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');
    //let searched_item = main_data_array.filter(t => t.id == note.id);
    //let index = main_data_array.findIndex(x => x.Id === id);
    // console.log('indexss',index);
    let existing = main_data_array.find(t => t.id == note.id);
    if (existing) {
        existing.title = note.title;
        existing.desc = note.desc;
        existing._date = note._date;
    }
    // if (searched_item != null) {
    //     let index =Number(searched_item[0].id);
    //     main_data_array.splice(index - 1, 1, note);
    // }
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
}



/**
 * This function will add notes to the collection
 * ids - .Comma separted ids
 */
function DeleteNotes(ids) {

    let x = [];
    x.includes;

    const arr_numeric = ids.split(',').map(element => {
        return Number(element);
    });

    //getItem the data from local storage
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');

    let searched_items = main_data_array.filter(function (e) {

        return arr_numeric.includes(e.id);
    });
    console.log(searched_items, "search item in deletenotesss");
    let indexes = main_data_array.findIndex(function (e) {

        return arr_numeric.includes(e.id);
    });
    console.log(indexes, "indexesssss");
    //let index = main_data_array.findIndex( x => x.Id === id );

    if (searched_items != null && searched_items.length > 0) {

        deleted_array.push(searched_items);

        for (let i = 0; i < indexes.length; i++) {
            main_data_array.splice(indexes[i], 1);
        }
        //apply remove logic
    }


    //after this step we will have id populated with max id value.
    //  note.id = this.getMaxIdFromNotes(main_data_array, deleted_array) + 1;
    // main_data_array.push(note);

    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify(deleted_array));
}

