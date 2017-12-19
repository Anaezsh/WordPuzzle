// режим мозаики
function Mode3(game) {
  this.game = game;
  this.ind; // индекс карточки
  this.temp1 = [];
  this.temp2 = [];
  this.randomIsReady; // кнопка отображения слов в случайном порядке доступна
  this.clickCount = 0; // номер клика при проверке в режиме мозаика
  this.orderArr = []; // массив чисел по порядку от 0 до this.game.translate.lenght
  var self = this;
  $("#cubs").bind("click",function() {
    self.mosaicCheck(event);
  });
}
Mode3.prototype.create = function() {
  this.ind = 0;
  var self = this;
  $("#training").fadeIn();
  $("#board").show();
  $("#controls3").show();
  $("#randomW").one("click",function() {
    self.randomShow();
  });
  this.randomIsReady = true;
  $("#show").bind("click",function() {
    self.showAnswer();
  });
  $("#back").one("click",function() {
    self.back();
  });
  $("#board p").html(this.game.translate[this.ind]);
  this.createMosaic(this.game.word[this.ind]);
}
Mode3.prototype.back = function() {
  $("#training").hide();
  $("#board").hide();
  $("#controls3").hide();
  if(!this.randomIsReady) {
    $("#randomW").html("<i class='fa fa-random' aria-hidden='true'></i>");
  }
  $("#randomW").unbind();
  this.orderArr = [];
  $("#show").unbind();
  this.cleanMosaic();
  $("#board p").html("");
  this.game.back();
}
// формирование элементов мозаики
Mode3.prototype.createMosaic = function(str) {
  for (var i = 0; i < str.length; i++) {
    $("#holes").append("<div class='cub1'></div>");
    $("#cubs").append("<div class='cub2'></div>");
  }
  this.temp1 = $(".cub1");
  this.temp2 = $(".cub2");
  var count = 0;
  while(count < str.length) {
    var n = Math.floor(Math.random()*str.length);
    if(!this.temp2[n].dataset.hasLetter) {
      this.temp2[n].innerHTML = str.charAt(count);
      this.temp2[n].dataset.hasLetter = true;
      count++;
    }
  }
  this.clickCount = 0;
}
// обработчик для кнопки выбора случайного отображения
Mode3.prototype.randomShow = function() {
  var self = this;
  $("#randomW").html("<i class='fa fa-long-arrow-right' aria-hidden='true'></i>");
  this.randomIsReady = false;
  this.createOrderArr();
  $("#randomW").one("click",function() {
    self.regularShow();
  });
}
// обработчик для кнопки последовательного отображения
Mode3.prototype.regularShow = function() {
  var self = this;
  $("#randomW").html("<i class='fa fa-random' aria-hidden='true'></i>");
  this.randomIsReady = true;
  $("#randomW").one("click",function() {
    self.randomShow();
  });
}
// удаление предыдущих элементов мозаики
Mode3.prototype.cleanMosaic = function() {
  $(".cub1").remove();
  $(".cub2").remove();
  this.temp1 = [];
  this.temp2 = [];
}
// проверка хода в режиме мозаика
Mode3.prototype.mosaicCheck = function(e) {
  var target = $(e.target);
  if(!target.is(".cub2")) {return;}
  if(target.html() === this.game.word[this.ind].charAt(this.clickCount)) {
    this.temp1[this.clickCount].classList.toggle("cub1");
    this.temp1[this.clickCount].classList.toggle("cub2");
    this.temp1[this.clickCount].innerHTML = target.html();
    target.html("");
    target.css("visibility","hidden");
    this.clickCount++;
  } else {
    target.css("background-color","red");
    setTimeout(function() {
      target.css("background-color","#F2C858");
    },100);
  }
  var str = "";
  for (var i = 0; i < this.temp1.length; i++) {
    str += this.temp1[i].innerHTML;
  }
  if(str === this.game.word[this.ind]) {
    this.cleanMosaic();
    this.nextSlide();
    this.createMosaic(this.game.word[this.ind]);
  }
}
// показ нового слайда
Mode3.prototype.nextSlide = function() {
  if(this.randomIsReady) {
    if(this.ind === this.game.translate.length-1) {
      this.ind = 0;
    } else {
      this.ind++;
    }
  } else {
    if(this.orderArr.length === 0) {
      this.createOrderArr();
    }
    var orderArrLength = this.orderArr.length;
    var num = Math.floor(Math.random()*orderArrLength);
    this.ind = this.orderArr[num];
    this.orderArr.splice(num,1);
  }
  $("#board p").html(this.game.translate[this.ind]);
}
// показ ответов в режиме мозаики
Mode3.prototype.showAnswer = function() {
  var self = this;
  $("#board p").html(this.game.word[this.ind]);
  setTimeout(function() {
    self.cleanMosaic();
    self.nextSlide();
    self.createMosaic(self.game.word[self.ind]);
  },500);
}
Mode3.prototype.createOrderArr = function() {
  for (var i = 0; i < this.game.translate.length; i++) {
    this.orderArr[i] = i;
  }
}
