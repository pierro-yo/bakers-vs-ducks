// Sets up the variables for viewing the How To Play Pop-up window
var howToPlayButton = document.getElementById("howToPlayButton");
var popupWindow = document.getElementById("howToPlayPopUp");
var closeButton = document.getElementById("close-button");
var startGameButton = document.getElementById("startGameButton")

// Shows the pop-up window when the button is clicked
howToPlayButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Popup window is displayed when button is clicked
    popupWindow.style.display = "block";
    // How to play button and Start Game button are hidden when popup window is shown
    howToPlayButton.style.display = "none";
    startGameButton.style.display = "none";
    // Calls getDisplayText when the How to play button is clicked
    howToPlay.getDisplayText();

});

// Hides the pop-up window when the close button is clicked
closeButton.addEventListener("click", function () {
    // Popup window is hidden when close button is clicked
    popupWindow.style.display = "none";
    // How to play button and Start Game button are shown when popup window is closed
    howToPlayButton.style.display = "block";
    startGameButton.style.display = "block";
    // Set the current Page index back to 0 when the instructions are closed
    howToPlay.currentPageIndex = 0
});

// Class to set up the functions and variables needed to display the instructions
// and move through the instructions
class HowToPlay {
    constructor() {
        // Sets the current How To Play Instructions page to index 0
        this.currentPageIndex = 0;
        // An array showing the text for each page of the How To Play Instructions
        this.displayText = [
            "Ducks are invading your Bakery, and the only defence is your arsenal of baked goods! Armed with an impressive counters-worth of duck-subduing treats like baguette bombs and croissant boomerangs, you'll need to think fast and bake faster to stop a bakers dozen of ducks dead in their tracks.",
            "To defend the bakery from the onslaught of ducks, a variety of different bakers (armed with savoury weaponry) can be placed on the grid. The bakers use projectiles to deal damage to the ducks, and each baker has their own weapon with different characteristics such as damage, range and rate of fire. Additional bakers can be recruited with breadcumbs, there is a reseve in the bakery to get you started and for each duck that is defeated, more breadcumbs will be collected. Bakers can only throw in a straight line so you will have to strategically place your bakers.",
            "The ducks are well equipped, and they are willing to destroy anything in their path. If they come into contact with a baker, they will deal damage and drain the health of the baker. If the baker's health reaches 0, then the baker will be defeated and the duck will continue on its path. Much like the bakers, the ducks have equipped themselves resulting in different levels of protection which will require more damage to be dealt before defeating them. If the duck reaches the entrance of the bakery, the game is over."
        ];
    }

    // Increases the page number for Instructions
    increasePage() {
        if (this.currentPageIndex < this.displayText.length - 1) {
            this.currentPageIndex += 1;
            this.getDisplayText();
        }
    }

    // Decreases the page number for Instructions
    reducePage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex -= 1;
            this.getDisplayText();
        }
    }

    // Gets the text for the relevant Instructions page from the displayText array based on the 'this.currentPageIndex'
    getDisplayText() {
        // Next Page Button
        const nextButton = document.getElementById("increasePageButton");
        // Reduce Page Button
        const backButton = document.getElementById("reducePageButton");
        // Hides the back button on the instructions if you are on the first page of instructions
        // Still keeps the space needed for the button (using visibility attribute)
        if (this.currentPageIndex == 0) {
            backButton.style.display = "none";
        } else {
            backButton.style.display = "block";
        }
        // Hides the next button on the instructions if you are on the last page of the instructions
        // Still keeps the space needed for the button (using visibility attribute)
        if (this.currentPageIndex == this.displayText.length - 1) {
            nextButton.style.display = "none";
        } else {
            nextButton.style.display = "block";
        }
        const displayTextElement = document.getElementById("displayText");
        displayTextElement.textContent =
            this.displayText[this.currentPageIndex];
        return this.displayText[this.currentPageIndex];
    }
}
// Creates a new instance of the HowToPlay
howToPlay = new HowToPlay();
