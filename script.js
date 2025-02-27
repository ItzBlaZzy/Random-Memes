const memeImg = document.getElementById("meme");
const newMemeBtn = document.getElementById("new-meme");
const downloadBtn = document.getElementById("download");
const shareBtn = document.getElementById("share");

async function getMeme() {
    try {
        const response = await fetch("https://meme-api.com/gimme");
        if (!response.ok) throw new Error("Failed to fetch meme");
        const data = await response.json();

        memeImg.src = data.url;
        memeImg.onload = () => {
            downloadBtn.style.display = "inline-block";
            shareBtn.style.display = "inline-block";
        };

    } catch (error) {
        console.error("Error fetching meme:", error);
        alert("Failed to load meme. Try again!");
    }
}

// Load first meme when page loads
getMeme();

// Get new meme on button click
newMemeBtn.addEventListener("click", getMeme);

// Download meme
downloadBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(memeImg.src);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "meme.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error downloading meme:", error);
        alert("Failed to download meme.");
    }
});

// Share meme
shareBtn.addEventListener("click", async () => {
    if (!navigator.share) {
        alert("Sharing is not supported on this browser.");
        return;
    }

    try {
        await navigator.share({
            title: "😂 Check out this meme!",
            text: "Here's a funny meme!",
            url: memeImg.src
        });
    } catch (error) {
        console.error("Error sharing meme:", error);
    }
});
