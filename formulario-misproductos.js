class ProductForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .prod-button {
                    background-color: green; 
                    color: white;             
                    border: none;             
                    border-radius: 15px;    
                    padding: 10px 20px;       
                    font-weight: bold;       
                    font-size: 16px;         
                    cursor: pointer;         
                    transition: background-color 0.3s;
                }
            
                .prod-button:hover {
                    background-color: darkgreen;  
                }
            </style>
        
            <form id="product-form">
                <label for="name">Nombre del Producto:</label><br>
                <input type="text" id="name" name="name" placeholder="Nombre" required><br><br>
                <label for="price">Precio del Producto:</label><br>
                <input type="number" step="0.01" min="0" max="100" id="price" name="price" placeholder="Precio" required><br><br>
                <button class="prod-button" type="submit">Agregar Producto</button>
            </form>
        `;
    }

    connectedCallback() {
        this.handleSubmit = (event) => {
            event.preventDefault();
            const nombre = this.shadowRoot.querySelector("#name").value;
            const precio = this.shadowRoot.querySelector("#price").value;

            fetch('http://localhost:5502/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, precio })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La conexión de red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                alert('Producto registrado correctamente');
                this.limpiarCampos();
            })
            .catch(error => {
                console.error('Error al registrar producto:', error);
                alert('Hubo un problema al registrar el producto');
            });
        };
        this.shadowRoot.querySelector("form").addEventListener('submit', this.handleSubmit);
    }

    limpiarCampos() {
        this.shadowRoot.querySelector("#name").value = "";
        this.shadowRoot.querySelector("#price").value = "";
    }
}

window.customElements.define('product-form', ProductForm);
