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
// ---取得した問題--- //s
let contents = [];
// --- 合っていた答えの数 --- //
let correctAns = 0;
let randomNumber = 0;
const questionItems = [];
const btns = document.getElementsByClassName("btn");
const select = document.getElementById("select");
let removedQuestion = [];

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
            console.log(contents);
            contents.forEach(function (content) {
                const tempAnswers = [];
                tempAnswers.push({ isCorrect: true, text: content.correct_answer });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[0] });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[1] });
                tempAnswers.push({ isCorrect: false, text: content.incorrect_answers[2] });
                questionItems.push(tempAnswers);
            });
            // console.log(questionItems);
            console.log(contents.slice(0, 1));
            removedQuestion = contents.slice(0, 1);
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
    select.style.display = "block";
    select.style.listStyle = "none";
    // for(let i = 0; i < removedQuestion.length; i++){
    let i = 0;
    if(i < removedQuestion.length){
    title.textContent = "";
    $genre.innerText = "[ジャンル]" + contents[i].category;
    $difficult.innerText = "[難易度]" + contents[i].difficulty;
    $quiz.innerText = contents[i].question;
    // choices.push(contents[i].correct_answer, contents[i].incorrect_answers[0], contents[i].incorrect_answers[1], contents[i].incorrect_answers[2])
    title.textContent = "問題" + buttonClickCount;
    btnCreate(questionItems[i]);
    console.log(questionItems);
    // };
    } else {
        title.textContent = "あなたの正当数は";
        $genre.innerText = "";
        $difficult.innerText = "";
        $quiz.innerText = "再度チャレンジしたい場合は以下のボタンをクリック!!";
        select.style.display = "none";
        const homeBtn = document.createElement("button");
        document.getElementById("home-button-container").appendChild(homeBtn);
        homeBtn.innerText = "ホームに戻る";
        homeBtn.addEventListener("click", function() {
            location.reload();
        })
    }
};

// --- 選択肢のボタンを作成 --- //
function btnCreate(qItem) {
    buttonClickCount++;
    let num = qItem.length;
    while (num) {
        let tmp = Math.floor(Math.random() * num);
        let str = qItem[--num];
        qItem[num] = qItem[tmp];
        qItem[tmp] = str;

        for (let i = 0; i < qItem.length; i++) {
            btns[i].textContent = qItem[i].text;
            // console.log(btns[i].textContent); =>選択肢4つ x 4
        }
    }
    console.log(qItem);
};
// ボタンクリックされた時の処理
function pushChoices(event) {
    removedQuestion = [];
    questionItems.shift();
    contents.shift();
    removedQuestion = contents.slice(0, 1);
    showQuestion();
};


// ---選択肢を押した時の動作--- //
function answerCheck() {
    i++;
    // title.textContent = "問題" + i;
    $genre.innerText = "[ジャンル]" + dataContents[i].category;
    $difficult.innerText = "[難易度]" + dataContents[i].difficulty;
    $quiz.innerText = dataContents[i].question;
    choices = [];
    choices.push(dataContents[i].correct_answer, dataContents[i].incorrect_answers[0], dataContents[i].incorrect_answers[1], dataContents[i].incorrect_answers[2]);
};

// // shiftメソッドテスト
// let arr = ["apple", "banana", "waterMelon", "orange" ];
// arr.shift();
// console.log(arr.shift()); // => apple
// console.log(arr); // =>["banana", "waterMelon", "orange""]
// console.log(arr.length); // => 3

// --- 0~3までの乱数をシャッフルする --- //
// function intRandomShuffle(ansBtn) {
//     while (true) {
//         let tmp = Math.floor(Math.random() * 4);
//         randomNumber = tmp;
//         if (!check.includes(randomNumber)) {
//             check.push(randomNumber);
//             ansBtn.innerText = choices[randomNumber];
//             console.log(randomNumber);
//             break;
//         }
//     }
// }

    // for (let i = min; i <= max; i++) {
    //     const startBtn = document.createElement("button");
    //     ansBtn = startBtn;
    //     ansBtn.id = "answerBtn";
    //     console.log(ansBtn);
    //     $answers.appendChild(ansBtn);
    //     intRandomShuffle(ansBtn);
    //     ansBtn.addEventListener("click", function () {
    //         if (ansBtn.textContent === choices[i]) {
    //             correctAns++;
    //             // console.log(correctAns);
    //             answerCheck(ansBtn);
    //         } else {
    //             answerCheck(ansBtn);
    //             // console.log(correctAns);
    //         }
    //     }
    //     );
    // }

    // randomNumber = tmp;
        // if (!check.includes(randomNumber)) {
        //     check.push(randomNumber);
        //     ansBtn.innerText = choices[randomNumber];
        //     console.log(randomNumber);
        //     break;
        // }