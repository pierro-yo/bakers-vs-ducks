// const myButton = document.getElementById("myPopupButton");
// const myPopup = document.getElementById("myPopup")

// const openHowTo = () => {
//     myPopup.classList.add("show")
// }

// const closeButton = document.getElementById("closePopup")

// closeButton.addEventListener("click", function () {
//     myPopup.classList.remove("show");
// });

// window.addEventListener("Click", function (event) {
//     if (event.target == myPopup) {
//         myPopup.classList.remove("show");
//     }
// });

var popupLink = document.getElementById("howToPlayButton2");
var popupWindow = document.getElementById("howToPlayInstructions");
var closeButton = document.getElementById("close-button");
// Show the pop-up window when the link is clicked
popupLink.addEventListener("click", function (event) {
    event.preventDefault();
    popupWindow.style.display = "block";
});
// Hide the pop-up window when the close button is clicked
closeButton.addEventListener("click", function () {
    popupWindow.style.display = "none";
});
