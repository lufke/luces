// Here you can define shared JavaScript functions that are accessible from any of the Views in your app.
//
// For example, you can define a utility functions such the 'createPushNotification'
// function below and then reuse it on several of the Views in your app.
//

function createPushNotification(user, message) {
    var pushNotification = DB.push_notification.create();
    pushNotification.message = message;
    pushNotification.created_at = new Date();
    pushNotification.user(user);
    pushNotification.save();
}
