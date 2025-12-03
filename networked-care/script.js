const element = document.getElementById('analyze-button');
const adderButton = document.getElementById('another-chat-button');

// GLOBAL COUNTER VARIABLES
let totalElectricityUsed_Wh;
let totalWaterUsed_mL;
let totalCarbonEmitted_g;
let totalPromptWords;

if (element) {
    element.addEventListener('click', parseChat);
}
if(adderButton){
    adderButton.addEventListener('click', parseNoMoveOn);
}

function parseChat(){
    const chatTranscriptField = document.getElementById('chat-transcript-field');
    const chatTranscript = chatTranscriptField.value;

    const lines = chatTranscript.split('\n');

    let numPrompts = 0;
    let allPromptWordCounts = [];
    let inPrompt = false;
    let currentPromptWordCount = 0;
    
    let firstLineIndex = 0;
    // Finds the first non-empty line and sets the starting index to that
    while (firstLineIndex < lines.length && lines[firstLineIndex] === "") {
        firstLineIndex++;
    }

    // If 1st line doesn't start with "You said:" then hard-add 1 to the prompt counter
    if (!lines[firstLineIndex].startsWith("You said:")) {
        numPrompts++;
        inPrompt = true;
        currentPromptWordCount = 0;
    }

    for (let i = firstLineIndex; i < lines.length; i++) {
        let line = lines[i].trim();

        // Start of a prompt
        if (line.startsWith("You said:")) {
            // Close previous prompt if one was open
            if (inPrompt) {
                allPromptWordCounts.push(currentPromptWordCount);
            }
            numPrompts++;
            inPrompt = true;

            // Count words after "You said:"
            const words = line.replace("You said:", "").trim().split(/\s+/);
            currentPromptWordCount = words[0] === "" ? 0 : words.length;
        }

        // End of a prompt
        else if (line.startsWith("ChatGPT said:")) {
            if (inPrompt) {
                allPromptWordCounts.push(currentPromptWordCount);
                inPrompt = false;
            }
        }

        // Lines *inside* a prompt
        else if (inPrompt && line !== "") {
            const words = line.split(/\s+/);
            currentPromptWordCount += words.length;
        }
    }

    // Close final prompt if it never got ended
    if (inPrompt) {
        allPromptWordCounts.push(currentPromptWordCount);
    }

    console.log("Number of prompts:", numPrompts);
    console.log("Words per prompt:", allPromptWordCounts);

    totalPromptWords = allPromptWordCounts.reduce((a, b) => a + b, 0);

    totalElectricityUsed_Wh = CalculateCarbonFootprint(totalPromptWords, 1);
    totalWaterUsed_mL = CalculateCarbonFootprint(totalPromptWords, 2);
    totalCarbonEmitted_g = CalculateCarbonFootprint(totalPromptWords, 3);

    window.location.href = `results.html?count=${totalPromptWords}&electricity=${totalElectricityUsed_Wh}&water=${totalWaterUsed_mL}&carbon=${totalCarbonEmitted_g}`;
}

function CalculateCarbonFootprint(totalPromptWords, whichOne) {

    // Calculate metrics
    const totalElectricityUsed_Wh = 0.00075 * totalPromptWords;
    const totalWaterUsed_mL = totalElectricityUsed_Wh * 2;
    const totalCarbonEmitted_g = 50 * totalPromptWords;

    // Return the requested one
    if (whichOne === 1) return totalElectricityUsed_Wh;
    if (whichOne === 2) return totalWaterUsed_mL;
    if (whichOne === 3) return totalCarbonEmitted_g;
}