// Declaração de variáveis
const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;
//--------------------------

//Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]
//--------------------------
//Substituição do Quizz para primeira pergunta
function init(){
    //criar a primeira pergunta
    createQuestions(0);
}

//inicialização do quizz
init();

//Cria uma pergunta
function createQuestions(i){
    //limpar questão anterior
    const oldButtons = answersBox.querySelectorAll('button');
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    //alterar texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelectorAll('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //insere as alternativas
    questions[i].answers.forEach(function(answer, i){
        //Cria o template do btn do Quizz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);
        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];
        answerTemplate.setAttribute('correct-answer', answer['correct']);

        //remover hide e template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        //inserir as alternativas na tela
        answersBox.appendChild(answerTemplate);
        
        //inserir evento de click no botão
        answerTemplate.addEventListener('click', function(){
            checkAnwser(this);
        });
    });

    //incrementar o número da questão
    actualQuestion++;

}

//verificando respsota do usuário
function checkAnwser(btn){
    //seleciona todos os botões
    const buttons = answersBox.querySelectorAll('button');
    //verifica se a resposta está correta e add classes aos btns
    buttons.forEach(function(button){
        if(button.getAttribute('correct-answer') === 'true'){
            button.classList.add('correct-answer');
            //checa se o usuário acertou a pergunta
            if(btn === button){
                //incremento dos pontos
                points++;
            }
        }else{
            button.classList.add('wrong-answer');
        }
    });

    //exibir próxima pergunta
    nextQuestion();
}

//exibe próxima pergunta do Quizz
function nextQuestion(){
    //timer para o usuário ver as respostas certa/erradas
    setTimeout(function(){
        //verifica se ainda há perguntas
        if(actualQuestion >= questions.length){
            //apresenta mensagem de sucesso
            showSucessMessage();
            return;
        }else{
            createQuestions(actualQuestion);
        }
    }, 1500);
}

//Mostrar tela de sucesso
function showSucessMessage(){
    //esconderQuizz
    hideOrShowQuizz();
    //trocar dados da tela de sucesso

    //calcular score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString();

    //alterar o número de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    //alterar o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;
    
}


function hideOrShowQuizz(){
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}