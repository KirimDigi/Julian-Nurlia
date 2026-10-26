# Panduan Menghubungkan RSVP & Ucapan ke Google Spreadsheet

Fitur formulir **Nama**, **Ucapan**, dan **Konfirmasi Kehadiran (Hadir / Tidak Hadir)** sudah selesai dibuat dan terpasang di Halaman 7. Formulir ini sudah dapat langsung digunakan dan diuji coba.

Ikuti 4 langkah mudah berikut untuk menghubungkannya ke Google Spreadsheet Anda secara gratis:

---

### Langkah 1: Buat Google Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet Anda, misalnya: `RSVP Pernikahan Julian & Nurlia`.
3. Di baris pertama (Header), Anda bisa membiarkannya kosong karena script akan otomatis membuatkan header berikut:
   - Kolom A: `Tanggal & Waktu`
   - Kolom B: `Nama`
   - Kolom C: `Konfirmasi Kehadiran`
   - Kolom D: `Ucapan`

---

### Langkah 2: Buka Apps Script
1. Di menu atas Google Sheets, klik **Ekstensi** (*Extensions*) > **Apps Script**.
2. Hapus semua kode default di dalam editor `Code.gs`.
3. Salin dan tempelkan kode berikut ke dalam `Code.gs`:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Buat header otomatis jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Tanggal & Waktu", "Nama", "Konfirmasi Kehadiran", "Ucapan"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#f4eae6").setFontColor("#790c04");
    }
    
    var timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    sheet.appendRow([timestamp, data.nama, data.kehadiran, data.ucapan]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Data berhasil disimpan!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var result = [];
    
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][1]) {
        result.push({
          timestamp: rows[i][0],
          nama: rows[i][1],
          kehadiran: rows[i][2],
          ucapan: rows[i][3]
        });
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", data: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Klik ikon **Simpan** (ikon disket atau `Ctrl + S`).

---

### Langkah 3: Deploy sebagai Web App
1. Di pojok kanan atas editor Apps Script, klik tombol biru **Terapkan** (*Deploy*) > **Penerapan Baru** (*New deployment*).
2. Di samping kiri tulisan *Pilih jenis*, klik ikon gerigi ⚙️ lalu pilih **Aplikasi web** (*Web app*).
3. Isi konfigurasi berikut:
   - **Deskripsi**: `RSVP Wedding Web App`
   - **Jalankan sebagai** (*Execute as*): **Saya** (*Me*)
   - **Yang memiliki akses** (*Who has access*): **Siapa saja** (*Anyone*) *(PENTING: pilih Anyone agar tamu undangan dapat mengirim RSVP tanpa login Google).*
4. Klik tombol **Terapkan** (*Deploy*).
5. Jika muncul permintaan izin (*Authorize access*), klik **Beri Izin** > pilih akun Google Anda > klik **Advanced** > klik **Go to Untitled project (unsafe)** > klik **Allow**.
6. Salin **URL Aplikasi Web** yang berakhiran `/exec`.

---

### Langkah 4: Masukkan URL ke Website Undangan
1. Buka file `script.js` pada baris 333:
   ```javascript
   const SPREADSHEET_ENDPOINT = '';
   ```
2. Tempelkan URL yang Anda salin di dalam tanda kutip tersebut, contoh:
   ```javascript
   const SPREADSHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
3. Simpan file `script.js`. Selesai!

Setiap kali tamu mengisi Nama, Ucapan, memilih Hadir/Tidak Hadir, lalu menekan **Kirim**:
- Data akan otomatis tercatat di baris baru Google Spreadsheet Anda secara *real-time*.
- Tamu dapat langsung melihat ucapan mereka di popup modal saat menekan **Tampilkan Ucapan**.
