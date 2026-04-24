// assets/js/menu-mobile.js
(function () {
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    // Se a página não tiver esse header, não quebra nada
    if (!toggle || !nav) return;

    let isOpen = false;

    function setOpen(next) {
      isOpen = next;
      nav.classList.toggle('active', isOpen);
      toggle.classList.toggle('active', isOpen);

      // anima as 3 barras (opcional)
      const spans = toggle.querySelectorAll('span');
      if (spans.length >= 3) {
        if (isOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!isOpen);
    });

    // Fecha ao clicar em um link do menu
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    // Fecha ao redimensionar para desktop (opcional)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();


// assets/js/catalogo.js
document.addEventListener('DOMContentLoaded', function() {
  
  // Adiciona evento de toggle em TODOS os botões "Adicionar" automaticamente
  const addButtons = document.querySelectorAll('.product-actions .btn-primary');
  
  addButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // impede o link por padrão
      
      const card = this.closest('.product-card');
      const listMkt = card.querySelector('.listMkt');
      const allLists = document.querySelectorAll('.listMkt.active');
      
      // Fecha outras listas abertas
      allLists.forEach(otherList => {
        if (otherList !== listMkt) {
          otherList.classList.remove('active');
          const otherBtn = otherList.closest('.product-card').querySelector('.btn-primary');
          if (otherBtn) otherBtn.innerHTML = 'Comprar';
        }
      });
      
      // Toggle da lista atual
      if (listMkt) {
        listMkt.classList.toggle('active');
        
        if (listMkt.classList.contains('active')) {
          this.innerHTML = 'Fechar';
        } else {
          this.innerHTML = 'Comprar';
        }
      }
      
      // Mantém a funcionalidade do href (vai para cotacao.html#itens)
     //// setTimeout(() => {
   //     window.location.href = this.getAttribute('href');
    //  }, 200); // delay curto para ver a animação
    });
  });
});
