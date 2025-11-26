const element = document.getElementById('analyze-button');

element.addEventListener('click', parseChat);

function parseChat(){
    const chatTranscriptField = document.getElementById('chat-transcript-field');
    const chatTranscript = chatTranscriptField.value;

    console.log(chatTranscript);

    const lines = chatTranscript.split('\n');

    let numPrompts = 0;

    let firstLineIndex = 0;
    // Finds the first non-empty line and sets the starting index to that
    while (firstLineIndex < lines.length && lines[firstLineIndex] === "") {
        firstLineIndex++;
    }

    // If 1st line doesn't start with "You said:" then hard-add 1 to the prompt counter
    if (!lines[firstLineIndex].startsWith("You said:")) {
        numPrompts++;
    }

    for (let i = firstLineIndex; i < lines.length; i++){
        let line = lines[i];
        
        // Trim whitespace
        line = line.trim();

        if(line.startsWith('You said:')){
            numPrompts++;
        }
    }
    console.log(numPrompts);
    
    window.location.href = `results.html?count=${numPrompts}`;
}