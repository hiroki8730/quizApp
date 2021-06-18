const $quizNum = document.getElementById("quiz-number");
let i = 1;
let $startBtn = document.getElementById("btn");
let ansBtn = [];
const $genre = document.getElementById("quiz-genre");
const $difficult = document.getElementById("difficult");
const $quiz = document.getElementById("quiz");
let $answers = document.getElementById("answers");
let choices = [];
let check = [];
let buttonClickCount = 0;
let title = document.getElementById("title");
// ---取得した問題--- //
let contents = [];
// --- 0~3までの乱数作成 --- //
let min = 0;
let max = 3;
// --- 合っていた答えの数 --- //
let correctAns = 0;
let randomNumber = 0;
const questionItems = [];

$quiz.textContent = "以下のボタンをクリック";

// --- 開始ボタンを押した時の動作 --- //
$startBtn.addEventListener("click", function () {
    buttonClickCount++;
    callApi();
});

// ---API取得--- //
const callApi = () => {
    title.textContent = "取得中";
    $quiz.textContent = "少々お待ちください";
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => {
            return response.json();
        })
        .then(data => {
            $startBtn.style.display = "none";
            contents = data.results;
            // contentsの中に選択肢をpushする
            contents.forEach(function (content) {
                const tempAnswers = [];
                tempAnswers.push({ isCorrect: true, text: content.correct_answer });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[0] });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[1] });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[2] });
                questionItems.push(tempAnswers);
            });
            console.log(questionItems);
            console.log(contents);
            showQuestion();
            // dataContents.forEach(function(content){
            //     console.log(content);
            // });
        })
        .catch(error => {
            console.log("失敗しました");
        });
};

function showQuestion() {
    for(let i = 0; i < buttonClickCount; i++){
    title.textContent = "";
    $genre.innerText = "[ジャンル]" + contents[i].category;
    $difficult.innerText = "[難易度]" + contents[i].difficulty;
    $quiz.innerText = contents[i].question;
    choices.push(contents[i].correct_answer, contents[i].incorrect_answers[0], contents[i].incorrect_answers[1], contents[i].incorrect_answers[2])
    title.textContent = "問題" + i;
    btnCreate();
    }
}

// --- 選択肢のボタンを作成 --- //
function btnCreate() {
    for (let i = min; i <= max; i++) {
        const startBtn = document.createElement("button");
        ansBtn = startBtn;
        ansBtn.id = "answerBtn";
        console.log(ansBtn);
        $answers.appendChild(ansBtn);
        intRandomShuffle(ansBtn);
        ansBtn.addEventListener("click", function () {
            if (ansBtn.textContent === choices[i]) {
                correctAns++;
                // console.log(correctAns);
                answerCheck(ansBtn);
            } else {
                answerCheck(ansBtn);
                // console.log(correctAns);
            }
        }
        );
    }
};

// --- 0~3までの乱数作成 --- //
function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- 0~3までの乱数をシャッフルする --- //
function intRandomShuffle(ansBtn) {
    while (true) {
        let tmp = intRandom(min, max);
        randomNumber = tmp;
        if (!check.includes(randomNumber)) {
            check.push(randomNumber);
            ansBtn.innerText = choices[randomNumber];
            console.log(randomNumber);
            break;
        }
    }
}

// ---選択肢を押した時の動作--- //
function answerCheck() {
    i++;
    title.textContent = "問題" + i;
    $genre.innerText = "[ジャンル]" + dataContents[i].category;
    $difficult.innerText = "[難易度]" + dataContents[i].difficulty;
    $quiz.innerText = dataContents[i].question;
    choices = [];
    choices.push(dataContents[i].correct_answer, dataContents[i].incorrect_answers[0], dataContents[i].incorrect_answers[1], dataContents[i].incorrect_answers[2]);
};