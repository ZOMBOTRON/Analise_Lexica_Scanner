const linguagem = {
  palavras_reservadas: ['while', 'do'],
  operadores: ['<', '=', '+'],
  terminadores: [';'],
  identificadores: ['i', 'j'],
  constantes: [],
  numeros: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

for (let i = 0; i < 100; i++) {
  linguagem.constantes.push(i.toString());
}

const codigo = `while i < 100 do i = i + j;`;

const tokens = codigo.split(' ');

const identificador_token = (token) => {
  if (linguagem.palavras_reservadas.includes(token)) return 'Palavra reservada';
  if (linguagem.operadores.includes(token)) return 'Operador';
  if (linguagem.terminadores.includes(token)) return 'Terminador';
  if (linguagem.identificadores.includes(token)) return 'Identificador';
  if (linguagem.constantes.includes(token)) return 'Constante';
  if (linguagem.numeros.includes(token)) return 'Número';
  return 'Desconhecido';
};

const identificacao = tokens.map((token) => identificador_token(token));

const tamanho_token = tokens.map((token) => token.length);

const posicionamento = tokens.map((token, index) => {
  const posicao = codigo.indexOf(token);
  return posicao === -1 ? 'Não encontrado' : posicao;
});

console.log('Tokens:', tokens);
console.log('Identificação:', identificacao);
console.log('Tamanho:', tamanho_token);
console.log('Posicionamento:', posicionamento);
