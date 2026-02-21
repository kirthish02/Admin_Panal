import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Menu from "./pages/menu";
import Profile from "./pages/profile";
import Combo from "./pages/combo-offers";
import AddCombo from "./pages/AddCombo";

function App() {
  const defaultData = {
    breakfast: { title: "Breakfast Combos", items: [] },
    lunch: { title: "Lunch Combos", items: [] },
    dinner: { title: "Dinner Combos", items: [] },
  };

  const [comboData, setComboData] = useState(defaultData);

  const addCombos = (type, newCombos) => {
    setComboData((prev) => {
      const items = [...(prev[type]?.items || []), ...newCombos];
      return {
        ...prev,
        [type]: { ...prev[type], items },
      };
    });
  };

  // expose the raw setter so children can edit/delete as needed
  const updateComboData = setComboData;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/combo-offers"
          element={
            <Combo data={comboData} setData={updateComboData} />
          }
        />
        <Route
          path="/add-combo"
          element={<AddCombo addCombos={addCombos} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
