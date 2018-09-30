var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local");
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    User           = require("./models/user"),
    seedDB         = require("./seeds"),
    Comment        = require("./models/comment");

// requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelpcamp_v12", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
// all .ejs files are stored in the views
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seed the database
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty is the cutest!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// a middleware that would run every single route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
// append '/campgrounds' in front of all the campgroundRoutes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
    console.log("The Yelp Server Has Started...");
});