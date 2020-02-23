// File for all api calls

const getProduct = () => {
  // console.log(window.location.href.split('/')[4]);
  return fetch(`http://localhost:8080/product/${window.location.href.split('/')[4] || 1}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
}

export default {
  getProduct
}