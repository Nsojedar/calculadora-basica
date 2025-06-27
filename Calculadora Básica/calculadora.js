class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const bootstrapLink = document.createElement('link');
    bootstrapLink.setAttribute('rel', 'stylesheet');
    bootstrapLink.setAttribute('href', 'css/bootstrap.min.css');

    const style = document.createElement('style');
    style.textContent = `
      .resultado {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 1rem;
      }
      .historial {
        margin-top: 1.5rem;
        font-size: 0.9rem;
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.classList.add('container', 'border', 'p-4', 'rounded', 'shadow');

    wrapper.innerHTML = `
      <div class="mb-3">
        <label for="num1" class="form-label">Número 1</label>
        <input type="number" class="form-control" id="num1" placeholder="Ingrese el primer número">
      </div>
      <div class="mb-3">
        <label for="num2" class="form-label">Número 2</label>
        <input type="number" class="form-control" id="num2" placeholder="Ingrese el segundo número">
      </div>
      <div class="mb-3">
        <label for="operacion" class="form-label">Operación</label>
        <select class="form-select" id="operacion">
          <option value="sumar">Sumar (+)</option>
          <option value="restar">Restar (-)</option>
          <option value="multiplicar">Multiplicar (*)</option>
          <option value="dividir">Dividir (/)</option>
        </select>
      </div>
      <button class="btn btn-primary w-100" id="calcular">Calcular</button>
      <div class="resultado text-center text-success" id="resultado"></div>
      <div class="historial">
        <h6>Historial de operaciones:</h6>
        <ul id="historial" class="list-group"></ul>
      </div>
    `;

    shadow.appendChild(bootstrapLink);
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    const num1 = wrapper.querySelector('#num1');
    const num2 = wrapper.querySelector('#num2');
    const operacion = wrapper.querySelector('#operacion');
    const btn = wrapper.querySelector('#calcular');
    const resultado = wrapper.querySelector('#resultado');
    const historial = wrapper.querySelector('#historial');

    btn.addEventListener('click', () => {
      const a = parseFloat(num1.value);
      const b = parseFloat(num2.value);
      const op = operacion.value;

      if (isNaN(a) || isNaN(b)) {
        resultado.textContent = 'Por favor, ingrese números válidos.';
        resultado.classList.replace('text-success', 'text-danger');
        return;
      }

      let res;
      let simbolo;
      switch (op) {
        case 'sumar': res = a + b; simbolo = '+'; break;
        case 'restar': res = a - b; simbolo = '-'; break;
        case 'multiplicar': res = a * b; simbolo = '*'; break;
        case 'dividir':
          if (b === 0) {
            resultado.textContent = 'Error: división por cero';
            resultado.classList.replace('text-success', 'text-danger');
            return;
          }
          res = a / b;
          simbolo = '/';
          break;
      }

      resultado.textContent = `Resultado: ${res}`;
      resultado.classList.replace('text-danger', 'text-success');

      this.dispatchEvent(new CustomEvent('resultado-calculado', {
        detail: { resultado: res, operacion: `${a} ${simbolo} ${b}` },
        bubbles: true,
        composed: true
      }));

      const item = document.createElement('li');
      item.classList.add('list-group-item');
      item.textContent = `${a} ${simbolo} ${b} = ${res}`;
      historial.prepend(item);
    });
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);
