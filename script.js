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
        },
        {
            key:   'dag-hammarskjold',
            title: 'MINIATURAS DAG HAMMARSKJÖLD',
            cls:   'dag-bg',
            label: 'DAG HAMMARSKJÖLD',
            desc:  'Miniaturas históricas y educativas',
            images: [
                './assets/dag-hammarskjold/variante_1.jpg',
                './assets/dag-hammarskjold/variante_2.jpg',
                './assets/dag-hammarskjold/variante_3.jpg'
            ]
        },
        {
            key:   'icarus',
            title: 'MINIATURAS ICARUS',
            cls:   'icarus-bg',
            label: 'ICARUS',
            desc:  'Diseños para supervivencia sci-fi',
            images: [
                './assets/icarus/variante_1.jpg',
                './assets/icarus/variante_2.jpg'
            ]
        },
        {
            key:   'albion',
            title: 'MINIATURAS ALBION ONLINE',
            cls:   'albion-bg',
            label: 'ALBION ONLINE',
            desc:  'Thumbnails para MMORPG sandbox',
            images: [
                './assets/albion/variante_1.jpg',
                './assets/albion/variante_2.jpg'
            ]
        },
        {
            key:   'minecraft-client',
            title: 'MINIATURAS MINECRAFT PERSONALIZADO',
            cls:   'mc-client-bg',
            label: 'MINECRAFT CUSTOM',
            desc:  'Renders 3D personalizados para clientes',
            images: [
                './assets/minecraft-client/variante_1.jpg',
                './assets/minecraft-client/variante_2.jpg'
            ]
        },
        {
            key:   'minecraft-2',
            title: 'MINIATURAS MINECRAFT SERIE 2',
            cls:   'mc2-bg',
            label: 'MINECRAFT 2',
            desc:  'Nueva serie de renders Minecraft',
            images: [
                './assets/minecraft-2/variante_1.jpg',
                './assets/minecraft-2/variante_2.jpg'
            ]
        },
        {
            key:   'putin',
            title: 'MINIATURAS PUTIN',
            cls:   'putin-bg',
            label: 'PUTIN',
            desc:  'Miniaturas de sátira política',
            images: [
                './assets/putin/variante_1.jpg',
                './assets/putin/variante_2.jpg',
                './assets/putin/variante_3.jpg'
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

    /* ── Gallery Modal (Clientes) ── */
    const clientes = {
        galaxito: {
            name: 'Galaxito',
            videos: [
                { id: 'JN1Z9Az-mR4',  img: './assets/clientes/galaxito/Galaxito_1.jpg', start: 30,  end: 60,  link: 'https://youtu.be/JN1Z9Az-mR4' },
                { id: 'AltqrOFb8Mo',  img: './assets/clientes/galaxito/Galaxito_2.jpg', start: 60,  end: 90,  link: 'https://youtu.be/AltqrOFb8Mo' },
                { id: '_HfdmGOUGI8',  img: './assets/clientes/galaxito/Galaxito_3.jpg', start: 45,  end: 75,  link: 'https://youtu.be/_HfdmGOUGI8' },
                { id: 'TcJoAk1nBW8',  img: './assets/clientes/galaxito/Galaxito_4.jpg', start: 90,  end: 120, link: 'https://youtu.be/TcJoAk1nBW8' }
            ]
        },
        playerdude: {
            name: 'PlayerDude',
            videos: [
                { id: 'AfgMdjbW0Uk',  img: './assets/clientes/playerdude/PlayerDude_1.jpg', start: 30,  end: 60,  link: 'https://youtu.be/AfgMdjbW0Uk' },
                { id: 'CUAsdgZRwt8',  img: './assets/clientes/playerdude/PlayerDude_2.jpg', start: 60,  end: 90,  link: 'https://youtu.be/CUAsdgZRwt8' },
                { id: '4Eu3R8V768M',  img: './assets/clientes/playerdude/PlayerDude_3.jpg', start: 45,  end: 75,  link: 'https://youtu.be/4Eu3R8V768M' },
                { id: '-5bLMNxq5Q4',  img: './assets/clientes/playerdude/PlayerDude_4.jpg', start: 90,  end: 120, link: 'https://youtu.be/-5bLMNxq5Q4' }
            ]
        }
    };

    const galleryModal = document.getElementById('gallery-modal');
    const galleryGrid  = document.getElementById('gallery-grid');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryClose = document.getElementById('gallery-close');
    const galleryView  = document.getElementById('gallery-view');
    const playerView   = document.getElementById('player-view');
    const playerIframe = document.getElementById('player-iframe');
    const galleryBack  = document.getElementById('gallery-back');
    const galleryYt    = document.getElementById('gallery-youtube');

    let currentClient = null;
    let currentVideos = [];

    function buildGallery(clientKey) {
        const data = clientes[clientKey];
        if (!data) return;
        currentClient = clientKey;
        currentVideos = data.videos;
        galleryTitle.textContent = data.name.toUpperCase() + ' · VIDEOS';
        galleryGrid.innerHTML = '';
        data.videos.forEach((v, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-thumb';
            div.innerHTML = `
                <img src="${v.img}" alt="Video ${i + 1}" loading="lazy">
                <div class="thumb-play"><span>▶</span></div>
            `;
            div.addEventListener('click', () => openPlayer(i));
            galleryGrid.appendChild(div);
        });
        showGallery();
    }

    function openPlayer(idx) {
        const v = currentVideos[idx];
        if (!v) return;
        let src = `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&showinfo=0`;
        if (v.start) src += `&start=${v.start}`;
        if (v.end)   src += `&end=${v.end}`;
        playerIframe.src = src;
        galleryYt.href = v.link;
        galleryView.style.display = 'none';
        playerView.style.display = 'block';
        galleryBack.style.display = 'inline-block';
        galleryYt.style.display = 'inline-flex';
    }

    function showGallery() {
        playerIframe.src = '';
        playerView.style.display = 'none';
        galleryView.style.display = 'block';
        galleryBack.style.display = 'none';
        galleryYt.style.display = 'none';
    }

    function openGallery(clientKey) {
        buildGallery(clientKey);
        galleryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryModal.classList.remove('open');
        showGallery();
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.cliente-panel').forEach(panel => {
        panel.addEventListener('click', () => openGallery(panel.dataset.client));
        panel.addEventListener('keydown', e => { if (e.key === 'Enter') openGallery(panel.dataset.client); });
    });

    galleryClose.addEventListener('click', closeGallery);
    galleryBack.addEventListener('click', showGallery);
    galleryModal.addEventListener('click', e => { if (e.target === galleryModal) closeGallery(); });
    document.addEventListener('keydown', e => {
        if (!galleryModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeGallery();
    });

})();
