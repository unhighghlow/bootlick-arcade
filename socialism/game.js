'use strict';
globalThis.SocialismMatch = ( () => {
    const source = 'https://www.whitehouse.gov/wp-content/uploads/2026/10/The-Real-Cost-of-Socialism-In-America-Summary.pdf';
    const facts = [{
        id: 'prices',
        label: 'Groceries',
        topic: 'EVERYDAY PRICES',
        art: 0,
        color: '#d3bd79',
        promise: 'An affordable life.',
        policy: 'THE SOCIALIST AGENDA',
        consequence: 'Your prices surge.',
        value: '+130–160%',
        unit: 'higher prices over ten years',
        context: 'If the agenda is financed by borrowing.',
        page: 2
    }, {
        id: 'pay',
        label: 'Paycheck',
        topic: 'YOUR PAYCHECK',
        art: 1,
        color: '#f3c66e',
        promise: 'More for workers.',
        policy: 'FUND THE AGENDA WITH TAXES',
        consequence: 'Your paycheck shrinks.',
        value: '−28.4%',
        unit: 'in after-tax hourly wages',
        context: 'If tax increases finance the agenda; about $22,000 less per worker each year, in 2026 dollars.',
        page: 2
    }, {
        id: 'rent',
        label: 'Housing',
        topic: 'YOUR HOME',
        art: 2,
        color: '#83c5c5',
        promise: 'A home for everyone.',
        policy: 'UNIVERSAL RENT CONTROL',
        consequence: 'Millions of homes vanish.',
        value: '3.3 million',
        unit: 'fewer rental homes after ten years',
        context: 'Under universal rent control, relative to the report’s baseline.',
        page: 3
    }, {
        id: 'jobs',
        label: 'Jobs',
        topic: 'YOUR JOB',
        art: 3,
        color: '#98bce5',
        promise: 'Less work. Same pay.',
        policy: 'A 32-HOUR WORKWEEK',
        consequence: 'Millions of jobs vanish.',
        value: '4.2–6.9M',
        unit: 'jobs lost',
        context: 'Under a 32-hour workweek mandate with unchanged weekly pay.',
        page: 3
    }, {
        id: 'care',
        label: 'Health care',
        topic: 'YOUR HEALTH',
        art: 4,
        color: '#efaa99',
        promise: 'Free health care.',
        policy: 'MEDICARE FOR ALL',
        consequence: 'Health care suffers.',
        value: '−22%',
        unit: 'medical productivity by 2036',
        context: 'Under Medicare for All.',
        page: 3
    }, {
        id: 'savings',
        label: 'Savings',
        topic: 'YOUR SAVINGS',
        art: 5,
        color: '#eab6c0',
        promise: 'Tax only billionaires.',
        policy: 'A 5% BILLIONAIRE WEALTH TAX',
        consequence: 'Your savings take the hit.',
        value: '−$2,100',
        unit: 'from the median 401(k)',
        context: 'From the wealth tax’s projected effect on stock-market value.',
        page: 3
    }, {
        id: 'tuition',
        label: 'College',
        topic: 'HIGHER EDUCATION',
        art: 6,
        color: '#c5abe5',
        promise: 'College without a bill.',
        policy: 'DEBT CANCELLATION & FREE TUITION',
        consequence: 'The bill goes to taxpayers.',
        value: '$3.6T',
        unit: 'ten-year federal cost',
        context: 'Student-debt cancellation and free undergraduate tuition at all institutions; 2027–2036, in constant 2026 dollars.',
        page: 3
    }, {
        id: 'mortgage',
        label: 'Mortgages',
        topic: 'BUYING A HOME',
        art: 7,
        color: '#81d1c6',
        promise: 'A more affordable future.',
        policy: 'FUND THE AGENDA BY BORROWING',
        consequence: 'Home loans get costlier.',
        value: '>12%',
        unit: '30-year mortgage rates',
        context: 'If the agenda is financed by borrowing. This is the projected mortgage rate, not an increase of 12 percentage points.',
        page: 2
    }, {
        id: 'output',
        label: 'The economy',
        topic: 'ECONOMIC OUTPUT',
        art: 8,
        color: '#e9a585',
        promise: 'Prosperity for everyone.',
        policy: 'FUND THE AGENDA WITH TAXES',
        consequence: 'The economy shrinks.',
        value: '−19%',
        unit: 'approximately, in real GDP',
        context: 'If financed by tax increases, including the programs’ direct effects; CEA says real GDP could fall by about 19%.',
        page: 2
    }, {
        id: 'debt',
        label: 'Public debt',
        topic: 'NATIONAL DEBT',
        art: 9,
        color: '#81bbc6',
        promise: 'Borrow now. Prosper later.',
        policy: 'FUND THE AGENDA BY BORROWING',
        consequence: 'Debt more than doubles.',
        value: '254%',
        unit: 'of GDP in publicly held federal debt by 2036',
        context: 'If the agenda is financed by borrowing. This is the debt-to-GDP ratio, not a 254% increase in debt.',
        page: 2
    }, {
        id: 'deficits',
        label: 'Federal budget',
        topic: 'THE FEDERAL BUDGET',
        art: 10,
        color: '#c1cce4',
        promise: 'The programs pay for themselves.',
        policy: 'SEVEN SCORED PROGRAMS',
        consequence: 'The deficit explodes.',
        value: '+$49T',
        unit: 'added federal deficits over ten years',
        context: 'Roughly $49 trillion, net of proposed wealth-tax revenue; 2027–2036, in constant 2026 dollars.',
        page: 2
    }, {
        id: 'energy',
        label: 'Energy',
        topic: 'ENERGY & CLIMATE MANDATES',
        art: 11,
        color: '#f5d16f',
        promise: 'A greener, cheaper future.',
        policy: 'THE GREEN NEW DEAL',
        consequence: 'The mandates cost you.',
        value: '>$91,000',
        unit: 'per household over 25 years',
        context: 'CEA’s estimate of the costs of Green New Deal mandates; this is a 25-year total.',
        page: 3
    }, {
        id: 'utilities',
        label: 'Power bills',
        topic: 'HOUSEHOLD UTILITIES',
        art: 12,
        color: '#aaa79d',
        promise: 'Cheaper, cleaner energy.',
        policy: 'THE GREEN NEW DEAL',
        consequence: 'Your power bill rises.',
        value: '+16.3%',
        unit: 'at least, in electricity bills',
        context: 'CEA projects about $340 more a year for heating alone in gas-heated homes under Green New Deal mandates.',
        page: 3
    }, {
        id: 'maintenance',
        label: 'Home repairs',
        topic: 'HOUSING QUALITY',
        art: 13,
        color: '#b69a7f',
        promise: 'Better housing for everyone.',
        policy: 'UNIVERSAL RENT CONTROL',
        consequence: 'Homes fall into disrepair.',
        value: '−4.5%',
        unit: 'in rental-unit quality',
        context: 'Under universal rent control, as maintenance declines.',
        page: 3
    }, {
        id: 'taxes',
        label: 'Income tax',
        topic: 'YOUR TAX BILL',
        art: 14,
        color: '#c39990',
        promise: 'More services. Less burden.',
        policy: 'FUND THE AGENDA WITH TAXES',
        consequence: 'Your tax rate nearly triples.',
        value: '39.6%',
        unit: 'effective federal individual income-tax rate',
        context: 'Up from 14.1% of adjusted gross income if tax increases finance the agenda.',
        page: 2
    }, {
        id: 'tuitionannual',
        label: 'Tuition bills',
        topic: 'THE COST OF FREE TUITION',
        art: 15,
        color: '#9caa91',
        promise: 'Tuition at no cost.',
        policy: 'FREE UNDERGRADUATE TUITION',
        consequence: 'The spending never ends.',
        value: '$84–233B',
        unit: 'in permanent annual federal outlays',
        context: 'CEA’s annual spending estimate for free undergraduate tuition; this is a federal cost, not a student’s bill.',
        page: 3
    }, {
        id: 'healthfunding',
        label: 'Hospitals',
        topic: 'HEALTH-CARE FINANCING',
        art: 16,
        color: '#c5b69d',
        promise: 'Care without the cost.',
        policy: 'MEDICARE FOR ALL',
        consequence: 'The public bill balloons.',
        value: '$47.41T',
        unit: 'ten-year federal fiscal cost',
        context: 'Medicare for All, 2027–2036, in constant 2026 dollars.',
        page: 3
    }, {
        id: 'unemployment',
        label: 'Employment',
        topic: 'THE JOB MARKET',
        art: 17,
        color: '#d0a57b',
        promise: 'Shorter hours. Secure jobs.',
        policy: 'A 32-HOUR WORKWEEK',
        consequence: 'Unemployment climbs.',
        value: '6.6–8.2%',
        unit: 'projected unemployment rate',
        context: 'Up from 4.1% under a 32-hour workweek mandate with unchanged weekly pay.',
        page: 3
    }, {
        id: 'wealthjobs',
        label: 'Businesses',
        topic: 'WORK & INVESTMENT',
        art: 18,
        color: '#9bacb4',
        promise: 'Only billionaires pay.',
        policy: 'A 5% BILLIONAIRE WEALTH TAX',
        consequence: 'Workers lose out, too.',
        value: '1.1M',
        unit: 'workers unemployed',
        context: 'CEA’s estimate under a 5% annual tax on net wealth above $1 billion.',
        page: 3
    }, {
        id: 'vehicles',
        label: 'Cars',
        topic: 'VEHICLE MANDATES',
        art: 19,
        color: '#c2978e',
        promise: 'A cheaper way forward.',
        policy: 'THE GREEN NEW DEAL',
        consequence: 'Mandates drive up costs.',
        value: '$884B',
        unit: 'in vehicle-mandate costs over ten years',
        context: 'CEA’s estimate of the Green New Deal’s vehicle mandates.',
        page: 3
    }, {
        id: 'workweekoutput',
        label: 'Production',
        topic: 'WORKWEEK & OUTPUT',
        art: 20,
        color: '#aca9a4',
        promise: 'Work less. Produce as much.',
        policy: 'A 32-HOUR WORKWEEK',
        consequence: 'Production takes a hit.',
        value: '−$5.2T',
        unit: 'in real GDP over ten years',
        context: 'Under a 32-hour workweek mandate with unchanged weekly pay; a 1.5% reduction in real GDP.',
        page: 3
    }, {
        id: 'capital',
        label: 'Investment',
        topic: 'PRODUCTIVE CAPITAL',
        art: 21,
        color: '#c4ad81',
        promise: 'Build a stronger economy.',
        policy: 'FUND THE AGENDA WITH TAXES',
        consequence: 'The economy loses capacity.',
        value: '−11.5%',
        unit: 'in capital stock',
        context: 'If the agenda is financed by tax increases.',
        page: 2
    }, {
        id: 'interest',
        label: 'Debt interest',
        topic: 'THE INTEREST BILL',
        art: 22,
        color: '#bba886',
        promise: 'Borrow now. Pay later.',
        policy: 'FUND THE AGENDA BY BORROWING',
        consequence: 'Interest overtakes revenue.',
        value: '>100%',
        unit: 'of projected federal revenue by 2036',
        context: 'If financed by borrowing, annual federal interest payments would exceed all projected federal revenue in 2036.',
        page: 2
    }];
    const levels = [{
        id: 'budget',
        title: 'Your budget',
        tagline: 'The price of getting through the day.',
        color: '#ba8076',
        ids: ['prices', 'pay', 'rent', 'utilities', 'maintenance', 'taxes']
    }, {
        id: 'future',
        title: 'Your future',
        tagline: 'Work, health, education and savings.',
        color: '#a294a7',
        ids: ['jobs', 'care', 'tuition', 'savings', 'tuitionannual', 'healthfunding', 'unemployment', 'wealthjobs']
    }, {
        id: 'nation',
        title: 'The bigger picture',
        tagline: 'Follow the costs through the economy.',
        color: '#b49a74',
        ids: ['energy', 'mortgage', 'output', 'debt', 'deficits', 'vehicles', 'workweekoutput', 'capital', 'interest']
    }];
    const legacyLevels = [['prices', 'pay', 'rent'], ['jobs', 'care', 'tuition', 'savings'], ['energy', 'mortgage', 'output', 'debt', 'deficits']];
    const fact = id => facts.find(f => f.id === id)
      , current = s => levels[s.level]
      , currentFacts = s => current(s).ids.map(fact);
    function shuffled(level, random=Math.random) {
        const deck = levels[level].ids.flatMap(id => [0, 1].map(copy => ({
            key: id + '-' + copy,
            id
        })));
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [deck[i],deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
    function boardState(level, random) {
        return {
            level,
            deck: shuffled(level, random),
            selected: [],
            matched: [],
            moves: 0,
            phase: 'idle',
            remaining: 0,
            lastMatch: null
        };
    }
    function create(random=Math.random) {
        return {
            ...boardState(0, random),
            totalMoves: 0,
            seen: [],
            credited: []
        };
    }
    function applyCredits(s) {
        s.matched = current(s).ids.filter(id => s.credited.includes(id));
        s.lastMatch = s.matched.at(-1) || null;
    }
    function flip(s, index) {
        if (!['idle', 'one'].includes(s.phase) || !Number.isInteger(index) || !s.deck[index] || s.selected.includes(index) || s.matched.includes(s.deck[index].id))
            return null;
        s.selected.push(index);
        if (s.selected.length === 1) {
            s.phase = 'one';
            return 'first';
        }
        s.moves++;
        s.totalMoves++;
        const id = s.deck[s.selected[0]].id;
        if (id === s.deck[index].id) {
            s.matched.push(id);
            if (!s.seen.includes(id))
                s.seen.push(id);
            s.lastMatch = id;
            s.phase = 'matching';
            s.remaining = 600;
            return 'match';
        }
        s.phase = 'mismatch';
        s.remaining = 1100;
        return 'mismatch';
    }
    function tick(s, ms) {
        if (!['matching', 'mismatch'].includes(s.phase) || !Number.isFinite(ms) || ms <= 0)
            return null;
        s.remaining = Math.max(0, s.remaining - ms);
        if (s.remaining)
            return null;
        if (s.phase === 'matching') {
            s.phase = 'fact';
            return 'fact';
        }
        s.selected = [];
        s.phase = 'idle';
        return 'reset';
    }
    function completedPhase(s) {
        return s.level === levels.length - 1 ? 'complete' : 'level-complete';
    }
    function continueGame(s) {
        if (s.phase !== 'fact')
            return false;
        s.selected = [];
        s.phase = s.matched.length === current(s).ids.length ? completedPhase(s) : 'idle';
        return true;
    }
    function nextLevel(s, random=Math.random) {
        if (s.phase !== 'level-complete')
            return false;
        Object.assign(s, boardState(s.level + 1, random));
        applyCredits(s);
        return true;
    }
    function restartLevel(s, random=Math.random) {
        s.totalMoves -= s.moves;
        s.credited = s.credited.filter(id => !current(s).ids.includes(id));
        s.seen = [...new Set([...levels.slice(0, s.level).flatMap(l => l.ids), ...s.credited])];
        Object.assign(s, boardState(s.level, random));
    }
    function snapshot(s) {
        return {
            version: 2,
            level: s.level,
            order: s.deck.map(c => c.key),
            matched: [...s.matched],
            moves: s.moves,
            totalMoves: s.totalMoves,
            credited: [...s.credited]
        };
    }
    function validOrder(order, ids) {
        const allowed = ids.flatMap(id => [id + '-0', id + '-1']);
        return Array.isArray(order) && order.length === allowed.length && new Set(order).size === allowed.length && order.every(k => allowed.includes(k));
    }
    function validMatches(matched, ids) {
        return Array.isArray(matched) && new Set(matched).size === matched.length && matched.every(id => ids.includes(id));
    }
    function restore(raw) {
        try {
            const saved = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (!saved || ![1, 2].includes(saved.version) || !Number.isInteger(saved.level) || !levels[saved.level])
                return create();
            const ids = saved.version === 1 ? legacyLevels[saved.level] : levels[saved.level].ids;
            if (!validOrder(saved.order, ids) || !validMatches(saved.matched, ids))
                return create();
            if (!Number.isSafeInteger(saved.moves) || saved.moves < 0 || !Number.isSafeInteger(saved.totalMoves) || saved.totalMoves < saved.moves || saved.totalMoves > 10000000)
                return create();
            if (saved.version === 1) {
                if (saved.moves < saved.matched.length)
                    return create();
                const s = create();
                s.credited = [...legacyLevels.slice(0, saved.level).flat(), ...saved.matched];
                s.seen = [...s.credited];
                s.totalMoves = saved.totalMoves;
                s.upgraded = true;
                applyCredits(s);
                if (saved.level === 0) {
                    const old = saved.order.map(key => ({
                        key,
                        id: key.slice(0, -2)
                    }));
                    s.deck = [...old, ...s.deck.filter(c => !ids.includes(c.id))];
                }
                return s;
            }
            const credited = saved.credited ?? [];
            if (!validMatches(credited, facts.map(f => f.id)) || saved.moves < saved.matched.filter(id => !credited.includes(id)).length)
                return create();
            const s = {
                ...boardState(saved.level),
                deck: saved.order.map(key => ({
                    key,
                    id: key.slice(0, -2)
                })),
                matched: [...saved.matched],
                moves: saved.moves,
                totalMoves: saved.totalMoves,
                credited: [...credited],
                seen: [...new Set([...levels.slice(0, saved.level).flatMap(l => l.ids), ...saved.matched, ...credited])],
                lastMatch: saved.matched.at(-1) || null
            };
            if (s.matched.length === ids.length)
                s.phase = completedPhase(s);
            return s;
        } catch {
            return create();
        }
    }
    return {
        source,
        facts,
        levels,
        fact,
        current,
        currentFacts,
        create,
        flip,
        tick,
        continueGame,
        nextLevel,
        restartLevel,
        snapshot,
        restore
    };
}
)();
( () => {
    const E = SocialismMatch
      , $ = id => document.getElementById(id)
      , board = $('board')
      , report = $('report-dialog')
      , reveal = $('cost-dialog')
      , saveKey = 'socialism-match-campaign-v1';
    let state = E.create()
      , parentPaused = false
      , muted = false
      , audio = null
      , lastFrame = null
      , cardNodes = [];
    try {
        muted = localStorage.getItem('socialism-flip-muted') === '1';
    } catch {}
    const tell = data => {
        if (parent !== window)
            parent.postMessage(data, location.origin);
    }
      , blocked = () => parentPaused || document.hidden || report.open || reveal.open
      , announce = text => {
        $('announcer').textContent = text;
    }
      , art = f => `<span class="art art-${f.art}" aria-hidden="true"></span>`;
    function save() {
        try {
            localStorage.setItem(saveKey, JSON.stringify(E.snapshot(state)));
        } catch {}
    }
    function sound(kind) {
        if (muted)
            return;
        try {
            audio ??= new (window.AudioContext || window.webkitAudioContext)();
            if (audio.state === 'suspended')
                audio.resume();
            const notes = kind === 'match' ? [392, 494, 587] : kind === 'miss' ? [170, 145] : kind === 'complete' ? [392, 494, 587, 784] : [330];
            notes.forEach( (f, i) => {
                const o = audio.createOscillator()
                  , g = audio.createGain()
                  , t = audio.currentTime + i * .08;
                o.type = 'sine';
                o.frequency.setValueAtTime(f, t);
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(.045, t + .012);
                g.gain.exponentialRampToValueAtTime(.001, t + .2);
                o.connect(g);
                g.connect(audio.destination);
                o.start(t);
                o.stop(t + .22);
            }
            );
        } catch {}
    }
    function updateSound() {
        const b = $('sound');
        b.textContent = muted ? 'Sound off' : 'Sound on';
        b.setAttribute('aria-label', muted ? 'Turn sound on' : 'Mute sound');
        b.setAttribute('aria-pressed', String(!muted));
        try {
            localStorage.setItem('socialism-flip-muted', muted ? '1' : '0');
        } catch {}
        tell({
            type: 'arcade:sound',
            soundOn: !muted
        });
    }
    function buildBoard() {
        const level = E.current(state);
        board.setAttribute('data-level', String(state.level));
        $('game').style.setProperty('--level-accent', level.color);
        $('level-number').textContent = 'LEVEL ' + (state.level + 1) + ' / ' + E.levels.length;
        $('level-name').textContent = level.title;
        $('level-path').innerHTML = E.levels.map( (l, i) => `<span class="${i < state.level ? 'done' : i === state.level ? 'current' : ''}" aria-label="Level ${i + 1}: ${l.title}${i < state.level ? ', completed' : i === state.level ? ', current' : ', locked'}">${i < state.level ? '✓' : String(i + 1).padStart(2, '0')}</span>`).join('');
        board.innerHTML = state.deck.map( (c, i) => {
            const f = E.fact(c.id);
            return `<button class="memory-card" data-index="${i}" style="--card-color:${f.color};--deal:${i * 22}ms" aria-label="Card ${i + 1}, face down"><span class="card-inner"><span class="card-back" aria-hidden="true"><span class="card-number">${String(i + 1).padStart(2, '0')}</span><span class="back-symbol"><i></i><b>?</b></span><span class="back-title">ESCAPE FROM<br>SOCIALISM</span></span><span class="card-front" aria-hidden="true"><span class="card-art">${art(f)}</span><span class="face-label">${f.label}</span><span class="match-badge">✓</span></span></span></button>`;
        }
        ).join('');
        cardNodes = Array.from(board.querySelectorAll('.memory-card'));
        cardNodes.forEach( (button, i) => button.addEventListener('click', () => choose(i)));
        $('pair-track').innerHTML = E.currentFacts(state).map(f => `<span id="track-${f.id}" class="pair-slot" style="--card-color:${f.color}" aria-label="${f.label}, not matched">${art(f)}<span class="slot-dot"></span></span>`).join('');
        $('progress-bar').setAttribute('aria-valuemax', String(level.ids.length));
        $('intro-note').textContent = level.ids.length + ' pairs. The cost is yours.';
    }
    function sync() {
        cardNodes.forEach( (button, i) => {
            const c = state.deck[i]
              , f = E.fact(c.id)
              , matched = state.matched.includes(c.id)
              , up = matched || state.selected.includes(i);
            button.classList.toggle('is-up', up);
            button.classList.toggle('is-matched', matched);
            button.classList.toggle('is-miss', state.phase === 'mismatch' && state.selected.includes(i));
            button.setAttribute('aria-label', `Card ${i + 1}, ${up ? f.label + (matched ? ', matched' : '') : 'face down'}`);
            button.setAttribute('aria-disabled', String(matched));
            button.querySelector('.face-label').textContent = matched ? f.value : f.label;
        }
        );
        const total = E.current(state).ids.length;
        $('pairs').textContent = state.matched.length + ' / ' + total;
        $('moves').textContent = String(state.moves);
        $('progress-fill').style.width = (state.matched.length / total * 100) + '%';
        $('progress-bar').setAttribute('aria-valuenow', String(state.matched.length));
        E.currentFacts(state).forEach(f => {
            const n = $('track-' + f.id)
              , found = state.matched.includes(f.id);
            n.classList.toggle('found', found);
            n.setAttribute('aria-label', f.label + (found ? ', matched' : ', not matched'));
        }
        );
        $('turn-hint').textContent = state.phase === 'one' ? 'Now find its matching picture.' : state.phase === 'mismatch' ? 'Different pictures. Remember them and try again.' : state.phase === 'matching' ? 'A match. Here comes the cost.' : 'Flip any two cards to find a pair.';
    }
    function choose(index) {
        if (blocked())
            return;
        const result = E.flip(state, index);
        if (!result)
            return;
        sync();
        sound(result === 'match' ? 'match' : result === 'mismatch' ? 'miss' : 'flip');
        const f = E.fact(state.deck[index].id);
        announce(result === 'first' ? f.label + '. Find its matching picture.' : result === 'match' ? f.label + ' matched.' : f.label + '. Different pictures. Try again.');
    }
    function openCost() {
        const f = E.fact(state.lastMatch)
          , count = E.current(state).ids.length;
        $('cost-art').className = 'cost-art art art-' + f.art;
        $('cost-dialog').style.setProperty('--card-color', f.color);
        $('cost-topic').textContent = f.topic;
        $('match-count').textContent = 'PAIR ' + state.matched.length + ' OF ' + count;
        $('cost-promise').textContent = f.promise;
        $('cost-policy').textContent = f.policy;
        $('cost-title').textContent = f.consequence;
        $('cost-value').textContent = f.value;
        $('cost-unit').textContent = f.unit;
        $('cost-context').textContent = f.context;
        $('cost-source').href = E.source + '#page=' + f.page;
        $('cost-source').textContent = 'CEA projection · report page ' + f.page + ' ↗';
        const label = state.matched.length === count ? (state.level === E.levels.length - 1 ? 'SEE ALL ' + E.facts.length + ' COSTS' : 'LEVEL COMPLETE') : 'KEEP MATCHING';
        $('continue').innerHTML = label + ' <span aria-hidden="true">→</span>';
        reveal.showModal();
        $('continue').focus({
            preventScroll: true
        });
        announce(f.consequence + ' ' + f.value + ' ' + f.unit + '. CEA projection. ' + f.context);
    }
    function latest() {
        const f = E.fact(state.lastMatch);
        $('latest-cost').hidden = !f;
        if (!f)
            return;
        $('latest-art').className = 'latest-art art art-' + f.art;
        $('latest-title').textContent = f.consequence;
        $('latest-value').textContent = f.value;
        $('latest-unit').textContent = f.unit;
        $('latest-context').textContent = f.context;
        $('latest-source').href = E.source + '#page=' + f.page;
    }
    function dismissCost() {
        if (parentPaused || document.hidden || !E.continueGame(state))
            return;
        reveal.close();
        sync();
        latest();
        save();
        if (state.phase === 'complete')
            finish();
        else if (state.phase === 'level-complete')
            levelFinish();
        else {
            cardNodes[state.deck.findIndex(c => !state.matched.includes(c.id))]?.focus({
                preventScroll: true
            });
            announce(state.matched.length + ' of ' + E.current(state).ids.length + ' pairs matched. Keep matching.');
        }
    }
    function levelFinish() {
        const next = E.levels[state.level + 1];
        $('play').hidden = true;
        $('ending').hidden = true;
        $('level-finish').hidden = false;
        $('cleared-title').textContent = 'Level ' + (state.level + 1) + ' complete.';
        $('cleared-stats').textContent = E.current(state).ids.length + ' pairs found in ' + state.moves + ' moves';
        $('next-number').textContent = 'UP NEXT · LEVEL ' + (state.level + 2);
        $('next-title').textContent = next.title;
        $('next-description').textContent = next.tagline;
        $('next-preview').setAttribute('data-count', String(next.ids.length));
        $('next-preview').innerHTML = next.ids.map(id => {
            const f = E.fact(id);
            return `<span class="preview-card" style="--card-color:${f.color}">${art(f)}<span>${f.label}</span></span>`;
        }
        ).join('');
        $('next-detail').textContent = next.ids.filter(id => !state.credited.includes(id)).length + ' new pairs · ' + next.ids.length * 2 + ' cards';
        $('next-level').innerHTML = 'PLAY LEVEL ' + (state.level + 2) + ' <span aria-hidden="true">→</span>';
        sound('complete');
        $('next-level').focus({
            preventScroll: true
        });
        announce('Level ' + (state.level + 1) + ' complete. Next: ' + next.title + ', ' + next.ids.filter(id => !state.credited.includes(id)).length + ' new pairs.');
    }
    function finish() {
        $('play').hidden = true;
        $('level-finish').hidden = true;
        $('ending').hidden = false;
        $('end-moves').textContent = state.totalMoves + ' total moves';
        $('consequence-list').innerHTML = E.levels.flatMap(l => l.ids).map(id => {
            const f = E.fact(id);
            return `<a class="end-card" href="${E.source}#page=${f.page}" target="_blank" rel="noopener noreferrer"><span class="end-visual">${art(f)}</span><span class="end-detail"><span class="end-topic">${f.topic}</span><strong>${f.value}</strong><span class="end-unit">${f.unit}</span><small>${f.context}</small></span><span class="end-arrow" aria-hidden="true">↗</span></a>`;
        }
        ).join('');
        sound('complete');
        $('replay').focus({
            preventScroll: true
        });
        announce('All three levels completed. ' + E.facts.length + ' pairs found in ' + state.totalMoves + ' moves.');
    }
    function showBoard() {
        lastFrame = null;
        $('play').hidden = false;
        $('level-finish').hidden = true;
        $('ending').hidden = true;
        buildBoard();
        sync();
        latest();
    }
    function restart() {
        if (blocked())
            return;
        state = E.create();
        showBoard();
        save();
        cardNodes[0].focus({
            preventScroll: true
        });
        announce('Game restarted. Level one: Your budget.');
    }
    function nextLevel() {
        if (blocked() || !E.nextLevel(state))
            return;
        showBoard();
        save();
        cardNodes[0].focus({
            preventScroll: true
        });
        announce('Level ' + (state.level + 1) + '. ' + E.current(state).title + '. Find ' + E.current(state).ids.length + ' new pairs.');
    }
    function replay() {
        if (blocked())
            return;
        state = E.create();
        showBoard();
        save();
        cardNodes[0].focus({
            preventScroll: true
        });
        announce('New campaign. Level one: Your budget.');
    }
    function frame(now) {
        const elapsed = lastFrame === null ? 0 : Math.min(80, Math.max(0, now - lastFrame));
        lastFrame = now;
        if (!blocked()) {
            const result = E.tick(state, elapsed);
            if (result === 'fact')
                openCost();
            if (result === 'reset') {
                sync();
                save();
                announce('Cards turned back. Try another pair.');
            }
        }
        requestAnimationFrame(frame);
    }
    $('continue').addEventListener('click', dismissCost);
    reveal.addEventListener('cancel', e => {
        e.preventDefault();
        dismissCost();
    }
    );
    $('replay').addEventListener('click', replay);
    $('shuffle').addEventListener('click', restart);
    $('next-level').addEventListener('click', nextLevel);
    function showReport() {
        if (parentPaused || document.hidden || reveal.open)
            return;
        report.showModal();
    }
    $('report-open').addEventListener('click', showReport);
    $('end-report').addEventListener('click', showReport);
    $('report-close').addEventListener('click', () => report.close());
    $('sound').addEventListener('click', () => {
        muted = !muted;
        updateSound();
    }
    );
    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.repeat) {
            muted = !muted;
            updateSound();
        }
        if (blocked() || !document.activeElement?.classList.contains('memory-card'))
            return;
        const i = cardNodes.indexOf(document.activeElement)
          , columns = getComputedStyle(board).gridTemplateColumns.split(' ').filter(Boolean).length
          , offsets = {
            ArrowRight: 1,
            ArrowLeft: -1,
            ArrowDown: columns,
            ArrowUp: -columns
        };
        if (e.key in offsets) {
            e.preventDefault();
            cardNodes[Math.max(0, Math.min(cardNodes.length - 1, i + offsets[e.key]))].focus({
                preventScroll: true
            });
        }
    }
    );
    window.addEventListener('message', e => {
        if (e.origin !== location.origin || e.source !== parent || e.data?.type !== 'arcade:command')
            return;
        if (e.data.action === 'pause')
            parentPaused = true;
        if (e.data.action === 'resume')
            parentPaused = false;
        if (e.data.action === 'sound') {
            muted = !muted;
            updateSound();
        }
    }
    );
    window.__arcadeGame = {
        get muted() {
            return muted;
        }
    };
    window.addEventListener('load', () => tell({
        type: 'arcade:ready',
        soundOn: !muted
    }));
    showBoard();
    updateSound();
    if (state.upgraded) {
        save();
        announce('Two new rows added to each level. Your previous matches have been kept.');
    }
    if (state.phase === 'complete')
        finish();
    else if (state.phase === 'level-complete')
        levelFinish();
    requestAnimationFrame(frame);
}
)();
//# sourceURL=raw-html-custom-scripts-js-after
