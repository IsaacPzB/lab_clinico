
function login() {
  let usuario, contraseña;
  usuario = document.getElementById("user").value;
  usuario = usuario.replace(/ /g, "");
  contraseña = document.getElementById("pass").value;

  if (usuario == "" || contraseña == "") {
    alert("Error!, verificar los campos");
  } else {
    let data = {
      usuario: usuario,
      contraseña: contraseña,
    };

    axios
      .post("http://isaacpzb.pythonanywhere.com/login", data)
      .then(function (response) {
        console.log(response);
        if (response) {
          window.location = "html/crud.html";
          document.getElementById("formLogin").reset();
        }
      })
      .catch(function () {
        alert("Error!, usuario o contraseña equivocada")
      });
  }

}

function us() {
  axios
    .get("http://isaacpzb.pythonanywhere.com/guard")
    .then(function (response) {
      console.log(response.data[0].nombre)
      document.getElementById("nombre").innerHTML = response.data[0].nombre
    })
    .catch (function () {
      alert("Algo falló, vuelve a iniciar sesion")
    });

}

function nobackbutton() {
  window.location.hash = "no-back-button";
  window.location.hash = "Again-No-back-button" //chrome
  window.onhashchange = function () { window.location.hash = "no-back-button"; }
  window.history.forward();
}