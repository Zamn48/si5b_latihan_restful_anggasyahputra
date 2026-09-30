	const express = require('express');
	const app = express();
	const PORT = 3000;
	
	app.get('/', (req, res) => {
	  res.send('Server Express.js berjalan!');
	});

    app.use(express.json());
    let mahasiswa = [
        { id: 1, nama: 'Andi', jurusan: 'Sistem Informasi' },
        { id: 2, nama: 'Zam', jurusan: 'Informatika' }
    ];
    let nextId = 3;

    // GET /mahasiswa -> menampilkan seluruh data
    app.get('/mahasiswa', (req, res) => {
        const {jurusan} = req.query;

        if(jurusan){
          const hasil = mahasiswa.filter((m) => m.jurusan === jurusan);
          return res.json(hasil);
        }
        res.json(mahasiswa);
    });

// GET /mahasiswa/:id -> menampilkan satu data berdasarkan id
    app.get('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = mahasiswa.find((m) => m.id === id);

    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(data);
    });

        // POST /mahasiswa
    // Body: { "nama": "Citra", "jurusan": "Sistem Informasi" }
    app.post('/mahasiswa', (req, res) => {
      const { nama, jurusan } = req.body;

      if (!nama || !jurusan) {
        return res.status(400).json({ message: 'nama dan jurusan wajib diisi' });
      }

      const mhs = { id: nextId++, nama, jurusan };

      mahasiswa.push(mhs); // simpan ke array
      res.status(201).json(mhs); // response json
    });

    app.get('/profil', (req, res) => {
      res.send('Halaman Profil');
    });

    app.get('/hubungi', (req, res) => {
      res.send('Hubungi Saya');
    });

        // PUT /mahasiswa/2
    // Body: { "nama": "Budi Santoso", "jurusan": "Informatika" }
    app.put('/mahasiswa/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const index = mahasiswa.findIndex((m) => m.id === id); // cari index array mahasiswa

      if (index === -1) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
      }

      mahasiswa[index] = { ...mahasiswa[index], ...req.body, id }; // proses update data mahasiswa
      res.json(mahasiswa[index]);
    });
	
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });