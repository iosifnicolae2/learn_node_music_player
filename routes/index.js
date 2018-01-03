var express = require('express');
var router = express.Router();
var extract_menu = require('../modules/extract_menu');

/*
 Get menu of the day from a separate file
 When you include a file(or module) the value returned by require method is
the one of module.exports from the included module.
*/
var menu_of_the_day = require('../menu_of_the_day.js');

/*
GET home page.
This method is used to process request to `/` path.
When the user open the following page: http://localhost:3000 the above
middleware is called.
*/
router.get('/enable_menu/:id', function(req, res, next){
    var id=req.params.id;
    var selected_dishes = [];
    menu_of_the_day.menu_of_the_day.forEach(function(dish, index) {
      if(dish.id === id) {
        menu_of_the_day.menu_of_the_day[index].enabled = true;
        selected_dishes.push(dish);
      }
    });
    res.redirect('/');
    console.log("dishes enabled:", selected_dishes);

});
router.get('/disable_menu/:id', function(req, res, next){
    var id=req.params.id;
    var unselected_dishes = [];
    menu_of_the_day.menu_of_the_day.forEach(function(dish, index) {
      if(dish.id === id) {
        menu_of_the_day.menu_of_the_day[index].enabled = false;
        unselected_dishes.push(dish);
      }
    });

    console.log("dishes disabled:", unselected_dishes);
    res.redirect("/");
});
router.get('/', function(req, res, next) {
  // Print in nodejs console `Meniul zilei` and the content of `menu_of_the_day` object
  console.log('Meniul zilei', menu_of_the_day)
  // menu_of_the_day.title = "bla"

  // Render `menu` template(./views/menu) and pass `details` object.
  // `details` object an be accessed from ejs template with the following line of code:
  // <%= menu.title %>
  res.render('menu', menu_of_the_day);

});


router.get('/admin', function(req, res, next) {
  res.render('admin', menu_of_the_day);

});
// Update menu each hour
setInterval(function() {
  extract_menu(function(menu) {
    console.log('Menu of the hour', menu);
    var active_dishes = [];
    menu.tbl.forEach(function(dish) {
      active_dishes.push(dish.denumire.replace(/[^a-zA-Z]/g, '').toLowerCase());
    });
    console.log('active_dishes', active_dishes);
    for (var i = 0, len = menu_of_the_day.menu_of_the_day.length; i < len; i++) {
      var dish_has_original = menu_of_the_day.menu_of_the_day[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase()
      if(active_dishes.indexOf(dish_has_original) >= 0) {
        menu_of_the_day.menu_of_the_day[i].enabled = true;
      } else {
        menu_of_the_day.menu_of_the_day[i].enabled = false;
      }
    }
    console.log(menu_of_the_day)
  })
}, 60 * 60 * 1000)



router.get('/menu_of_the_day', function(req, res, next) {
  res.json(menu_of_the_day)
})

// Export created router to be used in `app.js`
module.exports = router;
