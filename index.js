function Portfolio23(){
    window.location.href = "https://www.canva.com/design/DAGlIHoU-Cc/eaUXCy7COgy8FqYXw4lOjA/edit?utm_content=DAGlIHoU-Cc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton";
}

function Portfolio24(){
    window.location.href = "https://sites.google.com/estudante.sesisenai.org.br/portfolio-rafaelvillela/in%C3%ADcio";
}

function VerCurriculo(){
    window.location.href = 'https://www.canva.com/design/DAGlF5BD7LM/0TP3UtpZfNLJTl8XF_AH4A/edit?utm_content=DAGlF5BD7LM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
}

const ModalManager = (function(){
    let active = null; 

    function show(modal, trigger){
        if(!modal || !trigger) return;
        modal.style.display = 'block';
        modal.classList.remove('hide');
        modal.classList.add('show');

        const rect = trigger.getBoundingClientRect();
        const minWidth = Math.max(rect.width, 200);
        modal.style.minWidth = minWidth + 'px';

        let left = rect.left;
        const viewportPadding = 8;
        if(left < viewportPadding) left = viewportPadding;
        if(left + minWidth > window.innerWidth - viewportPadding){
            left = window.innerWidth - minWidth - viewportPadding;
        }
        const top = rect.bottom + 6;
        modal.style.left = left + 'px';
        modal.style.top = top + 'px';

        function outsideClickHandler(e){
            if(!modal.contains(e.target) && !trigger.contains(e.target)){
                hide(modal);
            }
        }

        function escHandler(e){ if(e.key === 'Escape') hide(modal); }

        function resizeHandler(){
            const r = trigger.getBoundingClientRect();
            const mw = Math.max(r.width, 200);
            let l = r.left;
            const pad = 8;
            if(l < pad) l = pad;
            if(l + mw > window.innerWidth - pad) l = window.innerWidth - mw - pad;
            modal.style.left = l + 'px';
            modal.style.top = (r.bottom + 6) + 'px';
            modal.style.minWidth = mw + 'px';
        }

        active = {
            modal,
            handlers: { outsideClickHandler, escHandler, resizeHandler },
            timer: null
        };

        setTimeout(()=>{
            document.addEventListener('click', outsideClickHandler);
            document.addEventListener('keydown', escHandler);
            window.addEventListener('resize', resizeHandler);
        }, 0);
    }

    function hide(modal){
        if(!modal || !active || active.modal !== modal) return;
        const { outsideClickHandler, escHandler, resizeHandler } = active.handlers;
        modal.classList.remove('show');
        modal.classList.add('hide');
        clearTimeout(active.timer);
        active.timer = setTimeout(()=>{
            modal.classList.remove('hide');
            modal.style.display = 'none';
            document.removeEventListener('click', outsideClickHandler);
            document.removeEventListener('keydown', escHandler);
            window.removeEventListener('resize', resizeHandler);
            active = null;
        }, 260);
    }

    function forceHideActive(){
        if(!active) return;
        try{
            const { modal, handlers, timer } = active;
            if(handlers){
                document.removeEventListener('click', handlers.outsideClickHandler);
                document.removeEventListener('keydown', handlers.escHandler);
                window.removeEventListener('resize', handlers.resizeHandler);
            }
            clearTimeout(active.timer);
            modal.classList.remove('show','hide');
            modal.style.display = 'none';
        }catch(e){ /* ignore */ }
        active = null;
    }

    return {
        toggle(modalSelector, triggerElem){
            const modal = document.querySelector(modalSelector);
            if(!modal || !triggerElem) return;
            if(active && active.modal === modal){
                hide(modal);
                return;
            }

            if(active && active.modal !== modal){
                forceHideActive();
            }

            show(modal, triggerElem);
        }
    };
})();

window.ModalEM = function(){
    const trigger = document.getElementById('ensinoMedio') || document.querySelector('header a:nth-child(2)');
    ModalManager.toggle('.modalEM', trigger);
};

window.ModalTec = function(){
    const trigger = document.getElementById('cursoTecnico') || document.querySelector('header a:nth-child(1)');
    ModalManager.toggle('.modalTec', trigger);
};

// Fazendo a carta de apresentação e as ferramentas aparecerem e desaparecerem
const cartaSM = document.getElementById('cartaSM');
const ferramentas = document.getElementById('ferramentas');
const botaoOlho = document.getElementById('botaoOlho');

const toggle = () => {
    cartaSM.classList.toggle('esconder');
    ferramentas.classList.toggle('esconder');
}

[botaoOlho].forEach((el) => {
  el.addEventListener("click", () => toggle());
});