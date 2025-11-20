import { ZElement } from './core/ZElement.js';

const Z = {
    // Manual: const card = Z.bind(element, { force: 30 })
    bind: (element, options) => {
        if (element.zInstance) return element.zInstance;
        return new ZElement(element, options);
    },

    // Auto: Z.init()
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
    }
};

export default Z;
