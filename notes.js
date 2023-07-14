const shortcutKeys = [
    {
        name: `Cut`,
        keys: `Ctrl + X`,
    },
    {
        name: `Copy`,
        keys: `Ctrl + C`,
    },
    {
        name: `Paste`,
        keys: `Ctrl + V`,
    },
    {
        name: `Bold`,
        keys: `Ctrl + B`,
    },
    {
        name: `Italics`,
        keys: `Ctrl + I`,
    },
    {
        name: `Unordered List and Sub Bullets`,
        keys: `Ctrl + ]`,
    },
    {
        name: `Ordered List and Sub Bullets`,
        keys: `Tab`,
    },
    {
        name: `Convert text to links`,
        keys: `Ctrl + K`,
    },
]

function createShortcuts() {
    return (
        shortcutKeys.map((el) => {
            return `<div class="small-paras">${el.name} - <b>${el.keys}</b></div>`
        }).join(""));
}

const headingsArray = [
    {
        name: `Heading 1`,
        value: `h1`,
    },
    {
        name: `Heading 2`,
        value: `h2`,
    },
    {
        name: `Heading 3`,
        value: `h3`,
    },
    {
        name: `Heading 4`,
        value: `h4`,
    },
    {
        name: `Heading 5`,
        value: `h5`,
    },
    {
        name: `Heading 6`,
        value: `h6`,
    },
    {
        name: `Paragraph`,
        value: `p`,
    },
]
const colorsArray = [
    {
        name: `Black`,
        value: `black`,
    },
    {
        name: `White`,
        value: `white`,
    },
    {
        name: `Red`,
        value: `red`,
    },
    {
        name: `Blue`,
        value: `blue`,
    },
    {
        name: `Green`,
        value: `green`,
    },
    {
        name: `Yellow`,
        value: `yellow`,
    },
]


function createButtons(array, color) {
    return (
        array.map((el) => {
            return `<button class="btn-notes-ext" value="${el.value}" title="${el.name}">
                ${color ? colorAdd(el.value) : ''} ${color ? '' : el.name}</button>`
        }).join(""));

    function colorAdd(value) {
        return `<div value=${value} style="border:1px solid #ddd; border-radius:2px; height:14px; width:14px; background-color:${value}"></div>`
    }
}

const minimizeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/></svg>`

const maximizeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"/></svg>`

const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="12px" fill="#0d6efd" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`

const headingIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>`

const olIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`;

const ulIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>`;

const colorsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 448 512"><path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"/></svg>`;

const bgIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 576 512"><path d="M315 315l158.4-215L444.1 70.6 229 229 315 315zm-187 5l0 0V248.3c0-15.3 7.2-29.6 19.5-38.6L420.6 8.4C428 2.9 437 0 446.2 0c11.4 0 22.4 4.5 30.5 12.6l54.8 54.8c8.1 8.1 12.6 19 12.6 30.5c0 9.2-2.9 18.2-8.4 25.6L334.4 396.5c-9 12.3-23.4 19.5-38.6 19.5H224l-25.4 25.4c-12.5 12.5-32.8 12.5-45.3 0l-50.7-50.7c-12.5-12.5-12.5-32.8 0-45.3L128 320zM7 466.3l63-63 70.6 70.6-31 31c-4.5 4.5-10.6 7-17 7H24c-13.3 0-24-10.7-24-24v-4.7c0-6.4 2.5-12.5 7-17z"/></svg>`

const addSectionsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 512 512"><path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/></svg>`;

const showSectionsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="14px" fill="#0d6efd" viewBox="0 0 576 512"><path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z"/></svg>`

const shortcutIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="#0d6efd" height="14px" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm16 64h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V144zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16H400c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336zM272 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM368 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V240zM464 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16z"/></svg>`

const init = function () {
    const notesMain = `<div id="notes-main" style="z-index:9999"></div>`
    function notesTab() {
        return `
        <div class="notes-container">
        <div class="notes-header">
            <div id="notes-title" for="notes-area">Notes</div>
            <div class="notes-header-buttons">
                <button class="btn-notes-ext min-box" title="Minimize">${minimizeIcon}</button>
                <button class="btn-notes-ext max-box" title="Maximize">${maximizeIcon}</button>
                <button class="btn-notes-ext close-box" title="Close">${closeIcon}</button>
            </div>
        </div>
        <div class="notes-form" style="display:none">
            <div id="notes-form-container" style="display:flex; flex-direction:column">
                <div id="formatter-row">
                <div id="rtf-buttons">
                <button class="btn-notes-ext headings-box" title="Headings">${headingIcon}</button>
                    <div id="headings-box-container" class="box-ui-layout">
                        ${createButtons(headingsArray)}
                    </div>
                    <button class="btn-notes-ext ol-box" title="Ordered List - Tab">${olIcon}</button>
                    <button class="btn-notes-ext ul-box" title="Unordered List - Ctrl+]">${ulIcon}</button>
                    <button class="btn-notes-ext colors-box" title="Font Colors">${colorsIcon}</button>
                        <div id="colors-box-container" class="box-ui-layout">
                        ${createButtons(colorsArray, true)}
                        </div>
                    <button class="btn-notes-ext background-box" title="Background Color">${bgIcon}</button>
                        <div id="background-box-container" class="box-ui-layout">
                        ${createButtons(colorsArray, true)}
                        </div>
                    <button class="btn-notes-ext add-sections-box" title="Add Sections">${addSectionsIcon}</button>
                    <button class="btn-notes-ext show-sections-box" title="Show/Hide Sections">${showSectionsIcon}</button>
                    <div id="show-sections-notification">⬤</div>
                        <div id="show-sections-box-container" class="box-ui-layout">
                        </div>
                    <button class="btn-notes-ext shortcuts-box" title="Shortcuts">${shortcutIcon}</button>
                    <div id="shortcuts-box-container" class="box-ui-layout">
                    ${createShortcuts()}
                    </div>
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
        // console.log(result);
        $('#notes-area').val(result.textArea);
        $('#notes-area').height(result.boxHeight);
        $('#notes-area').width(result.boxWidth);
        // $('#height-slider').val(result.boxHeight);
        // $('#width-slider').val(result.boxWidth);
    });

    function createSections() {
        let sectionsAreaArray = document.getElementsByClassName('sections-area');
        let sectionsList = [];
        for (let i = 0; i < sectionsAreaArray.length; i++) {
            let tempID = document.getElementsByClassName('sections-area')[i].id;
            let tempText = document.getElementsByClassName('sections-area')[i].innerText;
            let tempDisplay = document.getElementsByClassName('sections-area')[i].style.display;
            let checkSection = `<div>
                        <input class="${tempID} sections-checkbox" name="${tempID}" type="checkbox" ${tempDisplay === 'none' ? '' : 'checked'}>
                        <label for="${tempID}"> ${tempText.substring(0, 20)}...</label>
            </div>`
            sectionsList.push(checkSection);
        }
        $('#show-sections-box-container').empty();
        $('#show-sections-box-container').append(sectionsList);
        for (let i = 0; i < document.getElementsByClassName('sections-area').length; i++) {
            let tempID = document.getElementsByClassName('sections-area')[i].id;
            $(`.${tempID}`).on('click', function () {
                $(`#${tempID}`).toggle();
                saveText();
                $('.show-sections-box').toggleClass('btn-notes-ext-active');
                $('#show-sections-box-container').toggle();
                showSectionsNotication();
            });
        }
        showSectionsNotication();
    }

    function showSectionsNotication(){
        $('#show-sections-box-container .sections-checkbox:checked').length == $('#show-sections-box-container .sections-checkbox').length  ? $('#show-sections-notification').hide() : $('#show-sections-notification').show();
    }

    //minimize box
    $('.min-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').hide()
    });

    //maximize box
    $('.max-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').show();
        getLocalStore('text', 'height', 'width');
        // createSections();
    });

    //close box
    $('.close-box').on('click', function (e) {
        $('#notes-main').remove();
    });

    //headings box toggle
    $('.headings-box').click(function () {
        $('.headings-box').toggleClass('btn-notes-ext-active');
        $('#headings-box-container').toggle();
    });

    //adding headings to notes area
    $('#headings-box-container button').on('click', function (e) {
        let heading = e.target.value;
        let headingElement = `<${heading}>Heading ${heading.slice(1, 2)}</${heading}>`;
        $('#notes-area').append(headingElement);
        saveText();
        $('#headings-box-container').hide();
        $('.headings-box').removeClass('btn-notes-ext-active');
    });


    //adding ordered list to notes area
    $('.ol-box').on('click', function (e) {
        let olList = `<ol><li>An Item here</li></ol>`
        $('#notes-area').append(olList);
        saveText();
    });

    //adding unordered list to notes area
    $('.ul-box').on('click', function (e) {
        let ulList = `<ul><li>An Item here</li></ul>`
        $('#notes-area').append(ulList);
        saveText();
    });

    //colors box toggle
    $('.colors-box').click(function () {
        $('.colors-box').toggleClass('btn-notes-ext-active');
        $('#colors-box-container').toggle();
    });

    //adding color to selected font
    $('#colors-box-container button').on('click', function (e) {
        //get cursor position
        let sel = window.getSelection();
        let coloredText = document.createElement('span');
        coloredText.innerText = sel.toString();
        coloredText.style.color = $(this).val();
        sel.getRangeAt(0).deleteContents();
        sel.getRangeAt(0).insertNode(coloredText);
        saveText();
        $('#colors-box-container').hide();
        $('.colors-box').removeClass('btn-notes-ext-active');

    });

    //background box toggle
    $('.background-box').click(function () {
        $('.background-box').toggleClass('btn-notes-ext-active');
        $('#background-box-container').toggle();
    });

    //adding background color to selected font
    $('#background-box-container button').on('click', function (e) {
        //get cursor position
        let sel = window.getSelection();
        let backgroundText = document.createElement('span');
        backgroundText.innerText = sel.toString();
        backgroundText.style.backgroundColor = $(this).val();
        sel.getRangeAt(0).deleteContents();
        sel.getRangeAt(0).insertNode(backgroundText);
        saveText();
        $('#background-box-container').hide();
        $('.background-box').removeClass('btn-notes-ext-active');

    });

    //show sections box toggle
    $('.show-sections-box').click(function () {
        $('.show-sections-box').toggleClass('btn-notes-ext-active');
        $('#show-sections-box-container').toggle();
    });

    
    //adding sections to notes area
    $('.add-sections-box').on('click', function (e) {
        let randomID = `sections-area-${Math.round(Math.random() * 90000000)}`
        let sectionsList = `
     <div id="${randomID}" class="sections-area"><h2>New Section</h2></div>`
        $('#notes-area').append(sectionsList);
        saveText();
        createSections();
    });

    //update on focus
    $('#notes-area').focus(function () {
        getLocalStore('text', 'height', 'width');
    });

    // save on focus out
    $('#notes-area').blur(function () {
        saveText();
        createSections();
    });

    //keypress listener here
    $('#notes-area').on('keydown', function (event) {
        console.log(event.keyCode);
        // shortcut tab
        if (event.keyCode === 9) {
            event.preventDefault();
            //get cursor position - unordered lists
            let sel = window.getSelection();
            let ulElement = document.createElement('ul');
            ulElement.innerHTML = '<li>An item here</li>'
            sel.getRangeAt(0).insertNode(ulElement);
        }
        // shortcut ctrl+\ - ordered lists
        else if (event.ctrlKey && event.keyCode === 28) {
            //get cursor position
            let sel = window.getSelection();
            let olElement = document.createElement('ol');
            olElement.innerHTML = '<li>An item here</li>'
            sel.getRangeAt(0).insertNode(olElement);
        }
        // shortcut ctrl+shift+k - adding links
        else if (event.ctrlKey && event.keyCode === 75) {
            event.preventDefault();
            console.log('fired');
            //get cursor position
            let sel = window.getSelection();
            let anchorTag = document.createElement('span');
            let anchorLink = prompt('please enter URL here', 'https://google.com');
            if (anchorLink) {
                anchorTag.innerHTML = `<a href=${anchorLink} target="_blank">${sel.toString()}</a>`
                sel.getRangeAt(0).deleteContents();
                sel.getRangeAt(0).insertNode(anchorTag);
            }
        }

    });

    //top side height adjuster
    $('.notes-form-container-top').on('dragend', function (event) {
        let changedHeight = (window.innerHeight - event.clientY);
        $('#notes-area').css('height', changedHeight);
        saveHeight(changedHeight);
    });

    //left side width adjuster
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

    //save height function
    function saveHeight(height) {
        chrome.storage.local.set({ boxHeight: height }).then(() => {
            console.log("Value is set");
        });
    }

    //save width
    function saveWidth(width) {
        chrome.storage.local.set({ boxWidth: width }).then(() => {
            console.log("Value is set");
        });
    }

    //get text, height and widht from the local storage
    function getLocalStore(text, height, width) {
        chrome.storage.local.get(["textArea", "boxHeight", "boxWidth"]).then((result) => {
            text ? $('#notes-area').html(result.textArea) : '';
            height ? $('#notes-area').height(result.boxHeight) : '';
            width ? $('#notes-area').width(result.boxWidth) : '';
            createSections();

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