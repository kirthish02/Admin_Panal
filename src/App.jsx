import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Signin from "./pages/Signin/Signin"
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Menu from "./pages/Menu/menu";
import Profile from "./pages/Profile/profile";
import Combo from "./pages/Combo_offers/combo-offers";
import AddCombo from "./pages/Addcombo/AddCombo";

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

  const updateComboData = setComboData;

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/combo-offers"
        element={<Combo data={comboData} setData={updateComboData} />}
      />
      <Route
        path="/add-combo"
        element={<AddCombo addCombos={addCombos} />}
      />
    </Routes>
  );
}

export default App;