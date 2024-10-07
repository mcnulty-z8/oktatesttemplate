import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { auth } from "../amplify/auth/resource";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [isauthenticated, setIsauthenticated] = useState(false);

  useEffect(() => {
    auth.currentauthenticatedUser()
      .then(() => setIsauthenticated(true))
      .catch(() => setIsauthenticated(false));
  }, []);

  useEffect(() => {
    if (isauthenticated) {
      client.models.Todo.observeQuery().subscribe({
        next: (data) => setTodos([...data.items]),
      });
    }
  }, [isauthenticated]);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function login() {
    auth.federatedSignIn();
  }

  return (
    <main>
      <h1>My todos</h1>
      {isauthenticated ? (
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
        <button onClick={login}>Login with Okta</button>
      )}
    </main>
  );
}

export default App;