function onBodyLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  navigator.notification.alert("PhoneGap is ready!");
  alert("PhoneGap is ready!");
}
