import {h, Component} from 'preact';
import programmingLanguages from './../Card/programmingLanguages';

const degsToRadians = (degs) => {
  return (degs / 360) * (2 * Math.PI);
}

class PieChart extends Component {
  componentDidMount() {
    this.draw(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.draw(nextProps); 
  }

  draw(props) {
    const canvas = this.canvas;
    const c = canvas.getContext('2d');
    const canvasSize = props.size || 200;
    const center = canvasSize / 2;
    const lineWidth = props.lineWidth || 50;
    const radius = center - (lineWidth / 2);
    c.lineWidth = lineWidth;
    
    const datalanguages = [];
    const dataValues = [];

    for (const key of Object.keys(props.data)) {
      datalanguages.push(key);
      dataValues.push(props.data[key]);
    }

    const dataTotal = dataValues.reduce((r, dataPoint) => r + dataPoint, 0);
    let startAngle = degsToRadians(-90);
    let colorIndex = 0;

    c.clearRect(0, 0, canvasSize, canvasSize);
    dataValues.forEach((dataPoint, i) => {
      const section = dataPoint / dataTotal * 360;
      const endAngle = startAngle + degsToRadians(section);
      const color = programmingLanguages[datalanguages[i]];

      c.strokeStyle = color;
      c.beginPath();
      c.arc(center, center, radius, startAngle, endAngle);
      c.stroke();
      startAngle = endAngle;
    });
  }

  render({ size = 200 }) {
    return (
      <canvas
        ref={(canvas) => { this.canvas = canvas; }}
        height={size}
        width={size}
      />
    );
  }
}

export default PieChart;
