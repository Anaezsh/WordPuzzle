// режим отображения иностранных слов и перевода
function Mode2(game, arrName1, arrName2, id) {
  this.game = game;
  this.arrName1 = arrName1; // массив, к которому обращаемся
  this.arrName2 = arrName2;
  this.id = id;
  this.randomIsReady; // кнопка отображения слов в случайном порядке доступна
  this.ind; // индекс карточки
  this.orderArr = []; // массив чисел по порядку от 0 до this.arrName1.lenght
}
Mode2.prototype.create = function() {
  var self = this;
  $("#training").fadeIn();
  $(this.id).show();
  $("#controls2").show();
  $("#random").one("click",function() {
    self.randomShow();
  });
  this.randomIsReady = true;
  $("#next").bind("click",function() {
    self.nextSlide();
  });
  $("#back").one("click",function() {
    self.back();
  });
  this.ind = 0;
  $(this.id + " .card-front").html(this.arrName1[this.ind]);
  $(this.id + " .card-back").html(this.arrName2[this.ind]);
}
Mode2.prototype.back = function() {
  $("#training").hide();
  $(this.id).hide();
  $("#controls2").hide();
  if(!this.randomIsReady) {
    $("#random").html("<i class='fa fa-random' aria-hidden='true'></i>");
  }
  $("#random").unbind();
  this.orderArr = [];
  $("#next").unbind();
  this.game.back();
}
// обработчик для кнопки выбора случайного отображения
Mode2.prototype.randomShow = function() {
  var self = this;
  $("#random").html("<i class='fa fa-long-arrow-right' aria-hidden='true'></i>");
  this.randomIsReady = false;
  this.createOrderArr();
  $("#random").one("click",function() {
    self.regularShow();
  });
}
// обработчик для кнопки последовательного отображения
Mode2.prototype.regularShow = function() {
  var self = this;
  $("#random").html("<i class='fa fa-random' aria-hidden='true'></i>");
  this.randomIsReady = true;
  $("#random").one("click",function() {
    self.randomShow();
  });
}
// обработчик для кнопки далее
Mode2.prototype.nextSlide = function() {
  if(this.randomIsReady) {
    if(this.ind === this.arrName1.length-1) {
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
  $(this.id + " .card-front").html(this.arrName1[this.ind]);
  $(this.id + " .card-back").html(this.arrName2[this.ind]);

}
Mode2.prototype.createOrderArr = function() {
  for (var i = 0; i < this.arrName1.length; i++) {
    this.orderArr[i] = i;
  }
}
