const btn = document.querySelector('.dark-mode-btn');
const body = document.querySelector('body');
const lupa = document.querySelector('.search-btn img');

btn.onclick = function()
{
    this.classList.toggle('active')
    body.classList.toggle('active')

    
    if (body.classList.contains('active')) {
        lupa.src = '../assets/icons/icon-Lupa-dark-mode.png'; // Imagem para o modo escuro
    } else {
        lupa.src = '../assets/icons/icon-Lupa-light-mode.png'; // Imagem para o modo claro
    }
}