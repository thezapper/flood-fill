import React, { useState, useEffect } from 'react';

export enum E_CELL
{
  BLANK,
  FILLED,
  SELECTED
}

export interface colours
{
  empty: string;
  filled: string;
  hover: string;
}

export interface cell_props
{
  x: number;
  y: number;
  width: number;
  height: number;
  colour: string;
  cellValue: E_CELL;
  fillFunc: (col:number, row:number) => void;
  clearFunc: () => void;
  clickFunc: (col:number, row:number) => void;
  text: string;
}

export function Cell(props: cell_props)
{
    const [className, setClass] = useState('cell');

    let posStl = 
    {
        left:   props.x * (props.width + 0) + 'px',
        top:    props.y * (props.height + 0) + 'px',
        width:  props.width + 'px',
        height: props.height + 'px',
        backgroundColor: props.colour,
        borderRadius: props.width / 2 +'px'
    }

    const onMouseEnter = (e) =>
    {
        // props.fillFunc(props.x, props.y);
        setClass('cell-hover');
    }

    const onMouseLeave = (e) =>
    {
        // props.clearFunc(props.x, props.y);
        setClass('cell');
    }

    const onMouseDown = (e) =>
    {
        if (props.cellValue === E_CELL.BLANK)
            return;

        //props.clickFunc(props.x, props.y);
    }

    return (
        <div className={className} 
            style={posStl}
            onMouseEnter={ (e) => onMouseEnter(e) } 
            onMouseLeave={ (e) => onMouseLeave(e) }
            onMouseDown= { (e) => onMouseDown(e)  }
            > 
                <div className='cell-text'>{props.text}</div>
        </div>
    );
}