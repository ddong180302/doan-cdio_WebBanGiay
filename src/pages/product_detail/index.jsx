import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Product/ViewDetail";
import { useEffect, useState } from "react";
import { callFetchProductById } from "../../services/api";

const ProductDetail = () => {
  const [dataProduct, setDataProduct] = useState();
  let location = useLocation();

  let params = new URLSearchParams(location.search);
  const id = params?.get("id");

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    const res = await callFetchProductById(id);
    if (res && res.data) {
      let raw = res.data;
      raw.items = getImages(raw);
      setDataProduct(raw);
    }
  };

  const getImages = (raw) => {
    console.log("check raw: ", raw.dataGallery);
    const images = [];
    if (raw?.dataProduct?.thumbnail) {
      images.push({
        original: `${`data:image/jpeg;base64,${raw?.dataProduct?.thumbnail}`}`,
        thumbnail: `${`data:image/jpeg;base64,${raw?.dataProduct?.thumbnail}`}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image",
        originalWidth: 450,
        originalHeight: 450,
      });
    }
    if (raw?.dataGallery) {
      raw?.dataGallery?.map((item) => {
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
  return (
    <>
      <ViewDetail dataProduct={dataProduct} />
    </>
  );
};

export default ProductDetail;
