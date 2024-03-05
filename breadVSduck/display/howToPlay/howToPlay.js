class HowToPlay {
    constructor() {
        // Sets the current How To Play Instructions page to index 0
        this.currentPageIndex = 0;
        // An array showing the text for each page of the How To Play Instructions
        this.displayText = [
            "Page1 Text",
            "Page2 Text",
            "Page3 Text",
            "Page4 Text",
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
        if (this.currentPageIndex == 0) {
            backButton.style.display = "none";
        } else {
            backButton.style.display = "block";
        }
        // Hides the next button on the instructions if you are on the last page of the instructions
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
    backToHomepage() {
        window.location.href = "../homepage/homepage.html";
    }
}
// Creates a new instance of the HowToPlay
howToPlay = new HowToPlay();
// Calls getDisplayText when the html file is first loaded
howToPlay.getDisplayText();
