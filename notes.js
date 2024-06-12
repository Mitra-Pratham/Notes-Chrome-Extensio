let pagesTempArray = [];


const init = function () {
    createNotesBody();
    //get locally stored items
    chrome.storage.local.get(["textAreaDefault", "boxHeight", "boxWidth", "pagesArray", "textArea"]).then((result) => {
        if (result.textArea !== undefined) {
            chrome.storage.local.set({ textAreaDefault: result.textArea }).then(() => {
                console.log('migrated text area');
                chrome.storage.local.remove('textArea');
            })
        }
        $('#notes-area').val(result.textAreaDefault);
        $('#notes-area-parent').height(result.boxHeight);
        $('#notes-area-parent, .pages-container').width(result.boxWidth);
        result.pagesArray === undefined ? saveCreatePage(pagesArray) : '';
        createPagesTabs(result.pagesArray === undefined ? pagesArray : result.pagesArray);
        createPageDeleteList(result.pagesArray === undefined ? pagesArray : result.pagesArray);

        // $('#height-slider').val(result.boxHeight);
        // $('#width-slider').val(result.boxWidth);
    });

    function createPagesTabs(items) {
        let activeID = $('.active-area').attr('id');
        let tempPageItems = activeID === undefined ? createPageTabItems(items, 'textAreaDefault') : createPageTabItems(items, activeID);
        $('.pages-container').empty();
        $('.pages-container').append(tempPageItems);
    }

    function createPageTabItems(items, active) {
        return items.map(el => {
            return `<button id="${el.id}" class="btn-notes-ext btn-pages ${el.id === active ? 'active-area' : ''}">${el.name}</button>`
        }).join('');
    }

    function createPageDeleteList(array, text) {
        let tempArray = array.map(el => {
            return `
                    <div class="page-actions-item">${el.name}
                        <div class="page-actions-sub">
                            <button value="${el.id}" class="btn-notes-ext export-page">${exportIcon}</button>
                            ${el.id !== 'textAreaDefault' ? `<button value="${el.id}" class="btn-notes-ext delete-page">${deleteIcon}</button>` : ''}
                            
                        </div>
                    </div>`;
        }).join('');
        $('#page-actions-box-container').empty();
        $('#page-actions-box-container').append(tempArray);
        if (text !== 'update') {
            //setting page 1 as default when deletion happens
            $('.active-area').removeClass('active-area');
            $(`#textAreaDefault`).addClass('active-area');
            getLocalStore('text', 'height', 'width', 'textAreaDefault');
        }
    }

    function createPage(text) {
        let tempName = prompt('Enter page name', `Page ${$('.btn-pages').length + 1}`);
        if (tempName != null) {
            tempID = `textArea${Math.round(Math.random() * 90000000)}`
            let randomObj = {
                id: tempID,
                name: tempName,
            }
            chrome.storage.local.get(["pagesArray"]).then((result) => {
                let newArray = result.pagesArray === undefined ? [...pagesArray, randomObj] : [...result.pagesArray, randomObj];
                saveCreatePage(newArray);
                createPagesTabs(newArray);
                createPageDeleteList(newArray);
                chrome.storage.local.set({ [tempID]: text ? text : 'Write notes here' }).then(() => {
                    console.log("Value is set");
                });
            });

        }
    }

    function deletePage(id) {
        let input = confirm('Are you sure you want to delete this page?');
        if (input === true) {
            chrome.storage.local.get(["pagesArray"]).then((result) => {
                let newArray = result.pagesArray.filter(item => item.id !== id);
                saveCreatePage(newArray);
                createPagesTabs(newArray);
                createPageDeleteList(newArray);
            });
            chrome.storage.local.remove([`${id}`]);
        }
    }

    function createSections() {
        let sectionsAreaArray = document.getElementsByClassName('sections-area');
        // let sectionsList = [];
        let sectionToggleContainer = [];
        for (let i = 0; i < sectionsAreaArray.length; i++) {
            let tempID = document.getElementsByClassName('sections-area')[i].id;
            let tempText = $('.sections-area h2').eq(i).text();
            let tempDisplay = document.getElementsByClassName('sections-area')[i].style.display;
            let sectionToggle = `<div class="btn-notes-ext btn-sections-toggle" value="${tempID}" index=${i}>${tempText.substring(0, 15)}${tempText.length > 15 ? '...' : ''}<span class="btn-title">${tempText}</span>
                <div class="btn-sections-toggle-icons">
                    <button class="btn-notes-ext hide-section ${tempDisplay === 'none' ? 'section-hidden' : ''}">
                        ${tempDisplay === 'none' ? eyeSlashIcon : eyeIcon}
                    </button>
                    <div class="edit-sections-container box-ui-layout">
                            <button class="btn-notes-ext move-section" value="up">
                                ${caretUp} Move Up
                            </button>
                            <button class="btn-notes-ext move-section" value="down">
                                ${caretDown} Move Down
                            </button>
                            <button class="btn-notes-ext delete-section">
                                ${deleteIcon} Delete
                            </button>
                        </div>
                </div>
            </div>`
            sectionToggleContainer.push(sectionToggle);
        }
        let addButtons = `
        <div class="section-toggle-heading-container">
            <h5>Sections</h5>
            <div class="section-toggle-heading-icons">
                <button class="btn-notes-ext add-sections-box" value="up">
                    ${addSectionIconUp}<span class="btn-title">Add Section Top</span>
                </button>
                <button class="btn-notes-ext add-sections-box" value="down">
                    ${addSectionIconDown}<span class="btn-title">Add Section Bottom</span>
                </button>
            </div>
        </div>
        `
        //left section toggle
        $('.section-toggle-container').empty();
        $('.section-toggle-container').append(sectionToggleContainer);
        $('.section-toggle-container').prepend(addButtons);
    }

    //update text function
    function saveText(textAreaID) {
        let textArea = $('#notes-area').html();
        chrome.storage.local.set({ [textAreaID]: textArea }).then(() => {
            // console.log("Value is set");
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
        // chrome.storage.local.get(console.log);
    }

    //save page
    function saveCreatePage(pagesArray) {
        chrome.storage.local.set({ pagesArray: pagesArray }).then(() => {
            console.log("Value is set");
        });
    }

    //get text, height and width from the local storage
    function getLocalStore(text, height, width, textAreaID) {
        chrome.storage.local.get([`${textAreaID}`, "boxHeight", "boxWidth"]).then((result) => {
            let tempKey;
            for (const [key, value] of Object.entries(result)) {
                if (key === textAreaID) {
                    tempKey = value;
                }
                else {
                    tempKey = 0;
                }
            }
            text ? $('#notes-area').html(tempKey == 0 ? 'Write New Notes' : tempKey) : '';
            height ? $('#notes-area-parent').height(result.boxHeight) : '';
            width ? $('#notes-area-parent, .pages-container').width(result.boxWidth) : '';
            createSections();
        });
    }

    eventListenersTrigger(saveText, saveHeight, saveWidth, getLocalStore, createSections, createPage, deletePage, saveCreatePage, createPagesTabs, createPageDeleteList);
    // chrome.storage.local.clear();

}

init();