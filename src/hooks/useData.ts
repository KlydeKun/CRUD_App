import { useEffect, useRef, useState } from "react";
import laptopService from "../services/laptopApi";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";

export interface Laptop {
  id: string;
  brand: string;
  model: string;
  ram: string;
  cpu: string;
  screenSize: string;
  stocks: string;
}

const emptyLaptop: Laptop = {
  id: "",
  brand: "",
  model: "",
  ram: "",
  cpu: "",
  screenSize: "",
  stocks: "",
};

const useData = () => {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [product, setProduct] = useState<Laptop>(emptyLaptop);
  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const data = useRef<DataTable<Laptop[]>>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadLaptops();
  }, []);

  // ============================ CONTROLLERS ============================
  const loadLaptops = async () => {
    const laptops = await laptopService.getLaptops();
    setLaptops(laptops);
  };
  
  const modifyProduct = async () => {
    setSubmitted(true);
    if (
      product.brand.trim() &&
      product.model.trim() &&
      product.ram.trim() &&
      product.cpu.trim() &&
      product.screenSize.trim() &&
      product.stocks.toString()
    ) {
      let _laptops = [...laptops];
      const _laptop = { ...product };

      if (product.id) {
        const updatedLaptop = await laptopService.editLaptops(_laptop.id, _laptop);
        _laptops = _laptops.map((i) =>
          i.id === _laptop.id ? updatedLaptop : i);

        
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _laptop.id = createId();
        _laptops.push(_laptop);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }
      setLaptops(_laptops);
      setProductDialog(false);
      setProduct(emptyLaptop);
    }
  };

  const deleteLaptop = async (id: string) => {
    try {
      await laptopService.deleteLaptops(id);
      setLaptops(prevLaptop =>
        prevLaptop.filter((laptop) => laptop.id !== id)
      );
      setDeleteProductDialog(false);
      setProduct(emptyLaptop);
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted!",
        life: 3000,
      });
    } catch (error) {
      console.error("Error removing laptop", error);
    }
  };

  // ============================ CONTROLLERS ============================

  const editLaptop = (laptop: Laptop) => {
    setProduct({ ...laptop });
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const confirmDeleteProduct = (product: Laptop) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  // const findIndexById = (id: string) => {
  //   let index = -1;

  //   for (let i = 0; i < laptops.length; i++) {
  //     if (laptops[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    const _laptop = { ...product };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _laptop[name] = val;

    setProduct(_laptop);
  };

  const createId = (): string => {
    let id = "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  return {
    data,
    laptops,
    emptyLaptop,
    setLaptops,
    toast,
    submitted,
    product,
    setProduct,
    productDialog,
    editLaptop,
    hideDialog,
    modifyProduct,
    onInputChange,
    deleteLaptop,
    deleteProductDialog,
    setDeleteProductDialog,
    hideDeleteProductDialog,
    confirmDeleteProduct,
  };
};

export default useData;
