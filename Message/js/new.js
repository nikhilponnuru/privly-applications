/*global Privly, markdown */
document.addEventListener('DOMContentLoaded', function () {
  // Don't start the script if it is running in a Headless
  // browser
  if (!document.getElementById("logout_link")) {
    return;
  }

  /**
   * Display rendered markdown as a preview of the post.
   */
  function previewMarkdown() {
    var preview = document.getElementById("preview");
    var mkdwn = document.getElementById("content").value;
    preview.innerHTML = markdown.toHTML(mkdwn);
  }

  var app = new Privly.app.Message();
  app.generateRandomKey();

  var adapter = new Privly.adapter.CreationProcess(app);

  adapter.on('afterPostCompleted', function (response, url) {
    app.storeUrl(url);
  });

  adapter.on('afterConnectionSucceeded', function () {
    var contentElement = document.getElementById("content");
    contentElement.addEventListener('keyup', previewMarkdown);
  });

  adapter.start();
});
