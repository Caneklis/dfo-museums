import "../../components/scroll-lock/js/ios-checker";
import "../../components/scroll-lock/js/scroll-lock";

export const openMenu = () => {
  const menuButton = document.querySelector(".main-nav__toggle");
  const menuList = document.querySelector(".main-nav__menu");
  const body = document.querySelector("body");
  menuButton.addEventListener("click", () => {
    let expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !expanded);
    menuButton.classList.toggle("main-nav__toggle--open");
    menuList.classList.toggle("main-nav__menu--open");

    if (!document.querySelector(".scroll-lock")) {
      window.scrollLock.disableScrolling();
    } else {
      window.scrollLock.enableScrolling();
    }
  });
};
