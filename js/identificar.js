const MODELS_URL = "../models";
let startButton = document.getElementById("startButton");
let studentName = document.getElementById("student-name");
let proceso = document.getElementById("proceso");
let backdrop = document.getElementById("backdrop");
let buttons = document.getElementById("buttons");
let student = "";
let confirmButton = document.getElementById("confirmButton");
let cancelButton = document.getElementById("cancelButton");

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URL),
]).then(start);

function start() {
  document.addEventListener("DOMContentLoaded", function () {
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
  });
}

startButton.addEventListener("click", function () {
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  backdrop.style.display = "block";
  buttons.style.display = "none";
  context.drawImage(video, 0, 0, 640, 480);
  let data = canvas.toDataURL("image/png");
  let img = document.getElementById("student-img");
  img.src = data;

  setTimeout(async () => {
    let fullFaceDescriptions = await faceapi
      .detectSingleFace(canvas)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!fullFaceDescriptions) {
      alert("🧐 No se detectó un rostro");
      window.location.reload();
    }

    let students = JSON.parse(localStorage.getItem("estudiantes"));
    let studentsDescriptors = [];

    students.forEach((student) => {
      let data = JSON.parse(localStorage.getItem(student));
      data.descriptors = data.descriptors.map((descriptor) => {
        return new Float32Array(Object.values(descriptor));
      });

      let labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(
        data.user,
        data.descriptors
      );
      studentsDescriptors.push(labeledFaceDescriptors);
    });

    const faceMatcher = new faceapi.FaceMatcher(studentsDescriptors);
    const bestMatch = faceMatcher.findBestMatch(
      fullFaceDescriptions.descriptor
    );

    if (bestMatch.label === "unknown") {
      alert("🥺 No se encontró registro del estudiante");
      window.location.reload();
    }

    proceso.innerHTML =
      "✅ Estudiante identificado con una precisión del " +
      (bestMatch.distance.toFixed(2) * 100).toFixed(2) +
      "%";
    student = bestMatch.label;
    studentName.innerHTML = student;
    console.log(bestMatch);
    buttons.style.display = "flex";
  }, 0);
});

function cancel() {
  backdrop.style.display = "none";
  proceso.innerHTML = "Identificando estudiante";
  studentName.innerHTML = '<span class="loader"></span>';
  buttons.style.display = "none";
  student = "";
}

window.addEventListener("keyup", function (event) {
  // Verifica si la tecla presionada es ESC
  if (event.key === "Escape") {
    // Esconde la segunda ventana
    cancel();
  }
});

confirmButton.addEventListener("click", function () {
  let studentData = JSON.parse(localStorage.getItem(student));
  let checkIn = {
    date: Date.now(),
    type: "in",
  };

  if (!studentData.checks) {
    studentData.checks = [];
  }

  studentData.checks.push(checkIn);
  localStorage.setItem(student, JSON.stringify(studentData));
  alert("✅ Entrada registrada correctamente");
  cancel();
});

cancelButton.addEventListener("click", function () {
  let studentData = JSON.parse(localStorage.getItem(student));
  let checkOut = {
    date: Date.now(),
    type: "out",
  };

  if (!studentData.checks) {
    studentData.checks = [];
  }

  studentData.checks.push(checkOut);
  localStorage.setItem(student, JSON.stringify(studentData));
  alert("✅ Salida registrada correctamente");
  cancel();
});

start();
