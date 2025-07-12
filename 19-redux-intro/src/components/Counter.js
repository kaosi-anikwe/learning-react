import { useDispatch, useSelector } from "react-redux";

import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispath = useDispatch();
  const { counter, show } = useSelector((state) => ({
    counter: state.counter.counter,
    show: state.counter.showCounter,
  }));

  const incrementHandler = () => {
    dispath(counterActions.increment());
  };
  const increaseHandler = () => {
    dispath(counterActions.increase(5));
  };
  const decrementHandler = () => {
    dispath(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispath(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div className="counter">
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrease</button>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }
//   decrementHandler() {
//     this.props.decrement();
//   }
//   increaseHandler() {
//     this.props.increase();
//   }
//   toggleCounterHandler() {
//     this.props.toggle();
//   }

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         {this.props.show && (
//           <div className={classes.value}>{this.props.counter}</div>
//         )}
//         <div className="counter">
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.increaseHandler.bind(this)}>
//             Increase by 5
//           </button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrease</button>
//           <button onClick={this.toggleCounterHandler.bind(this)}>
//             Toggle Counter
//           </button>
//         </div>
//       </main>
//     );
//   }
// }

// const matchStateToProps = (state) => ({
//   counter: state.counter,
//   show: state.showCounter,
// });

// const matchDistpatchToProps = (dispatch) => ({
//   increment: () => dispatch({ type: "increment" }),
//   decrement: () => dispatch({ type: "decrement" }),
//   increase: () => dispatch({ type: "increase", amount: 5 }),
//   toggle: () => dispatch({ type: "toggle" }),
// });

// export default connect(matchStateToProps, matchDistpatchToProps)(Counter);
