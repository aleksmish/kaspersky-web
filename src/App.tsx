import React from "react";
import "./App.css";
import { NewsSnippetCard } from "./components/NewsSnippetCard";
import { testData } from "./mock";

function App() {
  return (
    <div className="App">
      <NewsSnippetCard data={testData} />
    </div>
  );
}

export default App;
