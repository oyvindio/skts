var skts_prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                 .getService(Components.interfaces.nsIPrefService)
                                 .getBranch("extensions.skts.");

var skts_prevTabKey = skts_prefService.getCharPref("prevTabKey");
var skts_nextTabKey = skts_prefService.getCharPref("nextTabKey");

/**
 * Returns true if focus is on an element which takes some sort of input. in
 * that case, we do not want to catch key presses.
 */
function skts_inputFocus() {
    var skts_inputFocus = false;
    var skts_element = document.commandDispatcher.focusedElement;

    // check if focused element takes input
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

    // check if focused element has designMode="on"
    var skts_window = document.commandDispatcher.focusedWindow;
    if (skts_window) {
        if(skts_window.document.designMode === "on") {
            skts_inputFocus = true;
        }
    }

    return skts_inputFocus;
}

/**
 * Stop an Event from being propagated further. Called when an Event has been
 * handled.
 */
function skts_stopEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
}

/**
 * Handles KeyboardEvents.
 */
function skts_switchTab(evt) {

    // if an input element has focus, we want to let the user input text into
    // the element, thus we return before the event is handled.
    if (skts_inputFocus()) {
        return;
    }

    // we only want to handle single key presses. to avoid interfering with
    // other key bindings, we return without handling the event if either of
    // Shift, Ctrl, Alt or Meta is pressed.
    if (evt.shiftKey
    ||  evt.ctrlKey
    ||  evt.altKey
    ||  evt.metaKey) {
        return;
    }

    skts_keyPressed = evt.which

    if (skts_keyPressed === skts_prevTabKey.charCodeAt(0)) {
        gBrowser.mTabContainer.advanceSelectedTab(-1, true);
        skts_stopEvent(evt);
    }
    else if (skts_keyPressed === skts_nextTabKey.charCodeAt(0)) {
        gBrowser.mTabContainer.advanceSelectedTab(1, true);
        skts_stopEvent(evt);
    }
}

window.addEventListener("keypress", skts_switchTab, false);
