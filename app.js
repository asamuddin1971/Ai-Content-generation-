document.getElementById("contentForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get the prompt from the user
    const prompt = document.getElementById("prompt").value;

    // Check if the prompt is empty
    if (prompt.trim() === "") {
        alert("Please enter a valid prompt.");
        return;
    }

    // Call the AI backend to generate the content
    const response = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();

    // Display the generated content
    document.getElementById("generatedContent").innerText = data.content;
});