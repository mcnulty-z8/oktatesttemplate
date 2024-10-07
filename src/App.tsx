import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { auth } from "../amplify/auth/resource";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      client.models.Todo.observeQuery().subscribe({
        next: (data) => setTodos([...data.items]),
      });
    }
  }, [isAuthenticated]);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  async function login() {
    try {
      await auth.signIn(username, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing in", error);
    }
  }

  return (
    <main>
      <h1>My todos</h1>
      {isAuthenticated ? (
        <>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
        </>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      )}
    </main>
  );
}

export default App;