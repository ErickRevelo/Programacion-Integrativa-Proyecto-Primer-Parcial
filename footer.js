class MiFooter extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                footer {
                    background-color: #333;
                    color: white;
                    text-align: center;
                    padding: 10px 0;
                }
                footer img {
                    width: 7%;
                    height: auto;
                    vertical-align: middle;
                }
            </style>
            <footer>
                <p><img src="espe.png" alt="Logo">  © 2024 Universidad de las Fuerzas Armadas 
                ESPE</p>
            </footer>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-footer', MiFooter);