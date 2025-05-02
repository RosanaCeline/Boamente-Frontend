const topLine = document.querySelector("#top-line");
const middleLine = document.querySelector("#middle-line");
const bottomLine = document.querySelector("#bottom-line");
const button = document.querySelector("#button-menu");
const menu = document.querySelector("#menu-header ul");
const creators = document.querySelector("#creators-footer");

let isClicked = false;  // Variável para controlar o estado do botão (clicado ou não)

button.addEventListener("click", () => {
    if (!isClicked) {
        // Animações para o ícone do hambúrguer
        topLine.style.transition = "transform 0.6s ease-out";
        topLine.style.transform = "translateY(10px) rotate(-45deg) scale(0.9)";

        bottomLine.style.transition = "transform 0.6s ease-out";
        bottomLine.style.transform = "translateY(-10px) rotate(45deg) scale(0.9)";

        middleLine.style.opacity = "0";

        menu.style.display = "block"

        isClicked = true; // Marca que o botão foi clicado
    } else {
        // Reverter animações para o ícone do hambúrguer
        topLine.style.transition = "transform 0.6s ease-out";
        topLine.style.transform = "translateY(0) rotate(0)";

        bottomLine.style.transition = "transform 0.6s ease-out";
        bottomLine.style.transform = "translateY(0) rotate(0)";

        middleLine.style.transition = "opacity 0.6s ease-out";
        middleLine.style.opacity = "1";

        // Esconder o menu
        menu.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

        menu.style.display = "none"

        isClicked = false; // Marca que o botão não foi clicado
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1201) {
        menu.style.display = ""; // Remove o display inline para que o CSS controle
    } else {
        if(isClicked == true) {
            menu.style.display = "block"
        } else {
            menu.style.display = "none"
        }
    }

    if (window.innerWidth <= 480) {
        creators.innerHTML = ""
    } else if (window.innerWidth <= 768) {
        creators.innerHTML = "Desenvolvido por <br> Laís Carvalho e Rosana Celine"
    } else {
        creators.innerHTML = "Desenvolvido por Laís Carvalho e Rosana Celine"
    }
});