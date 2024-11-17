const API_URL_BASE = "https://openexchangerates.org/api/";
const API_APP_ID = "e77f99c02f404d34a3631b67223d85e5";
const API_MXN_CURRENCY = "MXN";
var pesos_a_dolares = true;

window.onload = function() {
    actualizarImagenesMonedas();
}

function intercambiarTipoConversion() {
    pesos_a_dolares = !pesos_a_dolares;
    actualizarImagenesMonedas();
}

function actualizarImagenesMonedas() {
    var titulo = document.getElementById("h1_titulo");
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    if(pesos_a_dolares) {
        titulo.innerText = "Conversor de Divisas Pesos Mexicanos a Dólares"
        img1.src = "img/mex.png";
        img2.src = "img/usa.png";
    } else {
        titulo.innerText = "Conversor de Divisas Dólares a  Pesos Mexicanos"
        img1.src = "img/usa.png";
        img2.src = "img/mex.png";
    }
}

function convertir() {
    let importe = parseFloat(document.getElementById("txt_importe").value);
    let res = document.getElementById("txt_resultado");
    let txtasa = document.getElementById("txt_tasa");
    console.log(pesos_a_dolares);
    let request = new XMLHttpRequest();

    request.open('GET', API_URL_BASE + "latest.json?app_id=" + API_APP_ID + "&symbols=" + API_MXN_CURRENCY, true);

    request.onerror = function() {
        alert("No se puede consultar el API en este momento...");
    }

    request.onload = function() {
        if(request.status >= 200 && request.status < 300) {
            var data = JSON.parse(this.response);
            console.log(data);
            var var_rates = data.rates;
            var tasa = parseFloat(var_rates['MXN']);
            if(!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0) {
                txtasa.value = tasa;
                if(pesos_a_dolares) {
                    res.value = (importe / tasa);
                } else {
                    res.value = (importe * tasa);
                }
            }
        } else {
            alert("No se pueden consultar las tasas de cambio...");
        }
    }

    request.send();
    return false;
}