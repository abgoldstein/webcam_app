var allQuestions;
var allAnimals;

var currentQuestionnaire;
var currentIndex;
var currentAnimal;

function navigate_to(view) {
  $("#container div").css("visibility", "hidden");
  
  if (view == "welcome") {
    reset();
  } else if (view == "survey") {
    showQuestion();
  }
  
  $("#" + view).css("visibility", "visible");
  $("#" + view + " div").css("visibility", "visible");
}

function loadQuestionnaire() {
  currentQuestionnaire = [];
  while (currentQuestionnaire.length < 4) {
    question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    
    // This is wildly inefficient but I don't have time to think about it
    var unique = true;
    for (var i = 0; i < currentQuestionnaire.length; i++) {
      if (currentQuestionnaire[i].question == question.question)
        unique = false;
    }
    if (unique)
      currentQuestionnaire.push(question);
  }
  
  currentIndex = 0;
}

function nextQuestion() {
  currentIndex++;
  
  if (currentIndex >= currentQuestionnaire.length)
    navigate_to('photobooth');
}

function showQuestion() {
  var question = currentQuestionnaire[currentIndex]

  $("#question").innerHTML = question.question;
  
  var answerList = "";
  for (var i = 0; i < question.answers.length; i++) {
    answerList += "<li><a class='cmd survey_question' onclick='nextQuestion'>" + question.answers[i] + "</a></li>";
  }
  $("#answers").innerHTML = answerList;
}

function setResult(title, description, image) {
  
}

function upload() {
  
}

function upload_completed(result) {
  imaginaryWaittime = Math.floor((Math.random() * 3000) + 1000);
  
  setInterval(function() {
    setResult(title, description, image);
    navigate_to("result");
  }, imaginaryWaittime);
}

function reset() {
  
}