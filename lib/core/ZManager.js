class ZManager {
    constructor() {
        this.elements = new Set();
        this.mouse = { x: 0, y: 0 };
        this.isRunning = false;
        
        // Bind context
        this.loop = this.loop.bind(this);
        this.handleMove = this.handleMove.bind(this);

        // Browser check
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', this.handleMove);
        }
    }

    handleMove(e) {
        // Normalize mouse (-1 to +1)
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }

    register(element) {
        this.elements.add(element);
        this.start();
    }

    unregister(element) {
        this.elements.delete(element);
        if (this.elements.size === 0) this.stop();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            requestAnimationFrame(this.loop);
        }
    }

    stop() {
        this.isRunning = false;
    }

    loop() {
        if (!this.isRunning) return;
        this.elements.forEach(el => el.update(this.mouse));
        requestAnimationFrame(this.loop);
    }
}

export const manager = new ZManager();
