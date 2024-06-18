class MiHeader extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                header {
                    background-color: #000000;
                    color: white;
                    padding: 10px 0;
                    text-align: center;
                }
            </style>
            <header>
                <h1>Proyecto Final - Parcial 1</h1>
                <p>Erick Revelo & Mikela Soria</p>
            </header>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-header', MiHeader);