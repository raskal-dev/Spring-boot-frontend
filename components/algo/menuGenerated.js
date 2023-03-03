
function loadPage(url) {
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("menuNav").innerHTML = this.responseText;
    }
};
xhttp.open("GET", url, true);
xhttp.send();
}