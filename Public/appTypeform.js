var url = "https://api.typeform.com/forms/FWRLb3WF/responses";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", "Bearer Gjy9dLrPMMCKUSPABxxhbhkVgfMkzRUCkQ5KQvRjhYAP");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
