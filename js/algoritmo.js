const container = document.querySelector('.modal-footer')
document.querySelector('.escanear').addEventListener("click", verAvatar)
document.querySelector('.cerrarModal').addEventListener("click", cerrarCamara);

let avatarButtonAdded = false; 

function cerrarCamara() {
    if (webcam) {
        webcam.stop()
        window.location.reload();
    }
}

function verAvatar(){
    if(!avatarButtonAdded){
        setTimeout(function () { 
            const button = document.createElement("button")
            button.type = "button"
            button.className = "btn btn-success"
            button.setAttribute("data-bs-toggle", "modal")
            button.setAttribute("data-bs-target", "#modal2")
            button.textContent = "Ver Ávatar"

            container.appendChild(button)
            avatarButtonAdded = true
        }, 5000); 
    }
}

//Algoritmo para IA
const URL = "https://teachablemachine.withgoogle.com/models/7bOUB_EN_/";

let model, webcam, maxPredictions;
let webcamAdd = false; 

// Load the image model and setup the webcam
async function init() {
    if(!webcamAdd){
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    
        const flip = true
        webcam = new tmImage.Webcam(200, 200, flip)

        await webcam.setup()
        await webcam.play()
        window.requestAnimationFrame(loop);
    
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        webcamAdd = true
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ', tienes una probabilidad de ' + prediction[i].probability.toFixed(2) +'%';
        if(prediction[i].probability.toFixed(2)>0.8){
            document.querySelector('.talla-container').textContent = classPrediction;
            console.log(prediction[i].className)
        }
    }
}