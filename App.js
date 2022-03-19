import "./App.css";
import React, { useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
} from "@primer/octicons-react";

function App() {
  const [items, setItems] = useState(() => [
    { itemName: "item 1", quantity: 0, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState(() => "");

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      //* isSelected: true y no false
      isSelected: true,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
  };

  const incrementCount = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  };

  const decrementCount = (index) => {
    const newItems = [...items];
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  };

  const [totalItemCount, setTotalItemCount] = useState(() => 0);

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  return (
    <div className="container rounded mt-5 pt-3 bg-warning">
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">
          Add items to your list:
        </span>

        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="form-control"
          type="text"
          aria-label="Sizing-example-input"
        ></input>

        <button
          onClick={() => handleAddButtonClick()}
          className="btn btn-primary"
        >
          <PlusCircleIcon size={25} />
        </button>
      </div>

      {items.map((item, index) =>
        item.isSelected ? (
          <div key={index} className="list-group mt-5">
            <ul className="list-group">
              <li className="list-group-item">{item.itemName}</li>
              <div className="btn-group mb-2 mt-2">
                <button
                  onClick={() => decrementCount(index)}
                  className="btn btn-primary"
                >
                  <ChevronLeftIcon size={30} />
                </button>

                <div className="badge bg-danger text-wrap">
                  <h2>{item.quantity}</h2> {/* quantity */}
                </div>

                <button
                  onClick={() => incrementCount(index)}
                  className="btn btn-primary"
                >
                  <ChevronRightIcon size={30} />
                </button>
              </div>
            </ul>
          </div>
        ) : null
      )}

      <hr />

      <div className="container mt-2 pb-3">
        {<h1>Total: {totalItemCount}</h1>}
      </div>
    </div>
  );
}

export default App;