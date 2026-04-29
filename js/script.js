document.addEventListener("DOMContentLoaded", function() {
    // Selecciona los elementos de las pestañas y los contenidos
    const tabLinks = document.querySelectorAll(".custom-nav-tabs .nav-link");
    const tabContents = document.querySelectorAll(".tab-pane");
    const nav = document.getElementById('nav');
      const burger = document.getElementById('burger');
      const overlay = document.getElementById('overlay');
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    tabLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            // Oculta todos los contenidos de pestañas
            tabContents.forEach(content => {
                content.classList.remove("active");
            });

            // Muestra el contenido de la pestaña correspondiente
            const targetTab = this.getAttribute("data-bs-target");
            document.querySelector(targetTab).classList.add("active");

            // Desactiva la clase "active" en todos los enlaces de pestañas
            tabLinks.forEach(link => {
                link.classList.remove("active");
            });

            // Activa la clase "active" en el enlace de pestaña actual
            this.classList.add("active");
        });
    });
    // Agrega un manejador de eventos al botón de alternancia
    toggleButton.addEventListener('click', () => {
        drawerMenu.classList.toggle('open');
    });

    // Agrega manejadores de eventos a los enlaces de pestañas
   
});
