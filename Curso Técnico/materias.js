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

// Exibindo e escondendo o conteúdo dos trimestres
    const trimestre1 = document.getElementById('trimestre1')
    const trimestre2 = document.getElementById('trimestre2')

    const btnTrimestre1 = document.getElementById('btnTrimestre1')
    const btnTrimestre2 = document.getElementById('btnTrimestre2')

function ExibirTrimestre1(){
    trimestre1.style.display = 'block';
    trimestre2.style.display = 'none';
    
    btnTrimestre1.disabled = true;
    btnTrimestre2.disabled = false;
}

function ExibirTrimestre2(){
    trimestre1.style.display = 'none';
    trimestre2.style.display = 'block';
    
    btnTrimestre1.disabled = false;
    btnTrimestre2.disabled = true;
}

function ExibirTrimestre3(){
    trimestre1.style.display = 'none';
    trimestre2.style.display = 'none';
    
    btnTrimestre1.disabled = false;
    btnTrimestre2.disabled = false;
}

// Atividade
// Banco de Dados
function ModeloLogico(){
    window.location.href = 'https://docs.google.com/document/d/1SWlH7sUOA0_abBJgFgjhOsf5Zf1_-0Cnb3fyHS3qSW0/edit?usp=sharing'
}

// Modelagem de Sistemas
function TabelaRequisitos(){
    window.location,href = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLo_fD2hZkhN_4N4RaGAbyIO1GXTyWIIYh1S1CUvcv716dFJzbEhDG0kipDAwPn5E3H4fBXutZLWYc/pubhtml'
}

function Tempfy1(){
    window.location.href = 'https://www.canva.com/design/DAGlaVhtrA8/Bzg_wwPBud_oNddAk_RlaA/edit?utm_content=DAGlaVhtrA8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function PrototipagemTelas(){
    window.location.href = 'https://www.figma.com/design/uG9zOBpLyHdLRrpyMeaCOx/S.A-Tempfy?node-id=211-371&t=ixl9fIf0aCo6RNDr-1'
}