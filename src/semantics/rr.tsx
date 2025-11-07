import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";

export const WordList = ({ words }) => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 3000),
    []
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel(); // очищаем таймер при размонтировании
    };
  }, [handleSearch]);

  // Фильтрация по поиску
  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(search.toLowerCase())
  );

  // Если не показываем все → берем slice(0, 5)
  const wordsToDisplay = showAll ? filteredWords : words.slice(0, 5);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow">
      <ul className="space-y-2">
        {wordsToDisplay.map((word, idx) => (
          <li
            key={idx}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            {word}
          </li>
        ))}
      </ul>

      {/* Кнопка показать всё */}
      {!showAll && words.length > 5 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Показать всё
        </button>
      )}

      {/* Поиск */}
      {showAll && (
        <input
          type="text"
          placeholder="Поиск..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value); // обновляем сразу input
            handleSearch(e.target.value);   // debounce для фильтрации
          }}
          className="mt-4 w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      )}
    </div>
  );
};
