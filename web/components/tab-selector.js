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
      const target = this.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.add("inactive"));

      this.classList.add("active");
      document.getElementById(target).classList.remove("inactive");
    });
  });

  contents.forEach((content) => {
    content.classList.add("inactive");
  });
  contents[0].classList.remove("inactive");

  tabs[0].classList.add("active");
});
