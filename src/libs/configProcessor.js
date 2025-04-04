export default class ConfigProcessor {
  constructor(configs) {
      this.configs = configs;
  }

  // Applies the configurations
  applyConfigs() {
      console.log("ConfigProcessor applyConfigs is running!");
      console.log("All applied configs:", this.configs);

      if (!Array.isArray(this.configs) || this.configs.length === 0) {
          console.warn("applyConfigs: No configs to process!");
          alert("No configurations to apply!");
          return;
      }

      this.configs.forEach(config => {
          if (!config.Actions || !Array.isArray(config.Actions)) {
              console.warn(`Invalid Actions for Config ID: ${config.ID}`);
              return;
          }

          config.Actions.forEach(action => {
              console.log(`Config ID: ${config.ID}, Action:`, action);
              switch (action.type) {
                  case 'remove':
                      this.removeElement(action.selector);
                      break;
                  case 'replace':
                      this.replaceElement(action.selector, action.newElement);
                      break;
                  case 'insert':
                      this.insertElement(action.target, action.newElement, action.position);
                      break;
                  case 'alter':
                      this.alterText(action.oldValue, action.newValue);
                      break;
                  default:
                      console.warn(`Unknown config type: ${action.type}`);
              }
          });
      });

      alert("All configurations have been successfully applied!");
  }

  removeElement(selector) {
      console.log(`removeElement is running: ${selector}`);
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
  }

  replaceElement(selector, newElement) {
      console.log(`replaceElement is running: ${selector}`);
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
          const replacement = document.createElement('div');
          replacement.innerHTML = newElement;
          el.replaceWith(replacement.firstChild);
      });
  }

  insertElement(target, element, position) {
      console.log(`insertElement is running: ${target}`);
      const targetElements = document.querySelectorAll(target);
      targetElements.forEach(el => {
          const newEl = document.createElement('div');
          newEl.innerHTML = element;

          if (position === 'before') {
              el.parentNode.insertBefore(newEl.firstChild, el);
          } else if (position === 'after') {
              el.parentNode.insertBefore(newEl.firstChild, el.nextSibling);
          } else {
              el.appendChild(newEl.firstChild);
          }
      });
  }

  alterText(oldValue, newValue) {
      console.log(`alterText is running: ${oldValue} → ${newValue}`);
      const elements = document.body.querySelectorAll('*');
      elements.forEach(el => {
          if (el.innerHTML.includes(oldValue)) {
              el.innerHTML = el.innerHTML.replace(new RegExp(oldValue, 'g'), newValue);
          }
      });
  }
}
