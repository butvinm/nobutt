// Tab selector script
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-link");
  const contents = document.querySelectorAll(".tab-content");
  //if we haven't got any tabs we are not able to push them
  if (tabs.length <= 1) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = tab.getAttribute("data-tab");
      if (target === null) {
        logToConsole("Tabs-error: unable to find any data-tab");
        return;
      }

      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.add("inactive"));

      tab.classList.add("active");

      const oldElement = document.getElementById(target);
      if (oldElement === null) {
        logToConsole("Tabs-error: unable to find old (inactive) element");
        return;
      }

      oldElement.classList.remove("inactive");
    });
  });

  contents.forEach((content) => {
    content.classList.add("inactive");
  });
  contents[0].classList.remove("inactive");

  tabs[0].classList.add("active");
});
