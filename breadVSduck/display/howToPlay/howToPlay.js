// Sets the current How To Play Instructions page to index 0
let currentPageIndex = 0
// An array showing the text for each page of the How To Play Instructions
let displayText = [
            "Page1 Text",
            "Page2 Text",
            "Page3 Text",
            "Page4 Text"
        ]

// Next Page Button
const nextButton = document.getElementById("increasePageButton");
// Reduce Page Button
const backButton = document.getElementById("reducePageButton");

// Increases the page number for Instructions
const increasePage = () => {
    if (currentPageIndex < displayText.length - 1) {
            currentPageIndex += 1
            getDisplayText()
        } 
    }
    
// Decreases the page number for Instructions
const reducePage = () => {
        if (currentPageIndex > 0) {
            currentPageIndex -= 1
            getDisplayText()
        }
    }

// Gets the text for the relevant Instructions page from the displayText array based on the 'currentPageIndex'
const getDisplayText = () => {
    // Hides the back button on the instructions if you are on the first page of instructions
    if (currentPageIndex == 0) {
        backButton.style.display = "none"
    } else {
        backButton.style.display = "block"
    }
    // Hides the next button on the instructions if you are on the last page of the instructions
    if (currentPageIndex == displayText.length - 1) {
        nextButton.style.display = "none"
    } else {
        nextButton.style.display = "block"
    }
        const displayTextElement = document.getElementById("displayText");
        displayTextElement.textContent = displayText[currentPageIndex]
        return displayText[currentPageIndex]
    }

const backToHomepage = () => {
    window.location.href = "../homepage/homepage.html"
}

// Calls getDisplayText when the html file is first loaded
getDisplayText()
