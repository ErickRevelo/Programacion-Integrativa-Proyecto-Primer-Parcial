class EmpleadosTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #007BFF;
                    color: white;
                }
            </style>
            <table id="empleados-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Puesto</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
    }

    connectedCallback() {
        this.fetchEmpleados();
    }

    fetchEmpleados() {
        fetch('http://localhost:5502/empleados')
            .then(response => response.json())
            .then(data => this.renderEmpleados(data))
            .catch(error => console.error('Error fetching empleados:', error));
    }

    renderEmpleados(empleados) {
        const tbody = this.shadowRoot.querySelector('tbody');
        tbody.innerHTML = '';
        empleados.forEach(empleado => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empleado.id}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.puesto}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

window.customElements.define('employee-table', EmpleadosTable);
