// M 12 - JS DASAR 
// variabel , fungsi , validasi sederhana

// variabel const(konstatnta) untuk layanan (array menyimpan daftar kode layanan)
const layanan = ['SKA' , 'CAK ' , 'PDA' , 'TNM']

// fungsi format  tanggal 
// format : dd/mm/yyyy(04/06/2026) --> 04 juni 2026
// gunakan objek tambaha dari JS
function formatTanggal (dateStr) {
    // formating
    const bulan = ['jan','feb','Mar','Apr','Mei','Jun','Jul','Agu','Sept','Okt','Nov','Des']
    const d = new Date(dateStr); // deklarasi new date obj
    
    // format (tanggal bulan tahun)
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear()
}

// fungsi validasi form
function validasiForm(){
    // 1. get value setiap inputan (inputan yang wajib di isi)
    const namaLengkap = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const prodi = document.getElementById('prodi').value;
    const layanan = document.getElementById('layanan').value;
    const tanggal = document.getElementById('tanggal').value;
    // alert(namaLengkap , nim , prodi , layanan , tanggal)
    // console.log(namaLengkap)
    // cara liat hsil pakai alert (ada pop up ) atau consolg (dari tab conslog )

    // 2. validasi --> cek field yang kosong
    // jika nama lengkap 
    if (namaLengkap === '' || nim === '' || prodi === '' || layanan === '' || tanggal === ''){
        // beri pesan 
        alert (' ❌ semua field (data) harus diisi ! ');
        // mencegah submit halaman
        return false;
    }

    // 3. batasi jumlah kharakter nim ( 9 khrakter) tidak boleh kosong
    if(nim.length !== 9 || isNaN (nim)){
        alert('❌ nim harus terdiri dari 9 kharakter')
        return false;
    }

    // 4. tampilkan hasil jika berhasil validasi 
    // a. di console
    console.log("✅ Data Pengajuan berhasil! : ",{
        namaLengkap:namaLengkap,
        nim:nim,
        prodi:prodi,
        layanan:layanan,
        tanggal:formatTanggal(tanggal),
    });

    // di alert
    alert('✅ Data Pengajuan berhasil!\n' +
        'Nama Lengkap: ' + namaLengkap + '\n' +
        'NIM: ' + nim + '\n' +
        'Prodi: ' + prodi + '\n' +
        'Layanan: ' + layanan + '\n' +
        'Tanggal: ' + formatTanggal(tanggal)
    );

    return false;
}