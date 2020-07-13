import React, { Component } from "react";

let timer;
let timer2;
let networkTimer;

export class LoadProducts extends Component {
  state = {
    products: [],
    allowLoadProducts: true,
    activePage: 1,
    maxPage: 3,
    nextPageLoading: false,
    pdtLoading: false,
    wishList: [],
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const page = window.location.search.replace("?page=", "");
    const apple = parseFloat(page);
    this.setState({
      activePage: apple,
    });
    this.getProducts(page);
  }

  handleScroll = (page) => {
    const { activePage, maxPage } = this.state;
    const loadElement = this.refs["load-more-button"];
    if (
      loadElement &&
      window.pageYOffset > loadElement.offsetTop - window.innerHeight
    ) {
      if (this.state.allowLoadProducts && activePage + 1 <= maxPage) {
        this.startLoading(true);
        this.setState({ allowLoadProducts: false });
        setTimeout(() => {
          this.getNextPageProducts();
        }, 1000);
      }
    }
  };

  getProducts = async (page) => {
    this.startPdtLoading(true);
    try {
      for (var i = 0; i < page; i++) {
        const response = await fetch("http://localhost:8081/products", {
          method: "GET",
        });
        if (response.ok) {
          const result = await response.json();
          const { productList } = result.productRefinements[0];
          this.setState({
            products: [...this.state.products, ...productList],
          });
          clearTimeout(timer2);
          timer2 = setTimeout(() => {
            this.startPdtLoading(false);
            const pin = localStorage.getItem("pin-position");
            if (pin) {
              window.scrollTo(0, pin);
              localStorage.removeItem("pin-position");
            }
          }, 500);
        } else {
          throw new Error("error");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  getNextPageProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/products", {
        method: "GET",
      });
      if (response.ok) {
        window.history.pushState(
          null,
          null,
          `?page=${this.state.activePage + 1}`
        );
        const result = await response.json();
        const { productList } = result.productRefinements[0];
        this.setState({
          products: [...this.state.products, ...productList],
          activePage: this.state.activePage + 1,
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.startLoading(false);
          this.setState({
            allowLoadProducts: true,
          });
        }, 1000);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  setPinPos = async () => {
    await localStorage.setItem("pin-position", window.pageYOffset);
    // window.scrollTo({
    //   top: 0,
    //   behavior: "auto",
    // });
  };

  startLoading = (bool) => {
    clearTimeout(networkTimer);
    if (bool) {
      networkTimer = setTimeout(() => {
        alert("連線逾時");
        this.setState({
          isLoading: false,
        });
      }, 5000);
    }
    this.setState({
      nextPageLoading: bool,
    });
  };

  startPdtLoading = (bool) => {
    clearTimeout(networkTimer);
    if (bool) {
      networkTimer = setTimeout(() => {
        alert("連線逾時");
        this.setState({
          pdtLoading: false,
        });
      }, 5000);
    }
    this.setState({
      pdtLoading: bool,
    });
  };

  handleWishItem = (data) => {
    const array = [...this.state.wishList];
    array.push(data.code);
    this.setState({
      wishList: array,
    });
  };

  isWishItem = (data) => {
    let className = "";
    const { wishList } = this.state;
    const hasfound = wishList.find((item) => item === data.code);
    if (hasfound) {
      className = "active";
    }
    return className;
  };

  render() {
    return (
      <div ref="main">
        {this.state.pdtLoading && (
          <div className="pdt-loading">
            <img src="/images/loading.gif" alt="loading" />
          </div>
        )}
        <div className={`content ${this.state.pdtLoading ? "hidden" : ""}`}>
          {this.state.products.map((data, index) => (
            <React.Fragment key={index}>
              <div className="box-content">
                <div
                  className="box"
                  style={{
                    backgroundImage: `url("${data.imageUrl2}")`,
                  }}
                >
                  <div className="tag">{data.category}</div>
                  <a
                    href={`/products?code=${data.code}`}
                    onClick={this.setPinPos}
                  >
                    <img src={data.imageUrl} alt="background" />
                  </a>
                </div>
                <div className="desc">
                  <div
                    className={`fav-btn ${this.isWishItem(data)}`}
                    onClick={this.handleWishItem.bind(this, data)}
                  >
                    ♡
                  </div>
                  <p>{data.name}</p>
                  <p>{data.name2}</p>
                  <p className="price">HK${data.price}</p>
                </div>
                {data.extendMetalTypeList ? (
                  <div className="color-options">color-options</div>
                ) : null}
              </div>
            </React.Fragment>
          ))}
        </div>
        {this.state.nextPageLoading && (
          <div className="next-page-loading">
            <img src="/images/loading.gif" alt="loading" />
          </div>
        )}

        {this.state.products.length > 0 &&
        this.state.activePage !== this.state.maxPage &&
        !this.state.pdtLoading ? (
          <button ref="load-more-button" className="load-more-button">
            探索更多
          </button>
        ) : null}
      </div>
    );
  }
}

export default LoadProducts;
