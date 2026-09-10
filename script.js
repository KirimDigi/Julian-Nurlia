let musicPlaying = false;

function toggleMusic() {
  const a = document.getElementById('bgMusic');
  const ic = document.getElementById('musicIcon');
  const btn = document.getElementById('musicControl');
  if (musicPlaying) {
    a.pause();
    ic.textContent = '🎵';
    btn.classList.remove('playing');
  } else {
    a.play().catch(() => {
      // diam jika file music.mp3 belum ada
    });
    ic.textContent = '🔊';
    btn.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
}

function openInvitation() {
  document.documentElement.classList.add('scrollable');
  document.getElementById('page1').classList.add('opened');
  setTimeout(() => {
    const target = document.getElementById('page2');
    if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }, 200);
  setTimeout(() => {
    const a = document.getElementById('bgMusic');
    const ic = document.getElementById('musicIcon');
    const btn = document.getElementById('musicControl');
    a.play().then(() => {
      musicPlaying = true;
      ic.textContent = '🔊';
      btn.classList.add('playing');
    }).catch(() => {});
  }, 400);
}

// === HITUNG MUNDUR — ganti tanggal di bawah untuk menyesuaikan ===
const WEDDING_DATE = new Date("2026-11-08T09:00:00+07:00"); // sesuai Akad: Minggu, 8 November 2026 09.00 WIB

function updateCountdown() {
  const d = WEDDING_DATE - new Date();
  const dayEl = document.getElementById('cdDay');
  if (!dayEl) return;
  if (d <= 0) {
    dayEl.textContent = "00";
    document.getElementById('cdHour').textContent = "00";
    document.getElementById('cdMin').textContent = "00";
    document.getElementById('cdSec').textContent = "00";
    return;
  }
  const days = Math.floor(d / 86400000);
  const hrs = Math.floor((d % 86400000) / 3600000);
  const mins = Math.floor((d % 3600000) / 60000);
  const secs = Math.floor((d % 60000) / 1000);
  dayEl.textContent = String(days).padStart(2, '0');
  document.getElementById('cdHour').textContent = String(hrs).padStart(2, '0');
  document.getElementById('cdMin').textContent = String(mins).padStart(2, '0');
  document.getElementById('cdSec').textContent = String(secs).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();


