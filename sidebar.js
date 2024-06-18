class MiSidebar extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>

            .navbar {
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: black;
                padding: 10px 0;
            }
    
            .navbar-item {
                padding: 10px;
                transition: background-color 0.3s, color 0.3s;
            }
    
            .navbar-item:hover {
                background-color: lightgray;
                color: black;
            }
    
            .navbar-item span {
                font-size: 16px;
            }
    
            nav a {
                display: block;
                color: white;
                text-align: center;
                padding: 14px 20px;
                text-decoration: none;
                background-color: transparent;
                transition: background-color 0.3s, color 0.3s;
            }
    
            nav a:hover {
                background-color: lightgray;
                color: black;
            }
            
        </style>
            
        <nav class="navbar">
            <a class="navbar-item" href="Index.html">Inicio</a>
            <a class="navbar-item" href="Productos.html">Productos</a>
            <a class="navbar-item" href="Empleados.html">Empleados</a>
        </nav>

        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('mi-sidebar', MiSidebar);