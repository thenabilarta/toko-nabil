import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

function ProductPage(props) {
  const [review, setReview] = useState('');
  const [listReview, setListReview] = useState({});

  async function fetchData() {
    const data = await axios.post('/api/review/getreviews', {id: id});
    setListReview(data);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const id = props.match.params.id;

  let user = useSelector((state) => state.user);

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProduct() {
      await axios
        .post('/api/product/getproductdetails', {id: id})
        .then((res) => setProduct(res));
    }
    fetchProduct();
  }, [id]);

  if (!product.data) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: review,
      writer: user.userData._id,
      productId: id,
      date: Date().slice(0, 15),
    };
    axios
      .post('/api/review/savereview', variables)
      .then((response) => fetchData())
      .then(setReview(''));
  };

  return (
    <div className="product-page">
      {product.data && (
        <div className="single-product">
          <div className="top">
            <img
              style={{height: '200px', width: '200px'}}
              src={product.data[0].urlProduk}
              alt="product"
            />
          </div>
          <div className="bottom">
            <ul>
              <li>
                <label>Penjual</label>
                <p>Toko {product.data[0].writer.name}</p>
              </li>
              <li>
                <label>Nama Produk</label>
                <p>{product.data[0].namaProduk}</p>
              </li>
              <li>
                <label>Merk</label>
                <p>{product.data[0].merkProduk}</p>
              </li>
              <li>
                <label>Kategori</label>
                <p>{product.data[0].kategoriProduk}</p>
              </li>
              <li>
                <label>Harga</label>
                <p>$ {product.data[0].hargaProduk}</p>
              </li>
              <li>
                <label>Deskripsi</label>
                <p>{product.data[0].deskripsiProduk}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="review-section">
        <h2>Review Produk</h2>
        {listReview.data && listReview.data.length === 0 ? (
          <p style={{paddingBottom: '0.5rem', fontSize: '0.8rem'}}>
            Belum ada review untuk produk ini
          </p>
        ) : null}
        {listReview.data &&
          listReview.data.map((data) => (
            <div className="review" key={data._id}>
              <div className="image">
                <img src={data.writer.image} alt="" />
              </div>
              <div className="text">
                <h3>{data.writer.name}</h3>
                <p>{data.date}</p>
                <h5>{data.content}</h5>
              </div>
            </div>
          ))}
        {user.userData && user.userData.isAuth ? (
          <div className="review-form">
            <div className="image">
              <img src={user.userData.image} alt="" />
            </div>
            <div className="text">
              <h3>{user.userData.name}</h3>
              <p>{Date().slice(0, 15)}</p>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tulis review disini"
                />
                <button>Submit</button>
              </form>
            </div>
          </div>
        ) : (
          <p style={{padding: '1rem', color: 'red', fontSize: '0.8rem'}}>
            Login untuk review produk
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
