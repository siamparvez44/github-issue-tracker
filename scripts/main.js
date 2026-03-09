const allIssuesBtn = document.getElementById("all-issues-btn");
const openIssuesBtn = document.getElementById("open-issues-btn");
const closedIssuesBtn = document.getElementById("closed-issues-btn");
const issueCount = document.getElementById("issue-count");

const issuesContainer = document.getElementById("issues-container");

// 
// https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}

const setActiveTab = (id) => {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("btn-primary"))
    document.getElementById(id).classList.add("btn-primary");

}

const loadAllIssues = async () => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
  const res = await fetch(url);
  const data = await res.json();

  displayAllIssues(data.data);
}

const loadSingleIssue = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displaySingleIssue(details.data);
}

const displaySingleIssue = (issue) => {
  const singleIssueContainer = document.getElementById("single-issue-container");
  singleIssueContainer.innerHTML = `<h3 class="text-lg font-bold">${issue.title}</h3>
          <div class="mt-2 mb-6">
            <div class="badge rounded-full capitalize text-white  ${issue.status == "open" ? "badge-success" : "bg-purple-500"}">${issue.status}</div>
            <span class="text-slate-500">• Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>

           <div class="flex flex-wrap gap-2">
            ${issue.labels.map(label => `<div class="badge badge-soft badge-info border-current/30 uppercase rounded-full">${label}</div>`).join('')}
            </div>
              
              <p class="text-slate-500 py-4">${issue.description}</p>
              <div class="bg-slate-100 flex justify-between p-6 rounded">
                <div>
                  <h3 class="text-slate-500">Assignee:</h3>
                  <h3 class="font-bold">${issue.assignee}</h3>
                </div>

                <div>
                  <h3 class="text-slate-500">Priority:</h3>
                     <div class="badge rounded-full uppercase ${issue.priority == "high" ? "badge-error" : issue.priority == "medium" ? "badge-warning" : "badge-neutral"}">${issue.priority}</div>
                </div>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn btn-primary">Close</button>
                </form>
              </div>`;

  document.getElementById("singleModalTrigger").showModal();
}

const displayAllIssues = (issues) => {
    issuesContainer.innerHTML = "";
    issueCount.innerText = issues.length;

    for (let issue of issues) {
        const issueCard = document.createElement("div");
        issueCard.innerHTML = `<div id="issue-${issue.id}" onclick="loadSingleIssue(${issue.id})" class="card cursor-pointer transition-all w-full h-full bg-base-100 shadow-sm border-t-5 ${issue.status == "open"? "border-success hover:bg-green-500/5" : "border-purple-500 hover:bg-purple-500/5"}">
                <div class="card-body space-y-1">
                  <div class="flex justify-between">
                    <div>
                       ${issue.status == "open"? `<img
                            src="./assets/Open-Status.png"
                            alt="Open-Status" />` : `<img
                            src="./assets/Closed-Status.png"
                            alt="Closed-Status"/>`
                        }
                    </div>

                    <div class="badge badge-soft rounded-full min-w-24 uppercase ${issue.priority == "high" ? "badge-error" : issue.priority == "medium" ? "badge-warning" : "badge-neutral"}">${issue.priority}</div>
                    
                  </div>
                  <h2 class="card-title">
                    ${issue.title}
                  </h2>
                  <p class="line-clamp-2">
                    ${issue.description}
                  </p>
                 <div class="flex flex-wrap gap-2">
                   ${issue.labels.map(label => `<div class="badge uppercase badge-soft badge-info border-current/30 rounded-full">${label}</div>`).join('')}
                 </div>
                </div>
                <div class="border-t border-slate-200 p-6 text-slate-500 space-y-2">
                  <h3>${issue.author}</h3>
                  <h3>${new Date(issue.createdAt).toLocaleDateString()}</h3>
                </div>
              </div>`
        issuesContainer.append(issueCard);
    }
}

loadAllIssues();