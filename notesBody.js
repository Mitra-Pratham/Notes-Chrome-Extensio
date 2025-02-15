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
                return `<button class="btn-notes-ext" value="${el.value}">
                    ${color ? colorAdd(el.value) : ''} ${color ? '' : el.name}<span class="btn-title">${el.name}</span></button>`
            }).join(""));
    
        function colorAdd(value) {
            return `<div value=${value} style="border:1px solid #ddd; border-radius:2px; height:14px; width:14px; background-color:${value}"></div>`
        }
    }
    
    const notesMain = `<div id="notes-main" style="z-index:9999"></div>`
        function notesTab() {
            return `
            <div class="notes-container">
            <div class="notes-header notes-main-draggable" draggable="true">
                <div id="notes-title" for="notes-area">Notes v0.92</div>
                <div class="notes-header-buttons">
                    <button class="btn-notes-ext min-box">${minimizeIcon} <span class="btn-title">Minimize</span></button>
                    <button class="btn-notes-ext max-box">${maximizeIcon} <span class="btn-title">Maximize</span></button>
                    <button class="btn-notes-ext close-box">${closeIcon} <span class="btn-title">Close</span></button>
                </div>
            </div>
            <div class="notes-form" style="display:none">
                <div id="notes-form-container">
                    <div id="formatter-row">
                    <div id="rtf-buttons">
                    <button class="btn-notes-ext headings-box">${headingIcon} <span class="btn-title">Heading</span></button>
                        <div id="headings-box-container" class="box-ui-layout">
                            ${createButtons(headingsArray)}
                        </div>
                        <button class="btn-notes-ext ol-box">${olIcon} <span class="btn-title">Ordered List - Tab</span></button>
                        <button class="btn-notes-ext ul-box"">${ulIcon} <span class="btn-title">Unordered List - Ctrl+]</span></button>
                        <button class="btn-notes-ext colors-box">${colorsIcon} <span class="btn-title">Font Color</span></button>
                            <div id="colors-box-container" class="box-ui-layout">
                            ${createButtons(colorsArray, true)}
                            </div>
                        <button class="btn-notes-ext background-box">${bgIcon} <span class="btn-title">BG Color</span></button>
                            <div id="background-box-container" class="box-ui-layout">
                            ${createButtons(colorsArray, true)}
                            </div>
                        <button class="btn-notes-ext shortcuts-box">${shortcutIcon} <span class="btn-title">Shortcuts</span></button>
                        <div id="shortcuts-box-container" class="box-ui-layout">
                        ${createShortcuts()}
                        </div>
                        
                    </div>
                    <div id="saved-box-message" class="toaster-message">Your notes have been saved</div>
                    </div>
                    <div draggable="true" class="notes-form-container-top"></div>
                    <div draggable="true" class="notes-form-container-left"></div>
                    <div class="pages-container">
                    <button id="createPage" class="btn-notes-ext">${createPagesIcon} <span class="btn-title">Add Page</span></button>
                        <button id="importPage" class="btn-notes-ext">${importIcon} <span class="btn-title">Import Page</span></button>
                        <div id="pages-tab-container"></div>
                    </div>
                    <div id="notes-area-parent">
                        <div class="section-toggle-container"></div>
                        <section id="notes-area" contenteditable="true">
                        Write your notes here!
                        </section>
                    </div>
                </div>
            </div>
        </div>
        `
        };
    
        $('body').append(notesMain);
        $('#notes-main').append(notesTab);
}