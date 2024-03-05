// Sets up the variables for viewing the How To Play Pop-up window
var howToPlayButton = document.getElementById("howToPlayButton");
var popupWindow = document.getElementById("howToPlayPopUp");
var closeButton = document.getElementById("close-button");

// Shows the pop-up window when the button is clicked
howToPlayButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Popup window is displayed when button is clicked
    popupWindow.style.display = "block";
    // How to play button is hidden when popup window is shown
    howToPlayButton.style.display = "none";
});

// Hides the pop-up window when the close button is clicked
closeButton.addEventListener("click", function () {
    // Popup window is hidden when close button is clicked
    popupWindow.style.display = "none";
    // How to play button is shown when popup window is closed
    howToPlayButton.style.display = "block";
    // Set the current Page index back to 0 when the instructions are closed
});

// Class to set up the functions and variables needed to display the instructions
// and move through the instructions
class HowToPlay {
    constructor() {
        // Sets the current How To Play Instructions page to index 0
        this.currentPageIndex = 0;
        // An array showing the text for each page of the How To Play Instructions
        this.displayText = [
            "Instructions for how to play - page 1, let's learn how to play, lots more text being added here to test paragraph. Adding in even more text to test two lines on a paragraph, but need even more text for this test.",
            "Instructions for how to play - page 2",
            "Instructions for how to play - page 3",
            "Instructions for how to play - page 4",
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
// Calls getDisplayText when the html file is first loaded
howToPlay.getDisplayText();
