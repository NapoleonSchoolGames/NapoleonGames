var menuScreens = {
    info: {
      name: "Info",
      parentDiv: "infoParent",
      buttonDescription: "Brings up the element info screen",
      show: true,
      close: () => {
        var infoParent = document.getElementById("infoParent");
        var infoSearch = document.getElementById("infoSearch");
        infoParent.style.display = "none";
        infoSearch.value = "";
        infoHistory = [];
      },
      open: () => {
        showInfo();
      }
    },
    mods: {
      name: "Mods",
      parentDiv: "modParent",
      buttonDescription: "Brings up the Mod Manager",
      show: true,
      close: () => {
        var modParent = document.getElementById("modParent");
        var modManagerUrl = document.getElementById("modManagerUrl");
        modParent.style.display = "none";
        modManagerUrl.value = "";
      },
      open: () => {
        showModManager();
      }
    },
    settings: {
      name: "Settings",
      parentDiv: "settingsParent",
      buttonDescription: "Brings up the settings screen",
      show: true,
      open: () => {
        showSettings();
      }
    }
  }
  
  closeMenu = (force = false) => {
    if (!showingMenu) return;
    const menu = menuScreens[showingMenu];
    if (!menu) {
      const menuParents = document.getElementsByClassName("menuParent");
      for (const elem of menuParents) elem.style.display = "none";
      showingMenu = false;
    } else {
      if (menu.close) menu.close();
      else {
        const menuParent = document.getElementById(menu.parentDiv);
        menuParent.style.display = "none";
      }
      if (!force && menu.onClose) menu.onClose();
      else showingMenu = false;
    }
  }
  
  const inject = () => {
    const toolControls = document.getElementById("toolControls");
    const buttons = [];
    const style = document.createElement("style");
    document.head.appendChild(style);
    for (const key in menuScreens) {
      const element = menuScreens[key];
      if (element.show) {
        const button = document.createElement("button");
        button.id = `betterMenuScreens_${key}Button`;
        button.title = element.buttonDescription ?? "";
        button.onclick = () => {
          if (showingMenu != key) {
            closeMenu(true);
            if (element.preOpen) element.preOpen();
            if (element.open) element.open();
            else {
              const menuParent = document.getElementById(element.parentDiv);
              menuParent.style.display = "block";
              showingMenu = key;
            }
          } else {
            closeMenu(true);
          }
        }
        button.innerText = element.name;
        button.className = "controlButton";
        buttons.push(button);
      }
      if (element.loader) element.loader();
    }
    toolControls.removeChild(document.getElementById("infoButton"));
    toolControls.removeChild(document.getElementById("modsButton"));
  
    document.getElementById(`settingsButton`).replaceWith(...buttons);
  
  }
  
  const openMenu = (menu, closeCurrent = false) => {
    if (closeCurrent) closeMenu(true);
    const menuScreen = menuScreens[menu];
    if (menuScreen) {
      showingMenu = menu;
      if (menuScreen.preOpen) menuScreen.preOpen();
      if (menuScreen.open) menuScreen.open();
      else {
        const menuParent = document.getElementById(menuScreen.parentDiv);
        menuParent.style.display = "block";
      }
    }
  }
  
  class MenuScreen {
    constructor() {
      this.nodes = [];
      this.innerHtml = "";
      this.showCloseButton = true;
      this.closeButtonText = "-";
      this.closeButtonClass = "XButton";
    }
  
    setTitle(title = "New Menu Screen") {
      this.title = title;
      return this;
    }
  
    setShowCloseButton(show) {
      this.showCloseButton = show;
      return this;
    }
  
    setCloseButtonText(text = "-") {
      this.closeButtonText = text;
      return this;
    }
  
    setCloseButtonClass(className = "XButton") {
      this.closeButtonClass = className;
      return this;
    }
  
    setParentDivId(id) {
      this.parentDivId = id;
      return this;
    }
  
    setParentDivClass(className = "menuParent") {
      this.parentDivClass = className;
      return this;
    }
  
    setInnerDivId(id) {
      this.innerDivId = id;
      return this;
    }
  
    setInnerDivClass(className = "menuScreen") {
      this.innerDivClass = className;
      return this;
    }
  
    addNode(node) {
      if (node instanceof Array) this.nodes.push(...node);
      else this.nodes.push(node);
      return this;
    }
  
    appendInnerHtml(html) {
      this.innerHtml += html;
      return this;
    }
  
    setInnerHtml(html) {
      this.innerHtml = html;
      return this;
    }
  
    _check() {
      if (!this.parentDivId) throw "No parent div id specified";
      if (!this.innerDivId) throw "No inner div id specified";
    }
  
    build(id = "gameDiv") {
      this._check();
      const parent = document.createElement("div");
      parent.className = this.parentDivClass ?? "menuParent";
      parent.id = this.parentDivId;
      parent.style.display = "none";
      const inner = document.createElement("div");
      inner.className = this.innerDivClass ?? "menuScreen";
      inner.innerHTML = `${this.showCloseButton ? `<button class="${this.closeButtonClass ?? "XButton"}" onclick="closeMenu();">${this.closeButtonText}` : ""}</button>
          <span class="menuTitle">${this.title ?? "Menu Screen"}</span><br><br><div class="menuText">` + this.innerHtml + "</div>";
      this.nodes.forEach(n => inner.querySelector(".menuText").appendChild(n));
      parent.appendChild(inner);
      document.getElementById(id).appendChild(parent);
    }
  }
  
  runAfterLoadList.push(inject);