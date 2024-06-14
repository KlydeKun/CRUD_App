import useData from '../hooks/useData'
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const AddData = () => {
  const { product, onInputChange, submitted } = useData();

  return (
        <>
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
        </>
  )
}

export default AddData