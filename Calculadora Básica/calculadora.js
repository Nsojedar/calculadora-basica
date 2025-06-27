class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Enlace a Bootstrap local
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
    `;

    shadow.appendChild(bootstrapLink);
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    const num1 = wrapper.querySelector('#num1');
    const num2 = wrapper.querySelector('#num2');
    const operacion = wrapper.querySelector('#operacion');
    const btn = wrapper.querySelector('#calcular');
    const resultado = wrapper.querySelector('#resultado');

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
      switch (op) {
        case 'sumar': res = a + b; break;
        case 'restar': res = a - b; break;
        case 'multiplicar': res = a * b; break;
        case 'dividir':
          if (b === 0) {
            resultado.textContent = 'Error: división por cero';
            resultado.classList.replace('text-success', 'text-danger');
            return;
          }
          res = a / b;
          break;
      }

      resultado.textContent = `Resultado: ${res}`;
      resultado.classList.replace('text-danger', 'text-success');
    });
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);
