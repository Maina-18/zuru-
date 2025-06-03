// ANIMATED NETWORK BACKGROUND JAVASCRIPT
        // Copy this entire script section to use elsewhere

        class AnimatedNetworkBackground {
            constructor(containerId) {
                this.container = document.getElementById(containerId);
                this.grid = this.container.querySelector('#networkGrid');
                this.particles = this.container.querySelector('#particles');
                this.init();
            }

            init() {
                this.createNetworkGrid();
                this.startParticleSystem();
                this.addInteractivity();
                this.createDataStreams();
            }

            createNetworkGrid() {
                // Create horizontal grid lines
                for (let i = 0; i < 8; i++) {
                    const line = document.createElement('div');
                    line.className = 'grid-line horizontal';
                    line.style.top = `${i * 12.5}%`;
                    line.style.animationDelay = `${i * 0.3}s`;
                    this.grid.appendChild(line);
                }

                // Create vertical grid lines
                for (let i = 0; i < 12; i++) {
                    const line = document.createElement('div');
                    line.className = 'grid-line vertical';
                    line.style.left = `${i * 8.33}%`;
                    line.style.animationDelay = `${i * 0.2}s`;
                    this.grid.appendChild(line);
                }

                // Create connection nodes with wave effects
                for (let i = 0; i < 20; i++) {
                    const node = document.createElement('div');
                    node.className = 'connection-node';
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    node.style.left = `${x}%`;
                    node.style.top = `${y}%`;
                    node.style.animationDelay = `${Math.random() * 2}s`;
                    
                    // Add wave ring effect
                    const waveRing = document.createElement('div');
                    waveRing.className = 'wave-ring';
                    waveRing.style.left = '-10px';
                    waveRing.style.top = '-10px';
                    waveRing.style.width = '28px';
                    waveRing.style.height = '28px';
                    waveRing.style.animationDelay = `${Math.random() * 3}s`;
                    node.appendChild(waveRing);
                    
                    this.grid.appendChild(node);
                }
            }

            startParticleSystem() {
                const addParticle = () => {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
                    particle.style.animationDelay = `${Math.random() * 2}s`;
                    this.particles.appendChild(particle);

                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 8000);
                };

                // Create particles continuously
                setInterval(addParticle, 500);
            }

            createDataStreams() {
                const createStream = () => {
                    const stream = document.createElement('div');
                    stream.className = 'data-stream';
                    stream.style.top = `${Math.random() * 100}%`;
                    stream.style.width = `${100 + Math.random() * 200}px`;
                    stream.style.animationDuration = `${3 + Math.random() * 3}s`;
                    stream.style.animationDelay = `${Math.random() * 2}s`;
                    this.grid.appendChild(stream);

                    setTimeout(() => {
                        if (stream.parentNode) {
                            stream.remove();
                        }
                    }, 8000);
                };

                setInterval(createStream, 2000);
            }

            addInteractivity() {
                // Mouse interaction with nodes
                this.container.addEventListener('mousemove', (e) => {
                    const nodes = this.container.querySelectorAll('.connection-node');
                    const rect = this.container.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    nodes.forEach(node => {
                        const nodeRect = node.getBoundingClientRect();
                        const nodeX = nodeRect.left - rect.left + nodeRect.width / 2;
                        const nodeY = nodeRect.top - rect.top + nodeRect.height / 2;
                        
                        const distance = Math.sqrt(
                            Math.pow(mouseX - nodeX, 2) + 
                            Math.pow(mouseY - nodeY, 2)
                        );

                        if (distance < 100) {
                            const intensity = (100 - distance) / 100;
                            node.style.boxShadow = `0 0 ${20 + intensity * 40}px #64b5f6`;
                            node.style.transform = `scale(${1 + intensity * 0.5})`;
                        } else {
                            node.style.boxShadow = '0 0 20px #4a90e2';
                            node.style.transform = 'scale(1)';
                        }
                    });
                });
            }
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            new AnimatedNetworkBackground('networkContainer');
        });

        // USAGE INSTRUCTIONS:
        // 1. Copy the CSS and JavaScript above
        // 2. Create a div with class "animated-network-container" and an id
        // 3. Add child divs with ids "networkGrid" and "particles"
        // 4. Initialize with: new AnimatedNetworkBackground('your-container-id');