function extrairAnosMeses(texto_experiencia) {
  if (
    texto_experiencia ==
    'Não foi possível encontrar Experiência no textocompleto.'
  ) {
    return 0;
  }

  let tempo_experiencia = 0;
  let regex =
    /(\d*)\s*ano[s]?|(\d*)\s*m[eê]s[es]?|(\d+)\s*ano[s]?\s*(\d+)\s*m[eê]s[es]?/gi;

  let matches;
  let resultados = [];

  while ((matches = regex.exec(texto_experiencia)) !== null) {
    let anos = parseInt(matches[1]) || 0;
    let meses = parseInt(matches[2]) || 0;
    let totalMeses = anos * 12 + meses;

    resultados.push({ anos, meses, totalMeses });
    tempo_experiencia = tempo_experiencia + totalMeses;
  }

  return tempo_experiencia;
}

function extrairInformacaoEntreMarcadores(
  textocompleto,
  marcadorInicial,
  marcadorFinal,
  reseva1,
) {
  let inicioIndex = textocompleto.indexOf(marcadorInicial);
  let fimIndex = textocompleto.indexOf(marcadorFinal);
  let istrue = true;

  // Certifique-se de que o marcador inicial existe no textocompleto
  if (inicioIndex !== -1 && fimIndex !== -1) {
    let fimIndex = textocompleto.indexOf(
      marcadorFinal,
      inicioIndex + marcadorInicial.length,
    );
    let informacaoEntreMarcadores = textocompleto
      .substring(inicioIndex + marcadorInicial.length, fimIndex)
      .trim();
    return informacaoEntreMarcadores;
  } else if (inicioIndex !== -1 && fimIndex == -1) {
    extrairInformacaoEntreMarcadores(marcadorInicial, reseva1);
  } else if (inicioIndex == -1) {
    istrue = false;
    console.log(
      `Não foi possível encontrar '${marcadorInicial}' no textocompleto.`,
    );
    return istrue;
  } else {
    return null;
  }
}

function escolaridadeFilter(FORMACAO) {
  let escolaridade = {
    ensinoMedio: 0,
    mestrado: 0,
    bacharelado: 0,
    tecnologo: 0,
    licenciatura: 0,
    posGraduacao: 0,
    doutorado: 0,
  };

  let ensinoMedio = FORMACAO.indexOf('Ensino médio');
  let mestrado = FORMACAO.indexOf('Mestrado');
  let bacharelado = FORMACAO.indexOf('Bacharelado');
  let tecnologo = FORMACAO.indexOf('Técnologo');
  let licenciatura = FORMACAO.indexOf('Licenciatura');
  let posGraduacao = FORMACAO.indexOf('Pós-graduação');
  let doutorado = FORMACAO.indexOf('Doutorado');

  if (doutorado !== -1) {
    escolaridade.doutorado = 1;
    escolaridade.ensinoMedio = 1;
  }
  if (mestrado !== -1) {
    escolaridade.mestrado = 1;
    escolaridade.ensinoMedio = 1;
  }
  if (bacharelado !== -1) {
    escolaridade.bacharelado = 1;
    escolaridade.ensinoMedio = 1;
  }
  //TECNOLOGO
  if (tecnologo !== -1) {
    escolaridade.tecnologo = 1;
    escolaridade.ensinoMedio = 1;
  }

  if (licenciatura !== -1) {
    escolaridade.licenciatura = 1;
    escolaridade.ensinoMedio = 1;
  }
  if (posGraduacao !== -1) {
    escolaridade.posGraduacao = 1;
    escolaridade.ensinoMedio = 1;
  }
  if (ensinoMedio !== 1) {
    escolaridade.ensinoMedio = 0;
  }

  return escolaridade;
}

function extractText(textocompleto) {
  // Dados extraidos
  let contato = extrairInformacaoEntreMarcadores(
    textocompleto,
    'Contato',
    'Principais competências',
    'Languages',
  );

  // let competencias = extrairInformacaoEntreMarcadores(
  //   textocompleto,
  //   'Principais competências',
  //   'Languages',
  //   'Certifications',
  // );

  // let languages = extrairInformacaoEntreMarcadores(
  //   textocompleto,
  //   'Languages',
  //   'Certifications',
  //   'Resumo',
  // );

  // let certifications = extrairInformacaoEntreMarcadores(
  //   textocompleto,
  //   'Certifications',
  //   'Resumo',
  //   'Experiência',
  // );

  // let resumo = extrairInformacaoEntreMarcadores(
  //   textocompleto,
  //   'Resumo',
  //   'Experiência',
  //   'Formação acadêmica',
  // );

  // let experiencias = extrairInformacaoEntreMarcadores(
  //   textocompleto,
  //   'Experiência',
  //   'Formação acadêmica',
  // );

  let formacao = textocompleto.substring(
    textocompleto.indexOf('Formação acadêmica') + 'Formação acadêmica'.length,
  );

  // let english = extrairInformacaoEntreMarcadores('Inglês (', ')');
  // let spanish = extrairInformacaoEntreMarcadores('Espanhol (', ')');

  let tempo_experiencia = textocompleto.substring(
    textocompleto.indexOf('Experiência') + 'Experiência'.length,
    textocompleto.indexOf('Formação acadêmica'),
  );
  tempo_experiencia = extrairAnosMeses(tempo_experiencia);

  const escolaridade = escolaridadeFilter(formacao);
  console.log(escolaridade);

  let email = contato
    .substring(contato[0], contato.indexOf('.com') + '.com'.length)
    .trim();
  console.log(email);
  return { email, tempo_experiencia, escolaridade };
}

module.exports = extractText;
