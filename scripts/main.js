const allIssuesBtn = document.getElementById("all-issues-btn");
const openIssuesBtn = document.getElementById("open-issues-btn");
const closedIssuesBtn = document.getElementById("closed-issues-btn");


const setActiveTab = (id) => {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("btn-primary"))
    document.getElementById(id).classList.add("btn-primary");

}