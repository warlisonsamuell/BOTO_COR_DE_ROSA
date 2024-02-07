let alltext = [];
let textocompleto;


pdfjsLib.GlobalWorkerOptions.workerSrc ="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

// Obtém referências para vários elementos
let pdfinput = document.querySelector(".selectpdf"); // Referência ao campo de input do arquivo PDF
let upload = document.querySelector(".upload"); // Referência ao botão de upload
let afterupload = document.querySelector(".afterupload"); // Referência à seção de resultado
let select = document.querySelector("select"); // Referência ao menu suspenso de seleção de página
let download = document.querySelector(".download"); // Referência ao link de download
let pdftext = document.querySelector(".pdftext"); // Referência à área de texto para exibir o texto extraído

// Evento de escuta para o clique no botão de upload
upload.addEventListener("click", () => {
  let file = pdfinput.files[0]; // Obtém o arquivo PDF selecionado
  if (file != undefined && file.type == "application/pdf") {
    let fr = new FileReader(); // Cria um novo objeto FileReader
    fr.readAsDataURL(file); // Lê o arquivo como URL de dados
    
    fr.onload = () => {
    let res = fr.result; // Obtém o resultado da leitura do arquivo
    extractText(res, textocompleto)
    };

  } else {
    alert("Selecione um arquivo PDF válido");
  }
});



async function extractText(url, textocompleto) {
  try {
    let pdf;

    pdf = await pdfjsLib.getDocument(url).promise;
    
    let pages = pdf.numPages; // Obtém o número total de páginas no PDF

    for (let i = 1; i <= pages; i++) {
      let page = await pdf.getPage(i); // Obtém o objeto de página para cada página
      let txt = await page.getTextContent(); // Obtém o conteúdo de texto da página
      let text = txt.items.map((s) => s.str).join(""); // Concatena os itens de texto em uma única string
      alltext.push(text); // Adiciona o texto extraído ao array

      textocompleto = textocompleto + text;
    }

    alltext.map((e, i) => {
      select.innerHTML += `<option value="${i + 1}">${i + 1}</option>`; // Adiciona opções para cada página no menu suspenso de seleção de página
    });



    function extrairInformacaoEntreMarcadores(marcadorInicial, marcadorFinal, reseva1) {
        var inicioIndex = textocompleto.indexOf(marcadorInicial);
    
        // Certifique-se de que o marcador inicial existe no textocompleto
        if (inicioIndex !== -1) {
            var fimIndex = textocompleto.indexOf(marcadorFinal, inicioIndex + marcadorInicial.length);
    
            // Verifique se o marcador final foi encontrado
            if (fimIndex !== -1) {
                var informacaoEntreMarcadores = textocompleto.substring(inicioIndex + marcadorInicial.length, fimIndex).trim();
                console.log(`${marcadorInicial}:`, informacaoEntreMarcadores);
                return informacaoEntreMarcadores;
            } else {
                extrairInformacaoEntreMarcadores(marcadorInicial,reseva1)
            }
        } else {
            console.log(`Não foi possível encontrar '${marcadorInicial}' no textocompleto.`);
            return null;
        }
    }
    
    let CONTATO = extrairInformacaoEntreMarcadores("Contato", "Principais competências","Languages");
    let COMPETENCIAS = extrairInformacaoEntreMarcadores("Principais competências", "Languages","Certifications");
    let LANGUAGES = extrairInformacaoEntreMarcadores("Languages", "Certifications", "Resumo");
    let CERTIFICATIONS = extrairInformacaoEntreMarcadores("Certifications", "Resumo", "Experiência");
    let RESUMO = extrairInformacaoEntreMarcadores("Resumo", "Experiência", "Formação acadêmica");
    let EXPERIENCIAS = extrairInformacaoEntreMarcadores("Experiência", "Formação acadêmica");
    
    let FORMACAO = textocompleto.substring(textocompleto.indexOf("Formação acadêmica") + "Formação acadêmica".length);


    
    console.log(`FORMACAO:`, FORMACAO);

    let timexp = textocompleto.substring(textocompleto.indexOf("Experiência") + "Experiência".length, textocompleto.indexOf("Formação acadêmica"));


    function extrairAnosMeses(texto_experiencia) {
        let tempo_experiencia = 0;
        var regex = /(\d*)\s*ano[s]?|(\d*)\s*m[eê]s[es]?|(\d+)\s*ano[s]?\s*(\d+)\s*m[eê]s[es]?/ig;

        var matches;
        var resultados = [];
    
        while ((matches = regex.exec(texto_experiencia)) !== null) {
            var anos = parseInt(matches[1]) || 0;
            var meses = parseInt(matches[2]) || 0;
            var totalMeses = anos * 12 + meses;
    
            resultados.push({ anos, meses, totalMeses });
            tempo_experiencia = tempo_experiencia + totalMeses;
        }
        timexp = tempo_experiencia
    
        console.log("Tempo total de experiência:", tempo_experiencia, "meses");
    }
    
    // Exemplo de chamada da função
    extrairAnosMeses(timexp);
    console.log(timexp) //guardar o tempo de experiencia
    

    afterProcess(); // Exibe a seção de resultado
  } catch (err) {
    alert(err.message);
  }
}



function afterProcess() {
  pdftext= textocompleto; // Exibe o texto extraído para a página selecionada
  download.href =
    "data:text/plain;charset=utf-8," +
    encodeURIComponent(textocompleto);
  afterupload.style.display = "flex"; 
  document.querySelector(".another").style.display = "unset";
}

