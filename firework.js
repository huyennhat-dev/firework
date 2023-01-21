class Firework {
    constructor(width, height, gravity) {
        this.width = width;
        this.height = height;
        this.gravity = gravity;
        this.hue = random(255);
        this.firework = new Particle(
            random(this.width),
            this.height,
            true,
            this.hue,
            false
        );
        this.exploded = false;
        this.particles = [];
        this.multiColor = random(0, 20) <3;
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(this.gravity);
            this.firework.update();
            if (this.firework.velocity.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(this.gravity);
            this.particles[i].update();
        }
    }
    show() {
        if (!this.exploded) this.firework.show();
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].show();
            if (this.particles[i].done()) this.particles.splice(i, 1);
        }
    }
    explode() {
        for (let i = 0; i <= random(0, 500); i++) {
            const particle = new Particle(
                this.firework.position.x,
                this.firework.position.y,
                false,
                this.hue,
                this.multiColor
            );
            this.particles.push(particle);
            for (let j = 0; j <= random(0, 5); j++) {
                const particle2 = new Particle(
                    this.particles[j].position.x,
                    this.particles[j].position.y,
                    false,
                    this.hue,
                    this.multiColor
                );
                this.particles.push(particle2);
            }
        }
    }
    done() {
        return this.exploded && this.particles.length === 0;
    }
}