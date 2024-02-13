const MODELS_URL = "../models";

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URL),
]).then(start);

function start() {
  document.addEventListener("DOMContentLoaded", function () {
    let loading = document.getElementById("loading");
    let name = document.getElementById("name");
    let video = document.getElementById("video");
    let canvas1 = document.getElementById("canvas1");
    let context1 = canvas1.getContext("2d");
    let snapButton1 = document.getElementById("snap1");
    let canvasFaceApi1 = document.getElementById("canvasFaceApi1");

    let canvas2 = document.getElementById("canvas2");
    let context2 = canvas2.getContext("2d");
    let snapButton2 = document.getElementById("snap2");
    let canvasFaceApi2 = document.getElementById("canvasFaceApi2");

    let canvas3 = document.getElementById("canvas3");
    let context3 = canvas3.getContext("2d");
    let snapButton3 = document.getElementById("snap3");
    let canvasFaceApi3 = document.getElementById("canvasFaceApi3");

    let canvas4 = document.getElementById("canvas4");
    let context4 = canvas4.getContext("2d");
    let snapButton4 = document.getElementById("snap4");
    let canvasFaceApi4 = document.getElementById("canvasFaceApi4");

    let canvas5 = document.getElementById("canvas5");
    let context5 = canvas5.getContext("2d");
    let snapButton5 = document.getElementById("snap5");
    let canvasFaceApi5 = document.getElementById("canvasFaceApi5");

    let fullFaceDescriptions1;
    let fullFaceDescriptions2;
    let fullFaceDescriptions3;
    let fullFaceDescriptions4;
    let fullFaceDescriptions5;
    let descriptors = [];

    // Solicitar acceso a la webcam
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        alert("Error al acceder a la cámara: " + error);
        console.log("Error al acceder a la cámara: ", error);
      });

    // Capturar la foto1
    snapButton1.addEventListener("click", async function () {
      context1.drawImage(video, 0, 0, 320, 240);

      canvasFaceApi1.width = canvasFaceApi1.width;
      fullFaceDescriptions1 = await faceapi
        .detectSingleFace(canvas1)
        .withFaceLandmarks()
        .withFaceDescriptor();
      console.log(fullFaceDescriptions1);
      faceapi.draw.drawDetections(canvasFaceApi1, fullFaceDescriptions1);
      faceapi.draw.drawFaceLandmarks(canvasFaceApi1, fullFaceDescriptions1);
    });

    // Capturar la foto2
    snapButton2.addEventListener("click", async function () {
      context2.drawImage(video, 0, 0, 320, 240);

      canvasFaceApi2.width = canvasFaceApi2.width;
      fullFaceDescriptions2 = await faceapi
        .detectSingleFace(canvas2)
        .withFaceLandmarks()
        .withFaceDescriptor();
      console.log(fullFaceDescriptions2);
      faceapi.draw.drawDetections(canvasFaceApi2, fullFaceDescriptions2);
      faceapi.draw.drawFaceLandmarks(canvasFaceApi2, fullFaceDescriptions2);
    });

    // Capturar la foto3
    snapButton3.addEventListener("click", async function () {
      context3.drawImage(video, 0, 0, 320, 240);

      canvasFaceApi3.width = canvasFaceApi3.width;
      fullFaceDescriptions3 = await faceapi
        .detectSingleFace(canvas3)
        .withFaceLandmarks()
        .withFaceDescriptor();
      console.log(fullFaceDescriptions3);
      faceapi.draw.drawDetections(canvasFaceApi3, fullFaceDescriptions3);
      faceapi.draw.drawFaceLandmarks(canvasFaceApi3, fullFaceDescriptions3);
    });

    // Capturar la foto4
    snapButton4.addEventListener("click", async function () {
      context4.drawImage(video, 0, 0, 320, 240);

      canvasFaceApi4.width = canvasFaceApi4.width;
      fullFaceDescriptions4 = await faceapi
        .detectSingleFace(canvas4)
        .withFaceLandmarks()
        .withFaceDescriptor();
      console.log(fullFaceDescriptions4);
      faceapi.draw.drawDetections(canvasFaceApi4, fullFaceDescriptions4);
      faceapi.draw.drawFaceLandmarks(canvasFaceApi4, fullFaceDescriptions4);
    });

    // Capturar la foto5
    snapButton5.addEventListener("click", async function () {
      context5.drawImage(video, 0, 0, 320, 240);

      canvasFaceApi5.width = canvasFaceApi5.width;
      fullFaceDescriptions5 = await faceapi
        .detectSingleFace(canvas5)
        .withFaceLandmarks()
        .withFaceDescriptor();
      console.log(fullFaceDescriptions5);
      faceapi.draw.drawDetections(canvasFaceApi5, fullFaceDescriptions5);
      faceapi.draw.drawFaceLandmarks(canvasFaceApi5, fullFaceDescriptions5);
    });

    // Enviar la foto
    photoForm.addEventListener("submit", function (event) {
      loading.style.display = "block";
      event.preventDefault();

      setTimeout(() => {
        descriptors.push(fullFaceDescriptions1.descriptor);
        descriptors.push(fullFaceDescriptions2.descriptor);
        descriptors.push(fullFaceDescriptions3.descriptor);
        descriptors.push(fullFaceDescriptions4.descriptor);
        descriptors.push(fullFaceDescriptions5.descriptor);

        let user = name.value;

        let students = localStorage.getItem("estudiantes");
        if (students) {
          students = JSON.parse(students);
        } else {
          students = [];
          localStorage.setItem("estudiantes", JSON.stringify(students));
        }
        students.push(user);
        localStorage.setItem("estudiantes", JSON.stringify(students));

        localStorage.setItem(user, JSON.stringify({ user, descriptors }));
        loading.style.display = "none";

        alert("Estudiante registrado correctamente");
        window.location.reload();
      }, 3000);
    });
  });
}

start();
