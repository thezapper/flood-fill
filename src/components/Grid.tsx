import { type } from 'os';
import React, { useState, useEffect } from 'react';
import { Cell, E_CELL, cell_props, colours } from './Cell';

let count = 0;

export interface grid_props
{
  gridData: any;
  cols: colours;
}

export function Grid(props: grid_props) 
{
    const [gridState, setNewGridData] = useState(props.gridData);
    const [selected, selectCell] = useState({x:-1, y:-1});
    const [storedCount, setCount] = useState(0);
    const [divWidth, setWidth] = useState(0);
    const [divHeight, setHeight] = useState(0);
    const GRID_DIM: number = props.gridData[0].length;

    useEffect(() => 
    {
        console.log("New grid data recieved")
        setNewGridData([...props.gridData]);
        selectCell({x:-1, y:-1});

        var elem = document.getElementById("grid");
        if(elem) 
        {
            var rect = elem.getBoundingClientRect();
            console.log("Grid size: ", rect);  
            
            //setWidth(rect.width);
            setWidth(elem.clientWidth);
            setHeight(elem.clientHeight);
        }

        return function cleanup()
        {
            console.log("Grid cleanup")
        }
      }, [props.gridData]);

    function clearFill() 
    {
        for (let y= 0; y < GRID_DIM; y++)
        {
            const curRow = gridState[y];
            for (let x= 0; x < GRID_DIM; x++)
            {
                if (curRow[x] === E_CELL.SELECTED)
                    curRow[x] = E_CELL.FILLED;
            }
        }

        setNewGridData([...gridState]);
    }

    type coord =
    {
      x: number;
      y: number;
    }

    function floodFill(col: number, row: number) // x=col, y=row
    {
        let queue = new Array<coord>;
        let grid = props.gridData;
        const cellValue = grid[row][col];
        
        // ignore blanks and already coloured
        if (cellValue === E_CELL.BLANK || cellValue === E_CELL.SELECTED)
        {
            console.log("nothing to do");
            return;
        }
        
        console.log("Reset count");
        count = 0;
        if (cellValue === E_CELL.FILLED)
        {
            grid[row][col] = E_CELL.SELECTED;
            queue.push({x:col, y:row});
            count++;
        }
        
        // Using a queue approach for the fill rather than a recursive stack solution.
        while (queue.length > 0)
        {
            // using an array like a queue with push and shift.
            // Shift will remove the oldest element instead of pop which will remove the most recent
            let currentCell = queue.shift();
            let x = currentCell?.x ? currentCell.x : 0;
            let y = currentCell?.y ? currentCell.y : 0;
            // Now check neighbours.  
            // When indexing the array we dont need to make sure we have a valid index,
            // JavaScript will return 'undefined' for elements outside the array which
            // will subsequently fail the comparison to 'FILLED' and be ignored.
            
            // West
            let checkX = x - 1;
            let checkY = y;
            if ( (checkY < GRID_DIM) && (checkY >= 0) )
            {
                if (grid[checkY][checkX] == E_CELL.FILLED)
                {
                    grid[checkY][checkX] = E_CELL.SELECTED;
                    queue.push({x:checkX, y:checkY});
                    count++;
                }
            }
            
            // East
            checkX = x + 1;
            checkY = y;
            if (checkY < GRID_DIM && checkY >= 0)
            {
                if (grid[checkY][checkX] == E_CELL.FILLED)
                {
                    grid[checkY][checkX] = E_CELL.SELECTED;
                    queue.push({x:checkX, y:checkY});
                    count++;
                }
            }
            
            // North
            checkX = x;
            checkY = y - 1;
            if (checkY < GRID_DIM && checkY >= 0)
            {
                if (grid[checkY][checkX] == E_CELL.FILLED)
                {
                    grid[checkY][checkX] = E_CELL.SELECTED;
                    queue.push({x:checkX, y:checkY});
                    count++;
                }
            }
            
            // South
            checkX = x;
            checkY = y + 1;
            if (checkY < GRID_DIM && checkY >= 0)
            {
                if (grid[checkY][checkX] == E_CELL.FILLED)
                {
                    grid[checkY][checkX] = E_CELL.SELECTED;
                    queue.push({x:checkX, y:checkY});
                    count++;
                }
            }
        }

        const newData = [...grid];
        setNewGridData(newData);

        console.log(count);
    }

    function cellClicked(col:number, row:number) // x=col, y=row
    {
        console.log(col, row);
        selectCell({x:col, y:row});
        setCount(count);
    }

    // type cell_props = 
    // {
    //   x: number,
    //   y: number,
    //   width: number,
    //   height: number,
    //   cellValue: number,
    //   colour: string,
    //   fillFunc: (col:number, row:number) => void,
    //   clearFunc: () => void,
    //   clickFunc: (col:number, row:number) => void,
    //   text: string
    // }
    
    let cells = new Array<cell_props>;
    let cellWidth = divWidth / GRID_DIM;
    let cellHeight = divHeight / GRID_DIM;
    
    // for each row...
    for (let y= 0; y < gridState.length; y++)
    {
        const curRow = gridState[y];
        
        // generate a cell for each element
        for (let x= 0; x < gridState.length; x++)
        {
            
            let cellProps : cell_props = 
            {
                x: x,
                y: y,
                width:  cellWidth,                        
                height: cellHeight,
                cellValue: curRow[x],
                colour: props.cols.empty,
                fillFunc: floodFill,
                clearFunc: clearFill,
                clickFunc: cellClicked,
                text: ''
            };
            
            if (x === selected.x && y === selected.y)
            {
                cellProps.text = storedCount.toString();
            }

            if (curRow[x] === E_CELL.FILLED)
                cellProps.colour = props.cols.filled;
            else if (curRow[x] === E_CELL.SELECTED)
                cellProps.colour = props.cols.hover;

            cells.push(cellProps);
        }
    }
    
    //console.log("Grid Render");
    return (
        <div 
            id='grid' 
            className='grid'>
            {cells.map ( (c) => <Cell key={`${c.x}_${c.y}`} {...c}/>) }
        </div>
        );
}