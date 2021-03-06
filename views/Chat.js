var username = String(getCookie('username'));

$(document).ready(function(){
    $("#send").click(function(){
      console.log("sent")
      var ul = document.getElementById("messages");
      var li = document.createElement("li");
      if (document.getElementById("messageinput").value == "/showloc"){
        li.appendChild(document.createTextNode( "*"+username+": "+"x: " + Math.round(player.x) + ", y: " + Math.round(player.y)));

        // document.getElementById(li.id).style.color = 'red'

        ul.appendChild(li);
        
        socket.emit('usermessage', {
        message:  "*"+username+": "+"x: " + Math.round(player.x) + ", y: " + Math.round(player.y)
        })
      }
      else{
        li.appendChild(document.createTextNode( "*"+username+": "+ document.getElementById("messageinput").value));
      ul.appendChild(li);
      socket.emit('usermessage', {
        message: username+": "+ document.getElementById("messageinput").value

      })
      }
      
      document.getElementById("messageinput").value = "";

      var objDiv = document.getElementById("messages");
       objDiv.scrollTop = objDiv.scrollHeight;

    });
  });

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
  window.scrollTo(0, document.body.scrollHeight);
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}