document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hero Title Assembly Animation
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = "Projetando o Futuro da Estrutura Metálica.";
        const words = text.split(' ');
        heroTitle.innerHTML = words.map((word, i) => {
            const isHighlight = word === 'Estrutura' || word === 'Metálica.';
            const className = isHighlight ? 'assembly-word highlight' : 'assembly-word';
            return `<span class="${className}" style="transition-delay: ${i * 0.1}s">${word}</span>`;
        }).join(' ');

        setTimeout(() => {
            heroTitle.querySelectorAll('.assembly-word').forEach(span => {
                span.classList.add('assembled');
            });
        }, 300);
    }

    // Budget Simulator Logic
    window.nextStep = (step) => {
        if (step === 1) {
            const area = document.getElementById('sim-area').value;
            if (!area || area < 100) {
                alert("Por favor, informe uma área válida (mínimo 100m²).");
                return;
            }
        }
        if (step === 2) {
            const typeValue = document.querySelector('input[name="sim-type"]:checked');
            if (!typeValue) {
                alert("Por favor, selecione a finalidade do projeto.");
                return;
            }
        }

        const currentEl = document.querySelector(`.sim-step[data-step="${step}"]`);
        const nextEl = document.querySelector(`.sim-step[data-step="${step + 1}"]`);
        const card = document.getElementById('sim-card');

        card.style.transform = 'rotateY(10deg) translateZ(50px)';

        currentEl.style.opacity = '0';
        setTimeout(() => {
            currentEl.classList.remove('active');
            nextEl.classList.add('active');
            setTimeout(() => {
                nextEl.style.opacity = '1';
                card.style.transform = 'rotateY(0deg) translateZ(0px)';
            }, 100);
        }, 400);
    };

    window.prevStep = (step) => {
        const currentEl = document.querySelector(`.sim-step[data-step="${step}"]`);
        const prevEl = document.querySelector(`.sim-step[data-step="${step - 1}"]`);

        currentEl.style.opacity = '0';
        setTimeout(() => {
            currentEl.classList.remove('active');
            prevEl.classList.add('active');
            setTimeout(() => {
                prevEl.style.opacity = '1';
            }, 50);
        }, 400);
    };

    window.calculateSim = () => {
        const areaInput = document.getElementById('sim-area');
        const area = parseFloat(areaInput.value);
        const typeEl = document.querySelector('input[name="sim-type"]:checked');
        const type = typeEl ? typeEl.value : 'industrial';
        const locEl = document.getElementById('sim-location');
        const location = locEl ? locEl.value : 'santarem';

        let basePrice = 1200;
        if (type === 'industrial') basePrice = 1800;
        if (type === 'comercial') basePrice = 1500;

        let locationMultiplier = 1;
        if (location === 'regiao') locationMultiplier = 1.15;
        if (location === 'nacional') locationMultiplier = 1.30;

        const total = area * basePrice * locationMultiplier;
        let days = Math.round(area / 15);
        if (days < 60) days = 60;

        document.getElementById('res-total').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('res-days').textContent = `${days} dias`;

        window.nextStep(3);
    };

    window.resetSim = () => {
        document.querySelectorAll('.sim-step').forEach(s => {
            s.classList.remove('active');
            s.style.opacity = '0';
        });
        const firstStep = document.querySelector('.sim-step[data-step="1"]');
        firstStep.classList.add('active');
        firstStep.style.opacity = '1';
        document.getElementById('sim-area').value = '';
    };
});
