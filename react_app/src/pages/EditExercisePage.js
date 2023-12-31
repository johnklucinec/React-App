import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Generate the Edit Exercise Page
 */
export const EditExercisePage = ({ exerciseToEdit }) => {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate();
  let options = exerciseToEdit.unit === "lbs" ? ["kgs"] : ["lbs"];

  const editExercise = async () => {
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Successfully edited the exercise");
    } else {
      alert(`Failed to edit exercise, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Exercise</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select onChange={(e) => setUnit(e.target.value)}>
        <option>{exerciseToEdit.unit}</option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={editExercise}>Save</button>
    </div>
  );
};

export default EditExercisePage;
