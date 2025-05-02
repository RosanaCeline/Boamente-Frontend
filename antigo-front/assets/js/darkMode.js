const btn = document.querySelector('.dark-mode-btn');
const body = document.querySelector('body');
const lupa = document.querySelector('.search-btn img');

// Verificar o estado do tema ao carregar a página
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('active');
    btn.classList.add('active');
    lupa.src = '../assets/icons/icon-Lupa-dark-mode.png';
}

// Alternar entre os modos escuro e claro
btn.onclick = function() {
    this.classList.toggle('active');
    body.classList.toggle('active');

    if (body.classList.contains('active')) {
        localStorage.setItem('darkMode', 'enabled');
        lupa.src = '../assets/icons/icon-Lupa-dark-mode.png';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        lupa.src = '../assets/icons/icon-Lupa-light-mode.png';
    }
}