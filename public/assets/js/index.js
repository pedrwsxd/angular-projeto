
var abrirMenu = $("#abrir-menu");
var fecharMenu = $("#fechar-menu"); 

abrirMenu.on("click", () => {
  this.fecharMenu.addClass("menu-on");
});
$(".botão-fechar").on("click", () => {
  this.fecharMenu.addClass("menu-off");
  this.fecharMenu.removeClass("menu-on");  
    setTimeout(() => {
       fecharMenu.removeClass("menu-off");  
    }, 1000);
});