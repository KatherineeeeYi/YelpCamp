var express = require("express");
var app = express();

// all .ejs files are stored in the views
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        { name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_1280.jpg" },
        { name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_1280.jpg" },
        { name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_1280.jpg" }
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
});

// to create a campground, the route must be the same as the page that shows all of the campgrounds
app.post("/campgrounds", function(req, res){
    res.send("you hit it ");
    // get data from form and 
    // redirect to campgrounds page
});

app.listen(3000, function() {
    console.log("The Yelp Server Has Started...");
});