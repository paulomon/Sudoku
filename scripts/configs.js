let ConfigGUI = function(callback) {

    const configs = {
        SAME_ROW_AND_COLUMN: {enabled: false},
        SAME_VALUE: {enabled: false},
        CONFLICT_CELL: {enabled: false}
    }

    const openedMenuImg = "images/chevron-down.png";
    const closedMenuImg = "images/chevron-right.png";

    let init = function() {
        configureActions();
    }

    let configureActions = function() {
        configureToggleMenu();
        configureConfigChanges();
    }

    let configureToggleMenu = function() {
        document.querySelector(".config-title").onclick = function() {
            let elementClasses = document.querySelector(".config-options").classList;
            let menuImg = document.querySelector(".config-image > img");
    
            if(elementClasses.contains("hidden")){
                elementClasses.remove("hidden");
                menuImg.src = openedMenuImg;
                return;
            }
    
            elementClasses.add("hidden");
            menuImg.src = closedMenuImg;
        }
    }

    let configureConfigChanges = function() {
        document.querySelector("#config-same-row-column").onchange = (e) => {
            configs.SAME_ROW_AND_COLUMN.enabled = e.target.checked;
            callback();
        }
        document.querySelector("#same-value").onchange = (e) => {
            configs.SAME_VALUE.enabled = e.target.checked;
            callback();
        }
        document.querySelector("#conflict-cell").onchange = (e) => {
            configs.CONFLICT_CELL.enabled = e.target.checked;
            callback();
        }
    }

    let selectSameValue = function() {
        return configs.SAME_VALUE.enabled;
    }

    let selectSameColRow = function() {
        return configs.SAME_ROW_AND_COLUMN.enabled;
    }

    let selectConflictCell = function() {
        return configs.CONFLICT_CELL.enabled;
    }

    init();

    return {
        selectSameValue,
        selectSameColRow,
        selectConflictCell
    }
}