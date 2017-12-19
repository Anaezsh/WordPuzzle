function Game() {
  this.word = ["la vajilla", "los cubiertos", "el plato", "el cuchillo", "el tenedor", "la cuchara", "el vaso", "la copa"];
  this.translate = ["посуда", "приборы", "тарелка", "нож", "вилка", "ложка", "стакан", "бокал"];
  this.m1 = new Mode1(this); // все карточки
  this.m2 = new Mode2(this,this.word,this.translate,"#light"); // первая сторона
  this.m3 = new Mode2(this,this.translate,this.word,"#dark"); // вторая сторона
  this.m4 = new Mode3(this); // мозаика
  this.m5 = new Mode4(this); // правописание
}
Game.prototype.create = function() {
  var self = this;
  $("#paws").slideDown(1000);
  setTimeout(function() {
    $("#cat1").fadeIn();
  },1100);
  setTimeout(function() {
    $("#greet p").eq(0).animate({"opacity":"1"});
  },1500);
  setTimeout(function() {
    $("#greet p").eq(1).animate({"opacity":"1"});
  },1900);
  setTimeout(function() {
    $("#greet p").eq(2).animate({"opacity":"1"});
  },2300);
  $(".button1").eq(0).bind("click",function() {
    self.hideMenu();
    self.m1.create();
  });
  $(".button1").eq(1).bind("click",function() {
    self.hideMenu();
    self.m2.create();
  });
  $(".button1").eq(2).bind("click",function() {
    self.hideMenu();
    self.m3.create();
  });
  $(".button1").eq(3).bind("click",function() {
    self.hideMenu();
    self.m4.create();
  });
  $(".button1").eq(4).bind("click",function() {
    self.hideMenu();
    self.m5.create();
  });
}
Game.prototype.hideMenu = function() {
  $("#menu").hide();
  $("#greet").remove();
  $("#cat1").remove();
}
Game.prototype.back = function() {
  $("#cat2").show();
  $("#menu").fadeIn();
  $("#whatNow").fadeIn();
}
