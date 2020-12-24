const pre = document.getElementById("pre");
const ta = document.getElementById("json");
const con = document.getElementById("container");

function onFormSubmit () {
    const json = JSON.parse(ta.value);
    const pretty = JSON.stringify(json, null, 4);
    con.parentNode.removeChild(con);
    pre.innerHTML = pretty;
}
