function validText(input, event, maxLength){
    const code = event.which ? event.which : event.keyCode;
    if (code < 48 || code > 57){
        return false;
    }
    return input.value.length < maxLength;
}

function actualizarInterfaz(data){
    const divDetalle = document.getElementById("divDetalle");
    divDetalle.innerHTML = "";

    divDetalle.innerHTML = `
    
    <div class="contenido-resultados">
    <p>&nbsp;</p>
    <div class="row">
      <div class="tab-content">
        <div id="detMesa">
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="presidencial">
              <div class="tab-info-desc">
                <div class="row">
                  <div class="col-xs-3 col-md-4">
                    <div class="mesap01">
                      <img src="images/mp-sin.jpg" class="img-responsive">
                      Si requiere la imagen del acta, solicítela a través del procedimiento de acceso a la información pública.
                    </div>
                  </div>
                  <div class="col-xs-9 col-md-8">
                    <div class="row">
                      <!-- Acta Electoral -->
                      <div class="col-xs-12">
                        <p class="subtitle1">ACTA ELECTORAL</p>
                        <div id="page-wrap">
                          <table class="table13" cellspacing="0">
                            <thead>
                              <tr>
                                <th>Mesa N°</th>
                                <th>N° Copia</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.idGrupoVotacion}</td>
                                <td>${data.nCopia}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <!-- Información Ubigeo -->
                      <div class="col-xs-12">
                        <p class="subtitle1">INFORMACIÓN UBIGEO</p>
                        <div id="page-wrap">
                          <table class="table14" cellspacing="0">
                            <tbody>
                              <tr class="titulo_tabla">
                                <td>Departamento</td>
                                <td>Provincia</td>
                                <td>Distrito</td>
                                <td>Local de votación</td>
                                <td>Dirección</td>
                              </tr>
                              <tr>
                                <td>${data.Departamento}</td>
                                <td>${data.Provincia}</td>
                                <td>${data.Distrito}</td>
                                <td>${data.RazonSocial}</td>
                                <td>${data.Direccion}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <!-- Información Mesa -->
                      <div class="col-xs-12">
                        <p class="subtitle1">INFORMACIÓN MESA</p>
                        <div id="page-wrap">
                          <table class="table15" cellspacing="0">
                            <tbody>
                              <tr class="titulo_tabla">
                                <td>Electores hábiles</td>
                                <td>Total votantes</td>
                                <td>Estado del acta</td>
                              </tr>
                              <tr>
                                <td>${data.ElectoresHabiles}</td>
                                <td>${data.TotalVotantes}</td>
                                <td>ACTA ELECTORAL NORMAL</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Lista de Resoluciones -->
                <div>
                  <div class="col-xs-12 pbot30_acta">
                    <p class="subtitle1">LISTA DE RESOLUCIONES</p>
                    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> No hay resoluciones para el acta seleccionada
                    <div id="page-wrap">
                      <div class="col-md-12 resolu"></div>
                    </div>
                  </div>
                </div>
                <!-- Información del Acta Electoral -->
                <div>
                  <div class="col-xs-12">
                    <p class="subtitle1">INFORMACIÓN DEL ACTA ELECTORAL</p>
                    <div id="page-wrap" class="cont-tabla1">
                      <table class="table06">
                        <tbody>
                          <tr class="titulo_tabla">
                            <td colspan="2">Organización política</td>
                            <td>Total de Votos</td>
                          </tr>
                          <tr>
                            <td>PERUANOS POR EL KAMBIO</td>
                            <td><img width="40px" height="40px" src="images/simbolo_pkk.jpg"></td>
                            <td>${data.P1}</td>
                          </tr>
                          <tr>
                            <td>FUERZA POPULAR</td>
                            <td><img width="40px" height="40px" src="images/simbolo_keyko.jpg"></td>
                            <td>${data.P2}</td>
                          </tr>
                          <tr>
                            <td colspan="2">VOTOS EN BLANCO</td>
                            <td>${data.VotosBlancos}</td>
                          </tr>
                          <tr>
                            <td colspan="2">VOTOS NULOS</td>
                            <td>${data.VotosNulos}</td>
                          </tr>
                          <tr>
                            <td colspan="2">VOTOS IMPUGNADOS</td>
                            <td>${data.VotosImpugnados}</td>
                          </tr>
                          <tr>
                            <td colspan="2">TOTAL DE VOTOS EMITIDOS</td>
                            <td>${data.TotalVotantes}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    `;
}

async function actas_bscarPrNmroMesa(){
    const nroMesa = document.getElementById("nroMesa").value;

    if (!nroMesa || nroMesa.length < 6){
        alert("Por favor ingrese un número de mesa válido de 6 dígitos");
        return;
    }

    try{
        document.getElementById("divDetalle").innerHTML=`<div class="loading-box">
        <div class="loading-text">Cargando...</div>
        </div>`;

        const response = await fetch(`https://oaemdl.es/onpe_sweb_php/actas/numero/${nroMesa}`);

        if (!response.ok){
            throw new Error("No se encontró el acta");
        }
        const data = await response.json();

        actualizarInterfaz(data.data);
    }catch(error){
        document.getElementById("divDetalle").innerHTML =  `
        <div class="contenido-resultados">
            <div class="row">
                <div class="tab-info">
                    EL NÚMERO DE MESA QUE HA INGRESADO NO EXISTE
                </div>
            </div>
        </div>`;
    }
}