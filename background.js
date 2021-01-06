chrome.browserAction.onClicked.addListener(function(tab) {
    setInterval(function() {
        chrome.tabs.executeScript(tab.id, {
            code: "location.reload()"
        })
    }, 60000)
})
