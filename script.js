function corrigirSimulado1() {
  const gabarito = {
    q1: "c",
    q2: "c",
    q3: "b",
    q4: "a",
    q5: "b"
  };
  corrigirSimulado("simulado1", gabarito);
}

function corrigirSimulado2() {
  const gabarito = {
    q6: "c",
    q7: "a",
    q8: "a",
    q9: "a",
    q10: "a"
  };
  corrigirSimulado("simulado2", gabarito);
}

function corrigirSimulado3() {
  const gabarito = {
    q11: "a",
    q12: "c",
    q13: "b",
    q14: "b",
    q15: "a"
  };
  corrigirSimulado("simulado3", gabarito);
}

function corrigirSimulado(simuladoId, gabarito) {
  const resultado = corrigirSimuladoScore(simuladoId, gabarito);
  const feedback = document.getElementById(`feedback${simuladoId}`);
  feedback.querySelector("p").textContent = `Você acertou ${resultado.acertos} de ${resultado.totalQuestoes} questões (${resultado.percentualAcertos.toFixed(2)}%).`;

  const listaErros = feedback.querySelector("ul");
  listaErros.innerHTML = "";
  for (const questao in gabarito) {
    if (resultado.respostas[questao] !== gabarito[questao]) {
      const item = document.createElement("li");
      item.textContent = `Questão ${parseInt(questao.substring(1))}: Resposta correta - ${gabarito[questao]}`;
      listaErros.appendChild(item);
    }
  }
}

function corrigirSimuladoScore(simuladoId, gabarito) {
  const respostas = {};
  const form = document.querySelector(`#${simuladoId}`);
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    respostas[key] = value;
  });

  let acertos = 0;
  for (const questao in gabarito) {
    if (respostas[questao] === gabarito[questao]) {
      acertos++;
    }
  }

  const percentualAcertos = (acertos / Object.keys(gabarito).length) * 100;

  return {
    acertos,
    totalQuestoes: Object.keys(gabarito).length,
    percentualAcertos,
    respostas
  };
}

function exibirResultadoFinal() {
  const gabarito1 = {
    q1: "c",
    q2: "c",
    q3: "b",
    q4: "a",
    q5: "b"
  };

  const gabarito2 = {
    q6: "c",
    q7: "a",
    q8: "a",
    q9: "a",
    q10: "a"
  };

  const gabarito3 = {
    q11: "a",
    q12: "c",
    q13: "b",
    q14: "b",
    q15: "a"
  };

  const resultadoSimulado1 = corrigirSimuladoScore("simulado1", gabarito1);
  const resultadoSimulado2 = corrigirSimuladoScore("simulado2", gabarito2);
  const resultadoSimulado3 = corrigirSimuladoScore("simulado3", gabarito3);

  const totalAcertos = resultadoSimulado1.acertos + resultadoSimulado2.acertos + resultadoSimulado3.acertos;
  const totalQuestoes = Object.keys(gabarito1).length + Object.keys(gabarito2).length + Object.keys(gabarito3).length;
  const percentualTotal = (totalAcertos / totalQuestoes) * 100;

  const resultadoFinalDiv = document.getElementById("resultadoFinal");
  resultadoFinalDiv.innerHTML = `<h2>Resultado Final</h2>
                                 <p>Total de acertos: ${totalAcertos} de ${totalQuestoes} questões (${percentualTotal.toFixed(2)}%)</p>`;
  resultadoFinalDiv.style.display = "block";
}
