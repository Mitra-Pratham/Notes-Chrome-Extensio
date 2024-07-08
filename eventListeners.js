const eventListenersTrigger = function (saveText, saveHeight, saveWidth, getLocalStore, createSections, createPage, deletePage, saveCreatePage, createPagesTabs) {
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
    // $('.show-sections-box').on('click', function () {
    //     $('.show-sections-box').toggleClass('btn-notes-ext-active');
    //     $('#show-sections-box-container').toggle();
    // });

    //adding sections to notes area
    $('#notes-main').on('click', '.add-sections-box', function (e) {
        let val = $(this).attr('value');
        let textAreaID = $('.active-area').attr('id');
        let randomID = `sections-area-${Math.round(Math.random() * 90000000)}`
        let sectionsList = `
        <div id="${randomID}" class="sections-area"><h2>New Section</h2></div>`
        val === 'up' ? $('#notes-area').prepend(sectionsList) : $('#notes-area').append(sectionsList);
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

    //keypress listener here for notes area
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
        $('#notes-area-parent').css('height', changedHeight);
        saveHeight(changedHeight);
    });

    //left side width adjuster
    $('.notes-form-container-left').on('dragend', function (event) {
        let changedWidth = (window.innerWidth - event.clientX);
        $('#notes-area-parent, .pages-container').css('width', changedWidth);
        saveWidth(changedWidth);
    });

    //toggle through pages
    $('#pages-tab-container').on('click', '.btn-pages', function (e) {
        let tempId = $(this).attr('id');
        $('.active-area').removeClass('active-area');
        $(`#${tempId}`).addClass('active-area');
        getLocalStore('text', 'height', 'width', tempId);
    });

     //right click menu for pages
     $('#pages-tab-container').on('contextmenu', '.btn-pages', function (e) {
        e.preventDefault();
        let tempEl = $(this).next('.btn-pages-toggle-icons').find('.edit-pages-container'); //find goes multiple levels down the tree vs children which is one level down only
        console.log(tempEl);
        let tempElOpen = tempEl.hasClass('section-open');
        //hiding previous edit pages containers
        $('.section-open').hide();
        $('.section-open').removeClass('section-open');
        //showing current edit pages container
        if (!tempElOpen) {
            tempEl.addClass('section-open');
            tempEl.show();
        }
    });

    //create page function
    $('.pages-container').on('click', '#createPage', function (e) {
        createPage();
    });

    //import page function
    $('.pages-container').on('click', '#importPage', async function () {
        let fileHandle;
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const fileHandleName = await fileHandle.name;
        const fileName = fileHandleName.substr(0, fileHandleName.lastIndexOf('.'));
        const contents = await file.text();
        createPage(contents,fileName);
    });

    //rename the page
    $('#pages-tab-container').on('click', '.rename-page', function (e) {
        let tempId = $(this).attr('value');
        let tempName = $(this).parents('.btn-pages-toggle-icons').prevAll('.btn-pages').text();
        let newName = prompt('Rename the page', tempName);
        if (newName !== null) {
            chrome.storage.local.get(['pagesArray']).then(result => {
                let newArray = result.pagesArray.map((item) => {
                    if (item.id == tempId) {
                        item.name = newName;
                        return item;
                    }
                    else {
                        return item;
                    }
                })
                saveCreatePage(newArray);
                createPagesTabs(newArray);
            })
        }

    });

    //delete page function
    $('#pages-tab-container').on('click', '.delete-page', function (e) {
        deletePage($(this).attr('value'));
        $('.section-open').hide();
        $('.section-open').removeClass('section-open');
    });

    //get filehandle for export
    async function getNewFileHandle(fileName) {
        const options = {
            suggestedName: fileName,
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

    //export pages functionality
    $('#pages-tab-container').on('click', '.export-page', function (e) {
        let fileID = ($(this).attr('value'));
        let fileName = $(this).parents('.btn-pages-toggle-icons').prevAll('.btn-pages').text();
        let fileContents;
        chrome.storage.local.get([`${fileID}`]).then(result => {
            fileContents = Object.values(result)[0];
        }).then(() => {
            getNewFileHandle(fileName).then((result) => {
                writeFile(result, fileContents);
                $('.section-open').hide();
                $('.section-open').removeClass('section-open');
            })
        })

    });

    //hide sections
    // $('#rtf-buttons').on('click', '.sections-checkbox', function (e) {
    //     let tempID = $(this).attr('name');
    //     let textAreaID = $('.active-area').attr('id');
    //     $(`#${tempID}`).toggle();
    //     saveText(textAreaID);
    //     $('.show-sections-box').toggleClass('btn-notes-ext-active');
    //     $('#show-sections-box-container').toggle();
    //     showSectionsNotication();
    // })

    //scroll to section
    $('#notes-main').on('click', '.btn-sections-toggle', function (e) {
        let tempID = $(this).attr('value');
        jQuery(`#${tempID}`)[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        // showSectionsNotication();
    });

    //hide sections sidebar
    $('#notes-main').on('click', '.hide-section', function (e) {
        let tempID = $(this).parents('.btn-sections-toggle').attr('value');
        let textAreaID = $('.active-area').attr('id');
        if ($(this).hasClass('section-hidden')) {
            $(this).removeClass('section-hidden');
            $(this).html(`${eyeIcon}`);
            $(`#${tempID}`).show();
        }
        else {
            $(this).addClass('section-hidden');
            $(this).html(`${eyeSlashIcon}`);
            $(`#${tempID}`).hide();
        }

        saveText(textAreaID);
        // showSectionsNotication();
    });

    //right click menu for sections
    $('#notes-main').on('contextmenu', '.btn-sections-toggle', function (e) {
        e.preventDefault();
        let tempEl = $(this).find('.edit-sections-container'); //find goes multiple levels down the tree vs children which is one level down only
        let tempElOpen = tempEl.hasClass('section-open');
        //hiding previous edit sections containers
        $('.section-open').hide();
        $('.section-open').removeClass('section-open');
        //showing current edit sections container
        if (!tempElOpen) {
            tempEl.addClass('section-open');
            tempEl.show();
        }
    });

    //deleting sections to notes area
    $('#notes-main').on('click', '.delete-section', function (e) {
        let tempID = $(this).parents('.btn-sections-toggle').attr('value');
        let textAreaID = $('.active-area').attr('id');
        $(`#${tempID}`).remove();
        //hiding edit sections container
        $('.section-open').hide();
        $('.section-open').removeClass('section-open');
        //saving the text area and creating sections again
        saveText(textAreaID);
        createSections();
    });

    //moving sections to notes area
    $('#notes-main').on('click', '.move-section', function (e) {
        let tempLength = $('.btn-sections-toggle').length;
        let tempID = $(this).parents('.btn-sections-toggle').attr('value');
        let tempIndex = Number($(this).parents('.btn-sections-toggle').attr('index'));
        let tempMoveVal = $(this).attr('value');
        let textAreaID = $('.active-area').attr('id');
        let newPosition = tempMoveVal === 'up' ? tempIndex - 1 : tempIndex + 1;
        if (newPosition < tempLength && newPosition >= 0) {
            let tempHolder = $(`#${tempID}`)[0].outerHTML;
            $(`#${tempID}`).remove();
            if (newPosition != 0) {
                $(`#notes-area > div:nth-child(${newPosition})`).after(tempHolder);
            }
            else if (newPosition === 0) {
                $(`#notes-area`).prepend(tempHolder);
            }
            //hiding edit sections container
            $('.section-open').hide();
            $('.section-open').removeClass('section-open');
            //saving the text area and creating sections again
            saveText(textAreaID);
            createSections();
        }

    });

    // let $dragging = null;
    // let dragID = null;
    // $('#notes-main').on('mousedown', '.btn-sections-toggle', function (e) {
    //     e.preventDefault();
    //     dragID = $(this).attr('value');
    //     $(this).attr('unselectable', 'on').addClass('draggable');
    //     let el_w = $(this).outerWidth(),
    //         el_h = $(this).outerHeight();
    //     $('body').on("mousemove", function (e) {
    //         if ($dragging) {
    //             $dragging.offset({
    //                 top: e.pageY - el_h / 2,
    //                 left: e.pageX - el_w / 2
    //             });
    //         }
    //     });
    //     $('.btn-title').hide();
    //     $dragging = $(e.target);
    // }).on('mouseup', '.draggable', function (e) {
    //     e.preventDefault();
    //     let dropData = getHoverElement(e.pageX, e.pageY);
    //     let newPosition = Number(dropData.index);
    //     let textAreaID = $('.active-area').attr('id');
    //         let tempHTML = $(`#${dragID}`)[0].outerHTML;
    //         $(`#${dragID}`).remove();
    //         if (newPosition != 0) {
    //             $(`#notes-area > div:nth-child(${newPosition})`).after(tempHTML);
    //         }
    //         else if (newPosition === 0) {
    //             $(`#notes-area`).prepend(tempHTML);
    //         }
    //         // else if (newPosition >= tempLength) {
    //         //     $(`#notes-area`).append(tempHolder);
    //         // }
    //         //hiding edit sections container
    //         $('.section-open').hide();
    //         $('.section-open').removeClass('section-open');
    //         //saving the text area and creating sections again
    //         saveText(textAreaID);
    //         createSections();
    //     $('.draggable').attr('unselectable', 'off').removeClass('draggable');
    //     $dragging = null;
    // });


    // function getHoverElement(x, y) {
    //     element = "none";
    //     $('.btn-sections-toggle').each(function (i) {
    //         el = this;
    //         el_left = $(el).offset().left;
    //         el_right = $(el).offset().left + $(el).width();
    //         el_top = $(el).offset().top;
    //         el_bottom = $(el).offset().top + $(el).height();

    //         if (x >= el_left && x <= el_right) {
    //             if (y >= el_top && y <= el_bottom) {
    //                 element = {
    //                     index: $(el).attr('index'),
    //                     value: $(el).attr('value')
    //                 }
    //                 return false;
    //             }
    //         }
    //     });
    //     return element;
    // }

}