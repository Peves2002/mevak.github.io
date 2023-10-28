var file = document.querySelector('.archivo');
var fileadd = false

file.onchange = function(e) {
    if(!fileadd){
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function() {
            let preview = document.getElementById('preview');
            imagen = document.createElement('img');
            imagen.src = reader.result;
            imagen.style.width = "200px";
            imagen.style.height = "200px";
            preview.append(imagen);
        }
        fileadd = true
    }
}

const contenedor = document.querySelector('.contenedor-avatar')

file.addEventListener("click", verAvatar)
let avatarAdd = false

var aleatorio = Math.random()
console.log(aleatorio)

function verAvatar(){
    if(!avatarAdd){
        setTimeout(function () { 
            const button = document.createElement("button")
            button.type = "button"
            button.className = "btn btn-warning"
            button.setAttribute("data-bs-toggle", "modal")
            button.setAttribute("data-bs-target", "#modal4")
            button.textContent = "Ver Ávatar"
            contenedor.appendChild(button)

            avatarAdd = true
            if(aleatorio>0 && aleatorio<0.4){
                document.querySelector('.imagen-container').textContent = "Polo, blusa o top talla S"
            } else if(aleatorio > 0.4 && aleatorio<0.7){
                document.querySelector('.imagen-container').textContent = "Polo, blusa o top talla M"
            } else{
                document.querySelector('.imagen-container').textContent = "Polo, blusa o top talla L"
            }
        }, 5000); 
    }
}

document.querySelector('.cerrarModal2').addEventListener("click", cerrarModal);
document.querySelector('.resetear').addEventListener("click", cerrarModal);

function cerrarModal() {
    window.location.reload();
}

// Algoritmo para IA
// const URL = "https://teachablemachine.withgoogle.com/models/OOGdWn8PT/";

// let model, imagen, labelContainer, maxPredictions;
// let imagenAdd = false;

// async function init() {
//     if(!imagenAdd){
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         model = await tmImage.load(modelURL, metadataURL);
//         maxPredictions = model.getTotalClasses();
    
//         const flip = true
//         imagen = new tmImage.loadFromFiles(archivoGuardado)
//         await predict()        
//         imagenAdd = true
//     }
// }

// async function predict() {
//     const prediction = await model.predict(archivoGuardado);
//     for (let i = 0; i < maxPredictions; i++) {
//         const classPrediction = prediction[i].className + ', tienes una probabilidad de ' + prediction[i].probability.toFixed(2) +'%';
//         if(prediction[i].probability.toFixed(2)>0.8){
//             document.querySelector('.imagen-container').textContent = classPrediction;
//             console.log(prediction[i].className)
//         }
//     }
// }