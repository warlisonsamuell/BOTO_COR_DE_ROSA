const GetTextFromPDF = require('./extractTextfromPDF');

let textocompleto;
let pessoa_info = [];

function extrairAnosMeses(texto_experiencia) {
  if (
    texto_experiencia ==
    'Não foi possível encontrar Experiência no textocompleto.'
  ) {
    return 0;
  } else {
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
}

function extrairInformacaoEntreMarcadores(
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

async function extractText(pdf) {
  try {
    // const text = await GetTextFromPDF(pdf.path);
    console.log('entrei', pdf);
    console.log(text);

    // return 0;

    // let tempo_experiencia = 0;

    // let pages = pdf.numPages; // Obtém o número total de páginas no PDF

    // for (let i = 1; i <= pages; i++) {
    //   let page = await pdf.getPage(i); // Obtém o objeto de página para cada página
    //   let txt = await page.getTextContent(); // Obtém o conteúdo de texto da página
    //   let text = txt.items.map((s) => s.str).join(''); // Concatena os itens de texto em uma única string

    //   textocompleto = textocompleto + text;
    // }

    // //Dados extraidos
    // let CONTATO = extrairInformacaoEntreMarcadores(
    //   'Contato',
    //   'Principais competências',
    //   'Languages',
    // );
    // let COMPETENCIAS = extrairInformacaoEntreMarcadores(
    //   'Principais competências',
    //   'Languages',
    //   'Certifications',
    // );
    // let LANGUAGE = extrairInformacaoEntreMarcadores(
    //   'Languages',
    //   'Certifications',
    //   'Resumo',
    // );
    // let CERTIFICATIONS = extrairInformacaoEntreMarcadores(
    //   'Certifications',
    //   'Resumo',
    //   'Experiência',
    // );
    // let RESUMO = extrairInformacaoEntreMarcadores(
    //   'Resumo',
    //   'Experiência',
    //   'Formação acadêmica',
    // );
    // let EXPERIENCIAS = extrairInformacaoEntreMarcadores(
    //   'Experiência',
    //   'Formação acadêmica',
    // );
    // let FORMACAO = textocompleto.substring(
    //   textocompleto.indexOf('Formação acadêmica') + 'Formação acadêmica'.length,
    // );

    // let english = extrairInformacaoEntreMarcadores('Inglês (', ')');
    // console.log('nivel de ingles: ' + english);

    // let spanish = extrairInformacaoEntreMarcadores('Espanhol (', ')');
    // console.log('nivel de espanhol: ' + spanish);

    // //Tempo de experiência
    // tempo_experiencia = textocompleto.substring(
    //   textocompleto.indexOf('Experiência') + 'Experiência'.length,
    //   textocompleto.indexOf('Formação acadêmica'),
    // );
    // tempo_experiencia = extrairAnosMeses(tempo_experiencia);
    // if (textocompleto.indexOf('Experiência') !== -1) {
    //   console.log('tempo de experiencia:' + tempo_experiencia + ' meses');
    // } else {
    //   console.log('Sem experiencia');
    // }

    // const acharTermo = function (termo) {
    //   if (COMPETENCIAS && COMPETENCIAS.indexOf(termo) !== -1) {
    //     return COMPETENCIAS.substring(
    //       COMPETENCIAS.indexOf(termo),
    //       COMPETENCIAS.indexOf(termo) + termo.length,
    //     );
    //   } else if (LANGUAGE && LANGUAGE.indexOf(termo) !== -1) {
    //     return LANGUAGE.substring(
    //       LANGUAGE.indexOf(termo),
    //       LANGUAGE.indexOf(termo) + termo.length,
    //     );
    //   } else if (CERTIFICATIONS && CERTIFICATIONS.indexOf(termo) !== -1) {
    //     return CERTIFICATIONS.substring(
    //       CERTIFICATIONS.indexOf(termo),
    //       CERTIFICATIONS.indexOf(termo) + termo.length,
    //     );
    //   } else if (RESUMO && RESUMO.indexOf(termo) !== -1) {
    //     return RESUMO.substring(
    //       RESUMO.indexOf(termo),
    //       RESUMO.indexOf(termo) + termo.length,
    //     );
    //   } else if (EXPERIENCIAS && EXPERIENCIAS.indexOf(termo) !== -1) {
    //     return EXPERIENCIAS.substring(
    //       EXPERIENCIAS.indexOf(termo),
    //       EXPERIENCIAS.indexOf(termo) + termo.length,
    //     );
    //   } else {
    //     return false;
    //   }
    // };

    // let sqlcomp = acharTermo('SQL');
    // console.log(sqlcomp);
    // let desThink = acharTermo('Design Think');
    // console.log(desThink);
    // let javSc = acharTermo('JavaScript');
    // console.log(javSc);

    // let manaus = acharTermo('Manaus');
    // console.log(manaus);

    // const escolaridade = function (FORMACAO) {
    //   let ensinoMedio = FORMACAO.indexOf('Ensino médio');
    //   let mestrado = FORMACAO.indexOf('Mestrado');
    //   let bacharelado = FORMACAO.indexOf('Bacharelado');
    //   let tecnologo = FORMACAO.indexOf('Técnologo');
    //   let licenciatura = FORMACAO.indexOf('Licenciatura');
    //   let posGraduacao = FORMACAO.indexOf('Pós-graduação');
    //   let doutorado = FORMACAO.indexOf('Doutorado');

    //   //DOUTORADO
    //   if (doutorado !== -1) {
    //     doutorado = 1;
    //     ensinoMedio = 1;
    //     console.log('doutorado', doutorado);
    //   } else {
    //     doutorado = 0;
    //     console.log('doutorado', doutorado);
    //   }

    //   //MESTRADO
    //   if (mestrado !== -1) {
    //     mestrado = 1;
    //     ensinoMedio = 1;
    //     console.log('mestrado', mestrado);
    //   } else {
    //     mestrado = 0;
    //     console.log('mestrado', mestrado);
    //   }

    //   //BACHARELADO
    //   if (bacharelado !== -1) {
    //     bacharelado = 1;
    //     ensinoMedio = 1;
    //     console.log('bacharelado', bacharelado);
    //   } else {
    //     bacharelado = 0;
    //     console.log('bacharelado', bacharelado);
    //   }

    //   //TECNOLOGO
    //   if (tecnologo !== -1) {
    //     tecnologo = 1;
    //     ensinoMedio = 1;
    //     console.log('tecnologo', tecnologo);
    //   } else {
    //     tecnologo = 0;
    //     console.log('tecnologo', tecnologo);
    //   }

    //   //LICENCIATURA
    //   if (licenciatura !== -1) {
    //     licenciatura = 1;
    //     ensinoMedio = 1;
    //     console.log('licenciatura', licenciatura);
    //   } else {
    //     licenciatura = 0;
    //     console.log('licenciatura', licenciatura);
    //   }

    //   //PÓS GRADUAÇÃO
    //   if (posGraduacao !== -1) {
    //     posGraduacao = 1;
    //     ensinoMedio = 1;
    //     console.log('posGraduacao', posGraduacao);
    //   } else {
    //     posGraduacao = 0;
    //     console.log('posGraduacao', posGraduacao);
    //   }

    //   //ENSINO MÉDIO
    //   if (ensinoMedio !== 1) {
    //     ensinoMedio = 0;
    //   }
    // };
    // escolaridade(FORMACAO);

    // let email = CONTATO.substring(
    //   CONTATO[0],
    //   CONTATO.indexOf('.com') + '.com'.length,
    // ).trim();
    // console.log(email);

    // pessoa_info.push(email);
    // pessoa_info.push(email);

    // return { email, tempo_experiencia };
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = extractText;
