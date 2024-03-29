(function(){

  var $  = document.getElementById.bind(document);
  var $$ = document.querySelectorAll.bind(document);
  var myquote;
  var App = function($el){
    this.$el = $el;
    this.$el.addEventListener(
      'submit', this.submit.bind(this)
    );
    this.analyticsflag=localStorage.analyticsflag;
    if (this.analyticsflag==="on") {
    this.slidequote();
    this.renderTimeLoop();
    } else {
      this.renderChoose();
    }

  };
  App.fn = App.prototype;
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  App.fn.slidequote = function(){
    var mydata = JSON.parse(data);
    var i=getRandomIntInclusive(0,mydata.length);
    myquote=mydata[i];


  };

  App.fn.submit = function(e){
    e.preventDefault();
    // document.getElementById("mode").style.display='block';
    // document.getElementById("mode").addEventListener("click", switchmode);
    var pageTracker = _gat._getTracker("UA-88251366-3");
    pageTracker._trackPageview();
    this.analyticsflag = "on";
    localStorage.analyticsflag = "on";
    localStorage.mode = 0;
    this.slidequote();
    this.renderTimeLoop();
  };
  App.fn.renderChoose = function(){
    this.html(this.view('welcome')());
  };

  App.fn.renderTimeLoop = function(){
    this.interval = setInterval(this.renderTime.bind(this), 80);

  };
  App.fn.renderTime = function(){
    var startDate = moment(new Date());
    var endDate = moment("2019-10-04T00:00:01");

    var weeks = endDate.diff(startDate, 'weeks');
    var days = endDate.diff(startDate, 'days') - 1;
      var today = new Date();
    if(today.getSeconds()==0 && today.getMinutes()==0)
      var hours = (24-today.getHours()).toString();
    else
      var hours = (24-today.getHours()-1).toString();
    if(hours.length<2)
      hours="0"+hours;
    if(today.getSeconds()==0)
      var minutes=((60-today.getMinutes())%60).toString();
    else
      var minutes=(60-today.getMinutes()-1).toString();
    if(minutes.length<2)
      minutes="0"+minutes;
    var seconds=((60-today.getSeconds())%60).toString();
    if(seconds.length<2)
      seconds="0"+seconds;
    var milli=(1000-today.getMilliseconds()).toString();
    if(milli.length==1)
      milli="00"+milli;
    else if(milli.length==2)
      milli="0"+milli;

    // if(localStorage.mode == 0)
    // {
    //   document.body.style.backgroundColor = "white";
    //   document.getElementById("mode").value = "Dark Mode";
    //   document.getElementById("mode").style.color = "black";
    //   document.getElementById("mode").style.backgroundColor = "white";
    //   document.getElementById("mode").style.borderColor = "black";
    // }
    // else
    // {
    //   document.body.style.backgroundColor = "black";
    //   document.getElementById("mode").value = "Light Mode";
    //   document.getElementById("mode").style.color = "white";
    //   document.getElementById("mode").style.backgroundColor = "black";
    //   document.getElementById("mode").style.borderColor = "white";
    // }
    requestAnimationFrame(function(){
      this.html(this.view('time')({
        weeks:weeks,
        days:days,
        hour:         hours,
      minute:	minutes,
      second:	seconds,
      milliseconds: milli,
      quote:         myquote
      }));
    }.bind(this));


  };

  App.fn.$$ = function(sel){
    return this.$el.querySelectorAll(sel);
  };

  App.fn.html = function(html){
    this.$el.innerHTML = html;
  };

  App.fn.view = function(name){
    var $el = $(name + '-template');

    return Handlebars.compile($el.innerHTML);
  };

  window.app = new App($('timeapp'))



  })();
