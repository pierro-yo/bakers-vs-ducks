// Sets the current How To Play Instructions page to index 0
var currentPageIndex = 0
// An array showing the text for each page of the How To Play Instructions
var displayText = [
            "Page1 Text",
            "Page2 Text",
            "Page3 Text",
            "Page4 Text"
        ]

// Next Page Button
var nextButton = document.getElementById("increasePageButton");
// Reduce Page Button
var backButton = document.getElementById("reducePageButton");

// Increases the page number for Instructions
var increasePage = () => {
    if (currentPageIndex < displayText.length - 1) {
            currentPageIndex += 1
            getDisplayText()
        } 
        // console.log(currentPageIndex)
        // console.log(displayText.length)
    
    }
    
// Decreases the page number for Instructions
var reducePage = () => {
        if (currentPageIndex > 0) {
            currentPageIndex -= 1
            getDisplayText()
        }
    }

// Gets the text for the relevant Instructions page from the displayText array based on the 'currentPageIndex'
var getDisplayText = () => {
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
        var displayTextElement = document.getElementById("displayText");
        displayTextElement.textContent = displayText[currentPageIndex]
        return displayText[currentPageIndex]
    }

var backToHomepage = () => {
    window.location.href = "../homepage/homepage.html"
}

// Calls getDisplayText when the html file is first loaded
getDisplayText()
