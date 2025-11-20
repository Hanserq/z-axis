import { manager } from './ZManager.js';

export class ZElement {
    constructor(element, options = {}) {
        this.el = element;
        this.current = { x: 0, y: 0 };
        
        // 1. Setup DOM Styles
        this.el.style.transformStyle = 'preserve-3d';
        
        // 2. Create Glare Node
        this.glareNode = document.createElement('div');
        Object.assign(this.glareNode.style, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: '2',
            borderRadius: 'inherit', transition: 'opacity 0.2s', opacity: '0'
        });
        this.el.appendChild(this.glareNode);
        
        // 3. Scan for Depth Elements (The feature you liked)
        this.applyDepth();

        // 4. Initialize Options
        this.updateOptions(options);

        manager.register(this);
    }

    // Allows updating settings on the fly
    updateOptions(options) {
        this.force = parseInt(options.force) || 20;
        this.mode = options.mode || 'heavy';
        this.reverse = options.reverse || false;
        this.hasGlare = options.glare !== false; // Default to true if undefined
        
        if (this.glareNode) {
            this.glareNode.style.opacity = this.hasGlare ? '1' : '0';
            this.el.style.overflow = this.hasGlare ? 'hidden' : 'visible';
        }
    }

    applyDepth() {
        // Find all children with data-z-depth
        const popOuts = this.el.querySelectorAll('[data-z-depth]');
        popOuts.forEach(child => {
            const depth = child.getAttribute('data-z-depth') || '20px';
            // We only set translateZ so it doesn't interfere with other transforms
            child.style.transform = `translateZ(${depth})`;
        });
    }

    update(globalMouse) {
        const direction = this.reverse ? 1 : -1;
        const targetX = globalMouse.y * this.force * direction;
        const targetY = globalMouse.x * this.force * (direction * -1);

        // Physics Logic
        if (this.mode === 'heavy') {
            this.current.x += (targetX - this.current.x) * 0.08;
            this.current.y += (targetY - this.current.y) * 0.08;
        } else {
            this.current.x = targetX;
            this.current.y = targetY;
        }

        // Render Card
        this.el.style.transform = 
            `perspective(1000px) rotateX(${this.current.x}deg) rotateY(${this.current.y}deg)`;

        // Render Glare
        if (this.hasGlare) {
            const mx = (globalMouse.x + 1) * 50;
            const my = (globalMouse.y + 1) * 50;
            this.glareNode.style.background = 
                `radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
        }
    }
    
    destroy() {
        manager.unregister(this);
        this.el.style.transform = '';
        if(this.glareNode) this.glareNode.remove();
    }
}
