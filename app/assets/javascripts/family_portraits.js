function getPortrait() {
  $.ajax({
    url: "/photos",
    type: "GET",
    datatype: "script"
  });
}

function displayPortrait(url) {
  $("#portrait").attr("src", url);
}