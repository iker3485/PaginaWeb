(function () {
    /*
      Apple Watch style Mickey Mouse Clock
  
      Style 2: Thin case with date window
      
      Static in Internet Explorer re poor SVG support!
  
      kurt.grigg@yahoo.co.uk
      */
  
    /* ^^^^^^^^^^^^^^ Config below ^^^^^^^^^^^^^^ */
  
    var clockSize = 250;
    var caseColour = "rgb(230,205,107)";
    var dialColour = "rgb(0,0,0)";
    var digitColour = "rgb(255,255,255)";
    var caseShadow = "rgba(0,0,0,0.5)";
  
    /* ^^^^^^^^^^^^^^^^ End config ^^^^^^^^^^^^^^ */
  
    var d = document;
    var rnd = "id" + Math.random() * 1;
    var idx = d.getElementsByTagName("div").length;
    d.write(
      '<div id = "' +
        rnd +
        '" style="display:inline-block;line-height:0px;"></div>'
    );
    var dum = "";
    var mhBez = ".975s cubic-bezier(0.405,0,0.570,1)";
    var sBez = ".8s cubic-bezier(0.405,0,0.570,1)";
    var vBox =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      xy(100) +
      '" height="' +
      xy(100) +
      '" viewBox="0 0 200 200">';
    var mls = 100;
    var then = performance.now();
    var secThen, minThen, sincr, mincr, hincr;
    var dgts = [];
    var degr = 0;
    var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var radi = Math.PI / 180;
    var syncFoot = 0;
    var cnt = -1;
    var tmr;
    var bcnt = 0;
    var ecnt = -1;
    var etmr = null;
    var isItMoz = "MozUserSelect" in d.body.style;
    var mozAdj = isItMoz ? "50%" : "0%";
  
    function iniTime() {
      var now = new Date();
      sincr = now.getSeconds();
      mincr = now.getMinutes();
      hincr = now.getHours();
    }
    iniTime();
    mincr--;
    sincr--;
  
    function xy(v) {
      return (v * clockSize) / 100;
    }
  
    function bodyAni() {
      var bodyFrames =
        "@keyframes bodyJig {" +
        "0%   {transform: rotateX(-16deg) skew(-1deg,0deg);}" +
        "50%  {transform: rotateX(12deg) skew(1deg,0deg);}" +
        "100% {transform: rotateX(-16deg) skew(-1deg,0deg);}}";
      var bodyGenFrames = document.createElement("style");
      bodyGenFrames.innerHTML = bodyFrames;
      d.getElementsByTagName("head")[0].appendChild(bodyGenFrames);
    }
  
    function headAni() {
      var headFrames =
        "@keyframes headJig {" +
        "0%   {transform: rotateX(-14deg) skew(-1deg,0deg);}" +
        "50%  {transform: rotateX(12deg) skew(1deg,.5deg);}" +
        "100% {transform: rotateX(-14deg) skew(-1deg,0deg);}}";
      var headGenFrames = document.createElement("style");
      headGenFrames.innerHTML = headFrames;
      d.getElementsByTagName("head")[0].appendChild(headGenFrames);
    }
  
    function tailAni() {
      var frames =
        "@keyframes swing {" +
        "0%   {transform:rotate(-30deg); animation-timing-function: ease-in-out;}" +
        "50%  {transform:rotate(30deg); animation-timing-function: ease-in-out;}" +
        "100%  {transform:rotate(-30deg); }}";
      var genFrames = d.createElement("style");
      genFrames.innerHTML = frames;
      d.getElementsByTagName("head")[0].appendChild(genFrames);
    }
  
    var MickeyTail =
      '<path d="M100.168 192.708c15.69-24.815-19.94-51.486-.627-79.54l5.047.007c-20.69 27.666 13.324 55.474-4.08 79.953-.5.64-.92.592-.34-.42z"/>';
  
    var MickeyHourHand =
      '<path d="M100.713 57.474l6.73-.556s4.79 14.61 4.052 22.047c-.732 7.388-8.247 20.69-8.247 20.69-1.39 2.273-2.896 4.122-5.884.486 0 0 7.248-13.318 7.84-20.66.604-7.463-4.49-22.006-4.49-22.006z" fill-rule="evenodd"/><path d="M95.947 40.97c-3.19.827-4.874 4.503-4.39 7.442.297 3.53 2.507 7.17 6.032 8.212 2.907 5.698 12.15 1.136 12.248-3.06 2.248-1.524 2.76-4.372 2.32-6.7 2.766-2.56 1.925-8.893-2.42-8.147-1.32-2.87-4.19-3.085-5.575-2.75.094-3.48.382-8.35-1.726-11.337-1.054-1.63-3.505-1.632-4.527-.298-2.71 3.538.195 10.155-1.963 16.637z" fill-rule="evenodd"/><path d="M96.88 41.8c-1.09-.065-2.165.34-3.216 1.806-4.322 5.32 1.992 16.706 10.578 11.2-1.512 1.395-3.16 2.7-5.6 2.177 1.54 3.062 9.328 1.55 10.334-2.9-.718.26-1.483.456-2.023.3 2.665-1.568 5.277-2.005 4.533-6.954-1.068.435-1.983.228-2.755-.58-.76.215-1.082.627-2.488.31-.22.282-.653.684-1.11 1.025 1.675 1.83 2.62-.21 3.51-.846-.5 2.458-2.39 2.998-4.357 1.31-1.647.704-4.458.488-7.02-2.333 1.82.798 6.144 3.928 8.665-.132 1.69-4.3-2.647-2.644-4.778-3.07-1.443-.373-2.87-1.232-4.273-1.315zm12.94-2.408c.694 2.69.33 4.88-.566 6.82 3.757 3.3 5.775-7.64.566-6.82zm-5.556-2.453l-.422 5.377c2.054-.065 4.104.498 2.91 4.155 2.577.61 2.705-3.362 2.578-5.643-.14-2.52-1.877-4.617-5.066-3.89zM99.428 24.11c-3.012.597-1.673 8.17-1.938 12.295-.1 1.565-.257 3.138-.71 4.545 1.728-.29 1.983 1.238 6.267 1.363.396-3.362.42-6.886.504-10.81.062-2.82-.973-7.925-4.122-7.393z" fill="#f9f9f9" fill-rule="evenodd"/></g>';
  
    var MickeyBody =
      '<path d="M124.494 141.873c.557-3.02.64-5.74.184-8.633 3.284-1.53 9.732-6.788 12.06-12.45 1.63-4.378-.64-3.053-2.574-4.864-.006-10.77-2.622-19.648-12.362-22.912-4.16-3.274-8.842-6.027-15.067-7.237-4.358 3.05-12.606 7.41-12.606 7.41.366-.23 2.344 4.862-.55 9.147-7.248 6.956-4.055 17.474-.28 22.326-3.66 3.784-2.43 5.6.89 7.855-.01.548-9.33 10.217-12.338 12.882-.205 3.678.043 7.077 5.958 6.99 5.263-4.932 9.5-10.788 13.53-16.112 4.54-.003 11.754 1.95 11.928-2.16.224-1.526 1.857-1.635 2.29-.12.147 1.683 1.372.434 1.952 1.116.793 1.325-1.833 9.395-2.743 10.51 3.25.994 5.798-.063 8.41-1.138.54-.55.223-2.228 1.317-2.61z"/><path d="M101.983 135.192c3.105.507 10.554 1.05 9.12.17-.503-.312-5.104-1.97-6.703-3.505zm10.714-2.465c.092-.138.91-.53 2.065-.748 4.51-.843 8.56-2.884 11.693-4.242-.002.092-.46.51-1.015.93-3.14 1.9-5.704 2.832-8.985 3.975-.01.493-.023.985-.034 1.478 5.64.782 12.59-4.195 15.994-8.115 2.065-2.444 4.52-7.037 4.078-7.788-1.01-.603-2.094-.584-3.33-1.898.724-8.183-1.833-19.426-10.312-22.206-.714-.16-.833.028-1.22 1.91-4.662 13.753-19.785 13.418-28.213 7.91-7.192 9.736-.732 17.49.925 20.692-.898.528-1.617 1.883-2.01 2.525-1.846 1.743.376 3.307 2.648 4.602l2.945-3.68c-.16-.304-2.666-1.186-4.38-1.375 4.345-.44 7.954 2.206 10.397 3.878 3.672 2.41 6.57 3.97 7.605 4.095 1.186-.364 1.045-1.107 1.15-1.943z" fill="#bd0303" fill-rule="evenodd"/><path d="M128.434 115.89c.89-.852 1.137-2.546.68-4.697-.563-2.66-2.008-4.965-3.492-5.57-.756-.31-.884-.314-1.413-.055-1.588.776-1.685 4.33-.204 7.437 1.306 2.74 3.252 4.01 4.428 2.885zm-9.29 6.12c.873-.425 1.475-1.675 1.61-3.337.32-4-2.235-8.365-4.936-8.426-2.788-.062-3.735 4.575-1.758 8.608 1.34 2.733 3.37 3.994 5.085 3.156z" fill="#f2f2f2" stroke="#000" stroke-width=".8"/><path d="M154.73 161.765c-7.19 7.343-16.268 7.426-24.78 5.627l-9.375-2.02c-.725 3.414-13.214-.97-14.334-3.964-.693-1.055.02-4.134.776-4.994-.71-3.378-.952-6.866 4.79-9.85 1.223-1.738 1.974-2.357 4.03-3.033-1.702 4.07 10.512.217 6.698-1.53 6.31-2.083 8.21 2.532 7.005 4.49 4.29-3.362 8.187-5.692 15.817-4.564 11.708 2.56 10.274 10.77 8.953 14.185 1.258 1.204 1.8 4.064.42 5.655z"/><path d="M153.856 157.297c1.128.79.96 2.623.133 3.4-6.504 6.102-13.834 7.38-22.765 5.75 7.96-.583 15.808-1.02 22.63-9.15zm-45.992.224c4.776 5.132 8.125 5.956 11.596 7.288-1.186 2.636-11.448-2.18-12.055-3.886-.63-.956-.226-2.622.46-3.4zm16.384-15.054c4.053 2.643-9.828 7.36-8.988 2.42-6.075 2.173 2.99 7.646 5.363 6.923-1.384.954-5.278.984-8.25-4.057-5.762 2.19-5.307 7.995-2.893 10.34 11.027 10.706 34.972 8.984 42.515-.42 3.45-4.302 3.57-13.023-7.68-14.868-9.378-1.386-13.538 4.246-19.09 8.008 1.296-1.66 3.427-3.17 3.68-5.162.248-1.966-1.663-4.202-4.657-3.184z" fill="#fc0" fill-rule="evenodd"/><circle id="shoulder" cx="100" cy="100" r=".5" fill="none" />';
  
    var MickeyHead =
      '<path fill="none" d="M51.328 26.755h108.754v145.343H51.328z"/><path d="M86.418 29.082c-7.248.198-12.963 6.233-12.766 13.48.19 6.806 5.55 12.338 12.346 12.74-2.933 2.947-5.57 6.175-7.063 9.383-2.038-5.107-7.043-8.403-12.54-8.258-7.248.197-12.963 6.232-12.766 13.48.197 7.248 6.232 12.963 13.48 12.766 4.28-.12 8.232-2.318 10.59-5.89.645 2.43 1.472 5.006 2.672 7.185 2.138 3.807 5.15 6.675 9.705 9.245 9.578 5.566 18.985 2.238 24.992-3.57 7.393-.94 14.876-5.51 16.186-14.834-.072-1.188-.05-1.267.58-2.133 1.333-1.834 1.875-3.862 1.524-5.705-.48-2.515-1.958-3.828-3.85-3.42-1.306.282-2.788 2.013-3.62 4.227l-.382 1.013c-1.123-.08-2.218-.285-3.408.013-.063-.003-.268-.616-.455-1.363-1.606-6.41-6.145-11.904-12.166-14.723-3.273-1.532-5.855-2.096-9.865-2.155l-2.696-.04c2.003-2.44 3.06-5.52 2.978-8.677-.197-7.247-6.232-12.963-13.48-12.766z" fill-rule="evenodd"/><path d="M101.68 90.32c-1.062-1.323-1.17-2.16-.442-2.63 1.193-.77 5.774 1.148 4.57 2.833-1.4 1.96-7.304 1.924-9.79-.44-2.08-1.98-5.47-9.506 1.445-4.283 1.712 1.292 3.134 3.208 4.22 4.52z" fill="#cc0000" fill-rule="evenodd"/><path d="M90.17 73.976c-.715.046-1.68.027-1.828.642.99 2.887 3.98 6.542 7.34 8.915 5.423 3.83 10.64 5.55 15.663 5.165 6.177-.474 10.588-1.903 13.692-4.434 3.175-3.145 5.247-6.332 5.087-10.518-4.218.647-4.697-1.102-4.84-3.874-1.995-.732-6.14.295-8.268 3.2-.953 1.3-1.632.982-.865-.05 1.08-1.785 2.482-3.16 4.388-3.866-.51-5.35-3.837-10.366-7.324-12.575-1.397-.858-.438 1.82-.78 1.293-18.862-13.723-20.21 2.764-13.272 15.805-4.903-5.566-19.787-8.843-19.67 3.482.57 7.213 6.35 12.636 11.762 15.08 1.416.638-.368-1.815-.007-2.2 2.05 7.133 15.988 5.194 21.59.154l.82-.814-1.76.16c-1.53.137-1.86.226-2.54.686-2.813 1.908-7.163 2.92-10.197 2.373-1.25-.226-2.907-.97-3.828-1.717-1.576-1.278-2.924-3.78-4.077-7.563-.407-1.34-1.01-2.816-1.57-3.837-.5-.914-1.144-2.29-1.432-3.058-.29-.768-.593-1.47-.677-1.558-.44-.222-1.214.327-1.928.755 1.075-1.116 2.647-1.99 4.522-1.646z" fill="#f9f9f9"/>';
  
    /* Mickey Eyes*/
  
    var e1 =
      '<rect fill="none" width="108.75352" height="145.34349" x="51.327602" y="29.755001"/><path d="M116.525 72.374c.72-.983 1.615-1.758 2.562-2.324.478-2.73-.424-6.517-1.904-8.725-1.063-1.527-2.163-1.522-2.853.012-.2.442-.403 1.222-.455 1.733-.048.477-.063.717.022.92l2.354 2.027-1.616 2.144c.482 1.76.894 2.738 1.89 4.214zm-7.333-13.895c-.67.018-1.296.678-1.55 1.633-.33 1.23-.45 3.233-.217 3.635l3.1 2.756-2.18 2c-.124.348.61 2.457 1.307 3.755.603 1.12 1.518 2.18 2.063 2.382.623.233.984.16 1.41-.292 1.727-1.823.864-9.433-1.55-13.682-.67-1.178-1.79-2.205-2.383-2.19z"/>';
    var e2 =
      '<rect fill="none" width="108.75352" height="145.34349" x="51.327602" y="29.755001"/><path d="M113.058 63.068c-.587-.078-1.176-.15-1.767-.215-.505-.058-1.012-.117-1.524-.164-1.23-.117-2.13-.156-3.366-.246l.983.114c-.014.546.008 1.014.104 1.18l3.1 2.756-2.18 1.998c-.087.245.26 1.362.71 2.45l-1.143.346c1.353-.332 1.815-.398 3.15-.763.99-.25 1.968-.512 2.93-.8l.36-.13-.355.064c-.272-2.33-.66-4.588-1.343-6.57zm.872.174c-.013.226-.026.605.03.736l2.353 2.03-1.617 2.142c.098.36.246.926.344 1.23l-.24.103.286-.056c1.653-.486 3.302-1.14 4.7-1.806l-.538.17c-.07-1.242-.327-2.536-.723-3.732l.717.096c-1.968-.442-3.87-.762-5.6-1.007z"/>';
    var e3 =
      '<rect fill="none" width="108.75352" height="145.34349" x="51.327602" y="29.755001"/><path d="M109.034 66.622c1.683-.18 3.362-.328 5.036-.438m1.36-.08c1.272-.07 2.543-.113 3.81-.13" fill="#fc0" fill-rule="evenodd" stroke="#000" stroke-width=".2" stroke-linecap="round"/>';
    var ea = [e1, e2, e3, e2, e1];
  
    function blnk() {
      var tmp = d.getElementById("peepers");
      ecnt++;
      tmp.innerHTML = ea[ecnt];
      etmr = setTimeout(blnk, 60);
      if (ecnt > 4) {
        clearTimeout(etmr);
        ecnt = 0;
        tmp.innerHTML = ea[0];
      }
    }
  
    var f1 =
      '<path d="M48.207 162.868c7.103 8.125 16.706 8.812 25.84 7.498l10.06-1.485c.532 3.606 14.052-.138 15.443-3.183.806-1.053.263-4.31-.477-5.254.98-3.496 1.34-8.04-4.183-9.446-.65-2.888-2.07-3.85-4.268-4.56.848 4.927-10.75-1.974-6.678-1.832-6.536-2.586-9.17 1.89-8.028 4.01-4.31-3.786-8.274-6.47-16.428-5.8-12.567 1.895-11.613 10.544-10.45 14.19-1.414 1.17-2.184 4.114-.83 5.863z"/><path d="M49.552 158.52c-1.248.746-1.196 2.668-.374 3.53 6.463 6.79 14.133 8.605 23.698 7.496-8.384-1.133-16.66-2.106-23.324-11.027zm48.662 3.268c-5.407 5.03-9.01 5.67-12.774 6.827 1.074 2.825 12.267-1.516 13.026-3.253.73-.955.42-2.717-.252-3.574zm-15.72-16.465c-1.704.92 6.68 6.683 9.74 2.963 4.407 2.815-2.708 7.086-4.848 6.14 2.475 1.338 4.888-.718 7.308-2.362 3.004.7 6.407 2.94 2.346 9.695-11.966 11.18-40.27 7.04-45.544-2.728-3.356-4.71-2.884-13.804 9.15-14.983 10.02-.827 14.037 5.316 19.653 9.603-1.258-1.815-3.41-3.53-3.54-5.622-.127-2.064 2.636-3.965 5.735-2.707z" fill="#fc0">';
  
    var f2 =
      '<path d="M46.916 155.42c5.577 8.724 14.93 10.984 24.174 11.187l11.504.252c-.11 3.443 12.575 2.154 14.485-.455.98-.85 1.018-3.97.454-4.972 1.283-3.096 2.104-7.27-1.97-9.478-.133-2.795-1.856-3.92-3.9-4.94-3.5 2.03-7.407-2.657-6.267-2.793-5.992-3.47-8.558.518-7.805 2.676-3.587-4.227-7.847-7.618-16.01-8.318-12.734-.28-13.318 7.93-12.812 11.516-1.602.86-2.88 3.476-1.854 5.325z"/><path d="M49.01 151.59c-1.363.493-1.65 2.29-.992 3.23 5.18 7.37 12.43 10.31 22.062 10.833-8.072-2.42-16.07-4.672-21.07-14.064zm47.44 10.957c-6.223 3.806-8.492 3.568-12.41 4.035.56 2.805 10.973.828 12.028-.666.89-.77.893-2.462.382-3.37zm-12.608-17.892c-.395.506 3.024 5.03 8.17 3.737 2.577 2.093 3.033 3.24 2.172 4.755-1.18 2.077-4.517 1.78-7.12.78 3.97 2.358 6.12 1.107 8.613-.105 1.637 1.46 2.68 2.076.442 7.93-13.78 8.468-41.802.587-45.283-9.37-2.48-4.93-.412-13.324 11.67-12.466 9.68.962 12.68 6.837 18.52 11.483 1.62 1.287-3.427-3.535-2.252-5.32.238-1.943 2.23-3.1 5.067-1.425z" fill="#fc0">';
  
    var f3 =
      '<path d="M50.05 140.723c-5.17.228-4.74 1.805.437 8.488 5.183 6.656 12.798 13.955 21.453 13.06 1.81.695 5.85 1.212 7.758 1.61.586 1.3.007 2.337 1.587 2.646 4.17 2.25 11.484 2.91 10.938-2.164 3.803-1.878 5.11-6.197 2.88-11.765.71-5.966-4.534-5.382-6.724-7.64-2.65-2.732-8.057-7.366-8.902-2.266-5.754-8.45-23.554-17.447-29.427-1.967z" fill-rule="evenodd"/><path d="M49.56 142.147c-1.812-.653-2.09.66-1.844 1.382 5.2 7.383 13.504 18.098 23.184 17.497-8.148-3.13-16.498-10.86-21.34-18.88zm41.775 22.678l-9.903-1.27-.17 1.3c3.3 1.49 9.436 4.007 10.073-.03zm-10.68-18.047c-2.008-3.74-3.22-6.05-5.893-8.065-8.818-6.648-20.162-8.94-24.3 2.915 6.4 9.817 14.294 16.362 23.2 19.73 5.01 1.13 11.463 1.85 17.506 2.444 6.395-3.785 3.294-7.87 3.224-10.62-1.586.306-4.16.89-5.9-.512 9.298 1.184 4.894-4.424 2.792-5.09-1.683-.536-4.1-2.324-5.97-4.41-1.612-1.8-3.85-2.25-4.77-1.238-1.21 1.335 1.134 4.227.112 4.846z" fill="#fc0"/>';
  
    var f4 =
      '<path d="M51.405 136.018c-3.113.64-3.457 1.665-2.23 3.79 6.033 7.29 13.87 16.845 21.472 20.625 2.395 1.136 3.97 1.772 6.32.793.934.376 2.47.984 3.474 1.257.516.9.67 2.096 1.034 3.022 3.814 2.793 11.886 5.15 8.748-1.45 6.983-3.224 3.242-8.304 3.466-10.42 2.81-4.307-8.853-16.93-12.772-12.32-7.122-10.114-23.98-20.398-29.51-5.297z"/><path d="M51.823 137.738c-1.738-.894-2.405.105-2.254.877 7.11 7.34 17 21.482 26.453 22.177-7.088-3.05-13.882-11.58-24.2-23.054zM89.16 164.77l-7.592-2.08.54 2.202c3.205 1.948 10.313 4.55 7.053-.12zm-7.37-18.804c-1.522-4.087-3.762-6.46-6.186-8.858-7.994-7.91-17.647-12.562-23.418-.902 10.053 11.285 17.058 20.61 22.682 22.837 4.9 1.777 7.88 3.303 13.893 4.658 6.3-2.845 4.985-5.054 4.093-8.955-.967-.216-2.614-2.366-4.252-3.983 11.03 10.708.212-12.72-6.86-8.455-1.4 1.22 1.164 3.15.05 3.66z" fill="#fc0"/>';
  
    var f5 =
      '<path d="M52.97 130.952c-4.032.877-4.7 3.92-3.62 6.4 1.915 5.28 5.266 7.975 8.315 11.48 3.33 3.65 7.84 7.348 10.638 7.272 1.66 1.235 6.017 3.296 7.148 3.248-.36.754-.77 1.19-.593 1.823 1.672 3.59 13.576 9.436 12.98 2.668 4.534-3.103 4.388-8.24 3.37-11.26 2.298-5.428-5.327-14.692-9.98-12.338-10.43-15.426-22.58-18.656-28.256-9.293z"/><path d="M67.176 154.84c-9.593-10.16-10.093-15.473-17.258-21.116l-.37 1.993c1.542 3.97 3.914 7.524 7.036 10.705 3.7 3.704 7.464 7.75 10.592 8.417zm11.942 6.57l-.832 2.067-2.74-2.14.666-1.477zm-25.653-28.894c-1.557-1.183-2.5.155-2.487.94 7.554 5.155 13.428 21.393 23.154 24.417-6.395-4.76-12.14-17.634-20.667-25.357zm33.144 31.918l-6.678-2.543-.742 1.743c2.514 2.015 8.47 3.916 7.42.8zm-4.71-19.548c-.784-4.286-3.69-6.62-5.73-9.352-6.617-8.865-17.61-12.903-22.486-3.797 9.6 7.4 11.862 18.032 23 27.096 3.166 1.705 6.278 2.733 10.31 4.422 6.41-5.367 4.37-10.357-.258-14.38 8.4 8.425 3.556-8.29-4.392-8.335-1.595.956.743 4.04-.445 4.346z" fill="#fc0"/>';
  
    var f6 =
      '<path d="M55.617 126.54c-2.056-.153-3.775.758-4.09 2.51-2.593 2.312-.93 7.713.407 10.593 3.387 9.482 10.928 17.27 19.888 21.554.242.774.238 1.14.057 1.938 3.075 3.82 9.446 5.718 13.69 3.15.27-.448.39-1.48.386-2.028 3.736-1.712 5.945-6.033 3.36-11.363 4.668-4.205-4.267-13.935-7.576-12.55-3.573-8.963-17.532-25.257-26.122-13.805z"/><path d="M78.104 163.537l-4.546-.148c2.84 2.627 6.013 4.007 8.945 3.032zm-.745-3.32c-6.028-5.7-8.256-7.254-10.888-11.7l-7.86-13.273c-1.72-3.046-6.413-8.487-7.347-3.113-.51 2.9 3.36 12.436 6.687 16.034C59.42 151.646 70.495 159.51 72.478 160c.818.204 3.972-.102 4.88.218zm.285.77l-.047 1.58-4.846.047.25-1.83zm-24.8-32.076c6.983 1.074 9.95 15.804 20.553 26.216-1.407-1.31-8.425-14.538-13.162-22.976-2.563-4.565-7.01-5.99-7.39-3.24zm32.1 35.652l-6.244-3.568-.113 1.85c2.22 1.52 7.005 4.864 6.358 1.718zm-3.038-19.29c-.24-4.36-2.806-7.04-4.47-10.01-5.404-9.64-15.39-16.277-21.306-7.83 8.04 3.468 10.56 19.948 22.635 32.304 2.9 2.09 2.85 1.625 6.6 3.807 6.845-3.98 4.79-7.916.8-13.704 6.7 7.625 3.994-7.818-3.802-8.834-1.685.753.75 4.108-.456 4.266z" fill="#fc0"/>';
  
    var f7 =
      '<path d="M58.41 123.642c-1.953-.516-3.668.02-4.108 1.592-3.36.81-4.143 8.132-3.007 11.167 2.304 10.327 9.54 18.067 17.78 23.595l.804.663c-2.488 4.5 6.784 10.35 13.983 5.422.293-.368.49-1.305.53-1.817 3.707-.914 6.163-4.533 4.117-9.964 4.797-3.065-2.965-13.745-6.237-13.06-2.7-8.99-14.74-26.693-23.863-17.598z"/><path d="M76.947 162.164l-6.388.515c2.068 4.697 8.426 4.743 11.512 3.545zm-.447-3.224c-5.305-6.4-7.31-8.253-9.47-12.87l-6.453-13.782c-1.4-3.148-6.438-8.736-7.76-3.905-1.76 1.754-.374 12.798 3.878 17.864 3.39 4.466 7.326 9.61 13.39 13.535zm.212.767l-.17 1.464-5.788.642.222-1.328zm-21.14-34.362c6.587 2.27 9.316 17.504 18.617 29.123-1.24-1.476-6.837-16.638-11.814-24.764-2.677-4.37-5.078-5.997-6.804-4.36zm27.83 38.69l-5.682-4.13-.256 1.702c2 1.818 6.306 5.473 5.938 2.427zm-1.363-18.177c.12-4.1-2.12-7.063-3.475-10.13-4.394-9.952-13.408-17.946-19.735-11.16 7.9 3.483 9.498 18.053 19.052 34.18l6.498 4.414c6.383-3.66 4.266-8.487 1.117-14.088 4.5 8.593 5.42-3.82-2.682-7.103-1.67.395.388 3.96-.776 3.888z" fill="#fc0"/>';
  
    var f8 =
      '<path d="M62.042 121.892c-2.317-.66-5.008.153-6.064 2.07-4.662 2.466-4.355 9.274-4.302 13.924.12 9.612 7.714 17.108 15.03 22.732l-.262 2.213c3.734 4.622 11.47 7.985 15.092 3.878 1.286-.384 2.348-1.98 2.39-2.57 4.055-1.544 4.74-6.687 4.167-9.09 4.038-3.758.098-11.29-5.506-13.524-2.6-9.25-8.4-25.062-20.545-19.632z"/><path d="M77.544 161.137l-8.83 1.8c2.264 3.93 9.836 6.3 12.363 2.702zm-.052-3.21c-5.14-6.156-6.21-8.207-7.788-13.14l-4.49-14.045c-.93-3.748-8.21-9.036-10.47-3.988-2.064 1.826-2.933 13.587-.26 18.142.574 3.69 10.623 13.723 12.45 14.683.755.395 9.743-2.183 10.558-1.653zm.09.95l-.516 1.283-9.398 2.203-.04-1.686zM57.55 123.922c5.5.53 7.4 3.247 8.99 8.074 2.45 7.456 5.012 16.596 7.286 19.522-.394-.566-1.9-5.405-3.42-10.797-1.26-4.475-2.41-9.285-3.998-12.763-2.155-4.724-7.796-6.57-8.858-4.036zm25.054 39.888L78.47 159l-.426 1.375c1.805 2 4.41 6.6 4.56 3.433zm-.997-17.645c-.312-4.183-.75-8.12-1.897-10.67-4.24-9.447-8.84-16.076-16.583-12.852 7.637 4.654 6.358 16.94 13.353 31.82 2.365 2.713 5.02 5.785 7.136 8.797 5.37-2.827 3.94-7.383 1.776-12.09 4.686 8.944 5.147-5.346-2.27-8.245-1.846.303-.29 3.39-1.515 3.24z" fill="#fc0"/>';
  
    var f9 =
      '<path d="M62.61 121.975c-2.216-.662-4.79.152-5.8 2.07-4.462 2.466-4.168 9.273-4.118 13.923.116 9.612 7.382 17.11 14.383 22.732l-.252 2.213c3.572 4.62 10.974 7.984 14.44 3.877 1.23-.384 2.247-1.98 2.286-2.57 3.88-1.544 4.535-6.686 3.987-9.09 3.864-3.758.094-11.29-5.268-13.523-2.49-9.252-8.04-25.063-19.66-19.632z"/><path d="M77.69 161.3l-8.57 1.72c2.165 3.928 8.958 6.422 11.375 2.824zm-.173-3.085c-4.92-6.157-6.065-8.412-7.575-13.347l-4.296-14.044c-.89-3.748-7.855-9.036-10.02-3.988-1.973 1.827-2.805 13.588-.247 18.142.548 3.69 10.69 15.28 12.652 14.93zm.21.746l-.66 1.53-9.114 1.873.496-1.275zm-19.414-34.957c5.263.528 7.08 3.246 8.6 8.073 2.347 7.456 4.797 16.596 6.973 19.522-.377-.566-1.818-5.404-3.27-10.796-1.207-4.475-2.31-9.285-3.828-12.763-2.062-4.725-7.46-6.572-8.475-4.037zm23.93 39.93l-3.667-5.138-.654 1.662c1.727 2 4.18 6.64 4.322 3.475zm-.624-17.852c-.3-4.182-1.007-7.955-2.103-10.506-4.06-9.446-8.46-16.074-15.868-12.85 7.306 4.652 6.083 16.937 12.775 31.82 2.263 2.712 4.804 5.784 6.83 8.795 5.136-2.828 3.975-7.753 1.903-12.46 3.736 7.914 4.688-5.02-2.377-7.876-1.765.303.01 3.225-1.16 3.077z" fill="#fc0"/>';
  
    var ar = [
      f1,
      f2,
      f3,
      f4,
      f5,
      f6,
      f7,
      f8,
      f9,
      f9,
      f8,
      f7,
      f6,
      f5,
      f4,
      f3,
      f2,
      f1
    ];
  
    function tap() {
      cnt++;
      d.getElementById("tooties").innerHTML = ar[cnt];
      tmr = setTimeout(tap, 40);
  
      if (cnt > 16) {
        clearTimeout(tmr);
        cnt = -1;
      }
    }
  
    var mh1 =
      '<path d="M113.75 26.6c-1.223-1.284-2.33-1.793-3.77-2.023-1.515-2.64-4.095-3.412-6.567-3.254-.1-1.8-.038-4.616.083-6.308-.093-4.426-3.99-3.827-6.195-1.273-2.32 3.017-1.634 5.944-1.277 8.883.25 1.88.344 3.67.33 5.583-.032 1.374-.254 2.94-.646 3.983-.877-.737-1.96-1.46-2.878-1.967-3.457-1.474-6.006-.63-7.744 2.5-.866 1.84.18 3.006 1.68 3.747 1.704.765 3.33.912 4.933 1.275 2.3 1.473 3.206 3.163 4.985 4.867-.603 1.76.492 3.364 1.83 4.168.693.404 1.833.73 3.22.92 1.764.25 2.762.208 4.394.028 2.354-.276 3.994-1.91 3.553-4.082 2.492-2.472 4.38-5.537 5.057-8.296.515-2.916.81-5.8-.99-8.75z"/><path d="M97.538 14.96c-1.43 1.976-.923 4.87-.65 6.806.36 3.024.436 4.013.432 5.617-.004 1.61-.127 2.746-.437 4.016-.168.69-.508 1.682-.633 1.85-.58.257-.716-.01-1.066-.235-.39-.317-1.064-.814-1.474-1.087-3.2-2.805-6.932-1.57-8.044 1.367-.583 1.54 1.054 2.25 2.005 2.588.94.365 2.268.69 3.55.863.513.07.71.137 1.117.38 2.203 1.577 3.41 3.503 5.54 5.17 4.416 2.37 10.113 2.608 13.315-1.57 2.415-3.754 3.604-6.998 2.96-10.467-.328-2.67-1.664-4.494-3.932-4.625.15 1 .314 2.006.542 2.988-.79-.89-1.19-2.26-1.527-3.186-.785-2.8-3.406-3.457-5.82-3.073.01 2.032.23 4.032.74 5.8-.992-1.476-1.525-3.35-1.662-4.762-.16-2.733-.055-5.818.104-8.045.364-4.148-3.766-2.804-5.056-.397zm8.673 19.636c-.053.748-.145 1.357-.246 2.168-.155 1.684-.525 3.168-.918 4.542-.55.204-.72-.047-.795-.383.388-1.75.676-3.643.843-5.004.185-1.53.19-1.555.353-1.676.593-.267.803.305.766.35zm-3.755 2.398c.015 1.21.003 2.63-.083 3.617-.102.836-.886.584-.96-.117.13-1.655-.136-3.3.234-4.34.832-.053.72.293.81.842zm6.865-.367c-.407 1.67-1.175 3.456-1.856 4.693-.463.11-.866-.177-.773-.52.29-1.073 1.39-2.916 1.793-4.486.514-.334.74.07.837.313zm-11.836 6.646c-1.49 4.5 12.353 5.66 11.456.84-3.83 1.06-8.034 1.128-11.456-.84z" fill="#fff"/><circle id="wrist" cx="102.5" cy="45" r=".1" fill="none" /><circle id="elbow" cx="110" cy="78" r=".5" fill="none" />';
  
    var mh2 =
      '<path d="M110.07 35.553c-5.27-8.254-.82-18.358-6.45-20.887-2.247-4.417-5.422-3.074-6.418.55-2.008 1.386-3.846 7.574-4.678 10.776-1.843 7.696.03 10.438 1.425 12.613-3.883 5.79 6.87 11.812 10.017 7.01 4.1-.763 4.445-2.2 6.542-2.55 3.825.962 6.928 5.676 8.66 2.06 3.2-6.693-3.278-10.146-9.1-9.572z"/><path d="M118.555 39.59c-1.642-2.957-6.374-4.128-8.863-3.045-5.71-8.278-1.644-18.992-6.078-21.023.954 3.24-.393 6.03-.064 13.974-2.045-3.376 2.014-15.406-2.76-16.887-1.18-.367-2.916 1.492-2.688 2.665 3.525 1.067 4.463 7.274.188 12.786 1.177-3.694 3.254-5.567 1.635-10.417-1.753-2.997-2.928-1.364-3.404-.328-2.115 4.096-2.56 7.086-3.305 9.867-1.234 4.598-1.09 8.364 3.745 14.37-.914-.374-2.01-1.835-2.514-2.44-2.795 4.683 6.555 9.862 8.72 6.148-.86-.107-1.697-.23-2.146-.67 4.44.933 6.503-.87 8.94-2.393 2.766-1.03 8.166 7.727 9.13.29.142-1.1-.076-2.067-.535-2.896zm-15.404-3.81c1.36 2.853-.192 5.7-.186 5.128.05-4.967.003-4.513-3.885-9.73-.51-.68 2.94 2.226 4.07 4.603z" fill="#fff"/><circle id="wrist" cx="97.5" cy="45" r=".1" fill="none" /><circle id="elbow" cx="90" cy="78" r=".5" fill="none" />';
  
    var MickeyMinuteHand = [mh1, mh2];
  
    /* Clock dial and case etc */
  
    var outerRim = d.createElement("div");
    outerRim.setAttribute(
      "style",
      "display:inline-block;" +
        "position: relative;" +
        "height: " +
        xy(116) +
        "px;" +
        "width: " +
        xy(116) +
        "px;" +
        "background-color: " +
        caseColour +
        ";" +
        "border-radius: 50%;" +
        "box-shadow: inset -" +
        xy(0.5) +
        "px -" +
        xy(0.5) +
        "px " +
        xy(1.2) +
        "px -" +
        xy(0.7) +
        "px rgba(0,0,0,0.9)," +
        "inset " +
        xy(0.5) +
        "px " +
        xy(0.5) +
        "px " +
        xy(1.2) +
        "px -" +
        xy(0.2) +
        "px rgba(255,255,255,0.4)," +
        " " +
        xy(4) +
        "px " +
        xy(4) +
        "px " +
        xy(5) +
        "px -" +
        xy(1) +
        "px " +
        caseShadow +
        ";" +
        "overflow: hidden;"
    );
    d.getElementById(rnd).appendChild(outerRim);
  
    var shine =
      '<svg id="shn' +
      idx +
      '" xmlns="http://www.w3.org/2000/svg"' +
      'viewBox="0 0 200 200" width="100%" height="100%">' +
      "<defs>" +
      '<filter id="blur" color-interpolation-filters="sRGB">' +
      '<feFlood result="flood" flood-color="#fff" flood-opacity="1"/>' +
      '<feComposite result="composite1" operator="in" in2="SourceGraphic" in="flood"/>' +
      '<feGaussianBlur result="blur" stdDeviation="0.15" in="composite1"/>' +
      '<feOffset result="offset" dy="1" dx="0"/>' +
      '<feComposite result="composite2" operator="atop" in2="offset" in="offset"/>' +
      "</filter>" +
      "</defs>" +
      '<g transform="translate(2.6,1.5)" filter="url(#blur)">' +
      '<path fill="#fff" d="M 25.29439,28.704127 C 11.980013,42.659887 2.6767873,60.453438 0,79.99824 6.4643264,45.022412 31.776599,14.993444 65.504601,3.8936567 69.662254,2.3217769 77.023949,0.560584 79.50959,0 58.514565,3.0100943 39.604309,13.680346 25.29439,28.704127 Z"/>' +
      "</g></svg>";
    outerRim.innerHTML = shine;
  
    var centreRim = d.createElement("div");
    centreRim.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "margin: auto; top: 0; bottom: 0; left: 0; right: 0;" +
        "height: " +
        xy(110) +
        "px;" +
        "width: " +
        xy(110) +
        "px;" +
        "background-color: transparent;" +
        "border-radius: 50%;" +
        "box-shadow: -" +
        xy(0.5) +
        "px -" +
        xy(0.5) +
        "px " +
        xy(0.8) +
        "px 0 rgba(0,0,0,0.6), " +
        " " +
        xy(0.5) +
        "px " +
        xy(0.5) +
        "px " +
        xy(0.5) +
        "px -" +
        xy(0.4) +
        "px rgba(255,255,255,0.9);" +
        "overflow: hidden;"
    );
    outerRim.appendChild(centreRim);
  
    var innerRim = d.createElement("div");
    innerRim.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(110) +
        "px;" +
        "width: " +
        xy(110) +
        "px;" +
        "background-color: " +
        dialColour +
        ";" +
        "background-image: radial-gradient(ellipse farthest-corner at center, rgba(255,255,255,0.9) 2%, transparent 70%);" +
        "margin: auto; top: 0;bottom: 0;left: 0;right: 0;" +
        "box-shadow: inset 0 0 0 " +
        xy(1.5) +
        "px rgba(0,0,0,0.4)," +
        "inset " +
        xy(5) +
        "px " +
        xy(5) +
        "px " +
        xy(5) +
        "px " +
        xy(1.0) +
        "px rgba(0,0,0,0.2)," +
        "0 0 " +
        xy(1.5) +
        "px " +
        xy(0.3) +
        "px rgba(220,220,220,0.2);" +
        "border-radius: 50%;"
    );
    outerRim.appendChild(innerRim);
  
    var dial = d.createElement("div");
    dial.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(100) +
        "px;" +
        "width: " +
        xy(100) +
        "px;" +
        "margin: auto; top: 0; bottom: 0;left: 0;right: 0;" +
        "border-radius: 50%;"
    );
    innerRim.appendChild(dial);
  
    /* Date window */
  
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var n = new Date();
    dy = days[n.getDay()];
    dt = n.getDate();
  
    var cntnr = d.createElement("div");
    cntnr.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(6) +
        "px;" +
        "width: " +
        xy(15) +
        "px;" +
        "margin: auto; top: 0; bottom: 0;" +
        "left: " +
        xy(70) +
        "px;" +
        "border:" +
        xy(0.1) +
        "px solid " +
        digitColour +
        ";" +
        "background:#fff;" +
        "font: " +
        xy(3.8) +
        "px tahoma,sans-serif;" +
        "color: #444;" +
        "line-height: " +
        xy(6) +
        "px;" +
        "box-shadow: inset " +
        xy(0.7) +
        "px " +
        xy(0.7) +
        "px " +
        xy(0.7) +
        "px 0 rgba(0,0,0,0.8);" +
        "padding:0;"
    );
    dial.appendChild(cntnr);
  
    var day = d.createElement("div");
    day.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(5.5) +
        "px;" +
        "width: " +
        xy(8.1) +
        "px;" +
        "top: " +
        xy(0.5) +
        "px;" +
        "left: " +
        xy(1) +
        "px;" +
        "border-right: .2px solid #555;" +
        "padding:0;"
    );
    cntnr.appendChild(day);
    day.appendChild(d.createTextNode(dy));
  
    var date = d.createElement("div");
    date.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(5.5) +
        "px;" +
        "width: " +
        xy(5) +
        "px;" +
        "top: " +
        xy(0.5) +
        "px;" +
        "left: " +
        xy(9.5) +
        "px;" +
        "padding:0;"
    );
    cntnr.appendChild(date);
    date.appendChild(d.createTextNode(dt));
  
    /* Clock markers  */
  
    for (var i = 0; i < 12; i++) {
      var spac = i > 8 ? xy(2.0) : 0;
      var ofst = spac ? xy(3.0) : 0;
      dgts[i] = d.createElement("div");
      dgts[i].setAttribute(
        "style",
        "display: block;" +
          "position: absolute;" +
          "width: " +
          xy(15) +
          "px;" +
          "height: " +
          xy(15) +
          "px;padding:0;" +
          "margin: auto;top: 0;bottom: 0; right: 0;left: 0;" +
          "text-indent: -" +
          ofst +
          "px;" +
          "text-shadow: " +
          xy(0.8) +
          "px " +
          xy(0.8) +
          "px 1px " +
          caseShadow +
          ";" +
          "text-align: center;" +
          "font: bold " +
          xy(15) +
          "px arial,sans-serif;" +
          "letter-spacing:-" +
          spac +
          "px;" +
          "line-height: " +
          xy(15) +
          "px;" +
          "color: " +
          digitColour +
          ";"
      );
      dgts[i].innerHTML = nums[i];
      dial.appendChild(dgts[i]);
      degr += 30;
      dgts[i].style.top =
        xy(0) + xy(86) * Math.sin(-(60 * radi) + (360 / 12) * i * radi) + "px";
      dgts[i].style.left =
        xy(0) + xy(86) * Math.cos(-(60 * radi) + (360 / 12) * i * radi) + "px";
    }
  
    /* Generic containers */
  
    var containers =
      "display: block;" +
      "position: absolute;" +
      "height: 100%;" +
      "width: 100%;" +
      "font-size: 0px; line-height: 0px; padding: 0;" +
      "margin: auto; top: 0;bottom: 0; left: 0; right: 0;" +
      "overflow:hidden;transform-origin: center center;";
  
    /* Seconds (tail) */
  
    var secContainer = d.createElement("div");
    secContainer.setAttribute(
      "style",
      containers +
        "transform-origin: 50% 90%;animation: bodyJig 1s ease-in-out infinite reverse;animation-delay:.3s;"
    );
    secContainer.style.zIndex = 48;
    dial.appendChild(secContainer);
    var secHand = d.createElement("div");
    var secsvg =
      vBox +
      '<g style="transform-origin: 50% ' +
      mozAdj +
      ';animation: swing 2s infinite reverse;animation-delay:.3s;">' +
      MickeyTail +
      "</g></svg>";
    secHand.innerHTML = secsvg;
    secContainer.appendChild(secHand);
  
    /* Hour hand */
  
    var houContainer = d.createElement("div");
    houContainer.setAttribute("style", containers);
    houContainer.style.zIndex = 50;
    dial.appendChild(houContainer);
    var houHand = d.createElement("div");
    var housvg =
      vBox +
      '<g style="transform-origin: 50% 0%;animation: bodyJig 2s ease-in-out infinite reverse;animation-delay:.3s;">' +
      MickeyHourHand +
      "</g></svg>";
    houHand.innerHTML = housvg;
    houContainer.appendChild(houHand);
  
    /* Mickey body */
  
    var bodyContainer = d.createElement("div");
    bodyContainer.setAttribute("style", containers + "");
    bodyContainer.style.zIndex = 52;
    dial.appendChild(bodyContainer);
    var bdiv = d.createElement("div");
    var bdy =
      vBox +
      '<g style="transform-origin: 50% 90%;animation: bodyJig 1s ease-in-out infinite;animation-delay:.3s;">' +
      MickeyBody +
      "</g></svg>";
    bdiv.innerHTML = bdy;
    bodyContainer.appendChild(bdiv);
  
    /* Mozilla hack. getBoundingClientRect() in Mozilla 'still' can't read SVG positions altered by CSS transforms. */
  
    var shoulderContainer = d.createElement("div");
    shoulderContainer.setAttribute(
      "style",
      containers +
        "transform-origin: 50% 90%;animation: bodyJig 1s ease-in-out infinite;animation-delay:.3s;"
    );
    dial.appendChild(shoulderContainer);
    var mozShoulder = d.createElement("div");
    mozShoulder.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(0.1) +
        "px;" +
        "width: " +
        xy(0.1) +
        "px;" +
        "margin: auto; top: 0;bottom: 0; left: 0; right: 0;"
    );
    shoulderContainer.appendChild(mozShoulder);
  
    /* Mickey Head */
  
    var headContainer = d.createElement("div");
    headContainer.setAttribute("style", containers + "");
    headContainer.style.zIndex = 54;
    dial.appendChild(headContainer);
    var hdiv = d.createElement("div");
    var hd =
      vBox +
      '<g style="transform-origin: 5% 90%;animation: headJig 1s ease-in-out infinite;animation-delay:.3s;">' +
      MickeyHead +
      "</g></svg>";
    hdiv.innerHTML = hd;
    headContainer.appendChild(hdiv);
  
    /* Mickey Eyes */
  
    var eyeContainer = d.createElement("div");
    eyeContainer.setAttribute("style", containers + "");
    eyeContainer.style.zIndex = 56;
    dial.appendChild(eyeContainer);
    var ediv = d.createElement("div");
    var ed =
      vBox +
      '<g id="peepers" style="transform-origin: 5% 90%;animation: headJig 1s ease-in-out infinite;animation-delay:.3s;">' +
      ea[0] +
      "</g></svg>";
    ediv.innerHTML = ed;
    eyeContainer.appendChild(ediv);
  
    /* Mickey Foot */
  
    var footContainer = d.createElement("div");
    footContainer.setAttribute("style", containers + "");
    footContainer.style.zIndex = 58;
    var svgFoot =
      vBox +
      '<g id="tooties" style="transform-origin: 50% 90%;animation: bodyJig 1s ease-in-out infinite;animation-delay:.3s;">' +
      f1 +
      "</g></svg>";
    footContainer.innerHTML = svgFoot;
    dial.appendChild(footContainer);
  
    /* Mickey Arm */
  
    var armContainer = d.createElement("div");
    armContainer.setAttribute("style", containers);
    armContainer.style.zIndex = 59;
  
    /* Mickey Hand */
  
    var minContainer = d.createElement("div");
    minContainer.setAttribute("style", containers + "transition: " + mhBez + ";");
    minContainer.style.zIndex = 60;
    dial.appendChild(minContainer);
    var minHand = d.createElement("div");
    var minsvg =
      vBox +
      '<g style="transform-origin: 50% 10%;animation: headJig 1s ease-in-out infinite reverse;animation-delay:.3s;">' +
      MickeyMinuteHand[0] +
      "</g></svg>";
    minHand.innerHTML = minsvg;
    minContainer.appendChild(minHand);
  
    /* Clock glass */
  
    var glass = d.createElement("div");
    glass.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "height: " +
        xy(110) +
        "px;" +
        "width: " +
        xy(110) +
        "px;" +
        "margin: auto; top: 0; bottom: 0; left: 0;right: 0;" +
        "border-radius:50%;" +
        "box-shadow: inset 0 0 " +
        xy(1) +
        "px " +
        xy(1) +
        "px rgba(0,0,0,0.1)," +
        "inset 0 -" +
        xy(20) +
        "px " +
        xy(50) +
        "px rgba(0,0,0,0.5);" +
        "transform: rotate(-45deg);" +
        "z-index: 62;"
    );
  
    var shine = d.createElement("div");
    shine.setAttribute(
      "style",
      "display: block;" +
        "position: absolute;" +
        "margin: auto;" +
        "top: 2%;" +
        "left: 0; right: 0;" +
        "border-radius:50%;" +
        "width: 74%;" +
        "height: 54%;" +
        "background-image: linear-gradient(to bottom, rgba(250, 250, 255, 1) 2%, " +
        "rgba(250, 250, 255, 0.7) 30%, transparent 100%);" +
        "z-index: 64;"
    );
    glass.appendChild(shine);
    innerRim.appendChild(glass);
  
    function rot(e, d) {
      return (e.style.transform = "rotate(" + d + "deg) translateZ(0)");
    }
  
    function minHandSwap(a, e, w) {
      var hand;
      minsvg = "";
      if (a == 0) {
        if (e) {
          hand = MickeyMinuteHand[1];
        } else {
          hand = MickeyMinuteHand[0];
        }
      }
      if (a == 180) {
        if (w) {
          hand = MickeyMinuteHand[1];
        } else {
          hand = MickeyMinuteHand[0];
        }
      }
      minsvg =
        vBox +
        '<g style="transform-origin: 50% 10%;animation: headJig 1s ease-in-out infinite reverse;animation-delay:.3s;">' +
        hand +
        "</g></svg>";
      minHand.innerHTML = minsvg;
      minContainer.appendChild(minHand);
    }
  
    function armAni() {
      var tmp = isItMoz ? mozShoulder : shoulder;
      var m = dial.getBoundingClientRect(),
        a = tmp.getBoundingClientRect(),
        b = wrist.getBoundingClientRect(),
        c = elbow.getBoundingClientRect(),
        pos = {};
      (pos.ay = a.top - m.top),
        (pos.ax = a.left - m.left),
        (pos.by = b.top - m.top),
        (pos.bx = b.left - m.left),
        (pos.cy = c.top - m.top),
        (pos.cx = c.left - m.left);
      var s = pos.ax + "," + pos.ay;
      var e = pos.bx + "," + pos.by;
      var cu = pos.cx + "," + pos.cy;
      var armSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">' +
        '<path d="M' +
        s +
        " Q" +
        cu +
        " " +
        e +
        '" ' +
        'fill="none" stroke="#000" stroke-linecap="round" stroke-width="' +
        xy(3.5) +
        '"/></svg>';
      armContainer.innerHTML = armSvg;
      dial.appendChild(armContainer);
      setTimeout(armAni, 30);
    }
  
    function ew(adj) {
      var r = "rotateY(" + adj + "deg)";
      secContainer.style.transform = r;
      bodyContainer.style.transform = r;
      houHand.style.transform = r;
      headContainer.style.transform = r;
      minHand.style.transform = r;
      secHand.style.transform = r;
      footContainer.style.transform = r;
      eyeContainer.style.transform = r;
      shoulderContainer.style.transform = r;
    }
  
    function MickeyClock() {
      var tm = new Date();
      var secNow = tm.getSeconds();
      var minNow = tm.getMinutes();
      var houNow = tm.getHours();
      var hours = houNow * 30 + minNow / 2;
      if (houNow > 11) {
        houNow -= 12;
      }
      var adj = houNow >= 0 && houNow <= 5 ? 0 : 180;
      var minEadj = minNow > 37 && minNow < 55;
      var minWadj = minNow > 4 && minNow < 23;
  
      if (secNow !== secThen) {
        sincr++;
        syncFoot++;
        bcnt++;
        if (syncFoot > 1) {
          tap();
        }
        if (bcnt == 5) {
          blnk();
        }
      }
      if (bcnt > 5) {
        bcnt = 0;
      }
      if (minNow !== minThen) {
        mincr++;
        ew(adj);
        minHandSwap(adj, minEadj, minWadj);
      }
      secThen = secNow;
      minThen = minNow;
      rot(minContainer, mincr * 6);
      rot(houContainer, hours);
    }
  
    function draw() {
      var now = performance.now();
      if (now - then > mls) {
        MickeyClock();
        then = performance.now();
      }
      window.requestAnimationFrame(draw);
      if (syncFoot == 2) {
        headAni();
        bodyAni();
        tailAni();
      }
    }
    armAni();
    window.addEventListener("load", draw, false);
    window.addEventListener("focus", iniTime, false);
  })();