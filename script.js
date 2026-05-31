(function () {

    /* ── Category / image data (relative paths — works on GitHub Pages) ── */
    const CATEGORIES = [
        {
            key:   'trolleo',
            title: 'MINIATURAS TROLLEO',
            cls:   'trolleo-bg',
            label: 'TROLLEO',
            desc:  'Diseños épicos para videos de trolleo y humor',
            images: [
                './assets/trolleo/miniatura_variante_1_remake.jpg',
                './assets/trolleo/miniatura_variante_2.jpg',
                './assets/trolleo/miniatura_variante_3.jpg'
            ]
        },
        {
            key:   'irl',
            title: 'MINIATURAS IRL',
            cls:   'irl-bg',
            label: 'IRL',
            desc:  'Thumbnails realistas con fotografía y diseño',
            images: [
                './assets/irl/thumbnail_1.jpg',
                './assets/irl/thumbnail_2.jpg',
                './assets/irl/toros.jpg'
            ]
        },
        {
            key:   'minecraft',
            title: 'MINIATURAS MINECRAFT 3D',
            cls:   'mc-bg',
            label: 'MINECRAFT 3D',
            desc:  'Renders 3D del universo Minecraft',
            images: [
                './assets/minecraft/mini_1.jpg',
                './assets/minecraft/mini_2.jpg',
                './assets/minecraft/mini_3.jpg'
            ]
        },
        {
            key:   'gaming',
            title: 'MINIATURAS GAMING',
            cls:   'gaming-bg',
            label: 'GAMING',
            desc:  'Thumbnails gaming de alto impacto visual',
            images: [
                './assets/gaming/miniatura_1.jpg',
                './assets/gaming/miniatura_2.jpg',
                './assets/gaming/miniatura_3.jpg'
            ]
        },
        {
            key:   'entretenimiento',
            title: 'MINIATURAS ENTRETENIMIENTO',
            cls:   'entertain-bg',
            label: 'ENTRETENIMIENTO',
            desc:  'Miniaturas para vlogs y contenido general',
            images: [
                './assets/entretenimiento/troll_girls.jpg',
                './assets/entretenimiento/troll_girls_2.jpg',
                './assets/entretenimiento/troll_girls_3.jpg'
            ]
        },
        {
            key:   'discord',
            title: 'MINIATURAS DISCORD',
            cls:   'discord-bg',
            label: 'DISCORD',
            desc:  'Diseños y banners para servidores de Discord',
            images: [
                './assets/discord/Miniatura_mabel_1.jpg',
                './assets/discord/Miniatura_mabel_2.jpg',
                './assets/discord/thumbnail_1.jpg',
                './assets/discord/thumbnail_2.jpg'
            ]
        }
    ];

    /* ── Build portfolio cards ── */
    const grid = document.getElementById('portfolio-grid');

    CATEGORIES.forEach(cat => {
        const cover = cat.images[0] || '';
        const count = cat.images.length;

        const article = document.createElement('article');
        article.className = 'portfolio-card';
        article.tabIndex  = 0;
        article.setAttribute('aria-label', `Abrir galería ${cat.title}`);

        article.innerHTML = `
            <div class="card-thumb ${cat.cls}">
                <img class="card-cover" src="${cover}" alt="Portada ${cat.title}" loading="lazy" onerror="this.src='./assets/hero_bg.jpg'">
                <span class="card-thumb-label">${cat.title}</span>
            </div>
            <div class="card-body">
                <p class="card-category">${cat.label}</p>
                <p class="card-title">${cat.desc}</p>
                <p class="card-count">${count} imagen${count !== 1 ? 'es' : ''} · Click para ver galería</p>
            </div>
        `;

        const open = () => openLightbox(cat.images, cat.title);
        article.addEventListener('click',   open);
        article.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });

        grid.appendChild(article);
    });

    /* ── Lightbox ── */
    const lb        = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lb-img');
    const lbTitle   = document.getElementById('lb-title');
    const lbStrip   = document.getElementById('lb-strip');
    const lbCounter = document.getElementById('lb-counter');

    let curImages = [], curIndex = 0;

    function openLightbox(images, title) {
        curImages = images;
        curIndex  = 0;
        lbTitle.textContent = title;
        buildStrip();
        showImage(0);
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
    }

    function showImage(idx) {
        curIndex = (idx + curImages.length) % curImages.length;
        lbImg.src = curImages[curIndex];
        // Adición para depuración y resiliencia
        lbImg.onerror = function() {
            console.error("No se pudo cargar la imagen:", lbImg.src);
            // Mostrar un fallback visual opcional si lo deseas
        };
        lbCounter.textContent = `${curIndex + 1} / ${curImages.length}`;
        document.querySelectorAll('.lb-thumb').forEach((t, i) => t.classList.toggle('active', i === curIndex));
        const active = lbStrip.children[curIndex];
        if (active) active.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
    }

    function buildStrip() {
        lbStrip.innerHTML = '';
        curImages.forEach((src, i) => {
            const img = document.createElement('img');
            img.src = src; img.alt = `Imagen ${i + 1}`;
            img.className = 'lb-thumb' + (i === 0 ? ' active' : '');
            img.addEventListener('click', () => showImage(i));
            lbStrip.appendChild(img);
        });
    }

    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lb-prev').addEventListener('click',  () => showImage(curIndex - 1));
    document.getElementById('lb-next').addEventListener('click',  () => showImage(curIndex + 1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'ArrowRight') showImage(curIndex + 1);
        if (e.key === 'ArrowLeft')  showImage(curIndex - 1);
        if (e.key === 'Escape')     closeLightbox();
    });

    /* ── Nav active state ── */
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    /* ── Clientes Button ── */
    const btnClientes = document.getElementById('btn-ver-clientes');
    if (btnClientes) {
        btnClientes.addEventListener('click', () => {
            const clientesImages = [
                './assets/canales/cliente_1.png',
                './assets/canales/cliente_2.png'
            ];
            openLightbox(clientesImages, 'CLIENTES Y CANALES');
        });
    }

})();
