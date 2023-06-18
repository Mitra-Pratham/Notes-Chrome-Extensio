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

const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`

const olIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`;

const ulIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>`

const init = function () {
    const notesMain = `<div id="notes-main" style="z-index:9999"></div>`
    function notesTab() {
        return `
        <div class="notes-container">
        <div class="notes-header">
            <div id="notes-title" for="notes-area">Notes</div>
            <div style="display:flex; align-items:center;">
                <button class="btn-notes-ext min-box">${minimizeIcon}</button>
                <button class="btn-notes-ext max-box">${maximizeIcon}</button>
                <button class="btn-notes-ext close-box">${closeIcon}</button>
            </div>
        </div>
        <div class="notes-form" style="display:none">
            <div id="notes-form-container" style="display:flex; flex-direction:column">
                <div id="formatter-row">
                <div id="rtf-buttons">
                    <select name="headings-box" id="headings-box">
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                        <option value="p">Paragraph</option>
                    </select>
                    <button class="btn-notes-ext ol-box">${olIcon}</button>
                    <button class="btn-notes-ext ul-box">${ulIcon}</button>
                </div>
                <div id="saved-box-message" class="toaster-message">Your notes have been saved</div>
                </div>
                <div draggable="true" class="notes-form-container-top"></div>
                <div draggable="true" class="notes-form-container-left"></div>
                <section id="notes-area" contenteditable="true">
                    Write your notes here!
                </section>
            </div>
        </div>
    </div>
    `
    };

    //create the HTML
    // const notesShadow = document.createElement('div');
    // notesShadow.id = "notes-shadow";
    // document.body.appendChild(notesShadow);
    // const shadow = notesShadow.attachShadow({mode:"open"});
    // const notesMain = document.createElement('div');
    // notesMain.id='notes-main'
    // notesMain.style.zIndex = '9999';
    // shadow.appendChild(notesMain);
    $('body').append(notesMain);
    $('#notes-main').append(notesTab);

    //get locally stored items
    chrome.storage.local.get(["textArea", "boxHeight", "boxWidth"]).then((result) => {
        console.log(result);
        $('#notes-area').val(result.textArea);
        $('#notes-area').height(result.boxHeight);
        $('#notes-area').width(result.boxWidth);
        $('#height-slider').val(result.boxHeight);
        $('#width-slider').val(result.boxWidth);
    });

    //minimize box
    $('.min-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').hide()
    });

    //maximize box
    $('.max-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').show();
        getText('text', 'height', 'width');
    });

    //close box
    $('.close-box').on('click', function (e) {
        $('#notes-main').remove();
    });

    //ordered list
    $('#headings-box').on('change', function (e) {
        let heading = e.target.value;
        let headingAppend = `<${heading}>heading ${heading.slice(1,2)}<${heading}>`
        $('#notes-area').append(headingAppend);
        saveText();
    });

    //ordered list
    $('.ol-box').on('click', function (e) {
        let olList = `<ol><li>An Item here</li></ol>`
        $('#notes-area').append(olList);
        saveText();
    });

    //unordered list
    $('.ul-box').on('click', function (e) {
        let ulList = `<ul><li>An Item here</li></ul>`
        $('#notes-area').append(ulList);
        saveText();
    });

    // $('.add').on('click', function (e) {
    //     $('#notes-main').append(notesTab)
    // });

    //update on focus
    $('#notes-area').focus(function () {
        getText('text', 'height', 'width');
    })

    //save on focus out
    $('#notes-area').blur(function () {
        saveText();
    })

    // $('#height-slider').on('change', function(){
    //     let heightChange = $('#height-slider').val();
    //     $('#notes-area').css('height', heightChange);
    //     saveHeight();
    // });

    // $('#width-slider').on('change', function(){
    //     let widthChange = $('#width-slider').val();
    //     $('#notes-area').css('width', widthChange);
    //     saveWidth();
    // });

    $('.notes-form-container-top').on('dragend', function (event) {
        let changedHeight = (window.innerHeight - event.clientY);
        $('#notes-area').css('height', changedHeight);
        saveHeight(changedHeight);
    });

    $('.notes-form-container-left').on('dragend', function (event) {
        let changedWidth = (window.innerWidth - event.clientX);
        $('#notes-area').css('width', changedWidth);
        saveWidth(changedWidth);
    });

    //update text function
    function saveText() {
        let textArea = $('#notes-area').html();
        chrome.storage.local.set({ textArea: textArea }).then(() => {
            console.log("Value is set");
        });
        $('#saved-box-message').show();
        setTimeout(() => {
            $('#saved-box-message').hide();
        }, 3000);
    }

    function saveHeight(height) {
        chrome.storage.local.set({ boxHeight: height }).then(() => {
            console.log("Value is set");
        });
    }

    function saveWidth(width) {
        chrome.storage.local.set({ boxWidth: width }).then(() => {
            console.log("Value is set");
        });
    }

    function getText(text, height, width) {
        chrome.storage.local.get(["textArea", "boxHeight", "boxWidth"]).then((result) => {
            text ? $('#notes-area').html(result.textArea) : '';
            height ? $('#notes-area').height(result.boxHeight) : '';
            width ? $('#notes-area').width(result.boxWidth) : '';
        });
    }

    // //resize function
    // $('#notes-area').mouseup(function(){
    //     console.log('heights');
    //     let boxHeight = $('#notes-area').height();
    //     let boxWidth = $('#notes-area').width();
    //     chrome.storage.local.set({ boxHeight: boxHeight, boxWidth:boxWidth }).then(() => {
    //         console.log("Height is set");
    //     });
    // })
}

init();