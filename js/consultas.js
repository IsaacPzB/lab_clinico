
function consultar() {
    document.getElementById("tableInner").style.display = "none";
    document.getElementById("tableLeft").style.display = "none";
    document.getElementById("tableAvg").style.display = "none";
    document.getElementById("tableMax").style.display = "none";
    document.getElementById("tableMin").style.display = "none";
    document.getElementById("tableCount").style.display = "none";
    document.getElementById("tableSum").style.display = "none";

    let consulta
    let selection = document.getElementById("select");
    consulta = selection.options[selection.selectedIndex].value;
    let infoForm = {};

    if (consulta == 1) {
        document.getElementById("title").innerText = "Solicitudes de laboratorio pendientes";

        axios.get('http://isaacpzb.pythonanywhere.com/inner')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoInner").innerHTML = "";
                for (let x in response.data) {
                    infoForm["ORDEN"] = response.data[x].id_solicitud;
                    infoForm["NOMBRE"] = response.data[x].nombre;
                    infoForm["SEDE"] = response.data[x].sede;
                    infoForm["SERVICIO"] = response.data[x].servicio;
                    infoForm["FECHA"] = response.data[x].fecha;

                    document.getElementById("tableInner").style.display = "block";
                    document.getElementById("cuerpoInner").innerHTML += "";

                    tabla = document.getElementById("cuerpoInner");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.ORDEN;

                    cell2 = filanueva.insertCell(1);
                    cell2.innerHTML = infoForm.NOMBRE;

                    cell3 = filanueva.insertCell(2);
                    cell3.innerHTML = infoForm.SEDE;

                    cell4 = filanueva.insertCell(3);
                    cell4.innerHTML = infoForm.SERVICIO;

                    cell5 = filanueva.insertCell(4);
                    cell5.innerHTML = infoForm.FECHA;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    } else if (consulta == 2) {
        document.getElementById("title").innerText = "Solicitudes de laboratorio pendientes y con resultados";

        axios.get('http://isaacpzb.pythonanywhere.com/left')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoLeft").innerHTML = "";
                for (let x in response.data) {
                    infoForm["ORDEN"] = response.data[x].id_solicitud;
                    infoForm["NOMBRE"] = response.data[x].nombre;
                    infoForm["SEDE"] = response.data[x].sede;
                    infoForm["SERVICIO"] = response.data[x].servicio;
                    infoForm["FECHA"] = response.data[x].fecha_solicitud;
                    infoForm["RESULTADO"] = response.data[x].respuesta_No;
                    infoForm["BACTERIOLOGO"] = response.data[x].bacteriologo;
                    infoForm["FECHA_RES"] = response.data[x].fecha_respuesta;

                    document.getElementById("tableLeft").style.display = "block";
                    document.getElementById("cuerpoLeft").innerHTML += "";

                    tabla = document.getElementById("cuerpoLeft");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.ORDEN;

                    cell2 = filanueva.insertCell(1);
                    cell2.innerHTML = infoForm.NOMBRE;

                    cell3 = filanueva.insertCell(2);
                    cell3.innerHTML = infoForm.SEDE;

                    cell4 = filanueva.insertCell(3);
                    cell4.innerHTML = infoForm.SERVICIO;

                    cell5 = filanueva.insertCell(4);
                    cell5.innerHTML = infoForm.FECHA;

                    cell6 = filanueva.insertCell(5);
                    cell6.innerHTML = infoForm.RESULTADO;

                    cell7 = filanueva.insertCell(6);
                    cell7.innerHTML = infoForm.BACTERIOLOGO;

                    cell8 = filanueva.insertCell(7);
                    cell8.innerHTML = infoForm.FECHA_RES;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    } else if (consulta == 3) {
        document.getElementById("title").innerText = "Promedio de edad entre los pacientes";

        axios.get('http://isaacpzb.pythonanywhere.com/avg')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoAvg").innerHTML = "";
                for (let x in response.data) {
                    infoForm["MEDIA"] = response.data[x].edad_media;

                    document.getElementById("tableAvg").style.display = "block";
                    document.getElementById("cuerpoAvg").innerHTML += "";

                    tabla = document.getElementById("cuerpoAvg");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.MEDIA;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    } else if (consulta == 4) {
        document.getElementById("title").innerText = "Máxima edad entre los pacientes";

        axios.get('http://isaacpzb.pythonanywhere.com/max')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoMax").innerHTML = "";
                for (let x in response.data) {
                    infoForm["MAX"] = response.data[x].edad_max;

                    document.getElementById("tableMax").style.display = "block";
                    document.getElementById("cuerpoMax").innerHTML += "";

                    tabla = document.getElementById("cuerpoMax");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.MAX;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    } else if (consulta == 5) {
        document.getElementById("title").innerText = "Minima edad entre los pacientes";

        axios.get('http://isaacpzb.pythonanywhere.com/min')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoMin").innerHTML = "";
                for (let x in response.data) {
                    infoForm["MIN"] = response.data[x].edad_min;

                    document.getElementById("tableMin").style.display = "block";
                    document.getElementById("cuerpoMin").innerHTML += "";

                    tabla = document.getElementById("cuerpoMin");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.MIN;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    } else if (consulta == 6) {
        document.getElementById("title").innerText = "Cantidad de pacientes ingresados por el sistema";

        axios.get('http://isaacpzb.pythonanywhere.com/count')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoCount").innerHTML = "";
                for (let x in response.data) {
                    infoForm["COUNT"] = response.data[x].count_paciente;

                    document.getElementById("tableCount").style.display = "block";
                    document.getElementById("cuerpoCount").innerHTML += "";

                    tabla = document.getElementById("cuerpoCount");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.COUNT;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    } else if (consulta == 7) {
        document.getElementById("title").innerText = "Suma de las edades de los pacientes";

        axios.get('http://isaacpzb.pythonanywhere.com/sum')
            .then(function (response) {
                console.log(response)
                document.getElementById("cuerpoSum").innerHTML = "";
                for (let x in response.data) {
                    infoForm["SUM"] = response.data[x].edad_total;

                    document.getElementById("tableSum").style.display = "block";
                    document.getElementById("cuerpoSum").innerHTML += "";

                    tabla = document.getElementById("cuerpoSum");
                    filanueva = tabla.insertRow(tabla.length);

                    cell1 = filanueva.insertCell(0);
                    cell1.innerHTML = infoForm.SUM;
                }

            }).catch(function (error) {
                error = "Hubo un fallo!!"
                alert(error)
            });
    }
}


