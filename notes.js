let pagesTempArray = [];


const init = function () {
    createNotesBody();
    //get locally stored items
    chrome.storage.local.get(["textAreaDefault", "boxHeight", "boxWidth", "pagesArray", "textArea"]).then((result) => {
        if(result.textArea !== undefined){
            chrome.storage.local.set({textAreaDefault:result.textArea}).then(() => {
                console.log('migrated text area');
                chrome.storage.local.remove('textArea');
            })
        }
        $('#notes-area').val(result.textAreaDefault);
        $('#notes-area').height(result.boxHeight);
        $('#notes-area, .pages-container').width(result.boxWidth);
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
            return `<button id="${el.id}" class="btn-notes-ext btn-pages ${el.id === active ? 'active-area' : ''}" title="${el.name}">${el.name}</button>`
        }).join('');
    }

    function createPageDeleteList(array, text){
        let tempArray = array.map(el=>{
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
        if(text !== 'update'){
            //setting page 1 as default when deletion happens
        $('.active-area').removeClass('active-area');
        $(`#textAreaDefault`).addClass('active-area');
            getLocalStore('text', 'height', 'width', 'textAreaDefault');
        }
    }

    function createPage(text) {
        let tempName = prompt('Enter page name',`Page ${$('.btn-pages').length+1}`);
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
                chrome.storage.local.set({ [tempID]: text ? text: 'Write notes here' }).then(() => {
                    console.log("Value is set");
                });
            });
            
        }
    }

    function deletePage(id){
            let input = confirm('Are you sure you want to delete this page?');
            if(input === true){
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
        showSectionsNotication();
    }

    function showSectionsNotication() {
        $('#show-sections-box-container .sections-checkbox:checked').length == $('#show-sections-box-container .sections-checkbox').length ? $('#show-sections-notification').hide() : $('#show-sections-notification').show();
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
            height ? $('#notes-area').height(result.boxHeight) : '';
            width ? $('#notes-area, .pages-container').width(result.boxWidth) : '';
            createSections();
        });
    }

    eventListenersTrigger(saveText, saveHeight, saveWidth, getLocalStore, createSections, createPage, deletePage,saveCreatePage, createPagesTabs, createPageDeleteList,showSectionsNotication);
    // chrome.storage.local.clear();

}

init();