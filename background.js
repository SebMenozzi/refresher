const reloadDelay = 15 * 60 * 1000;

function reloadAllTabs() {
    console.log('Starting tab refresh');
    chrome.tabs.query({}, tabs => {
        for(const tab of tabs) {
            console.log('Refreshing tab', tab.url);
            chrome.tabs.reload(tab.id, { bypassCache: true });
        }
    });
    console.log('End of tab refresh');
}

let intervalId = undefined;

function isEnabled() {
    return intervalId !== undefined;
}

function showStatus() {
    const enabled = isEnabled();
    const color = enabled ? 'green': 'red';
    const text = enabled ? 'ON' : 'OFF';

    chrome.browserAction.setBadgeBackgroundColor({ color });
    chrome.browserAction.setBadgeText({ text });
}

function enable() {
    if (isEnabled()) {
        return;
    }

    intervalId = setInterval(reloadAllTabs, reloadDelay);
    showStatus();
    console.log('Reload enabled');
}

function disable() {
    if (!isEnabled()) {
        return;
    }

    clearInterval(intervalId);
    intervalId = undefined;
    showStatus();
    console.log('Reload disabled');
}

chrome.browserAction.onClicked.addListener(() => {
    if (isEnabled()) {
        disable();
    } else {
        enable();
    }
});

enable();