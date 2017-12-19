// режим правописание
function Mode4(game) {
  this.game = game;
  this.ind; // индекс карточки
  this.randomIsReady; // кнопка отображения слов в случайном порядке доступна
  this.orderArr = []; // массив чисел по порядку от 0 до this.game.translate.lenght
  var self = this;
  $("#input").bind("keypress",function() {
    self.check(event);
  });
}
Mode4.prototype.create = function() {
  var self = this;
  this.ind = 0;
  $("#training").fadeIn();
  $("#board").show();
  $("#input").show();
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
  $("#board p").show().html(this.game.translate[this.ind]);
}
Mode4.prototype.back = function() {
  $("#training").hide();
  $("#input").hide();
  $("#controls3").hide();
  if(!this.randomIsReady) {
    $("#randomW").html("<i class='fa fa-random' aria-hidden='true'></i>");
  }
  $("#randomW").unbind();
  this.orderArr = [];
  $("#show").unbind();
  $("#board p").html("");
  this.game.back();
}
// обработчик для кнопки выбора случайного отображения
Mode4.prototype.randomShow = function() {
  var self = this;
  $("#randomW").html("<i class='fa fa-long-arrow-right' aria-hidden='true'></i>");
  this.randomIsReady = false;
  this.createOrderArr();
  $("#randomW").one("click",function() {
    self.regularShow();
  });
}
// обработчик для кнопки последовательного отображения
Mode4.prototype.regularShow = function() {
  var self = this;
  $("#randomW").html("<i class='fa fa-random' aria-hidden='true'></i>");
  this.randomIsReady = true;
  $("#randomW").one("click",function() {
    self.randomShow();
  });
}
// проверка правописания
Mode4.prototype.check = function(e) {
  var self = this;
  if(e.keyCode === 13) {
    if($("#input").val() === this.game.word[this.ind]) {
      $("#input").val("");
      this.next();
    } else {
      $("#board p").html("Ошибка!");
      $("#board p").css("color","red");
      setTimeout(function() {
        $("#board p").html(self.game.translate[self.ind]);
        $("#board p").css("color","#0A2C59");
        $("#input").val("");
      },500);
    }
  }
}
// показ ответов в режиме проверки правописания
Mode4.prototype.showAnswer = function() {
  var self = this;
  $("#board p").html(this.game.word[this.ind]);
  setTimeout(function() {
    self.next();
  },500);
}
// далее
Mode4.prototype.next = function() {
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
Mode4.prototype.createOrderArr = function() {
  for (var i = 0; i < this.game.translate.length; i++) {
    this.orderArr[i] = i;
  }
}
