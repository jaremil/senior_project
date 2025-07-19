const fileInput = document.getElementById("file-input");
const processBtn = document.getElementById("process-btn");
const imagePreview = document.getElementById("preview-img");
const outputText = document.getElementById("text-output");
const copyBtn = document.getElementById("copy-btn");


document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");
    const processBtn = document.getElementById("process-btn");
    const imagePreview = document.getElementById("image-preview");

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
            processBtn.disabled = false;
        }
    });

    processBtn.addEventListener("click", () => {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("image", file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Upload response:", data);
            alert("Image uploaded to: " + data.path);
        })
        .catch((err) => {
            console.error("Error uploading:", err);
        });
    });
});

// file input change
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
        // preview
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
        }
        reader.readAsDataURL(file);
        
        processBtn.disabled = false;
    } else {
        alert("Please upload an image file.");
    }
});

// Process Image
processBtn.addEventListener("click", () => {
    const image = imagePreview.src;
    
    if (image) {
        processBtn.disabled = true;
        
        Tesseract.recognize(
            image,
            'eng',
            {
                logger: (m) => console.log(m),
            }
        ).then(({ data: { text } }) => {
            outputText.value = text;
            
            copyBtn.disabled = false;
            
            processBtn.disabled = false;
        }).catch((err) => {
            console.error("Error during text extraction:", err);
            alert("There was an error processing the image.");
            processBtn.disabled = false;
        });
    }
});

copyBtn.addEventListener("click", () => {
    outputText.select();
    document.execCommand("copy");
    alert("Text copied to clipboard!");
});
