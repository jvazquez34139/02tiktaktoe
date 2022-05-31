
export default class Menu {
  constructor (game) {
    this.$menu = $('.menu');
    this.$menuItmes = $('.menu-item');
    this.$startGame = $('#start-game');
    this.$expandMenu = $('#expand-menu');
    this.$menuItemDesc = $('.menu-item-desc');
    this.$menuItmeTitles = $('.menu-item-title');
    this.game = game;
  }

  expandMenu(){
    this.$menuItmes.show();
    this.$expandMenu.html("<i class='fa fa-caret-up'></i>");
    this.$menuItmeTitles.on('click', (e) => {
      $(e.target.nextElementSibling).toggle();
    })
  }

  baseMenu(){
    this.$menuItemDesc.hide();
    this.$menuItmes.hide();
    this.$startGame.show();
    this.$expandMenu.show();
    this.$expandMenu.html("<i class='fa fa-bars'></i>");

  }


  create () {
    this.$menuItemDesc.hide();
    this.baseMenu();
    this.$expandMenu.on('click', (e) => {
      this.$menu.toggleClass('expand-menu');
      if(!this.$menu[0].classList.contains('expand-menu')) {
          this.baseMenu();
      }else{
          this.expandMenu();
      }
    });

    this.$startGame.on('click', (e) => {
      this.game.reset();
    });
  }
}