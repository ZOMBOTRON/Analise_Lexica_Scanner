const fs = require('fs');

const linguagem = {
  palavras_reservadas: ['while', 'do'],
  operadores: ['<', '=', '+'],
  terminadores: [';'],
  identificadores: ['i', 'j'],
  constantes: [],
  numeros: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

const codigo = `while i < 100 do i = i + j;`;

const tokenizar = (codigo) => {
  const tokens = [];
  let linha = 0;
  let coluna = 0;

  codigo.split(/(\s+|[<>=+;])/).forEach((token) => {
    if (token.trim() !== '') {
      tokens.push({ token, linha, coluna });
    }
    coluna += token.length;
    if (token.includes('\n')) {
      linha += 1;
      coluna = 0;
    }
  });

  return tokens;
};

const tokens = tokenizar(codigo);
console.log('Tokens:', tokens);

const identificador_token = (token) => {
  if (linguagem.palavras_reservadas.includes(token)) return 'Palavra reservada';
  if (linguagem.operadores.includes(token)) return 'Operador';
  if (linguagem.terminadores.includes(token)) return 'Terminador';
  if (linguagem.identificadores.includes(token)) return 'Identificador';
  if (linguagem.numeros.includes(token)) return 'Número';
  if (!isNaN(token)) return 'Constante';
  return 'Erro: Token desconhecido';
};

const tabelaTokens = [];
const tabelaSimbolos = new Map();
let simboloIndex = 1;

tokens.forEach(({ token, linha, coluna }) => {
  const tipo = identificador_token(token);
  const tamanho = token.length;
  tabelaTokens.push({ token, tipo, tamanho, linha, coluna });

  if (tipo === 'Identificador' || tipo === 'Constante') {
    if (!tabelaSimbolos.has(token)) {
      tabelaSimbolos.set(token, simboloIndex++);
    }
  }
});

let outputTokens = `token\tidentificação\ttamanho\tposição (lin, col)\n`;
tabelaTokens.forEach(({ token, tipo, tamanho, linha, coluna }) => {
  const tipoDetalhado =
    tipo === 'Identificador' || tipo === 'Constante'
      ? `[${tipo.toLowerCase()}, ${tabelaSimbolos.get(token)}]`
      : tipo.toLowerCase();
  outputTokens += `${token}\t${tipoDetalhado}\t${tamanho}\t(${linha}, ${coluna})\n`;
});

let outputSimbolos = `Tabela de símbolos\níndice\tsímbolo\n`;
tabelaSimbolos.forEach((index, simbolo) => {
  outputSimbolos += `${index}\t${simbolo}\n`;
});
fs.writeFileSync(
  'tabela.txt',
  `${outputTokens}\n\n\n${outputSimbolos}`,
  'utf-8',
);

console.log('Tabela de Tokens:');
console.log(outputTokens);
console.log('Tabela de Símbolos:');
console.log(outputSimbolos);

const erros = tabelaTokens.filter((t) => t.tipo.startsWith('Erro'));
if (erros.length > 0) {
  console.error('Erros encontrados:');
  erros.forEach((erro) =>
    console.error(
      `Token: ${erro.token}, Posição: (${erro.linha}, ${erro.coluna}), Tipo: ${erro.tipo}`,
    ),
  );
}
