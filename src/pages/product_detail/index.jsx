import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Product/viewDetail";
import { useEffect, useState } from "react";
import { callFetchProductById } from "../../services/api";

const ProductDetail = () => {
  const [dataProduct, setDataProduct] = useState();
  let location = useLocation();

  let params = new URLSearchParams(location.search);
  const id = params?.get("id");
  console.log(id);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    const res = await callFetchProductById(id);
    if (res && res.data) {
      let raw = res.data;
      console.log(raw);
      raw.items = getImages(raw);

      setDataProduct(raw);
      console.log("raw:", raw);
    }
  };

  const getImages = (raw) => {
    console.log("raw?.dataGalery?.image", raw?.dataGalery);
    const images = [];
    if (raw?.dataProduct?.image) {
      images.push({
        original: `${`data:image/jpeg;base64,${raw?.dataProduct?.image}`}`,
        thumbnail: `${`data:image/jpeg;base64,${raw?.dataProduct?.image}`}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image",
        originalWidth: 450,
        originalHeight: 450,
      });
    }
    if (raw?.dataGalery) {
      raw?.dataGalery?.map((item) => {
        console.log("chekc imte: ", item);
        images.push({
          original: `${`data:image/jpeg;base64,${item.image}`}`,
          thumbnail: `${`data:image/jpeg;base64,${item.image}`}`,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image",
        });
      });
    }
    return images;
  };
  console.log("check data: ", dataProduct);
  return (
    <>
      <ViewDetail dataProduct={dataProduct} />
    </>
  );
};

export default ProductDetail;
