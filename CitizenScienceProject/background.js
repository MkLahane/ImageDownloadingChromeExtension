console.log("In background!!!");

chrome.runtime.onMessage.addListener(function ({ options }, sender, sendResponse) {
    // if (request.type == "worktimer-notification")
    //     chrome.notifications.create('worktimer-notification', request.options, function () { });

    // sendResponse();
    console.log(options);
    chrome.downloads.download({
        url: options.url,
        filename: options.filename
    });
    console.log("Downloading.....");
});