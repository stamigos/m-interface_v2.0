import React from 'react';

const CustomDecoratorsLarge = [
  {
    component: React.createClass({
      render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            {
              indexes.map(function(index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button
                      style={self.getButtonStyles(self.props.currentSlide === index)}
                      onClick={self.props.goToSlide.bind(null, index)}>
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          bottom: 108,
          padding: 0,
          marginLeft: 0,
          width: 85,
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block',
          padding: 10
        }
      },
      getButtonStyles(active) {
        return {
          content: 'none',
          border: "1px solid #f2415f",
          marginBottom: 0,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: active ? 'red' : 'white',
          color: active ? 'red' : 'white',
          cursor: 'pointer',
          padding: 5,
          outline: 0,
          fontSize: 48,
          opacity: active ? 1 : 0.5
        }
      }
    }),
    position: 'TopCenter'
  }
];

export default CustomDecoratorsLarge;