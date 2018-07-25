$(document).ready(function(){
   
});
$('.option .image img').click(function(){
    
    var id=this.id;
    var url= window.location.href;
    $.post(url+"/"+id).done(function (reply) {
              location.reload();
           });

});

$('button').click(function(){
    
    var id=this.id;
    var url= window.location.href;
    console.log(url+"/"+id);
    $.post(url+"/"+id).done(function (reply) {
              location.reload();
           });

});