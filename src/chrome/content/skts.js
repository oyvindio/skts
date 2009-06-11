var skts_prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                 .getService(Components.interfaces.nsIPrefService)
                                 .getBranch("extensions.skts.");

var skts_prevTabKey = skts_prefService.getCharPref("prevTabKey");
var skts_nextTabKey = skts_prefService.getCharPref("nextTabKey");

/**
 * Returns true if we should ignore KeyboardEvents, false otherwise.
 */
function skts_inputFocus() {
    var skts_inputFocus = false;
    var skts_element = document.commandDispatcher.focusedElement;

    if (skts_element) {
        var skts_localName = skts_element.localName.toLowerCase();
        if (skts_localName === "input"
        ||  skts_localName === "textarea"
        ||  skts_localName === "select"
        ||  skts_localName === "button"
        ||  skts_localName === "isindex") {
            skts_inputFocus = true;
        }
    }

    /*
    var skts_window = document.commandDispatcher.focusedWindow;
    if (skts_window) {
        if(skts_window.document.designMode === "on") {
            skts_inputFocus = true;
        }
    }
    */

    return skts_inputFocus;
}

/**
 * Handles KeyboardEvents.
 */
function skts_switchTab(evt) {

    if (skts_inputFocus()) {
        return;
    }

    evt = evt || event

    dump("charCode: " + evt.charCode + "\n");
    dump("which: " + evt.which + "\n");
    dump("skts_prevTabKey:" + skts_prevTabKey.charCodeAt(0) + "\n");
    dump("skts_nextTabKey:" + skts_nextTabKey.charCodeAt(0) + "\n");

    skts_keyPressed = evt.which

    if (skts_keyPressed === skts_prevTabKey.charCodeAt(0)) {
        gBrowser.mTabContainer.advanceSelectedTab(-1, true);
    }
    else if (skts_keyPressed === skts_nextTabKey.charCodeAt(0)) {
        gBrowser.mTabContainer.advanceSelectedTab(1, true);
    }
}

window.addEventListener("keypress", skts_switchTab, false);
