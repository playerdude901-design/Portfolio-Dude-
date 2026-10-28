(function () {

    /* ── Hero video (mute on scroll, unmute at top) ── */
    const heroVideo = document.querySelector('.hero-video');
    const muteBtn = document.getElementById('hero-mute-btn');

    if (heroVideo) {
        let unlocked = false;

        // Unlock audio on first user interaction
        function unlockAudio() {
            if (unlocked) return;
            heroVideo.muted = false;
            heroVideo.volume = 1;
            heroVideo.play();
            unlocked = true;
            updateMuteBtn();
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        }
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
        document.addEventListener('keydown', unlockAudio);

        function updateMuteBtn() {
            if (!muteBtn) return;
            muteBtn.textContent = heroVideo.muted ? '🔇' : '🔊';
            muteBtn.setAttribute('aria-label', heroVideo.muted ? 'Activar sonido' : 'Silenciar video');
        }

        // Scroll-based mute/unmute
        function onScroll() {
            if (!unlocked) return;
            const atTop = window.scrollY < 100;
            if (atTop && heroVideo.muted) {
                heroVideo.muted = false;
                heroVideo.volume = 1;
                heroVideo.play();
                updateMuteBtn();
            } else if (!atTop && !heroVideo.muted) {
                heroVideo.muted = true;
                updateMuteBtn();
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        updateMuteBtn();

        // Toggle mute on button click
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                heroVideo.muted = !heroVideo.muted;
                if (!heroVideo.muted) {
                    heroVideo.volume = 1;
                    heroVideo.play();
                }
                updateMuteBtn();
            });
        }
    }

    /* Subtle portrait parallax for the about section */
    const presentation = document.querySelector('.presentation-inner');
    if (presentation && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        presentation.addEventListener('pointermove', e => {
            const rect = presentation.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            presentation.style.setProperty('--about-x', `${x * 100}%`);
            presentation.style.setProperty('--about-y', `${y * 100}%`);
            presentation.style.setProperty('--portrait-shift-x', `${(x - .5) * 14}px`);
            presentation.style.setProperty('--portrait-shift-y', `${(y - .5) * 10}px`);
        });
        presentation.addEventListener('pointerleave', () => {
            presentation.style.setProperty('--portrait-shift-x', '0px');
            presentation.style.setProperty('--portrait-shift-y', '0px');
        });
    }

    /* Discord profile drawer and copy actions */
    const discordOpen = document.getElementById('discord-profile-open');
    const discordDrawer = document.getElementById('discord-drawer');
    const discordClose = document.getElementById('discord-drawer-close');
    const discordStatus = document.getElementById('discord-copy-status');

    function openDiscordDrawer() {
        discordDrawer.classList.add('open');
        discordDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => discordClose.focus(), 300);
    }
    function closeDiscordDrawer() {
        discordDrawer.classList.remove('open');
        discordDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        discordStatus.textContent = '';
    }
    async function copyDiscordValue(button) {
        const value = button.dataset.copy;
        try {
            await navigator.clipboard.writeText(value);
        } catch (_) {
            const helper = document.createElement('textarea');
            helper.value = value;
            helper.style.position = 'fixed';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.select();
            document.execCommand('copy');
            helper.remove();
        }
        document.querySelectorAll('.discord-copy-row button').forEach(item => {
            item.classList.remove('copied');
            item.textContent = 'Copiar';
        });
        button.classList.add('copied');
        button.textContent = 'Copiado';
        discordStatus.textContent = `${value} copiado al portapapeles`;
    }

    discordOpen?.addEventListener('click', openDiscordDrawer);
    discordClose?.addEventListener('click', closeDiscordDrawer);
    discordDrawer?.addEventListener('click', e => { if (e.target === discordDrawer) closeDiscordDrawer(); });
    document.querySelectorAll('.discord-copy-row button').forEach(button => button.addEventListener('click', () => copyDiscordValue(button)));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && discordDrawer?.classList.contains('open')) closeDiscordDrawer();
    });

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
        },
        {
            key:   'roblox',
            title: 'MINIATURAS ROBLOX',
            cls:   'roblox-bg',
            label: 'ROBLOX',
            desc:  'Thumbnails diseñadas para contenido de Roblox',
            images: [
                './assets/Miniatura_Roblox/variante_1.jpg',
                './assets/Miniatura_Roblox/variante_2.jpg',
                './assets/Miniatura_Roblox/variante_3.jpg'
            ]
        }
    ];

    /* ── Build portfolio cards ── */
    const grid = document.getElementById('portfolio-grid');

    CATEGORIES.forEach((cat, index) => {
        const count = cat.images.length;

        const article = document.createElement('article');
        article.className = 'portfolio-card';
        article.style.setProperty('--card-order', index);
        article.tabIndex  = 0;
        article.setAttribute('aria-label', `Abrir galería ${cat.title}`);

        const thumbs = cat.images.map(src =>
            `<img class="card-cover" src="${src}" alt="" loading="lazy" onerror="this.style.display='none'">`
        ).join('');

        article.innerHTML = `
            <div class="card-thumb ${cat.cls}" data-rotate="${cat.key}">
                <div class="card-thumb-images">${thumbs}</div>
                <div class="card-scrim"></div>
                <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
                <span class="card-gallery-action" aria-hidden="true">
                    Explorar
                    <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
            </div>
            <div class="card-body">
                <div class="card-copy">
                    <p class="card-category">${cat.label}</p>
                    <p class="card-title">${cat.desc}</p>
                </div>
                <p class="card-count">${count} imagen${count !== 1 ? 'es' : ''}</p>
            </div>
        `;

        const open = () => openLightbox(cat);
        article.addEventListener('click',   open);
        article.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });

        grid.appendChild(article);
    });

    /* Subtle depth that follows the pointer without affecting touch devices */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('pointermove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--pointer-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                card.style.setProperty('--pointer-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
            });
        });
    }

    /* ── Rotate preview images ── */
    document.querySelectorAll('.card-thumb-images').forEach(wrap => {
        const imgs = wrap.querySelectorAll('.card-cover');
        if (imgs.length < 2) return;
        let idx = 0;
        imgs[0].classList.add('card-cover-active');
        setInterval(() => {
            imgs[idx].classList.remove('card-cover-active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('card-cover-active');
        }, 3000);
    });

    /* ── Lightbox ── */
    const lb        = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lb-img');
    const lbTitle   = document.getElementById('lb-title');
    const lbStrip   = document.getElementById('lb-strip');
    const lbCurrent = document.getElementById('lb-current');
    const lbTotal   = document.getElementById('lb-total');
    const lbDescription = document.getElementById('lb-description');
    const lbProgress = document.getElementById('lb-progress-bar');

    let curImages = [], curIndex = 0;

    function openLightbox(category) {
        curImages = category.images;
        curIndex  = 0;
        lbTitle.textContent = category.label;
        lbDescription.textContent = category.desc;
        lbTotal.textContent = String(curImages.length).padStart(2, '0');
        buildStrip();
        showImage(0);
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => lbImg.removeAttribute('src'), 450);
    }

    function showImage(idx) {
        curIndex = (idx + curImages.length) % curImages.length;
        lbImg.classList.remove('is-visible');
        const nextSrc = curImages[curIndex];
        const reveal = () => requestAnimationFrame(() => lbImg.classList.add('is-visible'));
        if (lbImg.src.endsWith(nextSrc.replace('./', '/'))) {
            reveal();
        } else {
            lbImg.onload = reveal;
            lbImg.src = nextSrc;
        }
        // Adición para depuración y resiliencia
        lbImg.onerror = function() {
            console.error("No se pudo cargar la imagen:", lbImg.src);
            // Mostrar un fallback visual opcional si lo deseas
        };
        lbCurrent.textContent = String(curIndex + 1).padStart(2, '0');
        lbProgress.style.width = `${((curIndex + 1) / curImages.length) * 100}%`;
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
    let lbTouchStartX = 0;
    lb.addEventListener('touchstart', e => { lbTouchStartX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
        const distance = e.changedTouches[0].clientX - lbTouchStartX;
        if (Math.abs(distance) < 55) return;
        showImage(curIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });
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
            role: 'Streamer',
            subs: '228 mil suscriptores',
            description: 'Aventuras, gameplays y momentos épicos para disfrutar junto a su comunidad.',
            channel: 'https://www.youtube.com/@GalaxitoYT',
            logo: './assets/clientes/galaxito/Galaxito_Logo.jpg',
            verified: true,
            stats: [['País', 'México'], ['En YouTube desde', '1 dic 2017'], ['Suscriptores', '228 mil'], ['Videos publicados', '293'], ['Vistas del canal', '15,237,768']],
            videos: [
                { id: 'JN1Z9Az-mR4',  img: './assets/clientes/galaxito/Galaxito_1.jpg', start: 30,  end: 60,  link: 'https://youtu.be/JN1Z9Az-mR4' },
                { id: 'AltqrOFb8Mo',  img: './assets/clientes/galaxito/Galaxito_2.jpg', start: 60,  end: 90,  link: 'https://youtu.be/AltqrOFb8Mo' },
                { id: '_HfdmGOUGI8',  img: './assets/clientes/galaxito/Galaxito_3.jpg', start: 45,  end: 75,  link: 'https://youtu.be/_HfdmGOUGI8' },
                { id: 'TcJoAk1nBW8',  img: './assets/clientes/galaxito/Galaxito_4.jpg', start: 90,  end: 120, link: 'https://youtu.be/TcJoAk1nBW8' }
            ]
        },
        playerdude: {
            name: 'PlayerDude!',
            role: 'Gamer',
            subs: '1.46 mil suscriptores',
            description: 'Trolleos, humor y situaciones inesperadas dentro y fuera de los videojuegos.',
            channel: 'https://www.youtube.com/@PlayerDude0',
            logo: './assets/clientes/playerdude/PlayerDude_Logo.jpg',
            verified: false,
            stats: [['País', 'México'], ['En YouTube desde', '22 abr 2019'], ['Suscriptores', '1.46 mil'], ['Videos publicados', '248'], ['Vistas del canal', '179,639']],
            videos: [
                { id: 'AfgMdjbW0Uk',  img: './assets/clientes/playerdude/PlayerDude_1.jpg', start: 30,  end: 60,  link: 'https://youtu.be/AfgMdjbW0Uk' },
                { id: 'CUAsdgZRwt8',  img: './assets/clientes/playerdude/PlayerDude_2.jpg', start: 60,  end: 90,  link: 'https://youtu.be/CUAsdgZRwt8' },
                { id: '4Eu3R8V768M',  img: './assets/clientes/playerdude/PlayerDude_3.jpg', start: 45,  end: 75,  link: 'https://youtu.be/4Eu3R8V768M' },
                { id: '-5bLMNxq5Q4',  img: './assets/clientes/playerdude/PlayerDude_4.jpg', start: 90,  end: 120, link: 'https://youtu.be/-5bLMNxq5Q4' }
            ]
        },
        masfax: {
            name: 'El MasFax',
            role: 'Creador',
            subs: '673 suscriptores',
            description: 'Diversión, aventuras y creatividad a través de mundos, construcciones y desafíos.',
            channel: 'https://www.youtube.com/@ElMasFax',
            logo: './assets/clientes/masfax/MasFax_Logo.jpg',
            verified: false,
            stats: [['País', 'Colombia'], ['En YouTube desde', '31 jul 2023'], ['Suscriptores', '673'], ['Videos publicados', '41'], ['Vistas del canal', '79,284']],
            videos: [
                { id: 'UyJcdiXQcF8',  img: './assets/clientes/masfax/MasFax_1.jpg', start: 1,  end: 30,  link: 'https://youtu.be/UyJcdiXQcF8' },
                { id: 'bY-joy5Lc6k', img: './assets/clientes/masfax/MasFax_2.jpg', start: 1,  end: 30,  link: 'https://youtu.be/bY-joy5Lc6k' }
            ]
        },
        megazote: {
            name: 'Megazote',
            role: 'Streamer',
            subs: '332 mil suscriptores',
            description: 'Contenido de entretenimiento, gaming y retos creado para una comunidad activa.',
            channel: 'https://www.youtube.com/@Megazote',
            logo: './assets/clientes/megazote/Megazote_Logo.jpg',
            verified: true,
            stats: [['País', 'México'], ['En YouTube desde', '15 ago 2019'], ['Suscriptores', '332 mil'], ['Videos publicados', '429'], ['Vistas del canal', '195,143,123']],
            videos: [
                { id: 'IMTOh9M_Tso',  img: './assets/clientes/megazote/Megazote_1.jpg', start: 1,  end: 30,  link: 'https://youtu.be/IMTOh9M_Tso' }
            ]
        },
        maog: {
            name: 'Maog',
            role: 'Streamer',
            subs: '31.4 mil suscriptores',
            description: 'Gameplays y contenido variado pensado para entretener, descubrir y compartir.',
            channel: 'https://www.youtube.com/@Maog_05',
            logo: './assets/clientes/maog/Maog_Logo.jpg',
            verified: true,
            stats: [['País', 'México'], ['En YouTube desde', '22 feb 2017'], ['Suscriptores', '31.4 mil'], ['Videos publicados', '627']],
            videos: [
                { id: 'lLNxqnnoQNY',  img: './assets/clientes/maog/Maog_1.jpg', start: 1,  end: 30,  link: 'https://youtu.be/lLNxqnnoQNY' }
            ]
        },
        strike: {
            name: 'ElStrike',
            role: 'Gamer',
            subs: '102 mil suscriptores',
            description: 'Historias, curiosidades y entretenimiento en formato breve para audiencias de gaming.',
            channel: 'https://www.youtube.com/@ElStrikew',
            logo: './assets/clientes/strike/Strike_Logo.jpg',
            verified: true,
            stats: [['País', 'Perú'], ['En YouTube desde', '20 feb 2024'], ['Suscriptores', '102 mil'], ['Videos publicados', '30'], ['Vistas del canal', '28,169,313']],
            videos: [
                { id: 'AXGRtZ2Fg-w',  img: './assets/clientes/strike/Strike_1.jpg', start: 1,  end: 30,  link: 'https://www.youtube.com/shorts/AXGRtZ2Fg-w' },
                { id: 'Sl6Y1KfInkA',  img: './assets/clientes/strike/Strike_2.jpg', start: 1,  end: 30,  link: 'https://www.youtube.com/shorts/Sl6Y1KfInkA', restricted: true },
                { id: 'rZdb8zQMidE',  img: './assets/clientes/strike/Strike_3.jpg', start: 1,  end: 30,  link: 'https://www.youtube.com/shorts/rZdb8zQMidE', restricted: true }
            ]
        }
    };

    /* Build editorial client profiles from the verified channel data */
    document.querySelectorAll('.cliente-panel').forEach((panel, panelIndex) => {
        const key = panel.dataset.client;
        const data = clientes[key];
        if (!data) return;
        const statIcons = ['◎', '◷', '◉', '▶', '↗'];
        const stats = data.stats.map((stat, i) => `
            <li><span class="client-stat-icon">${statIcons[i] || '•'}</span><span>${stat[0]}</span><strong>${stat[1]}</strong></li>
        `).join('');
        const work = data.videos.map((video, i) => `
            <button class="client-work-thumb" type="button" data-video-index="${i}" aria-label="Ver video editado ${i + 1}">
                <img src="${video.img}" alt="" loading="lazy">
                <span>${String(i + 1).padStart(2, '0')}</span>
            </button>
        `).join('');
        panel.classList.add('client-showcase');
        panel.removeAttribute('data-featured');
        panel.innerHTML = `
            <div class="client-showcase-visual">
                <img src="${data.logo}" alt="Foto de perfil de ${data.name}" loading="lazy">
                <span class="client-showcase-number">${String(panelIndex + 1).padStart(2, '0')}</span>
            </div>
            <div class="client-showcase-copy">
                <div class="client-showcase-topline"><span>${data.role}</span><span>${data.videos.length} trabajo${data.videos.length !== 1 ? 's' : ''} editado${data.videos.length !== 1 ? 's' : ''}</span></div>
                <h3>${data.name}${data.verified ? '<img src="./assets/verified/verified.png" alt="Canal verificado">' : ''}</h3>
                <p>${data.description}</p>
                <ul class="client-stats">${stats}</ul>
                <div class="client-work-heading"><span>Videos editados</span><button type="button" class="open-client-gallery">Ver todos <i>→</i></button></div>
                <div class="client-work-strip">${work}</div>
            </div>
        `;
        panel.setAttribute('aria-label', `Ver trabajos editados para ${data.name}`);
        panel.addEventListener('click', e => {
            const videoButton = e.target.closest('.client-work-thumb');
            buildGallery(key);
            galleryModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (videoButton) openPlayer(Number(videoButton.dataset.videoIndex));
        });
        panel.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target === panel) openGallery(key); });
    });

    const galleryModal = document.getElementById('gallery-modal');
    const galleryGrid  = document.getElementById('gallery-grid');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryClose = document.getElementById('gallery-close');
    const galleryView  = document.getElementById('gallery-view');
    const playerView   = document.getElementById('player-view');
    const playerIframe = document.getElementById('player-iframe');
    const galleryBack  = document.getElementById('gallery-back');
    const galleryYt    = document.getElementById('gallery-youtube');
    const playerRestricted = document.getElementById('player-restricted');
    const profileRole = document.getElementById('client-profile-role');
    const profileSubs = document.getElementById('client-profile-subs');
    const profileName = document.getElementById('client-profile-name');
    const profileDescription = document.getElementById('client-profile-description');
    const profileChannel = document.getElementById('client-profile-channel');
    const profileWork = document.getElementById('client-profile-work');

    let currentClient = null;
    let currentVideos = [];

    /* ── Reset gallery to initial state (synchronous, no animation) ── */
    function resetGalleryState() {
        playerIframe.src = '';
        playerIframe.style.display = 'block';
        playerRestricted.style.display = 'none';
        playerView.style.display = 'none';
        playerView.style.opacity = '';
        playerView.style.transform = '';
        galleryView.style.display = 'block';
        galleryView.style.opacity = '';
        galleryView.style.transform = '';
        galleryBack.style.display = 'none';
        galleryYt.style.display = 'none';
    }

    function buildGallery(clientKey) {
        const data = clientes[clientKey];
        if (!data) return;
        currentClient = clientKey;
        currentVideos = data.videos;
        galleryTitle.textContent = 'Trabajo seleccionado';
        profileRole.textContent = data.role;
        profileSubs.textContent = data.subs;
        profileName.textContent = data.name;
        profileDescription.textContent = data.description;
        profileChannel.href = data.channel;
        profileWork.textContent = `${data.videos.length} pieza${data.videos.length !== 1 ? 's' : ''} editada${data.videos.length !== 1 ? 's' : ''}`;
        galleryGrid.innerHTML = '';
        data.videos.forEach((v, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-thumb';
            div.style.transitionDelay = (i * 60) + 'ms';
            div.innerHTML = `
                <img src="${v.img}" alt="Video ${i + 1}" loading="lazy">
                <span class="gallery-thumb-index">${String(i + 1).padStart(2, '0')}</span>
                ${v.restricted ? '<span class="gallery-thumb-note">Ver en YouTube</span>' : ''}
                <div class="thumb-play"><span>${v.restricted ? '↗' : '▶'}</span></div>
            `;
            div.addEventListener('click', () => openPlayer(i));
            galleryGrid.appendChild(div);
        });
        resetGalleryState();
    }

    function openPlayer(idx) {
        const v = currentVideos[idx];
        if (!v) return;
        const origin = encodeURIComponent(window.location.origin);
        let src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1&origin=${origin}`;
        if (v.start) src += `&start=${v.start}`;
        if (v.end)   src += `&end=${v.end}`;

        /* Apple-style smooth transition: fade-out gallery → fade-in player */
        galleryView.style.opacity = '0';
        galleryView.style.transform = 'translateY(-6px) scale(0.97)';

        setTimeout(() => {
            galleryView.style.display = 'none';
            galleryView.style.opacity = '';
            galleryView.style.transform = '';

            if (v.restricted) {
                playerIframe.src = '';
                playerIframe.style.display = 'none';
                playerRestricted.style.display = 'flex';
            } else {
                playerRestricted.style.display = 'none';
                playerIframe.style.display = 'block';
                playerIframe.src = src;
                playerIframe.title = `Vista previa de ${clientes[currentClient].name}`;
            }
            galleryYt.href = v.link;
            galleryBack.style.display = 'inline-block';
            galleryYt.style.display = 'inline-flex';

            /* Snap player to transparent, then animate in */
            playerView.style.transition = 'none';
            playerView.style.display = 'block';
            playerView.style.opacity = '0';
            playerView.style.transform = 'translateY(8px) scale(0.98)';
            playerView.getBoundingClientRect(); /* Force reflow */
            playerView.style.transition = '';
            playerView.style.opacity = '1';
            playerView.style.transform = 'translateY(0) scale(1)';
        }, 320);
    }

    function showGallery() {
        /* If player is not visible, just reset state (no animation needed) */
        if (playerView.style.display !== 'block') {
            resetGalleryState();
            return;
        }
        /* Apple-style smooth transition: fade-out player → fade-in gallery */
        playerView.style.opacity = '0';
        playerView.style.transform = 'translateY(8px) scale(0.97)';

        setTimeout(() => {
            playerIframe.src = '';
            playerView.style.display = 'none';
            playerView.style.opacity = '';
            playerView.style.transform = '';

            galleryBack.style.display = 'none';
            galleryYt.style.display = 'none';

            /* Snap gallery to transparent, then animate in */
            galleryView.style.transition = 'none';
            galleryView.style.display = 'block';
            galleryView.style.opacity = '0';
            galleryView.style.transform = 'translateY(-6px) scale(0.98)';
            galleryView.getBoundingClientRect(); /* Force reflow */
            galleryView.style.transition = '';
            galleryView.style.opacity = '1';
            galleryView.style.transform = 'translateY(0) scale(1)';
        }, 320);
    }

    function openGallery(clientKey) {
        buildGallery(clientKey);
        galleryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryModal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(resetGalleryState, 380); /* Reset after modal fade-out completes */
    }

    galleryClose.addEventListener('click', closeGallery);
    galleryBack.addEventListener('click', showGallery);
    galleryModal.addEventListener('click', e => { if (e.target === galleryModal) closeGallery(); });
    document.addEventListener('keydown', e => {
        if (!galleryModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeGallery();
    });

    /* ── Scroll-triggered fade-up ── */
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, section, [class*="plan"], [class*="service"]')
      .forEach(el => {
        el.classList.add('fade-up');
        fadeObserver.observe(el);
      });

    document.querySelectorAll('.gold-grid > *, .clientes-bento > .cliente-panel')
      .forEach((el, i) => {
        el.style.transitionDelay = (i * 80) + 'ms';
      });

    document.querySelectorAll('.portfolio-card').forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 55, 330)}ms`;
      el.classList.add('fade-up');
      fadeObserver.observe(el);
    });

    /* Fox3D viewport: cursor-reactive depth */
    const foxVisual = document.querySelector('.fox3d-visual');
    const foxObject = document.getElementById('fox3d-object');
    if (foxVisual && foxObject && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        foxVisual.addEventListener('pointermove', (event) => {
            const rect = foxVisual.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            foxObject.style.setProperty('--ry', `${x * 28}deg`);
            foxObject.style.setProperty('--rx', `${y * -22}deg`);
        });
        foxVisual.addEventListener('pointerleave', () => {
            foxObject.style.setProperty('--ry', '-18deg');
            foxObject.style.setProperty('--rx', '-8deg');
        });
    }

})();
