document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("[data-screen]");

  function showScreen(name) {

    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });

    const target = document.getElementById(name);

    if (!target) return;

    target.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }

  buttons.forEach(button => {

    button.addEventListener("click", () => {
      showScreen(button.dataset.screen);
    });

  });

  showScreen("home");

});
