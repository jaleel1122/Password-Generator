import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");

  //useReff
  const passwaordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+[]{}<>?~`";

    if (!chars) return;

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, [length, useUpper, useLower, useNumbers, useSymbols, setPassword]);

  function copyToClipboard() {
    passwaordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, useUpper, useLower, useNumbers, useSymbols, passwordGenerator]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
        <div className="bg-gray-850 text-gray-100 p-8 rounded-3xl shadow-2xl w-[500px] border">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center mb-8 text-white tracking-wide">
            Password Generator
          </h1>

          {/* Password Display */}
          <div className="flex items-center gap-3 mb-8">
            <input
              type="text"
              placeholder="password"
              value={password}
              ref={passwaordRef}
              readOnly
              className="flex-1 px-5 py-3 rounded-full border border-gray-700 bg-gray-900 text-lg tracking-wide focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 
             hover:from-purple-600 hover:to-indigo-600 
             rounded-full shadow-lg font-semibold 
             transition-transform transform active:scale-95"
            >
              Copy
            </button>
          </div>

          {/* Length control */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-gray-300 text-lg">
              Password length:{" "}
              <span className="font-bold text-white">{length}</span>
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLength((prev) => Math.max(6, prev - 1))}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 transition text-xl"
              >
                −
              </button>
              <input
                type="range"
                min="6"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-40 accent-indigo-500"
              />
              <button
                onClick={() => setLength((prev) => Math.min(32, prev + 1))}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 transition text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Character options */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-300 font-medium">Characters used:</span>
            <div className="flex gap-6 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={useUpper}
                  checked={useUpper}
                  onChange={() => setUseUpper((prev) => !prev)}
                  className="accent-indigo-500 w-5 h-5"
                />
                <span className="font-medium">ABC</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={useLower}
                  checked={useLower}
                  onChange={() => setUseLower((prev) => !prev)}
                  className="accent-indigo-500 w-5 h-5"
                />
                <span className="font-medium">abc</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={() => setUseNumbers((prev) => !prev)}
                  className="accent-indigo-500 w-5 h-5"
                />
                <span className="font-medium">123</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={() => setUseSymbols((prev) => !prev)}
                  className="accent-indigo-500 w-5 h-5"
                />
                <span className="font-medium">#$&</span>
              </label>
            </div>
          </div>

          {/* Generate button */}
          {/* <button className="w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-full font-semibold shadow-lg transition">
            Generate
          </button> */}
        </div>
      </div>
    </>
  );
}

export default App;
