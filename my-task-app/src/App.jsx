import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // タスクをlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // タスク追加
  const addTask = () => {
    const text = input.trim();

    if (text === "") return;

    const newTask = {
      id: Date.now(),
      text: text,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Enterで追加
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // 完了・未完了の切り替え
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // タスク削除
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // フィルター
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          タスク管理アプリ
        </h1>

        {/* タスク追加 */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="タスクを入力"
            className="flex-1 rounded border px-4 py-2"
          />

          <button
            onClick={addTask}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            追加
          </button>
        </div>

        {/* フィルター */}
        <div className="mb-4 flex justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className="rounded bg-gray-200 px-3 py-1"
          >
            すべて
          </button>

          <button
            onClick={() => setFilter("active")}
            className="rounded bg-gray-200 px-3 py-1"
          >
            未完了
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="rounded bg-gray-200 px-3 py-1"
          >
            完了済み
          </button>
        </div>

        {/* タスク一覧 */}
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between rounded border p-3"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`text-left ${
                  task.done
                    ? "text-gray-400 line-through"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;