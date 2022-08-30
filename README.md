#Mocha-APITesting

Fitur yang dikembangkan : 
- GET User dengan assertion :
  1. Positif case : Get user dengan valid data id. 
  2. Negatif case : Get user dengan invalid data id.
  3. Pada positif case, dilakukan validasi format dengan json-schema.
  4. Pada negatif case, dilakukan validasi terkait kode error, pesan error dan kode status. 
  
- PUT User dengan assertion : 
  1. Positif case : User dapat mengupdate data occupation dan nationality.
  2. Negatif case : 
    - User tidak dapat mengupdate data age jika nilainya 0.
    - User tidak dapat mengupdate data hobi jika nilai yang dimasukkan kosong.
    - User tidak diperkenankan mengubah data jika Id usernya null.
  3. Pada positif case, dilakukan validasi format dengan json-schema.
  4. Pada negatif case, dilakukan validasi terkait kode error, pesan error dan kode status.
 
- Memanfaatkan fitur hook pada bagian before untuk POST data user. Dan after untuk menghapus data user.

- Menggunakan mocha-awesome, untuk membuat report testing

