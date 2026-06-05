const rtlLanguages = new Set([
  "ar",
  "arc",
  "ckb",
  "dv",
  "fa",
  "he",
  "ku",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);

const bootstrapStylesheets = {
  ltr: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  rtl: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
};

function getPrimaryLanguage(language) {
  return language.toLowerCase().split("-")[0];
}

function isRtlLanguage(language) {
  return rtlLanguages.has(getPrimaryLanguage(language));
}

function updatePageDirection(language) {
  const html = document.documentElement;
  const bootstrapCss = document.getElementById("bootstrap-css");
  const nextDirection = isRtlLanguage(language) ? "rtl" : "ltr";

  html.dir = nextDirection;

  if (bootstrapCss) {
    bootstrapCss.href = bootstrapStylesheets[nextDirection];
  }
}

function setPageLanguage(language) {
  document.documentElement.lang = language;
  updatePageDirection(language);
}

const languageObserver = new MutationObserver(() => {
  updatePageDirection(document.documentElement.lang || navigator.language);
});

languageObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});

document.addEventListener("DOMContentLoaded", () => {
  updatePageDirection(document.documentElement.lang || navigator.language);
});

window.setPageLanguage = setPageLanguage;
