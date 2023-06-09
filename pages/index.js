import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} /> 
    <div className="products-heading">
      <h2>Best-Selling Products</h2>
      <p>Check out our newest range of Exotiqué Skin Care Products</p>
    </div>
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const footerbannerQuery = '*[_type == "footerbanner"]';
  const footerbannerData = await client.fetch(footerbannerQuery);

  return {
    props: { products, bannerData, footerbannerData }  
  }
}

export default Home;