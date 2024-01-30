import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const listItems = galleryItems
  .map(
    (galleryItem) =>
      `<li class="gallery__item">
            <a class="gallery__link" href="${galleryItem.original}">
                <img
            class="gallery__image"
            src="${galleryItem.preview}"
            data-source="${galleryItem.original}"
            alt="${galleryItem.description}"
            >
            </a>
    </li>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", listItems);

let activeLightbox;

gallery.addEventListener("click", (event) => {
  event.preventDefault();

  const clickedElement = event.target;
  if (clickedElement.nodeName !== "IMG") {
    return;
  }

  const largeImageUrl = clickedElement.dataset.source;

  const instance = basicLightbox.create(
    `
    <img src="${largeImageUrl}" class="gallery__image">
  `,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscape);
        activeLightbox = instance;
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscape);
        activeLightbox = null;
      },
    }
  );

  instance.show();
});

function onEscape(event) {
  if (event.key !== "Escape" || !activeLightbox) return;
  activeLightbox.close();
}
