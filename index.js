const $quizNum = document.getElementById("quiz-number");
let Num = 0;
let $btn = document.getElementById("btn");
const $genre = document.getElementById("quiz-genre");
const $difficult = document.getElementById("difficult");
const $quiz = document.getElementById("quiz");
let $answers = document.getElementById("answers");
let choices = [];
let check = [];
let i = 0;
let title = document.getElementById("title");
// ---取得した問題--- //
let dataContents = [];
// --- 0~3までの乱数作成 --- //
let min = 0;
let max = 3;
// --- 合っていた答えの数 --- //
let correctAns = 0;

$quiz.textContent = "以下のボタンをクリック";

// ---API取得--- //
const callApi = () => {
    title.textContent = "取得中";
    $quiz.textContent = "少々お待ちください";
    fetch("https://opentdb.com/api.php?amount=10")
        .then(response => {
            return response.json();
        })
        .then(data => {
            dataContents = data.results;
            console.log(dataContents[Num - 1]);
            // dataContents.forEach(function(content){
            //     console.log(content);
            // });
            title.textContent = "";
            $genre.innerText = "[ジャンル]" + data.results[Num - 1].category;
            $difficult.innerText = "[難易度]" + data.results[Num - 1].difficulty;
            $quiz.innerText = data.results[Num - 1].question;
            choices.push(data.results[Num - 1].correct_answer, data.results[Num - 1].incorrect_answers[0], data.results[Num - 1].incorrect_answers[1], data.results[Num - 1].incorrect_answers[2])
            btnCreate(i);
            title.textContent = "問題" + Num;
        })
        .catch(error => {
            console.log("失敗しました");
        });
};

// --- 開始ボタンを押した時の動作 --- //
$btn.addEventListener("click", function () {
    callApi();
    callNextQuiz();
});

// --- 回答した時の動作 --- //
function callNextQuiz() {
    Num++;
    $answers.innerHTML = "";
};

// --- 選択肢のボタンを作成 --- //
function btnCreate(i) {
    for (let i = min; i <= max; i++) {
        const btn = document.createElement("button");
        btn.addEventListener("click", function () {
            if (btn.textContent === choices[Num - 1]) {
                correctAns++;
                console.log(correctAns);
                answerCheck(btn);
            } else {
                answerCheck(btn);
                console.log(correctAns);
            }
        }
        );
        $answers.appendChild(btn);
        intRandomShuffle(btn);
    }
}

// --- 0~3までの乱数作成 --- //
function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- 0~3までの乱数をシャッフルする --- //
function intRandomShuffle(btn){
    while (true) {
        let tmp = intRandom(min, max);
        if (!check.includes(tmp)) {
            check.push(tmp);
            btn.innerText = choices[tmp];
            break;
        }
    }
}

// ---選択肢を押した時の動作--- //
function answerCheck(btn) {
    Num++;
    $genre.innerText = "[ジャンル]" + dataContents[Num - 1].category;
    $difficult.innerText = "[難易度]" + dataContents[Num - 1].difficulty;
    $quiz.innerText = dataContents[Num - 1].question;
    choices = [];
    choices.push(dataContents[Num - 1].correct_answer, dataContents[Num - 1].incorrect_answers[0], dataContents[Num - 1].incorrect_answers[1], dataContents[Num - 1].incorrect_answers[2]);
    console.log(choices);
};