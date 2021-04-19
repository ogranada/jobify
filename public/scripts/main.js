// https://www.frontendmentor.io/challenges/github-jobs-api-93L-NL6rP

function showJobs(jobs) {
  const jobCard = document.querySelector("#tarjetaBase");
  jobs.forEach((job) => {
    const clone = document.importNode(jobCard.content, true);
    clone.querySelector(".time").textContent = dayjs(job.time).fromNow();
    clone.querySelector(".workType").textContent = job.workType;
    clone.querySelector(".company").textContent = job.company;
    clone.querySelector(".Job-title").textContent = job.title;
    clone.querySelector(".Job-locations").textContent = job.locations.join(', ');
    clone.querySelector(".seeMore").addEventListener("click", () => {
      document.querySelector(".pantalla").classList.add("open");
    });
    document.querySelector(".Jobs").appendChild(clone);
  });
}

async function getJobs(){
  let response = await fetch("api/v1/jobs");
  let jobs = await response.json();
  showJobs(jobs);
}

function main() {
  dayjs.extend(dayjs_plugin_relativeTime);
  getJobs();
}

main();
