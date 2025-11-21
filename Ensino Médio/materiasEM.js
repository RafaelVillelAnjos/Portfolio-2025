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
    const trimestre3 = document.getElementById('trimestre3')

    const btnTrimestre1 = document.getElementById('btnTrimestre1')
    const btnTrimestre2 = document.getElementById('btnTrimestre2')
    const btnTrimestre3 = document.getElementById('btnTrimestre3')

    function ExibirTrimestre1(){
    trimestre1.style.display = 'block';
    trimestre2.style.display = 'none';
    trimestre3.style.display = 'none';
    
    btnTrimestre1.disabled = true;
    btnTrimestre2.disabled = false;
    btnTrimestre3.disabled = false;
}

    function ExibirTrimestre2(){
    trimestre1.style.display = 'none';
    trimestre2.style.display = 'block';
    trimestre3.style.display = 'none';
    
    btnTrimestre1.disabled = false;
    btnTrimestre2.disabled = true;
    btnTrimestre3.disabled = false;
}

    function ExibirTrimestre3(){
    trimestre1.style.display = 'none';
    trimestre2.style.display = 'none';
    trimestre3.style.display = 'block';
    
    btnTrimestre1.disabled = false;
    btnTrimestre2.disabled = false;
    btnTrimestre3.disabled = true;
}

// reedirecionando para as atividades
// Matemática
function QuebrandoBanca(){
    window.location.href = 'https://docs.google.com/document/d/e/2PACX-1vT9X8kbEfXfzYS-6DpVFjHg1froWId_WEYy5VK67no0l6v4r_DgNh4RA5QGN4a4H2gzTSml-1zkxGYQ/pub'
}

function CriandoBanca(){
    window.location.href = 'https://www.canva.com/design/DAGlCk3PBW4/Cyhpj1rDVLvW05e7etfLXw/view?embed'
}

function BoloCaneca(){
    window.location.href = 'https://www.canva.com/design/DAG5Rtynh4E/mZuqrSC5FDgQKg8za9CCTg/view?embed"'
}

// Humanas
function SeculoChina(){
    window.localStorage.href = "https://padlet.com/rafael_v_anjos/o-s-culo-da-humilha-o-chinesa-1839-1949-y8miux35qnplpkjg"
}

function ConflitosTaiwan(){
    window.location.href = 'https://www.canva.com/design/DAGlU3lMtac/q0pZkh7NLvGIyL4aO-7h-A/edit?utm_content=DAGlU3lMtac&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function JornaGuerra(){
    window.location.href = 'https://www.canva.com/design/DAGoUaYhzXY/nAqCCBgxEaqJyd5UJaOPZw/view?embed'
}

function Filipinas(){
    window.location.href = 'https://www.canva.com/design/DAGxIWCIXAY/S6W3sSLiFHa1n2bjBSBcpQ/edit?utm_content=DAGxIWCIXAY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function RepVelha(){
    window.location.href = 'https://www.canva.com/design/DAGxIWhF55E/7gP1VPH9kaq4c8ivmC7tAQ/edit?utm_content=DAGxIWhF55E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function Ipes(){
    window.location.href = 'https://www.canva.com/design/DAG3Fh4B788/Zvnp6M0WgC7egqKFIaOZZQ/edit?utm_content=DAG3Fh4B788&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function GuerraFria(){
    window.location.href = 'https://www.canva.com/design/DAG0EphCvDM/c6qeIvMVLYAwA4n3dJ_pPw/edit?utm_content=DAG0EphCvDM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function BrasilGuerra(){
    window.location.href = 'https://febsegundaguerra.netlify.app/'
}

// Linguagens
function RevistaLiteraria(){
    window.location.href = 'https://www.canva.com/design/DAGkvmh6ikk/Y2wxtCAwQshYrZG-Ow99sw/edit?utm_content=DAGkvmh6ikk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
}

function Conto(){
    window.location.href = 'https://docs.google.com/document/d/1xfbEPjC6dnJ2R7EXBcQloTcfP3yQ45bVdbMSeizcm1o/edit?usp=sharing'
}

function SiteEnem(){
    window.location.href = 'https://sites.google.com/estudante.sesisenai.org.br/repertorioenem/home'
}

function ArteConsome(){
    window.location.href = 'https://docs.google.com/document/d/1Wd8dP0pZh_XfroFvMZtSlUZAKx2AfnQG47lq-AWxOZM/edit?usp=sharing'
}

function VideoSalim(){
    window.location.href = 'https://youtube.com/shorts/MGZUoUkaqPE?si=1jOYBoBtHc0JU1GI' 
}

