var allQuestions;
var allAnimals;
var currentQuestionnaire;
var currentIndex;

function navigate_to(view) {
  $("#webcam").css("visibility", "hidden");
  $("#container").css("visibility", "hidden");
  $("#container").css("z-index", "-9999");
  $("#container>div").css("visibility", "hidden");
  $("#container>div").css("z-index", "-9999");
  
  if (view == "survey") {
    showQuestion();
  } else if (view == "photobooth") {
    $("#webcam").css("visibility", "visible");
    //$('#photobooth').html(webcam.get_html(600, 600));
  }
  
  $("#" + view).css("visibility", "visible");
  $("#" + view + ">div").css("visibility", "visible");
  $("#" + view).css("z-index", "9999");
  $("#" + view + ">div").css("z-index", "9999");
}

function loadQuestionnaire() {
  currentQuestionnaire = [];
  while (currentQuestionnaire.length < 4) {
    var random = Math.random();
    var length = allQuestions.length;
    var floor = Math.floor(Math.random() * allQuestions.length);
    var item = allQuestions[0];
    var question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    
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
  
  if (currentIndex < currentQuestionnaire.length)
    showQuestion();
  else
    navigate_to('photobooth');
}

function showQuestion() {  
  var question = currentQuestionnaire[currentIndex];

  $("#question").html(question.question);
  
  var answerList = "";
  for (var i = 0; i < question.answers.length && i < 10; i++) {
    answerList += "<li><a class='cmd survey_answer' onclick='nextQuestion();'>" + question.answers[i] + "</a></li>";
  }
  $("#answers").html(answerList);
}

function setResult(name, url) {
  var animal;
  for (var i = 0; animal == null && i < allAnimals.length; i++)
    if (name == allAnimals[i].filename)
      animal = allAnimals[i];

  var aOrAn;
  if (animal["name"] == "eagle")
    aOrAn = "an";
  else
    aOrAn = "a";
  
  $("#result_title").html("You are " + aOrAn + " " + animal["name"] + "!");
  $("#result_description").html(animal["description"]);
  $("#result_invitation").html(animal["invitation"]);
  $("#snapshot").attr("src", url);
  $("#result_image").attr("src", "/assets/" + animal["filename"] + ".png");
}

function upload() {
  webcam.snap(webcam.api_url, function() {
    $.ajax({
      url: "/photos",
      type: "POST",
      datatype: "script"
    });
    navigate_to("loader");
  });
}

function reset() {
  loadQuestionnaire();
  webcam.reset();
  navigate_to("welcome");
}