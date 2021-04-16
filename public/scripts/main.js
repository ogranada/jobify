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

function main() {
  dayjs.extend(dayjs_plugin_relativeTime);
  showJobs(
    Array.from({ length: 100 }).map((x) => ({
      time: new Date(),
      workType: "Full Time",
      msg1: "8h ago . Half Time",
      title: "Junior Android Dev",
      company: "Globant",
      locations: ["Buenos Aires"]
    }))
  );
}


main();
