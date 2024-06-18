class EmployeeForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .emp-button {
                    background-color: blue; 
                    color: white;            
                    border: none;            
                    border-radius: 15px;     
                    padding: 10px 20px;       
                    font-weight: bold;       
                    font-size: 16px;         
                    cursor: pointer;        
                    transition: background-color 0.3s;  
                }
                .emp-button:hover {
                    background-color: darkblue;  
                }
            </style>
            <form id="employee-form">
                
                <label for="name">Nombre del Empleado:</label><br>
                <input type="text" id="name" name="name" placeholder="Nombre" required><br><br>
                <label for="position">Puesto del Empleado:</label><br>
                <input type="text" id="position" name="position" placeholder="Puesto" required><br><br>
                <button class="emp-button" type="submit">Agregar Empleado</button>
            </form>
        `;
    }

    connectedCallback() {
        this.handleSubmit = (event) => {
            event.preventDefault();
            const name = this.shadowRoot.querySelector("#name").value;
            const position = this.shadowRoot.querySelector("#position").value;
    
            fetch('http://localhost:5502/empleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: name, puesto: position })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La conexión de red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                alert('Empleado agregado correctamente');
            })
            .catch(error => {
                console.error('Error al agregar empleado:', error);
                alert('Hubo un problema al agregar el empleado');
            });
        };
        this.shadowRoot.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    

    limpiarCampos() {
        this.shadowRoot.querySelector("#name").value = "";
        this.shadowRoot.querySelector("#position").value = "";
    }
}

window.customElements.define('employee-form', EmployeeForm);
