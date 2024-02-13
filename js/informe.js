let students = JSON.parse(localStorage.getItem("estudiantes"));
let table = document.getElementById("students-table-tbody");
let dataRange = document.getElementById("frmDateRange");

// Obtiene los estudiantes y sus chequeos
students = students.map((student) => {
  student = JSON.parse(localStorage.getItem(student));
  return {
    student: student.user,
    checks: !student.checks ? [] : student.checks,
  };
});

// Llena la tabla con los estudiantes y sus chequeos
students.forEach((student) => {
  student.checks.forEach((check) => {
    let row = table.insertRow(-1);

    let cellName = row.insertCell(0);
    cellName.innerHTML = student.student;

    let cellIn = row.insertCell(1);
    let cellOut = row.insertCell(2);

    const date = new Date(check.date);
    if (check.type === "in") {
      cellIn.innerHTML = date.toLocaleString();
      cellOut.innerHTML = "";
    } else if (check.type === "out") {
      cellIn.innerHTML = "";
      cellOut.innerHTML = date.toLocaleString();
    }
  });
});

dataRange.addEventListener("submit", function (e) {
  e.preventDefault(); // Previene el comportamiento por defecto del formulario

  // Captura las fechas de inicio y fin
  const fechaInicio = document.getElementById("fecha-inicio").value;
  const fechaFin = document.getElementById("fecha-fin").value;

  // Convierte las fechas a objetos Date para la comparación
  const inicio = new Date(fechaInicio + "T00:00:00");
  const fin = new Date(fechaFin + "T23:59:59");

  // Filtra los estudiantes y sus chequeos dentro del rango de fechas
  const estudiantesFiltrados = students
    .map((student) => ({
      student: student.student,
      checks: student.checks.filter((check) => {
        const fechaCheck = check.date;
        return fechaCheck >= inicio.getTime() && fechaCheck <= fin.getTime();
      }),
    }))
    .filter((student) => student.checks.length > 0); // Filtra estudiantes sin chequeos en el rango

  // Limpia la tabla
  table.innerHTML = "";

  // Llena la tabla con los estudiantes y sus chequeos
  estudiantesFiltrados.forEach((student) => {
    student.checks.forEach((check) => {
      let row = table.insertRow(-1);

      let cellName = row.insertCell(0);
      cellName.innerHTML = student.student;

      let cellIn = row.insertCell(1);
      let cellOut = row.insertCell(2);

      const date = new Date(check.date);
      if (check.type === "in") {
        cellIn.innerHTML = date.toLocaleString();
        cellOut.innerHTML = "";
      } else if (check.type === "out") {
        cellIn.innerHTML = "";
        cellOut.innerHTML = date.toLocaleString();
      }
    });
  });
});

dataRange.addEventListener("reset", function (e) {
  // Limpia la tabla
  table.innerHTML = "";

  // Llena la tabla con los estudiantes y sus chequeos
  students.forEach((student) => {
    student.checks.forEach((check) => {
      let row = table.insertRow(-1);

      let cellName = row.insertCell(0);
      cellName.innerHTML = student.student;

      let cellIn = row.insertCell(1);
      let cellOut = row.insertCell(2);

      const date = new Date(check.date);
      if (check.type === "in") {
        cellIn.innerHTML = date.toLocaleString();
        cellOut.innerHTML = "";
      } else if (check.type === "out") {
        cellIn.innerHTML = "";
        cellOut.innerHTML = date.toLocaleString();
      }
    });
  });
});
