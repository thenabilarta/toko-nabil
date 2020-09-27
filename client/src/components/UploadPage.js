import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Dropzone from 'react-dropzone';
import {Icon} from 'antd';
import {useSelector} from 'react-redux';

function UploadPage(props) {
  const [namaProduk, setNamaProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [merkProduk, setMerkProduk] = useState('');
  const [kategoriProduk, setKategoriProduk] = useState('Elektronik');
  const [deskripsiProduk, setDeskripsiProduk] = useState('');
  const [urlProduk, setUrlProduk] = useState('');
  let user = useSelector((state) => state.user);

  const onDrop = (files) => {
    let formData = new FormData();
    formData.append('image', files[0]);

    axios
      .post('/api/product/upload', formData)
      .then((res) => setUrlProduk(res.data.Location));
  };

  const onSubmitFullProduct = (e) => {
    e.preventDefault();

    if (
      !namaProduk ||
      !hargaProduk ||
      !merkProduk ||
      !kategoriProduk ||
      !urlProduk
    ) {
      swal({title: 'Lengkapi data terlebih dahulu', timer: 2000});
      return;
    }

    const variable = {
      namaProduk: namaProduk,
      hargaProduk: hargaProduk,
      merkProduk: merkProduk,
      kategoriProduk: kategoriProduk,
      deskripsiProduk: deskripsiProduk,
      urlProduk: urlProduk,
      writer: user.userData._id,
      date: Date().slice(0, 15),
    };

    console.log(variable);

    axios
      .post('/api/product/fullproduct', variable)
      .then((res) => props.history.push('/'));
  };

  return (
    <div className="upload-page">
      <div className="top">
        <img src={urlProduk} alt="" />
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({getRootProps, getInputProps}) => (
            <div
              style={{
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '1rem',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{fontSize: '3rem'}} />
            </div>
          )}
        </Dropzone>
      </div>
      <div className="bottom">
        <form onSubmit={onSubmitFullProduct}>
          <ul>
            <li>
              <label>Nama Produk</label>
              <input
                type="text"
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
              />
            </li>
            <li>
              <label>Kategori</label>
              <select
                value={kategoriProduk}
                onChange={(e) => setKategoriProduk(e.target.value)}
              >
                <option>Elektronik</option>
                <option>Alat Rumah Tangga</option>
                <option>Sepatu</option>
                <option>Alat Olahraga</option>
              </select>
            </li>
            <li>
              <label>Merek Produk</label>
              <input
                type="text"
                value={merkProduk}
                onChange={(e) => setMerkProduk(e.target.value)}
              />
            </li>
            <li>
              <label>Deskripsi Produk</label>
              <textarea
                type="text"
                value={deskripsiProduk}
                onChange={(e) => setDeskripsiProduk(e.target.value)}
              />
            </li>
            <li>
              <label>Harga Produk (USD)</label>
              <input
                type="number"
                value={hargaProduk}
                onChange={(e) => setHargaProduk(e.target.value)}
              />
            </li>
            <li>
              <button>Submit</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
