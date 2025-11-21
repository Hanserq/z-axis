import { ZElement } from './core/ZElement.js';
import { manager } from './core/ZManager.js';

const Z = {
    bind: (element, options) => {
        if (element.zInstance) return element.zInstance;
        return new ZElement(element, options);
    },

    init: () => {
        const elements = document.querySelectorAll('[data-z]');
        elements.forEach(el => {
            if (el.zInstance) return;
            const options = {
                force: el.dataset.zForce,
                mode: el.dataset.zMode,
                reverse: el.hasAttribute('data-z-reverse'),
                glare: el.hasAttribute('data-z-glare')
            };
            el.zInstance = new ZElement(el, options);
        });
    },

    // NEW: Activates mobile support
    mobile: () => {
        manager.gyro();
    }
};

export default Z;
