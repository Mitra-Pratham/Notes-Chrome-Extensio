const eventListenersTrigger = function (saveText, saveHeight, saveWidth, getLocalStore, createSections, createPage, deletePage, saveCreatePage, createPagesTabs, createPageDeleteList) {
    //minimize box
    $('.min-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').hide()
    });

    //maximize box
    $('.max-box').on('click', function (e) {
        $(e.target).offsetParent('.notes-header').find('.notes-form').show();
        getLocalStore('text', 'height', 'width', 'textAreaDefault');
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

    //delete box toggle
    $('#pageActions').click(function () {
        $('pageActions').toggleClass('btn-notes-ext-active');
        $('#page-actions-box-container').toggle();
    });

    //adding headings to notes area
    $('#headings-box-container button').on('click', function (e) {
        let textAreaID = $('.active-area').attr('id');
        let heading = e.target.value;
        let headingElement = `<${heading}>Heading ${heading.slice(1, 2)}</${heading}>`;
        $('#notes-area').append(headingElement);
        saveText(textAreaID);
        $('#headings-box-container').hide();
        $('.headings-box').removeClass('btn-notes-ext-active');
    });


    //adding ordered list to notes area
    $('.ol-box').on('click', function (e) {
        let textAreaID = $('.active-area').attr('id');
        let olList = `<ol><li>An Item here</li></ol>`
        $('#notes-area').append(olList);
        saveText(textAreaID);
    });

    //adding unordered list to notes area
    $('.ul-box').on('click', function (e) {
        let textAreaID = $('.active-area').attr('id');
        let ulList = `<ul><li>An Item here</li></ul>`
        $('#notes-area').append(ulList);
        saveText(textAreaID);
    });

    //colors box toggle
    $('.colors-box').on('click', function () {
        $('.colors-box').toggleClass('btn-notes-ext-active');
        $('#colors-box-container').toggle();
    });

    //adding color to selected font
    $('#colors-box-container button').on('click', function (e) {
        let textAreaID = $('.active-area').attr('id');
        //get cursor position
        let sel = window.getSelection();
        let coloredText = document.createElement('span');
        coloredText.innerText = sel.toString();
        coloredText.style.color = $(this).val();
        sel.getRangeAt(0).deleteContents();
        sel.getRangeAt(0).insertNode(coloredText);
        saveText(textAreaID);
        $('#colors-box-container').hide();
        $('.colors-box').removeClass('btn-notes-ext-active');

    });

    //background box toggle
    $('.background-box').on('click', function () {
        $('.background-box').toggleClass('btn-notes-ext-active');
        $('#background-box-container').toggle();
    });

    //adding background color to selected font
    $('#background-box-container button').on('click', function (e) {
        let textAreaID = $('.active-area').attr('id');
        //get cursor position
        let sel = window.getSelection();
        let backgroundText = document.createElement('span');
        backgroundText.innerText = sel.toString();
        backgroundText.style.backgroundColor = $(this).val();
        sel.getRangeAt(0).deleteContents();
        sel.getRangeAt(0).insertNode(backgroundText);
        saveText(textAreaID);
        $('#background-box-container').hide();
        $('.background-box').removeClass('btn-notes-ext-active');

    });

    //show sections box toggle
    $('.show-sections-box').on('click', function () {
        $('.show-sections-box').toggleClass('btn-notes-ext-active');
        $('#show-sections-box-container').toggle();
    });


    //adding sections to notes area
    $('.add-sections-box').on('click', function (e) {
        let textAreaID = $('.active-area').attr('id');
        let randomID = `sections-area-${Math.round(Math.random() * 90000000)}`
        let sectionsList = `
     <div id="${randomID}" class="sections-area"><h2>New Section</h2></div>`
        $('#notes-area').append(sectionsList);
        saveText(textAreaID);
        createSections();
    });

    //update on focus
    $('#notes-area').on('focus', function () {
        let textAreaID = $('.active-area').attr('id');
        getLocalStore('text', 'height', 'width', `${textAreaID}`);
    });

    // save on focus out
    $('#notes-area').on('blur', function () {
        let textAreaID = $('.active-area').attr('id');
        saveText(textAreaID);
        createSections();
    });

    //keypress listener here
    $('#notes-main').on('keydown', '#notes-area', function (e) {
        // shortcut tab
        let sel = window.getSelection();
        let range = sel.getRangeAt(0);

        switch (e.keyCode) {
            case 9:
                {
                    e.preventDefault();
                    //get cursor position - unordered lists
                    let ulElement = document.createElement('ul');
                    ulElement.innerHTML = '<li></li>'
                    range.insertNode(ulElement);
                    range.selectNodeContents(ulElement);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    break;
                }

            case 28:
                if (e.ctrlKey) {
                    let sel = window.getSelection();
                    let olElement = document.createElement('ol');
                    olElement.innerHTML = '<li></li>'
                    range.insertNode(olElement);
                    range.selectNodeContents(olElement);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                break;

            case 75:
                if (e.ctrlKey) {
                    e.preventDefault();
                    //get cursor position
                    let anchorTag = document.createElement('span');
                    let anchorLink = prompt('please enter URL here', 'https://google.com');
                    if (anchorLink) {
                        anchorTag.innerHTML = `<a href=${anchorLink} target="_blank">${sel.toString()}</a>`
                        range.deleteContents();
                        range.insertNode(anchorTag);
                    }
                }
                break;

            default:
                break;
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
        $('#notes-area, .pages-container').css('width', changedWidth);
        saveWidth(changedWidth);
    });

    //toggle through pages
    $('.pages-container').on('click', '.btn-pages', function (e) {
        let tempId = $(this).attr('id');
        $('.active-area').removeClass('active-area');
        $(`#${tempId}`).addClass('active-area');
        getLocalStore('text', 'height', 'width', tempId);
    });

    $('.pages-container').on('dblclick', '.btn-pages', function (e) {
        let tempId = $(this).attr('id');
        let newName = prompt('Rename the page');
        if(newName !== null){
            chrome.storage.local.get(['pagesArray']).then(result => {
                let newArray = result.pagesArray.map((item) => {
                    if(item.id == tempId) {
                        item.name = newName;
                        return item;
                }
                else{
                    return item;
                }
            })
                saveCreatePage(newArray);
                createPagesTabs(newArray);
                createPageDeleteList(newArray,'update');
            })
        }

    });

    //create page function
    $('#rtf-buttons').on('click', '#createPage', function (e) {
        createPage();
    });

    $('#page-actions-box-container').on('click', '.delete-page', function (e) {
        deletePage($(this).attr('value'));
    });

    async function getNewFileHandle() {
        const options = {
            suggestedName: 'New Page.html',
            startIn: 'downloads',
            types: [
                {
                    description: 'Text Files',
                    accept: {
                        'text/plain': ['.html'],
                    },
                },
            ],
        };
        const handle = await window.showSaveFilePicker(options);
        return handle;
    }

    async function writeFile(fileHandle, contents) {
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    }

    $('#page-actions-box-container').on('click', '.export-page', function (e) {
        let fileID = ($(this).attr('value'));
        let fileContents;
        chrome.storage.local.get([`${fileID}`]).then(result => {
            fileContents = Object.values(result)[0];
        }).then(() => {
            getNewFileHandle().then((result) => {
                writeFile(result, fileContents)
            })
        })

    });
}