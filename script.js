let musicPlaying = false;
let isOpened = false;

const TOTAL_PAGES = 8;
let currentPage = 0;
let isAnimating = false;

// Navigasi perpindahan halaman horizontal dengan efek transisi & animasi aktif
function goToPage(index) {
  // Jika undangan belum dibuka, jangan izinkan pindah dari cover
  if (!isOpened && index > 0) {
    return;
  }

  currentPage = Math.max(0, Math.min(TOTAL_PAGES - 1, index));
  const wrapper = document.getElementById('page-wrapper');
  if (wrapper) {
    // Geser strictly ke samping (horizontal slide)
    wrapper.style.transform = `translateX(-${currentPage * 12.5}%)`;
  }

  // Beri kelas active pada halaman yang sedang tampil untuk memicu animasi masuk
  const pages = document.querySelectorAll('.page');
  pages.forEach((page, idx) => {
    if (idx === currentPage) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // Perbarui visibilitas tombol panah navigasi
  const prev = document.querySelector('.nav-prev');
  const next = document.querySelector('.nav-next');
  if (!isOpened) {
    // Sebelum buka undangan: sembunyikan semua tombol panah
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
  } else {
    // Setelah buka undangan: tampilkan sesuai posisi halaman
    if (prev) {
      prev.style.display = currentPage === 0 ? 'none' : 'flex';
    }
    if (next) {
      next.style.display = currentPage === TOTAL_PAGES - 1 ? 'none' : 'flex';
    }
  }

  // Naikkan tombol musik jika di halaman terakhir agar tidak menutupi tulisan footer
  const musicBtn = document.getElementById('musicControl');
  if (musicBtn) {
    musicBtn.classList.toggle('on-footer', currentPage === TOTAL_PAGES - 1);
  }
}

function nextPage() {
  if (!isOpened) return;
  if (currentPage < TOTAL_PAGES - 1) {
    goToPage(currentPage + 1);
  }
}

function prevPage() {
  if (!isOpened) return;
  if (currentPage > 0) {
    goToPage(currentPage - 1);
  }
}

// Kontrol Musik Latar
function toggleMusic() {
  const a = document.getElementById('bgMusic');
  const ic = document.getElementById('musicIcon');
  const btn = document.getElementById('musicControl');
  if (!a) return;

  if (musicPlaying) {
    a.pause();
    if (ic) ic.textContent = '🎵';
    if (btn) btn.classList.remove('playing');
  } else {
    a.play().then(() => {
      if (ic) ic.textContent = '🔊';
      if (btn) btn.classList.add('playing');
    }).catch(() => {
      // Browser autoplay policy
    });
  }
  musicPlaying = !musicPlaying;
}

// Buka Undangan (dari Halaman Cover ke Halaman 2)
function openInvitation() {
  isOpened = true;

  // 1. Putar musik secara otomatis
  const a = document.getElementById('bgMusic');
  const ic = document.getElementById('musicIcon');
  const btn = document.getElementById('musicControl');
  if (a) {
    a.play().then(() => {
      musicPlaying = true;
      if (ic) ic.textContent = '🔊';
      if (btn) btn.classList.add('playing');
    }).catch((err) => {
      console.log('Audio autoplay prevented:', err);
    });
  }

  // 2. Munculkan tombol kontrol musik
  if (btn) {
    btn.classList.add('visible');
  }

  // 3. Pindah dari Cover ke Halaman 2
  goToPage(1);
}

// Hitungan Mundur Live untuk Halaman 8 (Target: 08 November 2026)
function initCountdown() {
  const targetDate = new Date('2026-11-08T08:00:00+07:00').getTime();
  const dayEl = document.getElementById('cdDay');
  const hourEl = document.getElementById('cdHour');
  const minEl = document.getElementById('cdMin');
  const secEl = document.getElementById('cdSec');

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (dayEl) dayEl.textContent = '00';
      if (hourEl) hourEl.textContent = '00';
      if (minEl) minEl.textContent = '00';
      if (secEl) secEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');
    if (dayEl) dayEl.textContent = pad(days);
    if (hourEl) hourEl.textContent = pad(hours);
    if (minEl) minEl.textContent = pad(mins);
    if (secEl) secEl.textContent = pad(secs);
  }

  update();
  setInterval(update, 1000);
}

// Efek Ambient Sparkles Berkilau (Membuat Suasana Lebih Hidup)
function initSparkles() {
  const container = document.getElementById('ambientSparkles');
  if (!container) return;

  const count = 16;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = Math.random() * 5 + 3; // 3px - 8px
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDuration = `${Math.random() * 8 + 6}s`; // 6s - 14s
    s.style.animationDelay = `${Math.random() * 6}s`;
    s.style.opacity = (Math.random() * 0.6 + 0.3).toFixed(2);
    container.appendChild(s);
  }
}

// Efek Guguran Kelopak Bunga Mawar Lembut (Menjadikan Latar Belakang Hidup & Anggun)
function initPetals() {
  const container = document.getElementById('ambientPetals');
  if (!container) return;

  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const w = Math.random() * 8 + 10; // 10px - 18px
    const h = w * 1.35;
    p.style.width = `${w}px`;
    p.style.height = `${h}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 7 + 8}s`; // 8s - 15s
    p.style.animationDelay = `${Math.random() * 7}s`;
    p.style.opacity = (Math.random() * 0.45 + 0.45).toFixed(2);
    container.appendChild(p);
  }
}

// Navigasi Mouse Wheel & Touch / Gesture Swipe (Strictly Horizontal Slide)
(function initNavigationGestures() {
  const THRESHOLD = 40;
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let wheelTimeout = null;

  function isInteractive(el) {
    return el && el.closest && el.closest('button, a, input, textarea, select, .ucapan-modal-content');
  }

  // Pointer / Touch Swipe
  window.addEventListener('pointerdown', (e) => {
    if (!isOpened) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (isInteractive(e.target)) return;
    startX = e.clientX;
    startY = e.clientY;
    tracking = true;
  }, { passive: true });

  window.addEventListener('pointerup', (e) => {
    if (!isOpened) return;
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Deteksi swipe horizontal maupun vertikal dan arahkan perpindahan ke samping (horizontal)
    if (Math.abs(dx) > THRESHOLD || Math.abs(dy) > THRESHOLD) {
      if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx < 0) nextPage();
        else prevPage();
      } else {
        // Pada halaman terakhir (page 8 yang memiliki scroll footer), biarkan scroll vertikal browser berjalan normal
        if (currentPage === TOTAL_PAGES - 1) {
          return;
        }
        if (dy < 0) nextPage();
        else prevPage();
      }
    }
  }, { passive: true });

  window.addEventListener('pointercancel', () => {
    tracking = false;
  }, { passive: true });

  // Mouse wheel scroll: Ubah scroll wheel menjadi pergeseran halaman horizontal dengan debounce
  window.addEventListener('wheel', (e) => {
    if (!isOpened) return;
    if (isAnimating) return;
    if (isInteractive(e.target)) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > 20) {
      isAnimating = true;
      if (delta > 0) {
        nextPage();
      } else {
        prevPage();
      }
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isAnimating = false;
      }, 650);
    }
  }, { passive: true });

  // Keyboard navigation (ArrowLeft, ArrowRight, PageUp, PageDown)
  window.addEventListener('keydown', (e) => {
    if (!isOpened) return;

    // Jangan lakukan navigasi slide jika pengguna sedang mengetik di form (input / textarea / select)
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      nextPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevPage();
    }
  });
})();

// DOM Ready Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initSparkles();
  initPetals();
  goToPage(0);
});

// Fallback jika DOMContentLoaded sudah lewat
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initCountdown();
  initSparkles();
  initPetals();
  goToPage(0);
}

// =========================================================
// FITUR SALIN NO. REKENING BANK & TOAST NOTIFIKASI
// =========================================================
let copyToastTimer = null;

function showCopyToast(msg) {
  const toast = document.getElementById('copyToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(copyToastTimer);
  copyToastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function copyRekening(accountNumber, btn) {
  if (window.event) {
    window.event.stopPropagation();
  }

  const onCopySuccess = () => {
    if (btn) {
      btn.classList.add('copied');
      const originalContent = btn.innerHTML;
      btn.innerHTML = `
        <svg class="copy-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="btn-copy-text">Tersalin!</span>
      `;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalContent;
      }, 2200);
    }
    showCopyToast(`Nomor rekening ${accountNumber} berhasil disalin!`);
  };

  // Modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(accountNumber)
      .then(onCopySuccess)
      .catch(() => {
        fallbackCopyText(accountNumber, onCopySuccess);
      });
  } else {
    fallbackCopyText(accountNumber, onCopySuccess);
  }
}

function fallbackCopyText(text, callback) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  textarea.setAttribute('readonly', '');
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful && callback) {
      callback();
    }
  } catch (err) {
    console.error('Fallback copy error:', err);
    // Masih tampilkan toast agar pengguna tahu
    if (callback) callback();
  }
  document.body.removeChild(textarea);
}

// =========================================================
// GOOGLE SPREADSHEET RSVP & UCAPAN INTEGRATION
// =========================================================
// Tempel URL Web App dari Google Apps Script Anda di dalam tanda kutip berikut:
const SPREADSHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbygIsyepvYhFAOhRa01-morGAU3bG43Az5lORHr-HNO1rGCIwF1JZLKGfRLxVYW3zgf/exec';

const STORAGE_KEY_RSVP = 'julian_nurlia_rsvp_list';

function getLocalUcapanList() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_RSVP);
    if (data) return JSON.parse(data);
  } catch (e) { }
  return [
    {
      nama: 'Keluarga & Sahabat',
      kehadiran: 'Hadir',
      ucapan: 'Selamat menempuh hidup baru untuk Julian & Nurlia. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
      timestamp: 'Baru saja'
    }
  ];
}

function saveLocalUcapan(item) {
  try {
    const list = getLocalUcapanList();
    list.unshift(item);
    localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(list));
  } catch (e) { }
}

async function submitRsvp(e) {
  if (e) e.preventDefault();

  const namaInput = document.getElementById('rsvpNama');
  const ucapanInput = document.getElementById('rsvpUcapan');
  const kehadiranSelect = document.getElementById('rsvpKehadiran');
  const submitBtn = document.getElementById('btnRsvpKirim');

  const nama = namaInput ? namaInput.value.trim() : '';
  const ucapan = ucapanInput ? ucapanInput.value.trim() : '';
  const kehadiran = kehadiranSelect ? kehadiranSelect.value : '';

  if (!nama || !ucapan || !kehadiran) {
    showCopyToast('Mohon lengkapi Nama, Ucapan, dan Konfirmasi Kehadiran.');
    return;
  }

  // Visual feedback tombol
  const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Kirim';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-text">Mengirim...</span>';
  }

  const now = new Date();
  const timeFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' +
    now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const payload = {
    nama: nama,
    kehadiran: kehadiran,
    ucapan: ucapan,
    timestamp: timeFormatted
  };

  // Simpan secara lokal agar langsung tampil seketika
  saveLocalUcapan(payload);

  // Jika URL Google Apps Script sudah diisi, kirim ke Google Sheets
  if (SPREADSHEET_ENDPOINT && SPREADSHEET_ENDPOINT.trim() !== '') {
    try {
      await fetch(SPREADSHEET_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Sinkronisasi ke Google Spreadsheet tertunda:', err);
    }
  }

  // Reset form
  if (namaInput) namaInput.value = '';
  if (ucapanInput) ucapanInput.value = '';
  if (kehadiranSelect) kehadiranSelect.value = '';

  if (submitBtn) {
    submitBtn.innerHTML = '<span class="btn-text">✓ Terkirim</span>';
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }, 2000);
  }

  showCopyToast('Terima kasih, konfirmasi & ucapan Anda telah tersimpan!');

  // Buka popup ucapan otomatis
  setTimeout(() => {
    openUcapanModal();
  }, 800);
}

// Buka Modal Ucapan
async function openUcapanModal() {
  const modal = document.getElementById('ucapanModalOverlay');
  const container = document.getElementById('ucapanListContainer');
  if (!modal || !container) return;

  container.innerHTML = '<div class="ucapan-empty-state">Memuat ucapan...</div>';
  modal.classList.add('open');

  let list = getLocalUcapanList();

  // Jika ada SPREADSHEET_ENDPOINT, ambil data terbaru dari Google Sheets
  if (SPREADSHEET_ENDPOINT && SPREADSHEET_ENDPOINT.trim() !== '') {
    try {
      const res = await fetch(SPREADSHEET_ENDPOINT);
      const json = await res.json();
      if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
        list = json.data.reverse();
      }
    } catch (err) {
      // Gunakan local list jika fetch belum selesai
    }
  }

  renderUcapanList(list);
}

function renderUcapanList(list) {
  const container = document.getElementById('ucapanListContainer');
  const countHadirEl = document.getElementById('statCountHadir');
  const countTidakHadirEl = document.getElementById('statCountTidakHadir');

  let totalHadir = 0;
  let totalTidakHadir = 0;

  if (Array.isArray(list)) {
    list.forEach(item => {
      const isHadir = (item.kehadiran || '').toLowerCase().includes('hadir') && !(item.kehadiran || '').toLowerCase().includes('tidak');
      if (isHadir) {
        totalHadir++;
      } else {
        totalTidakHadir++;
      }
    });
  }

  if (countHadirEl) countHadirEl.textContent = totalHadir;
  if (countTidakHadirEl) countTidakHadirEl.textContent = totalTidakHadir;

  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = '<div class="ucapan-empty-state">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</div>';
    return;
  }

  container.innerHTML = list.map(item => {
    const isHadir = (item.kehadiran || '').toLowerCase().includes('hadir') && !(item.kehadiran || '').toLowerCase().includes('tidak');
    const badgeClass = isHadir ? 'badge-hadir' : 'badge-tidak-hadir';
    const badgeText = item.kehadiran || (isHadir ? 'Hadir' : 'Tidak Hadir');

    const safeNama = escapeHtml(item.nama || 'Tamu Undangan');
    const safeUcapan = escapeHtml(item.ucapan || '');
    const safeTime = escapeHtml(item.timestamp || '');

    return `
      <div class="ucapan-card">
        <div class="ucapan-card-header">
          <span class="ucapan-sender-name">${safeNama}</span>
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        <p class="ucapan-message">${safeUcapan}</p>
        <span class="ucapan-time">${safeTime}</span>
      </div>
    `;
  }).join('');
}

function closeUcapanModal(e) {
  if (e && e.target && e.target !== e.currentTarget && !e.target.classList.contains('btn-close-modal')) {
    return;
  }
  const modal = document.getElementById('ucapanModalOverlay');
  if (modal) {
    modal.classList.remove('open');
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Lightbox Interaktif untuk Galeri Foto (Halaman 6)
function openPhotoLightbox(src) {
  let modal = document.getElementById('photoLightboxModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'photoLightboxModal';
    modal.className = 'photo-lightbox-modal';
    modal.innerHTML = `
      <div class="photo-lightbox-backdrop" onclick="closePhotoLightbox()"></div>
      <div class="photo-lightbox-content">
        <button type="button" class="photo-lightbox-close" onclick="closePhotoLightbox()" aria-label="Tutup Preview">&times;</button>
        <img id="lightboxImg" src="" alt="Foto Galeri">
      </div>
    `;
    document.body.appendChild(modal);
  }
  const img = document.getElementById('lightboxImg');
  if (img) img.src = src;
  modal.classList.add('show');
}

function closePhotoLightbox() {
  const modal = document.getElementById('photoLightboxModal');
  if (modal) {
    modal.classList.remove('show');
  }
}



