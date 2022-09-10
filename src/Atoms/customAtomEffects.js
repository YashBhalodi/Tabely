export const recoilPersist = (config = {}) => {
  const { key = "recoil-persist", storage = localStorage } = config;
  const persistAtom = ({ onSet, node, trigger, setSelf }) => {
    if (trigger === "get") {
      const state = getState();
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(node.key)) {
        setSelf(state[node.key]);
      } else {
        setSelf((currentValue) => {
          updateState(currentValue, state, node.key);
          return currentValue;
        });
      }
    }
    onSet(async (newValue, _, isReset) => {
      const state = getState();
      updateState(newValue, state, node.key, isReset);
    });
  };
  const updateState = (newValue, state, key, isReset) => {
    if (isReset) {
      delete state[key];
    } else {
      state[key] = newValue;
    }
    setState(state);
  };
  const getState = () => {
    const toParse = storage.getItem(key);
    if (toParse === null || toParse === undefined) {
      return {};
    }
    if (typeof toParse === "string") {
      return parseState(toParse);
    }
    if (typeof toParse.then === "function") {
      return toParse.then(parseState);
    }
    return {};
  };
  const parseState = (state) => {
    if (state === undefined) {
      return {};
    }
    try {
      return JSON.parse(state);
    } catch (e) {
      console.error(e);
      return {};
    }
  };
  const setState = (state) => {
    try {
      if (typeof storage.mergeItem === "function") {
        storage.mergeItem(key, JSON.stringify(state));
      } else {
        storage.setItem(key, JSON.stringify(state));
      }
    } catch (e) {
      console.error(e);
    }
  };
  return { persistAtom };
};
