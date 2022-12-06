import React, { useState, useEffect } from 'react';
import { Grid } from './Grid.jsx'
import { colours } from './Cell.js';
//import {Options} from './Options.jsx'

const DEFAULT_GRID_SIZE = 10;

export function MyApplication() {
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [winHeight, setWinHeight] = useState(window.innerHeight);
  const [cols, setColours] = useState<colours>(
    { empty: '#eeeeee', filled: '#adBEEF', hover: '#4557D7' });

  useEffect(() => {
  });

  const generateGridData = (n) => {
    let tempGridData = Array(n).fill(0).map(x => Array(n).fill(0));

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        let num = Math.floor((Math.random() * 2));
        tempGridData[row][col] = num;
      }
    }

    return tempGridData;
    //this.setState({ gridData: [...tempGridData] });
  }

  const onResize = (e) => {
    console.log("Height: ", e.target.innerHeight);
    console.log("Width: ", e.target.innerWidth);
    this.setState({
      winWidth: e.target.innerWidth,
      winHeight: e.target.innerHeight
    });
  };

  const tempData = generateGridData(DEFAULT_GRID_SIZE);
  const [gridData, setGridData] = useState(tempData);
  window.addEventListener("resize", onResize);

  const onNewGridSize = (n) => {
    this.setState({ gridData: [...this.generateGridData(n)] });
  };

  const onColourChange = (type: string, colour: string) => {
    let newColours = cols;
    if (type === 'filled')
      newColours.filled = colour;
    else
      newColours.hover = colour;

    this.setState({ colours: newColours });
  };


  return (
    <div>
      {/* <Options 
                defaultGridSize={DEFAULT_GRID_SIZE}
                newGridSize={this.onNewGridSize}
                colourChange={this.onColourChange}
                colours={this.state.colours} /> */}

      <Grid
        gridData={gridData}
        //width = {winWidth}
        //height = {this.state.winHeight}
        cols={cols} />

    </div>
  );

}