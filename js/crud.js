function solicitud() {
    document.getElementById("msg").style.display = "none";
    document.getElementById("tablePaciente").style.display = "none";
    document.getElementById("formCrud").reset();
    document.getElementById("orden").disabled = false;
    document.getElementById("idPaciente").disabled = false;


    let paciente;

    paciente = document.getElementById("search").value;
    if (paciente == "") {
        document.getElementById("msg").style.display = "block";
    } else {
        document.getElementById("formSearch").reset();

        let infoForm = {};

        axios
            .get("http://isaacpzb.pythonanywhere.com/solicitud/" + paciente)
            .then(function (response) {
                console.log(response);
                console.log(response.data[0].nombre);
                paciente = JSON.stringify(response);
                console.log(paciente);


                document.getElementById("cuerpoPaciente").innerHTML = "";

                for (let x in response.data) {
                    infoForm["FECHA"] = response.data[x].fecha;
                    infoForm["SOLICITUD"] = response.data[x].id_solicitud;
                    infoForm["NOMBRE"] = response.data[x].nombre;
                    infoForm["NUMERO_IDENTIFICACION"] = response.data[x].numero_identificacion;
                    infoForm["SEDE"] = response.data[x].sede;
                    infoForm["SERVICIO"] = response.data[x].servicio;


                    document.getElementById("tablePaciente").style.display = "block";
                    document.getElementById("cuerpoPaciente").innerHTML += "";

                    tabla = document.getElementById("cuerpoPaciente");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.SOLICITUD;

                    cell2 = filanueva.insertCell(1);
                    cell2.innerHTML = infoForm.NOMBRE;

                    cell3 = filanueva.insertCell(2);
                    cell3.innerHTML = infoForm.NUMERO_IDENTIFICACION;

                    cell4 = filanueva.insertCell(3);
                    cell4.innerHTML = infoForm.SEDE;

                    cell5 = filanueva.insertCell(4);
                    cell5.innerHTML = infoForm.SERVICIO;

                    cell6 = filanueva.insertCell(5);
                    cell6.innerHTML = infoForm.FECHA;

                    cell7 = filanueva.insertCell(6);
                    cell7.innerHTML = `<a class="btn btn-warning mx-2" type="button" onClick="onBajar(this)">Bajar</a>`;
                }
            })
            .catch(function () {
                document.getElementById("msg").style.display = "block";
            });
    }

}

function onBajar(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("idPaciente").value = selectedRow.cells[2].innerHTML;
    document.getElementById("idPaciente").disabled = true;

    document.getElementById("orden").value = selectedRow.cells[0].innerHTML;
    document.getElementById("orden").disabled = true;
}

//Obtener resultados

function resultados() {
    document.getElementById("formCrud").reset();
    document.getElementById("orden").disabled = false;
    document.getElementById("idPaciente").disabled = false;


    document.getElementById("formSearch").reset();

    let infoForm = {};

    axios
        .get("http://isaacpzb.pythonanywhere.com/resultados")
        .then(function (response) {
            console.log(response);

            document.getElementById("cuerpoResultados").innerHTML = "";

            for (let x in response.data) {
                infoForm["BACTERIOLOGO"] = response.data[x].bacteriologo;
                infoForm["FECHA"] = response.data[x].fecha_respuesta;
                infoForm["HCT"] = response.data[x].hct;
                infoForm["HGB"] = response.data[x].hgb;
                infoForm["LYM"] = response.data[x].lym;
                infoForm["MON"] = response.data[x].mon;
                infoForm["NEU"] = response.data[x].neu;
                infoForm["ORDEN"] = response.data[x].num_solicitud;
                infoForm["PACIENTE"] = response.data[x].paciente;
                infoForm["PIT"] = response.data[x].pit;
                infoForm["RBC"] = response.data[x].rbc;
                infoForm["WBC"] = response.data[x].wbc;


                document.getElementById("tableResultados").style.display = "block";
                document.getElementById("cuerpoResultados").innerHTML += "";

                tabla = document.getElementById("cuerpoResultados");
                filanueva = tabla.insertRow(tabla.length);

                cell1 = filanueva.insertCell(0);
                cell1.innerHTML = infoForm.WBC;

                cell2 = filanueva.insertCell(1);
                cell2.innerHTML = infoForm.NEU;

                cell3 = filanueva.insertCell(2);
                cell3.innerHTML = infoForm.LYM;

                cell4 = filanueva.insertCell(3);
                cell4.innerHTML = infoForm.MON;

                cell5 = filanueva.insertCell(4);
                cell5.innerHTML = infoForm.RBC;

                cell6 = filanueva.insertCell(5);
                cell6.innerHTML = infoForm.HGB;

                cell7 = filanueva.insertCell(6);
                cell7.innerHTML = infoForm.HCT;

                cell8 = filanueva.insertCell(7);
                cell8.innerHTML = infoForm.PIT;

                cell9 = filanueva.insertCell(8);
                cell9.innerHTML = infoForm.PACIENTE;

                cell10 = filanueva.insertCell(9);
                cell10.innerHTML = infoForm.BACTERIOLOGO;

                cell11 = filanueva.insertCell(10);
                cell11.innerHTML = infoForm.ORDEN;

                cell12 = filanueva.insertCell(11);
                cell12.innerHTML = infoForm.FECHA;

                cell13 = filanueva.insertCell(12);
                cell13.innerHTML = `<a class="btn btn-warning mx-2 " onClick="onEdit(this)">Edit</a>
                <a class= "btn btn-danger" onClick="onDelete(this)">Delete</a>`;
            }
        })
        .catch(function () {
            document.getElementById("msg").style.display = "block";
        });
}
// Actualizar datos
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("idPaciente").value = selectedRow.cells[8].innerHTML;
    document.getElementById("idPaciente").disabled = true;

    document.getElementById("orden").value = selectedRow.cells[10].innerHTML;
    document.getElementById("orden").disabled = true;

    document.getElementById("put").style.visibility = "visible";
    document.getElementById("enviar").disabled = "true";

    document.getElementById("bacteriologo").style.visibility = "hidden";

    document.getElementById("wbc").value = selectedRow.cells[0].innerHTML;
    document.getElementById("neu").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lym").value = selectedRow.cells[2].innerHTML;
    document.getElementById("mon").value = selectedRow.cells[3].innerHTML;
    document.getElementById("rbc").value = selectedRow.cells[4].innerHTML;
    document.getElementById("hgb").value = selectedRow.cells[5].innerHTML;
    document.getElementById("hct").value = selectedRow.cells[6].innerHTML;
    document.getElementById("pit").value = selectedRow.cells[7].innerHTML;
}

function actualizar() {
    let orden, wbc, neu, lym, mon, rbc, hgb, hct, pit;

    wbc = document.getElementById("wbc").value;
    neu = document.getElementById("neu").value;
    lym = document.getElementById("lym").value;
    mon = document.getElementById("mon").value;
    rbc = document.getElementById("rbc").value;
    hgb = document.getElementById("hgb").value;
    hct = document.getElementById("hct").value;
    pit = document.getElementById("pit").value;
    orden = document.getElementById("orden").value;

    let data = {
        wbc: wbc,
        neu: neu,
        lym: lym,
        mon: mon,
        rbc: rbc,
        hgb: hgb,
        hct: hct,
        pit: pit,
        id_solicitud: orden
    };

    axios.put('http://isaacpzb.pythonanywhere.com/actualizarResultados', data)
        .then(function (response) {
            alert(response.data.Informacion)
            resultados();
            document.getElementById("formCrud").reset();
            document.getElementById("bacteriologo").style.visibility = "visible";
            document.getElementById("enviar").disabled = "false";
            document.getElementById("put").style.visibility = "hidden";


        })
        .catch(function (error) {
            console.log(error);
        });
}

function onDelete(td) {
    selectedRow = td.parentElement.parentElement;
    let data = selectedRow.cells[10].innerHTML;

    axios.delete('http://isaacpzb.pythonanywhere.com/eliminarResultados/' +data,)
        .then(function (response) {
            console.log(data)
            alert(response.data.Informacion)
            resultados();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Enviar resultados y actualizar los estados de solucitud
function insertarResultados() {
    let orden, wbc, neu, lym, mon, rbc, hgb, hct, pit, paciente, bacteriologo;

    wbc = document.getElementById("wbc").value;
    neu = document.getElementById("neu").value;
    lym = document.getElementById("lym").value;
    mon = document.getElementById("mon").value;
    rbc = document.getElementById("rbc").value;
    hgb = document.getElementById("hgb").value;
    hct = document.getElementById("hct").value;
    pit = document.getElementById("pit").value;
    paciente = document.getElementById("idPaciente").value;
    bacteriologo = document.getElementById("bacteriologo").value;
    orden = document.getElementById("orden").value;

    let data = {
        wbc: wbc,
        neu: neu,
        lym: lym,
        mon: mon,
        rbc: rbc,
        hgb: hgb,
        hct: hct,
        pit: pit,
        paciente: paciente,
        bacteriologo: bacteriologo,
        id_solicitud: orden
    };

    let data02 = {
        id_solicitud: orden
    };

    axios
        .post("http://isaacpzb.pythonanywhere.com/insertarResultados", data)
        .then(function (response) {
            console.log(response.data);
            let msg = JSON.stringify(response.data);
            alert(msg)

            if (msg == "{\"informacion\":\"Fallo al insertar, verifique la solicitud\"}") {
                document.getElementById("formCrud").reset();
                document.getElementById("orden").disabled = false;
                document.getElementById("idPaciente").disabled = false;
            } else {
                document.getElementById("formCrud").reset();
                document.getElementById("orden").disabled = false;
                document.getElementById("idPaciente").disabled = false;
                document.getElementById("tablePaciente").style.display = "none";
                axios
                    .put("http://isaacpzb.pythonanywhere.com/insertarResultados", data02)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
        .catch(function () {
            alert("Fallo al insertar, verifique la solicitud");
        });

}
