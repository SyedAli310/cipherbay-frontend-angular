const legacyNotificationStyles = `
/* legacy notification styles */
.legacy-info-panel-wrapper {
  max-width: 25rem;
  height: auto;
  position: fixed;
  top: 90%;
  /* transform: translateY(100%); */
  right: 1rem;
  z-index: 9999;
  padding: 0.5rem;
  border-radius: 0.5rem;
  outline: 2px solid royalblue;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  font-family: inherit;
  padding: 1rem;
  overflow-x: hidden;
  transition: all 0.3s ease;
}
.legacy-info-panel-wrapper.expanded {
  top: 1.5rem;
} 
.legacy-info-panel-wrapper .btn {
  cursor: pointer;
  color: royalblue;
  border-radius: 100%;
  z-index: 1;
  opacity: 1;
  font-size: 16px !important;
}
.legacy-info-panel-wrapper .btn.close {
  height: 2rem;
  width: 2rem;
  padding: 0.125rem 0.25rem;

  outline: 1px solid crimson;
  color: crimson;
}

.legacy-info-panel-wrapper .legacy-info-panel {
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
}
.legacy-info-panel-wrapper .legacy-info-panel-opener {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  margin: 0;
}

.legacy-info-panel-wrapper .legacy-info-panel-opener button {
  padding: 0;
  margin: 0;
  color: royalblue;

}
.legacy-info-panel-wrapper .legacy-info-panel-opener button:hover{
  color: white;
}
.legacy-info-panel-wrapper .legacy-info-panel-opener i {
  display: block;
  height: 100%;
  margin: 0;
  font-size: 2rem;
  animation: wobble 2s infinite alternate 1s;
}
@keyframes wobble {
  0% {
    transform: rotate(0deg) scale(1);
  }
  15% {
    transform: rotate(0deg) scale(1);
  }
  30% {
    transform: rotate(-5deg) scale(1.025);
  }
  45% {
    transform: rotate(5deg) scale(1.025);
  }
  60% {
    transform: rotate(-5deg) scale(1.025);
  }
  75% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
.legacy-info-panel-wrapper.expanded .legacy-info-panel-opener {
  display: none !important;
}
.legacy-info-panel-wrapper.expanded .legacy-info-panel {
  display: block !important;
}

.legacy-info-panel .animator-div {
  position: relative;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  opacity: 0;
  animation: appear 0.3s ease-in-out forwards 200ms;
}

@keyframes appear {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* legacy notification styles end */
`;

const legacyNotificationHTML = `
<div
class="legacy-info-panel-wrapper bg-dark text-light"
>
<div
  class="d-flex justify-content-center align-items-center legacy-info-panel-opener  text-dark"
>
  <button class="btn btn-sm">
    <i class="fas fa-bell"></i>
  </button>
</div>
<div class="legacy-info-panel">
  <div class="animator-div">
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-sm">
        <i class="fas fa-info-circle"></i>
      </button>
      <button class="btn btn-sm close">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="legacy-info-panel-header">
      <h4>
        This is the legacy version of
        <a href="https://cipherbay.netlify.com" target="_blank"
          >cipherbay</a
        >
      </h4>
    </div>
    <div class="legacy-info-panel-body">
      <ul style="padding-inline-start: 1rem">
        <li>This was the first version of cipherbay.</li>
        <li>It was created in Nov, 2021.</li>
        <li>
          This version is no longer maintained and is preserved for
          historical purposes only.
        </li>
        <li>
          This version has no API integration and supports only one
          pre-added scheme.
        </li>
      </ul>
    </div>
    <div class="legacy-info-panel-footer">
      <i class="fas fa-arrow-right"></i>
      <a
        href="https://cipherbay.netlify.com/"
        class="legacy-info-panel-inner-text-a"
      >
        Go to the latest version.
      </a>
    </div>
  </div>
</div>
</div>
`;

const addCss = (cssCode) => {
  var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
};

window.onload = addCss(legacyNotificationStyles);
window.onload = document.body.insertAdjacentHTML(
  "afterbegin",
  legacyNotificationHTML
);

const interval_for_noti = 1000 * 60;

let noti_interval = setInterval(() => {
  $(".legacy-info-panel-wrapper").addClass("expanded");
}, 2500);

$(".legacy-info-panel .close").click(() => {
  // reset interval
  clearInterval(noti_interval);
  // reset interval
  noti_interval = setInterval(() => {
    $(".legacy-info-panel-wrapper").addClass("expanded");
  }, interval_for_noti);

  $(".legacy-info-panel-wrapper").removeClass("expanded");
});

// make legacy info panel appear everytime the user clicks on the legacy info icon
$(".legacy-info-panel-opener").click(() => {
  $(".legacy-info-panel-wrapper").addClass("expanded");
});
