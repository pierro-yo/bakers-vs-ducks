var currentPageIndex = 0
var displayText = [
            "Page1 Text",
            "Page2 Text",
            "Page3 Text",
            "Page4 Text"
        ]

var increasePage = () => {
        if (currentPageIndex < displayText.length) {
            currentPageIndex += 1
        } 
        console.log("Page Index once increased: " + currentPageIndex)
    }
    
var reducePage = () => {
        if (currentPageIndex > 0) {
            currentPageIndex -= 1
        }
        console.log("Page Index once decreased: " + currentPageIndex)
    }

var getDisplayText = () => {
        console.log("display text: " + displayText[currentPageIndex])
        return displayText[currentPageIndex]
    }

let increaseButton = document.getElementById("increasePageButton")
let decreaseButton = document.getElementById("decreasePageButton")

increaseButton.addEventListener('click', function() {
    increasePage()
});

decreaseButton.addEventListener('click', function() {
    reducePage()
});

var displayTextElement = document.getElementById("displayText")

displayTextElement.textContent = getDisplayText()