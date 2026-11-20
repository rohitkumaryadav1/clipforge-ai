const form = document.querySelector("#youtube-form");
const urlInput = document.querySelector("#youtube-url");
const message = document.querySelector("#form-message");

function isSupportedYouTubeUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return false;
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const isYouTubeHost = host === "youtube.com" || host.endsWith(".youtube.com");
  const isShortHost = host === "youtu.be";
  const videoId = isShortHost
    ? url.pathname.split("/").filter(Boolean)[0]
    : url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).at(1);

  return url.protocol === "https:" && (isYouTubeHost || isShortHost) && Boolean(videoId);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.className = "form-message";

  if (!isSupportedYouTubeUrl(urlInput.value.trim())) {
    message.textContent = "Enter a valid YouTube video link, such as a youtube.com/watch or youtu.be URL.";
    message.classList.add("error");
    urlInput.setAttribute("aria-invalid", "true");
    return;
  }

  urlInput.removeAttribute("aria-invalid");
  message.textContent = "Link format looks good. YouTube import and hook detection are not connected yet.";
  message.classList.add("info");
});

urlInput.addEventListener("input", () => {
  urlInput.removeAttribute("aria-invalid");
  if (message.classList.contains("error")) {
    message.textContent = "";
    message.className = "form-message";
  }
});
