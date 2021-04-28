import React from "react"
import './ScrollOnTop.css'
class ScrollOnTop extends React.Component {
  ScrollOnTop() {
    document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  render() {
    return (
      <div>
        <div className="text-right">
          <button className="btn btn-sm onTop" onClick={this.ScrollOnTop} id='onTopBtn' style={{display: 'none', zIndex: 1000}}>
            <i className="fa fa-angle-double-up icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default ScrollOnTop;
