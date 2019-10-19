var svg = null;

/**
 * Function to be inserted into Draw.io. Contains a function that overrides getCurrentFile(). Original functionality
 * of getter function is kept, file data is saved to a variable.
 */
var hijackFileGetter = '(' + function() {
        window.EditorUi.prototype.getCurrentFile = function() {
            if(this.currentFile !== null) {
                var svg = this.currentFile.data;
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent("listenToChanges", true, true, svg);
                document.dispatchEvent(event);
            }
            return this.currentFile;
        };
    } + ')();';

/**
 * Injection of Javascript code into Draw.io
 */
var script = document.createElement('script');
script.textContent = hijackFileGetter;
(document.head||document.documentElement).appendChild(script);
script.remove();

/**
 * EventListener for communication from our injected script to this content script
 * Receives a new SVG every time changes are made
 */
document.addEventListener('listenToChanges', function (data) {
    svg = data.detail;
});

/**
 * Message passing from content script to popup (and the other way around)
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.popup) {
        chrome.runtime.sendMessage({svg: svg});
        sendResponse({svgSearch: true});
    }
});
