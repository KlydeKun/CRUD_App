import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import useData, { Laptop } from "../hooks/useData";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import AddData from "./AddData";

const columns = [
  { field: "brand", header: "Brand" },
  { field: "model", header: "Model" },
  { field: "ram", header: "RAM" },
  { field: "cpu", header: "CPU" },
  { field: "screenSize", header: "Screen Size" },
  { field: "stocks", header: "Stocks" },
];

// {onDeleteLaptop}: Props
const DataTableList = () => {
  const {
    laptops,
    data,
    toast,
    product,
    submitted,
    productDialog,
    hideDialog,
    editLaptop,
    modifyProduct,
    onInputChange,
    deleteProductDialog,
    hideDeleteProductDialog,
    confirmDeleteProduct,
    deleteLaptop,
    openNew,
    addLaptopDialog,
    hideAddDialog

  } = useData();

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={() => deleteLaptop(product.id)}
      />
    </React.Fragment>
  );

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        className="w-[100%] py-2"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback!(e.target.value)
        }
      />
    );
  };

  const ActionBodyTemplate = (rowData: Laptop) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editLaptop(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={modifyProduct} />
    </>
  );

  const leftToolbarTemplate = () => {
    return (
      <div>
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}
        >  
        </Toolbar>
        <DataTable
          ref={data}
          value={laptops}
          editMode="row"
          dataKey="id"
          paginator
          paginatorLeft={paginatorLeft}
          rows={5}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id" header="ID" />
          {columns.map((column) => (
            <Column
              key={column.field}
              field={column.field}
              editor={(options) => textEditor(options)}
              header={column.header}
            />
          ))}
          <Column header="Action" body={ActionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Dialog
        visible={productDialog}
        style={{ width: "33rem" }}
        breakpoints={{ "960px": "55vw", "641px": "70vw" }}
        header="Laptop Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field flex flex-col gap-2">
          <label htmlFor="brand" className="font-bold">
            Brand
          </label>

          <InputText
            id="brand"
            value={product.brand}
            onChange={(e) => onInputChange(e, "brand")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.brand })}
          />
          {submitted && !product.brand && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field flex flex-col gap-2 mt-2">
          <label htmlFor="model" className="font-bold">
            Model
          </label>
          <InputText
            id="model"
            value={product.model}
            onChange={(e) => onInputChange(e, "model")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.model })}
          />
          {submitted && !product.model && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field flex flex-col gap-2 mt-2">
          <label htmlFor="ram" className="font-bold">
            RAM
          </label>
          <InputText
            id="ram"
            value={product.ram}
            onChange={(e) => onInputChange(e, "ram")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.ram })}
          />
          {submitted && !product.ram && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field flex flex-col gap-2 mt-2">
          <label htmlFor="cpu" className="font-bold">
            CPU
          </label>
          <InputText
            id="cpu"
            value={product.cpu}
            onChange={(e) => onInputChange(e, "cpu")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.cpu })}
          />
          {submitted && !product.cpu && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field flex flex-col gap-2 mt-2">
          <label htmlFor="screenSize" className="font-bold">
            Screen Size
          </label>
          <InputText
            id="screenSize"
            value={product.screenSize}
            onChange={(e) => onInputChange(e, "screenSize")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.screenSize,
            })}
          />
          {submitted && !product.screenSize && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field flex flex-col gap-2 mt-2">
          <label htmlFor="stocks" className="font-bold">
            Stocks
          </label>
          <InputText
            id="stocks"
            value={product.stocks}
            onChange={(e) => onInputChange(e, "stocks")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.stocks,
            })}
          />
          {submitted && !product.stocks && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={addLaptopDialog}
        style={{ width: "33rem" }}
        breakpoints={{ "960px": "55vw", "641px": "70vw" }}
        header="Laptop Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideAddDialog}
      >
        <AddData />
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "55vw", "641px": "70vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.model}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default DataTableList;
