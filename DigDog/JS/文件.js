function loadAvatar(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var avatar = document.getElementById('avatar');
      avatar.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  