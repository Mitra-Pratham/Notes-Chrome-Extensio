const createNotesBody = function(){
    function createShortcuts() {
        return (
            shortcutKeys.map((el) => {
                return `<div class="small-paras">${el.name} - <b>${el.keys}</b></div>`
            }).join(""));
    }
    
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
                            <button id="createPage" class="btn-notes-ext" title="Create Page">${createPagesIcon}</button>
                        <button id="pageActions" class="btn-notes-ext" title="Page Actions">${pageActionsIcon}</button>
                        <div id="page-actions-box-container" class="box-ui-layout">
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
                    <div class="pages-container">
                        
                    </div>
                    <section id="notes-area" contenteditable="true">
                        Write your notes here!
                    </section>
                </div>
            </div>
        </div>
        `
        };
    
        $('body').append(notesMain);
        $('#notes-main').append(notesTab);
}