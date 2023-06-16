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

const minimizeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/></svg>`

const maximizeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"/></svg>`

const closeIcon=`<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`

const init = function () {
    const notesMain = `<div id="notes-main" style="z-index:9999"></div>`
    function notesTab(){
        return `
        <div class="notes-container">
            <div class="notes-header" style="display:flex; align-items:center; justify-content:space-between;">
                <div style="font-size:16px; color:#000; font-weight:600; margin:8px 0" for="notes-area">Notes</div>
                <div style="display:flex; align-items:center;">
                <button class="btn-new min-box">${minimizeIcon}</button>
                <button class="btn-new max-box">${maximizeIcon}</button>
                <button class="btn-new close-box">${closeIcon}</button>
                </div>
            </div>
            <div class="notes-form" style="display:none">
                <div style="display:flex; flex-direction:column">
                    <textarea placeholder="Leave a comment here" id="notes-area"
                        style="height: 120px; resize:both; font-family:sans-serif"></textarea>
                </div>
            </div>
        </div>
    `
    } ;
    $('body').append(notesMain);
    $('#notes-main').append(notesTab);
    
    chrome.storage.local.get(["textArea","boxHeight","boxWidth"]).then((result) => {
        $('#notes-area').val(result.textArea);
        $('#notes-area').height(result.boxHeight);
        $('#notes-area').width(result.boxWidth);
    });

    $('.min-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').hide()
    });

    $('.max-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').show();
        chrome.storage.local.get(["textArea","boxHeight","boxWidth"]).then((result) => {
            $('#notes-area').val(result.textArea);
            $('#notes-area').height(result.boxHeight);
            $('#notes-area').width(result.boxWidth);
        });
    });

    $('.close-box').on('click', function (e) {
        $('#notes-main').remove();
    });

    // $('.add').on('click', function (e) {
    //     $('#notes-main').append(notesTab)
    // });

    $('#notes-area').focus(function () {
        chrome.storage.local.get(["textArea"]).then((result) => {
            $('#notes-area').val(result.textArea);
        });
    })

    $('#notes-area').blur(function () {
        let textArea = $('#notes-area').val();
        chrome.storage.local.set({ textArea: textArea }).then(() => {
            console.log("Value is set");
        });
    })

    $('#notes-area').mouseup(function(){
        console.log('heights');
        let boxHeight = $('#notes-area').height();
        let boxWidth = $('#notes-area').width();
        chrome.storage.local.set({ boxHeight: boxHeight, boxWidth:boxWidth }).then(() => {
            console.log("Height is set");
        });
    })
}

init();