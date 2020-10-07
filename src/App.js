import React from "react";

class App extends React.Component {
  state = {
    lat: null,
    err: null,
    iconstyle: null,
    season: null,
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (success) => this.setState({ lat: success.coords.latitude }),
      (error) => this.setState({ err: error.message })
    );
    this.setState({ season: this.getSeason() });
  }

  getSeason() {
    var month = new Date().getMonth() + 1;
    console.log(month);
    console.log("lat" + this.state.lat);

    if (
      (month > 2 && month < 9 && this.state.lat > 0) ||
      ((month <= 2 || month >= 9) && this.state.lat < 0)
    ) {
      console.log(3);
      this.setState({ iconstyle: "sun" });
      return "summer";
    }
    console.log(4);
    this.setState({ iconstyle: "snowflake" });
    return "winter";
  }

  render() {
    if (!this.state.err && this.state.lat) {
      return (
        <div>
          {this.state.iconstyle}
          <i className={`icon massivie ${this.state.iconstyle}`}></i>
        </div>
      );
    } else if (this.state.err && !this.state.lat) {
      return <div>{this.state.err}</div>;
    } else {
      return (
        <div className="ui active dimmer">
          <div className="ui text loader"> Please accept location request.</div>
        </div>
      );
    }
  }
}

export default App;
