import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context";
import { useHistory } from "react-router-dom";
import { Option } from "../interfaces";
import "../style/App.css";
import { generateRandomEndpoint } from "../utils";

const initialOptions: Option[] = [
  {
    value: "",
    votes: 0,
  },
];

export default function App() {
  const history = useHistory();
  const { setId, setMax, setOptions } = useContext(StoreContext);
  const [currentOptions, setCurrentOptions] =
    useState<Option[]>(initialOptions);

  useEffect(() => {
    const lastOptionInput = document.getElementById(
      `vote-option-${currentOptions.length - 1}`
    );
    lastOptionInput!.focus();
  }, [currentOptions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    receivedIndex: number
  ) => {
    const newOptions = currentOptions.map((option, idx) => {
      if (idx === receivedIndex) {
        return { ...option, value: e.target.value };
      } else return option;
    });
    setCurrentOptions(newOptions);
  };

  const handleAddOption = (receivedValue: string) => {
    if (
      currentOptions.every((option) => option.value) &&
      currentOptions.filter((option) => option.value === receivedValue)
        .length === 1
    ) {
      setCurrentOptions([...currentOptions, { value: "", votes: 0 }]);
    }
  };

  const handleRemoveOption = (receivedValue: string) => {
    if (currentOptions.length > 1) {
      setCurrentOptions(
        currentOptions.filter((option) => option.value !== receivedValue)
      );
    } else setCurrentOptions(initialOptions);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    receivedValue: string
  ) => {
    if (e.key === "Enter") {
      handleAddOption(receivedValue);
    }
  };

  const handleCreate = () => {
    if (currentOptions.every((option) => option.value)) {
      const voteId = generateRandomEndpoint();
      setId(voteId);
      setMax(100);
      setOptions(currentOptions);
      history.push(`/${voteId}`);
    }
  };

  return (
    <div className="App">
      <span className="title">Vote it!</span>
      <div className="vote-options-wrapper">
        {currentOptions.map((option, idx) => {
          return (
            <div className="vote-option-container" key={option.value}>
              <input
                autoComplete="off"
                className="vote-option-input"
                id={`vote-option-${idx}`}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
                value={option.value}
              />
              <button
                className="vote-option-add-button"
                onClick={() => handleAddOption(option.value)}
              >
                +
              </button>
              <button
                className="vote-option-remove-button"
                onClick={() => handleRemoveOption(option.value)}
              >
                <span>❌</span>
              </button>
            </div>
          );
        })}
      </div>
      <button className="primary-button" onClick={handleCreate}>
        Create it!
      </button>
    </div>
  );
}
