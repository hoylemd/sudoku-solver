import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

/*
solver algo:

for each number:
*/

let testBoard = [
  9,7,0,0,4,1,0,0,6,
  0,0,0,0,7,0,5,0,9,
  0,0,6,0,0,0,0,8,1,
  0,0,0,2,8,7,4,0,0,
  7,6,3,0,1,5,8,0,0,
  2,8,4,0,3,0,1,5,7,
  0,4,0,0,0,2,9,7,8,
  0,2,5,7,9,8,0,1,4,
  8,0,7,0,6,0,3,0,0
];

let NBSP = '\u00A0';

class Square extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.value || 0,
      locked: props.locked || false,
      notes: [null, true, false, true, false, true, false, true, false, true]
    };
  }

  makeNumber() {
    return (
      <div className={'number ' + this.state.locked ? 'locked' : 'filled'}>
        {this.state.value}
      </div>
    );
  }

  makeNote(n) {
    let content = this.state.notes[n] ? `${n}` : NBSP;
    return (
      <div className='note'>{content}</div>
    );
  }

  makeNotes() {
    return [
      this.makeNote(1),
      this.makeNote(2),
      this.makeNote(3),
      this.makeNote(4),
      this.makeNote(5),
      this.makeNote(6),
      this.makeNote(7),
      this.makeNote(8),
      this.makeNote(9)
    ];
  }

  makeClassName() {
    let classes = ['square'];

    if (this.state.locked) {
      classes.push('locked');
    }

    if (this.props.column === 2 || this.props.column === 5) {
      classes.push('nonant-right');
    }
    if (this.props.row === 2 || this.props.row === 5) {
      classes.push('nonant-bottom');
    }

    return classes.join(' ');
  }

  render() {
    let content;

    if (this.state.value) {
      content = this.makeNumber();
    } else {
      content = this.makeNotes();
    }

    return <div className={this.makeClassName()}>{content}</div>;
  }
}
Square.propTypes = {
  value: PropTypes.number,
  locked: PropTypes.bool,
  row: PropTypes.number,
  column: PropTypes.number
};
Square.defaultProps = {
  style: ''
};

class Board extends React.Component {
  constructor(props) {
    super(props);

    let default_grid = [
      9,0,0,0,0,0,0,0,0,
      0,8,0,0,0,0,0,0,0,
      0,0,7,0,0,0,0,0,0,
      0,0,0,6,0,0,0,0,0,
      0,0,0,0,5,0,0,0,0,
      0,0,0,0,0,4,0,0,0,
      0,0,0,0,0,0,3,0,0,
      0,0,0,0,0,0,0,2,0,
      0,0,0,0,0,0,0,0,1
    ];
    this.state = {
      grid: this.props.grid || default_grid
    };
  }

  makeSquare(value, row, column) {
    let style = value ? 'locked' : '';

    return  (
      <Square style={style} value={value} row={row} column={column}/>
    );
  }

  makeRow(squares) {
    let className = 'board-row';

    return (
      <div className={className}>
        {squares}
      </div>
    );
  }

  render() {
    let i, j;
    let rows = [];
    for (i = 0; i < 9; i += 1) {
      let squares = [];
      for (j = 0; j < 9; j += 1) {
        squares.push(this.makeSquare(this.state.grid[i * 9 + j], i, j));
      }
      rows.push(this.makeRow(squares));
    }

    return (
      <div className='board'>
        {rows}
      </div>
    );
  }
}
Board.propTypes = {
  grid: PropTypes.array
};

class SudokuGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className='game'>
        <h3>Sudoku</h3>
        <Board grid={testBoard}/>
      </div>
    );
  }
}
SudokuGame.propTypes = {
};

ReactDOM.render(
    <SudokuGame />,
    document.getElementById('root')
);
