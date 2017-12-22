module.exports = {
  "nume": "Gabriel",
  "prenume": "Ovej",
  "varsta": function(an_curent) {
    return an_curent - 1997;
  },
  "varsta_automata_ms": function() {
    var d1 = new Date(); //"now"
    var d2 = new Date("1997/07/12")  // some date
    var diff = d1-d2;  // difference in milliseconds
    return new Date(diff).getFullYear();
  }
}
