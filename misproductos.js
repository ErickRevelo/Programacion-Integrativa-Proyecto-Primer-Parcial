class ProductosTable extends HTMLElement {
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
                  background-color: #4CAF50;
                  color: white;
              }
          </style>
          <table id="productos-table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                  </tr>
              </thead>
              <tbody></tbody>
          </table>
      `;
    }

    connectedCallback() {
        this.fetchProductos();
    }

    fetchProductos() {
        fetch('http://localhost:5502/productos')
            .then(response => response.json())
            .then(data => this.renderProductos(data))
            .catch(error => console.error('Error fetching productos:', error));
    }

    renderProductos(productos) {
        const tbody = this.shadowRoot.querySelector('tbody');
        tbody.innerHTML = '';
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

window.customElements.define('product-table', ProductosTable);
