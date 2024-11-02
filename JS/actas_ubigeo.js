// Configuración de la URL base de la API
const API_BASE_URL = 'https://oaemdl.es/onpe_sweb_php/participacion/Nacional';  // Cambia esta URL por la de tu API real

// Función para realizar la solicitud a la API y obtener datos
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error('Error en la solicitud');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Función para llenar un select con opciones dinámicas
function fillSelect(selectElement, options, defaultOption = '--SELECCIONE--') {
  selectElement.innerHTML = '';  // Limpiar las opciones previas
  selectElement.appendChild(new Option(defaultOption, ''));

  options.forEach(option => {
    const opt = new Option(option.DPD, option.DPD);
    selectElement.appendChild(opt);
  });
}

// Funciones para cargar datos en cada select

function getProvinciasDepa_acta(param1, param2, selectElement) {
    // Obtenemos el texto de la opción seleccionada
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    cargarDepartamentos(selectedText);
} 

// 1. Cargar Departamentos según el Ámbito seleccionado
async function cargarDepartamentos(ambito) {
  const provincias = await fetchData(`${ambito}`);
  const selectDepartamento = document.getElementById('cdgoProv');
  fillSelect(selectDepartamento, provincias.data);
}

// 2. Cargar Provincias según el Departamento seleccionado
async function cargarProvincias(departamento) {
  const provincias = await fetchData(`provincias?departamento=${departamento}`);
  const selectProvincia = document.getElementById('cdgoDist');
  fillSelect(selectProvincia, provincias);
}

// 3. Cargar Distritos según la Provincia seleccionada
async function cargarDistritos(provincia) {
  const distritos = await fetchData(`distritos?provincia=${provincia}`);
  const selectDistrito = document.getElementById('actas_ubigeo');
  fillSelect(selectDistrito, distritos);
}

// 4. Cargar Locales según el Distrito seleccionado
async function cargarLocales(distrito) {
  const locales = await fetchData(`locales?distrito=${distrito}`);
  const selectLocal = document.getElementById('actas_ubigeo');
  fillSelect(selectLocal, locales);
}

// Listeners para los selectores
document.getElementById('cdgoAmbito').addEventListener('change', function () {
  const ambito = this.value;
  cargarDepartamentos(ambito);
});

document.getElementById('cdgoDep').addEventListener('change', function () {
    console.log(this.options[selectElement.selectedIndex].text)
  const departamento = this.value;
  cargarProvincias(departamento);
});

document.getElementById('cdgoProv').addEventListener('change', function () {
  const provincia = this.value;
  cargarDistritos(provincia);
});

document.getElementById('cdgoDist').addEventListener('change', function () {
  const distrito = this.value;
  cargarLocales(distrito);
});
