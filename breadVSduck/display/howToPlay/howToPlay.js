class howToPlay {
    constructor() {
        this.currentPageIndex = 0
        this.displayText = [
            "Page1 Text",
            "Page2 Text",
            "Page3 Text",
            "Page4 Text"
        ]
    }

    increasePage () {
        if (this.currentPageIndex < this.displayText.length) {
            this.currentPageIndex += 1
        } 
        console.log("Page Index once increased: " + this.currentPageIndex)
    }
    
    reducePage () {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex -= 1
        }
        console.log("Page Index once decreased: " + this.currentPageIndex)
    }

    getDisplayText () {
        console.log("display text: " + this.displayText[this.currentPageIndex])
        return this.displayText[this.currentPageIndex]
    }
}

var howTo = new howToPlay()
howTo.getDisplayText();
howTo.increasePage();
howTo.increasePage();
howTo.reducePage();
howTo.getDisplayText();

// let increaseButton = document.getElementById("increasePageButton")
// let decreaseButton = document.getElementById("decreasePageButton")

// increaseButton.addEventListener('click', function() {
//     howTo.increasePage()
// });

// decreaseButton.addEventListener('click', function() {
//     howTo.reducePage()
// });

// var displayTextElement = document.getElementById("displayText")

// displayTextElement.textContent = howTo.getDisplayText()