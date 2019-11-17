import { get } from './requester.js';
const tbody = document.querySelector("#results tbody");
window.addEventListener("load", async function () {
    const students = await loadStudents();
    console.log(students);
    showStudents(students);
});
function showStudents(students) {
    students.sort((a, b) => {
        return a.ID - b.ID;
    }).forEach(element => {
        tbody.appendChild(generateStudent(element));
    });

}
function generateStudent(student) {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.innerHTML = student.ID;
    const tdFirstName = document.createElement("td");
    tdFirstName.innerHTML = student.FirstName;
    const tdLastName = document.createElement("td");
    tdLastName.innerHTML = student.LastName;
    const tdFacultyNumber = document.createElement("td");
    tdFacultyNumber.innerHTML = student.FacultyNumber;
    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = student.Grade;
    
    tr.appendChild(tdId);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdFacultyNumber);
    tr.appendChild(tdGrade);

    return tr;

}
function loadStudents() {
    return get("appdata", "students");
}