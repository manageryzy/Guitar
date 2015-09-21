$(function(){
  // Load VexTab module.
  vextab = window.VexTabDiv;
  
  var VexTab = vextab.VexTab;
  var Artist = vextab.Artist;
  var Renderer = vextab.Flow.Renderer;
  
  // Create VexFlow Renderer from canvas element with id #boo.
  renderer = new Renderer($('#vex-canvas')[0], Renderer.Backends.CANVAS);
  
  // Initialize VexTab artist and parser.
  artist = new Artist(10, 10, 1024, {scale: 0.8});
  vextab = new VexTab(artist);
  
  var renderNode = function(str){
    try {
      vextab.reset();
      artist.reset();
      vextab.parse(str);
      artist.render(renderer);
    } catch (e) {
	  alert('VexTex解析错误');
      console.log(e);
    }
  };
  
  loadNote = function(url){
    url = 'notes/' + url;
    $('#res-panel').fadeIn(200);
    $('#vex-edit').fadeOut(200);
    $('#vex-canvas').fadeIn(200);
    $.get(url,function(res) {
      renderNode(res);
    })
  };
  
  editNote = function(){
    $('#res-panel').fadeIn(200);
    $('#vex-edit').fadeIn(200);
    $('#vex-canvas').fadeOut(200);
  };
});