class ZManager {
    constructor() {
        this.elements = new Set();
        this.mouse = { x: 0, y: 0 }; 
        this.isRunning = false;
        this.isGyroActive = false; // Track state
        
        this.loop = this.loop.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleGyro = this.handleGyro.bind(this);

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', this.handleMove);
        }
    }

    handleMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }

    handleGyro(e) {
        const tiltX = e.gamma; 
        const tiltY = e.beta;  
        this.mouse.x = Math.max(-1, Math.min(1, tiltX / 45));
        this.mouse.y = Math.max(-1, Math.min(1, (tiltY - 45) / 45));
    }

    gyro() {
        // TOGGLE LOGIC
        if (this.isGyroActive) {
            // Turn OFF
            this.isGyroActive = false;
            window.removeEventListener('deviceorientation', this.handleGyro);
            window.addEventListener('mousemove', this.handleMove);
            return;
        }

        // Turn ON
        const enable = () => {
            this.isGyroActive = true;
            window.removeEventListener('mousemove', this.handleMove);
            window.addEventListener('deviceorientation', this.handleGyro);
        };

        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => { if (response === 'granted') enable(); })
                .catch(console.error);
        } else {
            enable();
        }
    }

    register(el) {
        this.elements.add(el);
        this.start();
    }

    unregister(el) {
        this.elements.delete(el);
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
