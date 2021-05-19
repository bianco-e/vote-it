import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context";
import "../style/App.css";
import "../style/Vote.css";
import socket from "../socket";
import { Option } from "../interfaces";
import { ADD_VOTE, GET_UPDATED_OPTIONS } from "../context/types";

export default function Vote() {
  const { state } = useContext(StoreContext);
  const [currentOptions, setCurrentOptions] = useState<Option[]>(state.options);

  useEffect(() => {
    socket.on(GET_UPDATED_OPTIONS, (updatedOptions) => {
      setCurrentOptions(updatedOptions);
    });
    return () => {
      socket.off();
    };
  }, []);

  const handleVote = (receivedOption: Option) => {
    const newOptions = currentOptions.map((option) => {
      if (option.value === receivedOption.value) {
        return { ...option, votes: option.votes + 1 };
      } else return option;
    });
    socket.emit(ADD_VOTE, newOptions);
  };

  return (
    <div className="App">
      <span className="title">Vote it!</span>
      <div className="vote-options-wrapper">
        {currentOptions.map((option, idx) => {
          return (
            <button
              className="vote-button"
              key={option.value}
              onClick={() => handleVote(option)}
            >
              <span>{option.value}</span>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(option.votes * 100) / 200}px` }}
                />
              </div>
              <span className="votes-number">{option.votes}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
