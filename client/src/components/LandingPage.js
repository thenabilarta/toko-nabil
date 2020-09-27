import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchProductList();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  async function fetchProductList() {
    const data = await axios.get('/api/product/getproducts');
    setProductList(data);
  }

  return (
    <div className="landing-page">
      <ul className="products">
        {productList.data &&
          productList.data.map((product) => (
            <li className="list-product" key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    style={{height: '250px', width: '250px'}}
                    src={product.urlProduk}
                    alt=""
                  />
                </Link>
                <ul className="product-label">
                  <h3>Toko {product.writer.name}</h3>
                  <li>
                    <label>Nama Produk</label>
                    <p>{product.namaProduk}</p>
                  </li>
                  <li>
                    <label>Merk Produk</label>
                    <p>{product.merkProduk}</p>
                  </li>
                  <li>
                    <label>Harga Produk</label>
                    <p>$ {product.hargaProduk}</p>
                  </li>
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default LandingPage;
