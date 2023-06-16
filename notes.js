// function createDiv(){
//     document.createElement(div)
// }

// let notesDiv = createDiv;

// function createNotesID(el){
//     notesDiv.id = el;
// }

// createNotesID('notes-bar');

// function fetchItems(){
//     fetch(chrome.runtime.getURL('notes.html'))
//   .then((response) => response.text())
//   .then((data) => {
//     document.body.appendChild(notesDiv);
//     document.getElementById('notes-bar').innerHTML = data;
//   });
// }

// fetchItems();

const init = function () {
    const docBody = document.body;
    const injectElement = document.createElement('div');
    injectElement.innerHTML = `
    <style>
    #notes-main{
        position: fixed;
        bottom:2px;
        right: 10rem;
        min-width: 25vw;
        background-color: #fff;
        box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
    }
    </style>
    <div id="notes-main" style="z-index:9999">
    <div style="padding:1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4>Notes</h4>
            <div>
            <button id="min">min</button>
            <button id="max">max</button>
            </div>
        </div>
        <div id="notes-container" style="display:none">
            <div style="display:flex; flex-direction:column;">
            <label for="notes-area">Write Notes here</label>
                <textarea class="form-control" placeholder="Leave a comment here" id="notes-area"
                    style="height: 10rem"></textarea>
            </div>
        </div>
    </div>
</div>
`;
docBody.appendChild(injectElement);
    chrome.storage.local.get(["textArea"]).then((result) => {
        console.log("Value currently is " + result.textArea);
        document.getElementById('notes-area').value = result.textArea;
    });
   
    document.getElementById("min").onclick = function () {
        document.getElementById('notes-container').style.display = "none";
    };
    document.getElementById("max").onclick = function () {
        document.getElementById('notes-container').style.display = "block";
    };

    document.getElementById('notes-area').onfocus = function () {
        chrome.storage.local.get(["textArea"]).then((result) => {
            console.log("Value currently is " + result.textArea);
            document.getElementById('notes-area').value = result.textArea;
            console.log($('#notes-area').val());
        });
    }
    
    document.getElementById('notes-area').onblur = function () {
        let textArea = document.getElementById('notes-area').value;
        chrome.storage.local.set({ textArea: textArea }).then(() => {
            console.log("Value is set");
        });
    }
}

init();