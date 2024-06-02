document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("recipe-container");

  // Fetch recipes from JSON
  fetch("recipes.json")
    .then((response) => response.json())
    .then((data) => {
      data.recipes.forEach((recipe) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                    <img src="images/${recipe.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}.jpg" alt="${recipe.title}">
                    <h2>${recipe.title}</h2>
                    <p>Valmistusaika: ${recipe.total_time}</p>
                    <p>Annosten määrä: ${recipe.servings}</p>
                    <button class="modal-btn">Näytä ohje</button>
                `;
        container.appendChild(card);

        // Modal
        const modal = document.getElementById("modal");
        const modalContent = document.getElementById("modal-text");
        const closeBtn = document.getElementsByClassName("close")[0];
        const modalBtn = card.querySelector(".modal-btn");

        modalBtn.addEventListener("click", function () {
          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          modalContent.innerHTML = generateInstructions(recipe);
        });

        closeBtn.addEventListener("click", function () {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        });

        window.addEventListener("click", function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching recipes:", error));

  function generateInstructions(recipe) {
    let instructionsHTML = "<h2>" + recipe.title + "</h2>";
    for (let section in recipe.ingredients) {
      instructionsHTML += `<h3>${
        section.charAt(0).toUpperCase() + section.slice(1)
      }</h3>`;
      instructionsHTML += "<ul>";
      recipe.ingredients[section].forEach((ingredient) => {
        instructionsHTML += `<li>${ingredient}</li>`;
      });
      instructionsHTML += "</ul>";
    }
    instructionsHTML += "<h2>Ohje:</h2>";
    for (let section in recipe.instructions) {
      instructionsHTML += `<h3>${
        section.charAt(0).toUpperCase() + section.slice(1)
      }</h3>`;
      instructionsHTML += "<ol>";
      recipe.instructions[section].forEach((instruction) => {
        instructionsHTML += `<li>${instruction}</li>`;
      });
      instructionsHTML += "</ol>";
    }
    return instructionsHTML;
  }
});
