const getParticipacionTotal = async () => {
    const id = new URLSearchParams(window.location.search).get('id');

    const apiUrl = id === 'Nacional'
        ? 'https://oaemdl.es/onpe_sweb_php/participacion/Nacional'
        : 'https://oaemdl.es/onpe_sweb_php/participacion/Extranjero';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }

        const data = await response.json();

        let html = '';

        data.data.forEach(participacion => {
            const continente = participacion.CONTINENTE || participacion.DPD;

            html += `
                <tr onclick="location.href='./participacion_total.html?id=${id},${continente}'" 
                    onmouseover="this.style.cursor='pointer'; this.style.color='grey'" 
                    onmouseout="this.style.color='black'" 
                    style="cursor: pointer; color: black;">
                    <td>${id === 'Nacional' ? participacion.DPD : continente}</td>
                    <td>${participacion.TV}</td>
                    <td>${participacion.PTV}</td>
                    <td>${participacion.TA}</td>
                    <td>${participacion.PTA}</td>
                    <td>${participacion.EH}</td>
                </tr>
            `;
        });

        let encabezado, totalHtml, graficoUrl, electoresHabiles;

        if (id === 'Nacional') {
            encabezado = `
                <tr>
                    <th>DEPARTAMENTO</th>
                    <th>TOTAL ASISTENTES</th>
                    <th>% TOTAL ASISTENTES</th>
                    <th>TOTAL AUSENTES</th>
                    <th>% TOTAL AUSENTES</th>
                    <th>ELECTORES HÁBILES</th>
                </tr>
            `;
            totalHtml = `
                <tr>
                    <td>TOTALES</td>
                    <td>17,953,367</td>
                    <td>81.543%</td>
                    <td>4,063,663</td>
                    <td>18.457%</td>
                    <td>22,017,030</td>
                </tr>
            `;
            graficoUrl = "imagen_nacional.jpg?_tot_participacion=81.543&_tot_ausentismo=18.457";
            electoresHabiles = "22,017,030";
        } else {
            encabezado = `
                <tr>
                    <th>CONTINENTE</th>
                    <th>TOTAL ASISTENTES</th>
                    <th>% TOTAL ASISTENTES</th>
                    <th>TOTAL AUSENTES</th>
                    <th>% TOTAL AUSENTES</th>
                    <th>ELECTORES HÁBILES</th>
                </tr>
            `;
            totalHtml = `
                <tr>
                    <td>TOTALES</td>
                    <td>12,345,678</td>
                    <td>75.000%</td>
                    <td>4,321,012</td>
                    <td>25.000%</td>
                    <td>16,666,690</td>
                </tr>
            `;
            graficoUrl = " .imagen/graficpExtranjero.jpg?_tot_participacion=75.000&_tot_ausentismo=25.000";
            electoresHabiles = "16,666,690";
        }


        const contenidoInterno = document.getElementById('impreso');
        contenidoInterno.innerHTML = `
            <div class="col-xs-12">
                <p class="subtitle">Consulta de participación DETALLADO</p>
                <div id="page-wrap">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button type="button" class="btn btn-primary" onclick="history.go(-1);">
                                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> REGRESAR
                                    </button>
                                </td>
                                <td width="60%">&nbsp;</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onclick="location.href='./generar_datos_participacion_excel.php?tipoCobertura=${id}&ubigeo=Todos'">
                                        REPORTE DETALLADO EN EXCEL
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-xs-12">
                <p class="subtitle">ACTAS CONTABILIZADAS</p>
                <div class="col-lg-7 centered">
                    <div class="col-xs-12 col-md-12 col-lg-12 cont-curv">
                        <div class="col-xs-3 col-md-1">
                            <span class="glyphicon glyphicon-ok-circle ico-info" aria-hidden="true"></span>
                        </div>
                        <div class="col-xs-9 col-md-11">
                            <ul>
                                <li>ACTUALIZADO EL 20/06/2016 A LAS 19:16 h </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <br/>
            </div>

            <div class="col-xs-12 line pbot30">
                <div class="col-xs-12 col-md-6">
                    <img src="${graficoUrl}" class="img-responsive">
                </div>

                <div class="col-xs-12 col-md-6">
                    <div class="cont-recto" style="margin-bottom:10px">
                        Ámbito: ${id}
                    </div>
                    <p class="subtitle">ELECTORES HÁBILES ${electoresHabiles}</p>
                    <div id="page-wrap">
                        <table class="table09_2" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>PARTICIPACIÓN</th>
                                    <th>AUSENTISMO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TOTAL: ${id === 'Nacional' ? '17,953,367' : '12,345,678'}</td>
                                    <td>TOTAL: ${id === 'Nacional' ? '4,063,663' : '4,321,012'}</td>
                                </tr>
                                <tr>
                                    <td>% TOTAL: ${id === 'Nacional' ? '81.543%' : '75.000%'}</td>
                                    <td>% TOTAL: ${id === 'Nacional' ? '18.457%' : '25.000%'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    ${encabezado}
                </thead>
                <tbody>
                    ${html}
                    ${totalHtml}
                </tbody>
            </table>
        `;

    } catch (error) {
        console.error('Error:', error);
        const contenidoInterno = document.getElementById('impreso');
        contenidoInterno.innerHTML = '<p>Error al cargar los datos. Por favor intenta de nuevo.</p>';
    }
};

getParticipacionTotal();
