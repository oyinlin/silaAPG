/* ================================
   JAVASCRIPT LANJUTAN — SILA
   DOM, Event Handling, CRUD, localStorage
   ================================ */

// ════════════════════════════════
// DATA LAYER (localStorage)
// localStorage adalah penyimpanan data di browser
// Data tidak hilang meskipun: halaman di-refresh, browser ditutup
// yang bertahan meskipun halaman ditutup/refresh.
// Data disimpan sebagai string JSON.
// Alur: Array → JSON → localStorage
// ════════════════════════════════

// 1. membaca data dari local storage dan mengkonversi dari json ke array
function getData(){
   const raw = localStorage.getItem('sila_data');
   // jika data ada , parse json --> array ; jika tidak ada kembali ke array kosong
   return raw ? JSON.parse(raw) : [];
}

// 2. menyimpan data ke local storage (array --> json)
function saveData(){
   localStorage.setItem('sila_data', JSON.stringify(data));
}

// 3. format tanggal (dd-mm-yyy --> 04 Juni 2026)
function formatTanggal (dataStr){
   const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
   const d = new Date(dataStr);
   return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

// 4. FORM DATA HANDLING
// Menangani form data pengajuan: Mode tabah(create), dan mode edit(update), berdasarkan parameter URL
// Tugas form: Menggumpulkan semua input --> validasi --> create baru --> update data --> simpan ke localStorage

function initform(){
   const form = document.getElementById('formPengajuan');
   if (!form) return; //jika halaman tidak ada form maka, keluar
   // deteksi mode edit atau tidak?
   // jika parameter URL edit ditemukan , maka data lama di tampilkan ,
   //  jika tidak maka di tampilkan mode tambah(create)
   const editId = urlParams.get('edit');
   let editMode = false;

   if (editId){
      // cari item yang akan di edit berdasarkan ID
      const data = getData();
      const itemToEdit = data.find(function(item){
      return item.id == editId;
      });
      // edit data
      if (itemToEdit){
         editMode = true; // mode edit aktif
         // isi field form dengan data yang ada (pre-fill)
         document.getElementById('nama').value = itemToEdit.nama || '';
         document.getElementById('nim').value = itemToEdit.nim || '';
         const prodiEl = document.getElementById('prodi');
         if (prodiEl && itemToEdit.prodi) prodiEl.value = itemToEdit.prodi || ''
         const layananEl = document.getElementById('layanan');
         if (layananEl && itemToEdit.layanan) layananEl.value = itemToEdit.layanan || ''
         document.getElementById('tanggal').value = itemToEdit.tanggal || ''
         document.getElementById('keterangan').value = itemToEdit.keterangan || ''

         // ubah teks tombol jadi --> simpan perubahan 
         const btnSubmit = form.querySelector('button[type="sumbit"]');
         if (btnSubmit) btnSubmit.innerHTML= '🖋️ simpan perubahan'
      }
   }
   // 5.submit (create)
   // menggunakan event listener untuk submit form (event nya 'submit')
   // sebelum submit , form akan melalkukan validasi 
   // saat ajukan tombol di klik: 1. ambil data dari form , 2.validasi data , 
   // 3. simpan data , 4. redicect ke halaman riwayat
   // struktur.addEventListener('event' , fuction)
   form.addEventListener('submit' , function(e){
      // cegah form reload halaman 
      e.preventDefault9();
      // 1. ambil nilai semua field dengan menggunakan .value
      // trim --> untuk menghapus kharakter ga pnting
      const nama = document.getElementById('nama').value.trim();
      const nim = document.getElementById('nim').value.trim();
      const prodi = document.getElementById('prodi').value();
      const layanan = document.getElementById('layanan').value();
      const tanggal = document.getElementById('tanggal').value();
      const keterangan = document.getElementById('keterangan').value.trim();
      const errorEl = document.getElementById('formError').value.trim();

      errorEl.teksContent = ''; //reset pesan error sebelum validasi
      
      // validasi form (semua data wajib isi)
      if (!nama || !nim || !prodi || !layanan || !tanggal){
         errorEl.teksContent = '❌ semua field harus terisi!'
         return; // hentikkan eksekusi juka tidak valid 
      }

      // nim harus 8 kharakter
      if (nim.lenght !==8 || isNaN(nim)){
         errorEl.teksContent = '❌ NIM harus terdiri dari 8 digit angka!';
         return;
      }

      // ---------- CRUD ---------- (create dan update)
      const data = getData();
      // mode edit
      if(editMode){
         for (let i = 0; i< data.lenght; 1++){
            // jka ide saa dengan edit id maka mode edit (timpa data)
            if(data[i].id == editId){
               data[i].nama = nama;
               data[i].nim = nim;
               data[i].prodi = prodi;
               data[i].layanan = layanan;
               data[i].tanggal = tanggal;
               data[i].keterangan = keterangan
               break;
            }
         }
      }
      else{
         // crate : buat ata objek yang baru
         const item ={
            id: Date.now(), // timestap dalam milidetik sebagai ID
            nama: nama,
            nim: nim,
            prodi: prodi,
            layanan: layanan,
            tanggal: tanggal,
            keterangan: keterangan,  
         };
         data.push(item); // tambah data ke array 
         console.log(data); // tampilkan di console log 
      }
      saveData(data); // simpan ke localStorage
      form.reset();
      errorEl.teksContent= ''; // kosongkan pesan eeror
      alert(editId ? '💯 Peubahan Berhasil Disimpan!!' : '💯 Pengajuan Berhasil Disimpan')
      window.location.href = 'riwayat.html' // pidah halaman
   });

}
// INIT (initialisasi)
document.addEventListener('DOMContentLoaded', function () {
    initform();
})
