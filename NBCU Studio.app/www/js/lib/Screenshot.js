// window.plugins.Screenshot

function Screenshot() {
	this.resultCallback = null; // Function
}

Screenshot.ComposeResultType = {
Cancelled:0,
Saved:1,
Sent:2,
Failed:3,
NotSent:4
}



// showScreenshot : all args optional

Screenshot.prototype.showScreenshot = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML,attachments) {
	var args = {};
	if(toRecipients)
		args.toRecipients = toRecipients;
	if(ccRecipients)
		args.ccRecipients = ccRecipients;
	if(bccRecipients)
		args.bccRecipients = bccRecipients;
	if(subject)
		args.subject = subject;
	if(body)
		args.body = body;
	if(bIsHTML)
		args.bIsHTML = bIsHTML;
    if(attachments)
        args.attachments = attachments;
	
	cordova.exec(null, null, "Screenshot", "showScreenshot", [args]);
}

Screenshot.prototype.showScreenshotWithCallback = function(callback, subject, body, toRecipients, ccRecipients, bccRecipients, isHTML, attachments) {
    console.log("in here");
	this.resultCallback = callback;
	this.showScreenshot.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,isHTML,attachments]);
}

Screenshot.prototype._didFinishWithResult = function(res) {
	this.resultCallback(res);
}

cordova.addConstructor(function()  {
					   if(!window.plugins)
					   {
					   window.plugins = {};
					   }
					   
					   // shim to work in 1.5 and 1.6
					   if (!window.Cordova) {
					   window.Cordova = cordova;
					   };
					   
					   window.plugins.Screenshot = new Screenshot();
					   });