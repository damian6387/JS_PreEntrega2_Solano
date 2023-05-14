const opcionesAhorro = [
  //Para riesgo bajo existen 3 mecanismos de ahorro recomendados: Plazo fijo en unidades indexadas, Letras de regulacion monetaria y Ahorro en ganado
  //Por ese motivo los campos bonosDelTesoro y fondosDeInversion (que pertenecen a riesgo medio) estan vacios.
  {
    riesgo: "Bajo",
    plazo: "12", //Plazo en meses
    plazoFijo: 10,
    letrasDeRegulacion: 25,
    ahorroEnGanado: 60, //Solo habilitado para montos mayores a USD5000
    bonosDelTesoro: "",
    fondosDeInversion: "",
  },
  {
    riesgo: "Bajo",
    plazo: "24", //Plazo en meses
    plazoFijo: 20,
    letrasDeRegulacion: 35,
    ahorroEnGanado: 70, //Solo habilitado para montos mayores a USD5000
    bonosDelTesoro: "",
    fondosDeInversion: "",
  },
  {
    riesgo: "Bajo",
    plazo: "36", //Plazo en meses
    plazoFijo: 30,
    letrasDeRegulacion: 65,
    ahorroEnGanado: 90, //Solo habilitado para montos mayores a USD5000
    bonosDelTesoro: "",
    fondosDeInversion: "",
  },
  //Para riesgo medio existen 2 mecanismos de ahorro recomendados: Bonos del tesoro y Fondos de inversion
  {
    riesgo: "Medio",
    plazo: "12", //Plazo en meses
    plazoFijo: "",
    letrasDeRegulacion: "",
    ahorroEnGanado: "",
    bonosDelTesoro: 50,
    fondosDeInversion: 65,
  },
  {
    riesgo: "Medio",
    plazo: "24", //Plazo en meses
    plazoFijo: "",
    letrasDeRegulacion: "",
    ahorroEnGanado: "",
    bonosDelTesoro: 100,
    fondosDeInversion: 105,
  },
  {
    riesgo: "Medio",
    plazo: "36", //Plazo en meses
    plazoFijo: "",
    letrasDeRegulacion: "",
    ahorroEnGanado: "",
    bonosDelTesoro: 110,
    fondosDeInversion: 115,
  },
];

let opcionesAhorroArray = [];
let flag = true;
let flag2;
let flag3;
let flag4;

class OpcionAhorro {
  constructor(
    monto,
    riesgo,
    plazo,
    plazoFijo,
    letrasDeRegulacion,
    ahorroEnGanado,
    bonosDelTesoro,
    fondosDeInversion
  ) {
    this.monto = monto;
    this.riesgo = riesgo;
    this.plazo = plazo;
    this.plazoFijo = plazoFijo;
    this.letrasDeRegulacion = letrasDeRegulacion;
    this.ahorroEnGanado = ahorroEnGanado;
    this.bonosDelTesoro = bonosDelTesoro;
    this.fondosDeInversion = fondosDeInversion;
  }
}

function pushOpcionesAhorro() {
  for (const elemento of opcionesAhorro) {
    opcionesAhorroArray.push(
      new OpcionAhorro(
        elemento.monto,
        elemento.riesgo,
        elemento.plazo,
        elemento.plazoFijo,
        elemento.letrasDeRegulacion,
        elemento.ahorroEnGanado,
        elemento.bonosDelTesoro,
        elemento.fondosDeInversion
      )
    );
  }
}
pushOpcionesAhorro();

function calcular(monto, interes) {
  let resultado = Math.round((monto * interes) / 10000);
  return resultado;
}

function initProgram() {
  while (flag) {
    flag2 = true;
    flag3 = true;
    flag4 = true;
    let selectOption = prompt(
      "Hola! Bienvenido al simulador interactivo de ahorro de yourSaving. \n\n 1. Comenzar a simular \n\n 2. Salir\n"
    );
    switch (selectOption) {
      case "1":
        simuladorAhorro();
        break;
      case "2":
        flag = false;
        break;
      default:
        alert("El numero que ingresaste no es valido");
        selectOption = prompt(
          "Hola! Bienvenido al simulador interactivo de ahorro de yourSaving. \n\n 1. Comenzar a simular \n\n 2. Salir\n"
        );
    }
  }
}

initProgram();

function simuladorAhorro() {
  //Se deben ingresar los parametros monto, riesgo y plazo
  let monto = Number(prompt("Introduce el monto a ahorrar:"));
  while (flag2) {
    if (monto == 0 || monto == " ") {
      alert("Introduce un monto valido");
      monto = Number(prompt("Introduce el monto a ahorrar:"));
    } else {
      flag2 = 0;
    }
  }
  let riesgoIntroducido = prompt("Introduce el riesgo (Bajo, Medio):");
  while (flag3) {
    if (riesgoIntroducido == "Bajo" || riesgoIntroducido == "Medio") {
      flag3 = 0;
    } else {
      alert("Introduce un riesgo valido");
      riesgoIntroducido = prompt("Introduce el riesgo (Bajo, Medio):");
    }
  }
  let plazoIntroducido = prompt("Introduce un plazo (12, 24 o 36 meses):");
  while (flag4) {
    if (
      plazoIntroducido == "12" ||
      plazoIntroducido == "24" ||
      plazoIntroducido == "36"
    ) {
      flag4 = 0;
    } else {
      alert("Introduce un plazo valido");
      plazoIntroducido = prompt("Introduce un plazo (12, 24 o 36 meses):");
    }
  }

  alert("Danos un momento, estamos analizando la informacion ingresada.");

  //Se filtra opcionesAhorroArray en busca de aquellos elementos del mismo que contengan el riesgo y el plazo ingresado por el usuario
  let riesgoABuscar = opcionesAhorroArray.filter((elemento) => {
    return elemento.riesgo === riesgoIntroducido;
  });
  let plazoABuscar = opcionesAhorroArray.filter((elemento) => {
    return elemento.plazo === plazoIntroducido;
  });

  //Se obtiene el unico elemento que contiene ambos parametros ingresados por el usuario
  let elementoEnComun = opcionesAhorroArray.find((elemento) => {
    return riesgoABuscar.includes(elemento) && plazoABuscar.includes(elemento);
  });

  //Obtenido el elemento se realizan los calculos de interes
  if (riesgoIntroducido == "Bajo") {
    let interesPlazoFijo = elementoEnComun.plazoFijo;
    let interesLetras = elementoEnComun.letrasDeRegulacion;
    let resultadoFinal = calcular(monto, interesPlazoFijo);
    let resultadoFinal2 = calcular(monto, interesLetras);
    if (monto < 5000) {
      alert(
        `Te recomendamos depositar tu capital en alguno de los siguientes instrumentos (Interes acumulado a los ${plazoIntroducido} meses): \n\nPlazo fijo en Unidades Indexadas: USD ${resultadoFinal}\n\nLetras de regulacion monetaria. USD ${resultadoFinal2}`
      );
    } else {
      let interesEnGanado = elementoEnComun.ahorroEnGanado;
      let resultadoFinal3 = calcular(monto, interesEnGanado);

      alert(
        `Te recomendamos depositar tu capital en alguno de los siguientes instrumentos (Interes acumulado a los ${plazoIntroducido} meses): \n\nPlazo fijo en Unidades Indexadas: USD ${resultadoFinal}\n\nLetras de regulacion monetaria. USD ${resultadoFinal2} \n\n Ahorro en ganado: USD ${resultadoFinal3}`
      );
    }
  } else if (riesgoIntroducido == "Medio") {
    let interesBonos = elementoEnComun.bonosDelTesoro;
    let interesFondos = elementoEnComun.fondosDeInversion;
    let resultadoFinal = calcular(monto, interesBonos);
    let resultadoFinal2 = calcular(monto, interesFondos);
    alert(
      `Te recomendamos depositar tu capital en alguno de los siguientes instrumentos (Interes acumulado a los ${plazoIntroducido} meses): \n\nBonos del Tesoro: USD ${resultadoFinal}\n\nFondos de Inversion. USD ${resultadoFinal2}`
    );
  }
  initProgram();
}
