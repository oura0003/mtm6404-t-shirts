const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'grey-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
];

function TShirt(props) {
  const tshirt = props.tshirt;
  const options = [];

  // Create one option for each available t-shirt.
  for (let i = 1; i <= tshirt.stock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function onChangeHandler(e) {
    props.onUpdateQuantity(tshirt, parseInt(e.target.value));
  }

  function clickHandler() {
    props.onBuy(tshirt);
  }

  return (
    <div className="tshirt">
      <img
        src={'images/' + tshirt.image}
        alt={tshirt.title}
      />

      <h2>{tshirt.title}</h2>

      <p className="price">${tshirt.price}</p>

      <p>Remaining stock: {tshirt.stock}</p>

      {tshirt.stock > 0 ? (
        <div className="purchase">
          <label>
            Quantity:
            <select
              value={tshirt.quantity}
              onChange={onChangeHandler}
            >
              {options}
            </select>
          </label>

          <button type="button" onClick={clickHandler}>
            Buy
          </button>
        </div>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}
    </div>
  );
}

function App() {
  const [shirts, setShirts] = React.useState(tshirts);

  function onUpdateQuantityHandler(tshirt, quantity) {
    setShirts(function (prevState) {
      return prevState.map(function (shirt) {
        if (shirt.title === tshirt.title) {
          return {
            ...shirt,
            quantity: quantity
          };
        }

        return shirt;
      });
    });
  }

  function onBuyHandler(tshirt) {
    setShirts(function (prevState) {
      return prevState.map(function (shirt) {
        if (shirt.title === tshirt.title) {
          if (shirt.quantity > 0 && shirt.quantity <= shirt.stock) {
            return {
              ...shirt,
              stock: shirt.stock - shirt.quantity,
              quantity: 1
            };
          }
        }

        return shirt;
      });
    });
  }

  return (
    <main>
      <h1>T-Shirts</h1>

      <div className="tshirts">
        {shirts.map(function (tshirt) {
          return (
            <TShirt
              key={tshirt.title}
              tshirt={tshirt}
              onUpdateQuantity={onUpdateQuantityHandler}
              onBuy={onBuyHandler}
            />
          );
        })}
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);