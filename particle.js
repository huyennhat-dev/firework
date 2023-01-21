class Particle {
    constructor(x, y, firework, hue, multiColor) {
        this.position = createVector(x, y);
        this.firework = firework;
        this.hue = hue;
        this.lifeSpan = 255;
        this.multiColor = multiColor;
        if (this.firework) {
            const maxHeight = -y / 34;
            this.velocity = createVector(0, random(maxHeight * 0.7, maxHeight));
        } else {
            this.velocity = p5.Vector.random3D();
            this.velocity.mult(random(5, 40));
        }
        this.acceleration = createVector(0, 0);
        this.moveLeft = random(1) < 0.5 ? -1 : 1;
        this.direction = ((random() * 10) / 100) * this.moveLeft;
        if (!this.firework) this.direction = 0;
    }

    applyForce(force) {
        this.acceleration.add(force);
        this.acceleration.x += this.direction;
    }
    update() {
        if (!this.firework) {
            this.velocity.mult(random(0.5, 0.92));
            this.lifeSpan -= random(0, 10);

        }
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    show() {
        colorMode(HSB);
        if (!this.firework) {
            strokeWeight(random(1, 3));
            const strokeWidth =
                random(1) < 0.1 ? random(0.008, 0.01) : random(0.1, 0.3);
            const newHue = this.hue + (this.multiColor ? random(-50, 50) : 0);
            stroke(newHue, 255, 255, this.lifeSpan);
            ellipse(this.position.x, this.position.y, strokeWidth);
            point(this.position.x, this.position.y)
        } else {
            strokeWeight(random(3, 4));
            stroke(this.hue, 255, 255);
            ellipse(this.position.x, this.position.y, 1);
            point(this.position.x, this.position.y)

        }
    }
    done() {
        return this.lifeSpan < 0;
    }
}