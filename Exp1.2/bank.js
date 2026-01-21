(function(){
  const balanceEl = document.getElementById('balance');
  const amountInput = document.getElementById('amount');
  const depositBtn = document.getElementById('depositBtn');
  const withdrawBtn = document.getElementById('withdrawBtn');
  const feedback = document.getElementById('feedback');
  const txList = document.getElementById('txList');

  let balance = 0;

  function formatCurrency(v){
    return v.toLocaleString(undefined,{style:'currency',currency:'USD',minimumFractionDigits:2});
  }

  function setBalance(v){
    balance = Math.round(v*100)/100;
    balanceEl.textContent = formatCurrency(balance);
  }

  function addTx(type, amt){
    const li = document.createElement('li');
    li.className = type === 'credit' ? 'credit' : 'debit';
    const left = document.createElement('span');
    left.textContent = type === 'credit' ? 'Deposit' : 'Withdraw';
    const right = document.createElement('span');
    right.textContent = (type === 'credit' ? '+' : '-') + formatCurrency(amt);
    li.appendChild(left);
    li.appendChild(right);
    txList.insertBefore(li, txList.firstChild);
  }

  function showFeedback(msg, isError){
    feedback.textContent = msg;
    feedback.style.color = isError ? getComputedStyle(document.documentElement).getPropertyValue('--danger') || '#ef4444' : 'green';
    setTimeout(()=>{ if(feedback.textContent === msg) feedback.textContent = ''; },3500);
  }

  function parseAmount(){
    const v = parseFloat(amountInput.value);
    if(Number.isNaN(v)) return NaN;
    return Math.round(v*100)/100;
  }

  depositBtn.addEventListener('click', ()=>{
    const amt = parseAmount();
    if(!isFinite(amt) || amt <= 0){ showFeedback('Enter a positive amount.', true); return; }
    setBalance(balance + amt);
    addTx('credit', amt);
    showFeedback('Deposit successful.', false);
    amountInput.value = '';
  });

  withdrawBtn.addEventListener('click', ()=>{
    const amt = parseAmount();
    if(!isFinite(amt) || amt <= 0){ showFeedback('Enter a positive amount.', true); return; }
    if(amt > balance){ showFeedback('Insufficient funds.', true); return; }
    setBalance(balance - amt);
    addTx('debit', amt);
    showFeedback('Withdrawal successful.', false);
    amountInput.value = '';
  });

  // initialize
  setBalance(0);
  // simple keyboard support: Enter on input deposits
  amountInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      depositBtn.click();
    }
  });

  // Theme management: supports light/dark and persists choice in localStorage
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
      themeToggle.setAttribute('aria-pressed','true');
      themeToggle.querySelector('.dot').style.background = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed','false');
      themeToggle.querySelector('.dot').style.background = getComputedStyle(document.documentElement).getPropertyValue('--muted');
    }
  }

  function preferredTheme(){
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  
  (function initTheme(){
    if(!themeToggle) return;
    const saved = localStorage.getItem('theme');
    const theme = saved === 'dark' || saved === 'light' ? saved : preferredTheme();
    applyTheme(theme);
    themeToggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  })();
})();
