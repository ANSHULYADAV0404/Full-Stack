const canvas = document.getElementById('canvas');
const countDisplay = document.getElementById('countDisplay');
const colorPicker = document.getElementById('colorPicker');

let circleCount = 0;

// Mouse Event: Drawing Logic
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    
    // Coordinates calculation with scaling fix
    const scaleX = 600 / rect.width;   
    const scaleY = 400 / rect.height;  
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Creating SVG Circle element
    const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttribute("cx", x);
    newCircle.setAttribute("cy", y);
    newCircle.setAttribute("r", 10); 
    newCircle.setAttribute("fill", colorPicker.value);
    
    canvas.appendChild(newCircle);
    updateCounter();
});

// Update the drawn circles count
function updateCounter() {
    circleCount = canvas.children.length;
    countDisplay.innerText = circleCount;
}

// Remove the last drawn circle
function undo() {
    if (canvas.lastChild) {
        canvas.removeChild(canvas.lastChild);
        updateCounter();
    }
}

// Clear the entire canvas
function clearAll() {
    canvas.innerHTML = '';
    updateCounter();
}