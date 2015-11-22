var skts = {
  prevTabKey: null,
  nextTabKey: null,

  /**
   * Gets preferences from the Mozilla preference system
   */
  getPreferences: function() {
    var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                     .getService(Components.interfaces.nsIPrefService)
                                     .getBranch("extensions.skts.");

    this.prevTabKey = prefService.getCharPref("prevTabKey");
    this.nextTabKey = prefService.getCharPref("nextTabKey");
  },

  /**
   * Returns true if focus is on an element which takes some sort of input. in
   * that case, we do not want to catch key presses.
   */
  inputFocus: function() {
    var focusedEl = document.commandDispatcher.focusedElement;

    // check if focused element takes input
    if (focusedEl) {
      var focusedElLn = focusedEl.localName.toLowerCase();
      if (focusedElLn === "input"
      ||  focusedElLn === "textarea"
      ||  focusedElLn === "select"
      ||  focusedElLn === "button"
      ||  focusedElLn === "isindex") {
        return true;
      } else if (focusedElLn === "div") { // XXX edge-case for the wall input field at facebook
          if (focusedEl.isContentEditable) {
              return true;
          }
      }
    }

    // check if focused element has designMode="on"
    var focusedWin = document.commandDispatcher.focusedWindow;
    if (focusedWin) {
      if(focusedWin.document.designMode === "on") {
        return true;
      }
    }

    // if we got this far, we should be able to catch key presses without
    // messing up something else; return false
    return false;
  },

  /**
   * Stop an Event from being propagated further. Called when an Event has been
   * handled.
   */
  stopEvent: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  },

  /**
   * Handles KeyboardEvents.
   */
  onKeyPress: function(evt) {

    // if an input element has focus, we want to let the user input text into
    // the element, thus we return before the event is handled.
    if (skts.inputFocus()) {
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

    var key = evt.which
    if (key === skts.prevTabKey.charCodeAt(0)) {
      gBrowser.mTabContainer.advanceSelectedTab(-1, true);
      skts.stopEvent(evt);
    }
    else if (key === skts.nextTabKey.charCodeAt(0)) {
      gBrowser.mTabContainer.advanceSelectedTab(1, true);
      skts.stopEvent(evt);
    }
  },

  startup: function() {
    this.getPreferences();
    window.addEventListener("keypress", this.onKeyPress, false);
  }
};

window.addEventListener("load", function(e) { skts.startup(); }, false);

// vim ts=2 sts=2 sw=2 tw=79
