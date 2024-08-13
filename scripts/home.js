const chooseGameText = document.getElementById("chooseGameText");
chooseGameText.innerText = language === "ru" ? "выберите игру" : "choose a game"

const helpButton = document.getElementById("helpButton");
helpButton.innerText = language === "ru" ? "поддержка" : "support"
