import axios from 'axios';
import { isParameter } from 'typescript';
import { ca } from 'vuetify/locale';
const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const CONTROLLER_NAME = 'Product';
const CONTROLLER_GETALL = 'GetAlls?sele=false';
const CONTROLLER_DELETE = 'Delete';

const GetAll = async () => {
  try {
    const res = await axios.get(
      VITE_BASE_API_URL + `${CONTROLLER_NAME}/${CONTROLLER_GETALL}`
    );
    return res.data;
  } catch {
    return null;
  }
};

const DeleteProduct = async () => {
  try {
    const res = await axios.delete(
      VITE_BASE_API_URL + `${CONTROLLER_NAME}/${CONTROLLER_DELETE}`
    );
  } catch {
    return null;
  }
};

const Product = {
  GetAll,
  DeleteProduct,
};

export default Product;
