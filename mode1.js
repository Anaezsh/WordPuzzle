// режим отображения всех слов
function Mode1(game) {
  this.game = game;
  this.tId;
  this.count = 0;
  this.playIsReady; // кнопка начать показ доступна
  var self = this;
  $("#play").one("click",function() {
    self.play();
  });
  $("#stop").bind("click",function() {
    self.stop();
  });
}
Mode1.prototype.create = function() {
  var self = this;
  $("#training").fadeIn();
  $("#sheet").show();
  $("#controls1").show();
  this.playIsReady = true;
  $("#back").one("click",function() {
    self.back();
  });
}
Mode1.prototype.back = function() {
  this.stop();
  $("#training").hide();
  $("#sheet").hide();
  $("#controls1").hide();
  this.game.back();
}

// обработчик для кнопки начать показ карточек
Mode1.prototype.play = function() {
  $("#play").html("<i class='fa fa-pause' aria-hidden='true'></i>");
  this.playIsReady = false;
  var self = this;
  $("#sheet p").html("<b><i>" + this.game.word[this.count] + " - </i></b><br>" + this.game.translate[this.count]);
  this.tId = setInterval(function() {
    self.count++;
    if(self.count === self.game.word.length) {
      self.count = 0;
    } else {
    $("#sheet p").html("<b><i>" + self.game.word[self.count] + " - </i></b><br>" + self.game.translate[self.count]);
    }
  },3000);
  $("#play").one("click",function() {
    self.pause();
  });
}
// обработчик для кнопки пауза
Mode1.prototype.pause = function() {
  $("#play").html("<i class='fa fa-play' aria-hidden='true'></i>");
  this.playIsReady = true;
  var self = this;
  clearInterval(this.tId);
  $("#play").one("click",function() {
    self.play();
  });
}
// обработчик для кнопки стоп
Mode1.prototype.stop = function() {
  var self = this;
  clearInterval(this.tId);
  $("#sheet p").html("");
  this.count = 0;
  if(!this.playIsReady) {
    $("#play").html("<i class='fa fa-play' aria-hidden='true'></i>").unbind();
    $("#play").one("click",function() {
      self.play();
    });
    this.playIsReady = true;
  }
}
