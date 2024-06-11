import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import useData, { Laptop } from "../hooks/useData";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

// interface LaptopListProps {
//   items: Laptop[];
//   onRowEditLaptops: (id: string, laptop: Laptop) => void;
// }

const columns = [
  { field: "brand", header: "Brand" },
  { field: "model", header: "Model" },
  { field: "ram", header: "RAM" },
  { field: "cpu", header: "CPU" },
  { field: "screenSize", header: "Screen Size" },
  { field: "stocks", header: "Stocks" },
];

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
    saveProduct,
    onInputChange,
  } = useData();

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
        <Button icon="pi pi-trash" rounded outlined />
      </div>
    );
  };

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={data}
          value={laptops}
          // editMode="row"
          dataKey="id"
          // onRowEditComplete={onRowEditComplete}
          paginator
          paginatorLeft={paginatorLeft}
          rows={5}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id" header="ID"></Column>
          {columns.map((column) => (
            <Column key={column.field} field={column.field} editor={(options) => textEditor(options)} header={column.header} />
          ))}
          {/* Example Syntax 
            <Column
            field="brand"
            editor={(options) => textEditor(options)}
            header="Brand"
          ></Column> */}
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
        <div className="field">
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
        <div className="field">
          <label htmlFor="brand" className="font-bold">
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
        <div className="field">
          <label htmlFor="brand" className="font-bold">
            RAM
          </label>
          <InputText
            id="model"
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
      </Dialog>
    </>
  );
};

export default DataTableList;
