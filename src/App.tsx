import './App.css';
import { Quiz } from './components/Quiz/Quiz';
import { quiz } from './mocks/questions';

function App() {
  return (
    <div className="App">
      <Quiz quiz={quiz} />
    </div>
  );
}

export default App;
