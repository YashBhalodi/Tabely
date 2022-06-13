export const COMMON = {
  class: "transition-all",
  activeClass: "outline outline-offset-1",
  pickerHoverClass: "hover:outline hover:outline-offset-2",
};

export const COLOR_THEME = {
  RED: {
    label: "Red",
    class: `${COMMON.class} text-red-50 bg-red-600 hover:bg-red-700`,
    activeClass: `${COMMON.activeClass} outline-red-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-red-500`,
    bg_tw: "red-500", // bg-red-500   `bg-${bg_tw}`
    ho_tw: "red-700", // hover:bg-red-700  `hover:bg-${ho_tw}`
    tx_tw: "red-50", // text-red-50   `text-${tx_tw}`
    tw: "red",
  },
  BLUE: {
    label: "Blue",
    class: `${COMMON.class} text-blue-50 bg-blue-600 hover:bg-blue-700`,
    activeClass: `${COMMON.activeClass} outline-blue-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-blue-500`,
    bg_tw: "blue-600", // bg-blue-600   `bg-${bg_tw}`
    ho_tw: "blue-700", // hover:bg-blue-700  `hover:bg-${ho_tw}`
    tx_tw: "blue-50", // text-blue-50   `text-${tx_tw}`
    tw: "blue",
  },
  PINK: {
    label: "Pink",
    class: `${COMMON.class} text-pink-50 bg-pink-600 hover:bg-pink-700`,
    activeClass: `${COMMON.activeClass} outline-pink-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-pink-500`,
    bg_tw: "pink-600", // bg-pink-600   `bg-${bg_tw}`
    ho_tw: "pink-700", // hover:bg-pink-700  `hover:bg-${ho_tw}`
    tx_tw: "pink-50", // text-pink-50   `text-${tx_tw}`
    tw: "pink",
  },
  PURPLE: {
    label: "Purple",
    class: `${COMMON.class} text-purple-50 bg-purple-600 hover:bg-purple-700`,
    activeClass: `${COMMON.activeClass} outline-purple-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-purple-500`,
    bg_tw: "purple-600", // bg-purple-600   `bg-${bg_tw}`
    ho_tw: "purple-700", // hover:bg-purple-700  `hover:bg-${ho_tw}`
    tx_tw: "purple-50", // text-purple-50   `text-${tx_tw}`
    tw: "purple",
  },

  INDIGO: {
    label: "Indigo",
    class: `${COMMON.class} text-indigo-50 bg-indigo-600 hover:bg-indigo-700`,
    activeClass: `${COMMON.activeClass} outline-indigo-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-indigo-500`,
    bg_tw: "indigo-600", // bg-indigo-600   `bg-${bg_tw}`
    ho_tw: "indigo-700", // hover:bg-indigo-700  `hover:bg-${ho_tw}`
    tx_tw: "indigo-50", // text-indigo-50   `text-${tx_tw}`
    tw: "indigo",
  },

  CYAN: {
    label: "Cyan",
    class: `${COMMON.class} text-cyan-900 bg-cyan-400 hover:bg-cyan-500`,
    activeClass: `${COMMON.activeClass} outline-cyan-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-cyan-400`,
    bg_tw: "cyan-400", // bg-cyan-400   `bg-${bg_tw}`
    ho_tw: "cyan-500", // hover:bg-cyan-500  `hover:bg-${ho_tw}`
    tx_tw: "cyan-900", // text-cyan-900   `text-${tx_tw}`
    tw: "cyan",
  },
  TEAL: {
    label: "Teal",
    class: `${COMMON.class} text-teal-900 bg-teal-400 hover:bg-teal-500`,
    activeClass: `${COMMON.activeClass} outline-teal-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-teal-500`,
    bg_tw: "teal-400", // bg-teal-400   `bg-${bg_tw}`
    ho_tw: "teal-500", // hover:bg-teal-500  `hover:bg-${ho_tw}`
    tx_tw: "teal-900", // text-teal-900   `text-${tx_tw}`
    tw: "teal",
  },
  GREEN: {
    label: "Green",
    class: `${COMMON.class} text-green-50 bg-green-600 hover:bg-green-700`,
    activeClass: `${COMMON.activeClass} outline-green-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-green-500`,
    bg_tw: "green-600", // bg-green-600   `bg-${bg_tw}`
    ho_tw: "green-700", // hover:bg-green-700  `hover:bg-${ho_tw}`
    tx_tw: "green-50", // text-green-50   `text-${tx_tw}`
    tw: "green",
  },
  LIME: {
    label: "Lime",
    class: `${COMMON.class} text-lime-50 bg-lime-600 hover:bg-lime-700`,
    activeClass: `${COMMON.activeClass} outline-lime-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-lime-500`,
    bg_tw: "lime-600", // bg-lime-600   `bg-${bg_tw}`
    ho_tw: "lime-700", // hover:bg-lime-700  `hover:bg-${ho_tw}`
    tx_tw: "lime-50", // text-lime-50   `text-${tx_tw}`
    tw: "lime",
  },
  YELLOW: {
    label: "Yellow",
    class: `${COMMON.class} text-yellow-900 bg-yellow-300 hover:bg-yellow-400`,
    activeClass: `${COMMON.activeClass} outline-yellow-400`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-yellow-400`,
    bg_tw: "yellow-300", // bg-yellow-300   `bg-${bg_tw}`
    ho_tw: "yellow-400", // hover:bg-yellow-400  `hover:bg-${ho_tw}`
    tx_tw: "yellow-900", // text-yellow-900   `text-${tx_tw}`
    tw: "yellow",
  },
  AMBER: {
    label: "Amber",
    class: `${COMMON.class} text-amber-50 bg-amber-500 hover:bg-amber-600`,
    activeClass: `${COMMON.activeClass} outline-amber-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-amber-500`,
    bg_tw: "amber-500", // bg-amber-500   `bg-${bg_tw}`
    ho_tw: "amber-600", // hover:bg-amber-600  `hover:bg-${ho_tw}`
    tx_tw: "amber-50", // text-amber-50   `text-${tx_tw}`
    tw: "amber",
  },
  ORANGE: {
    label: "Orange",
    class: `${COMMON.class} text-orange-900 bg-orange-400 hover:bg-orange-300`,
    activeClass: `${COMMON.activeClass} outline-orange-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-orange-500`,
    bg_tw: "orange-400", // bg-orange-400   `bg-${bg_tw}`
    ho_tw: "orange-300", // hover:bg-orange-300  `hover:bg-${ho_tw}`
    tx_tw: "orange-900", // text-orange-900   `text-${tx_tw}`
    tw: "orange",
  },
  EMERALD: {
    label: "Emerald",
    class: `${COMMON.class} text-emerald-900 bg-emerald-400 hover:bg-emerald-300`,
    activeClass: `${COMMON.activeClass} outline-emerald-400`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-emerald-400`,
    bg_tw: "emerald-400", // bg-emerald-400   `bg-${bg_tw}`
    ho_tw: "emerald-300", // hover:bg-emerald-300  `hover:bg-${ho_tw}`
    tx_tw: "emerald-900", // text-emerald-900   `text-${tx_tw}`
    tw: "emerald",
  },
  SKY: {
    label: "Sky",
    class: `${COMMON.class} text-sky-900 bg-sky-400 hover:bg-sky-300`,
    activeClass: `${COMMON.activeClass} outline-sky-400`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-sky-400`,
    bg_tw: "sky-400", // bg-sky-400   `bg-${bg_tw}`
    ho_tw: "sky-300", // hover:bg-sky-300  `hover:bg-${ho_tw}`
    tx_tw: "sky-900", // text-sky-900   `text-${tx_tw}`
    tw: "sky",
  },
  VIOLET: {
    label: "Violet",
    class: `${COMMON.class} text-violet-900 bg-violet-300 hover:bg-violet-200`,
    activeClass: `${COMMON.activeClass} outline-violet-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-violet-500`,
    bg_tw: "violet-300", // bg-violet-300   `bg-${bg_tw}`
    ho_tw: "violet-200", // hover:bg-violet-200  `hover:bg-${ho_tw}`
    tx_tw: "violet-900", // text-violet-900   `text-${tx_tw}`
    tw: "violet",
  },
  FUSCHIA: {
    label: "Fuchsia",
    class: `${COMMON.class} text-fuchsia-50 bg-fuchsia-600 hover:bg-fuchsia-700`,
    activeClass: `${COMMON.activeClass} outline-fuchsia-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-fuchsia-500`,
    bg_tw: "fuchsia-600", // bg-fuchsia-600   `bg-${bg_tw}`
    ho_tw: "fuchsia-700", // hover:bg-fuchsia-700  `hover:bg-${ho_tw}`
    tx_tw: "fuchsia-50", // text-fuchsia-50   `text-${tx_tw}`
    tw: "fuchsia",
  },
  ROSE: {
    label: "Rose",
    class: `${COMMON.class} text-rose-900 bg-rose-200 hover:bg-rose-100`,
    activeClass: `${COMMON.activeClass} outline-rose-400`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-rose-400`,
    bg_tw: "rose-200", // bg-rose-200   `bg-${bg_tw}`
    ho_tw: "rose-100", // hover:bg-rose-100  `hover:bg-${ho_tw}`
    tx_tw: "rose-900", // text-rose-900   `text-${tx_tw}`
    tw: "rose",
  },
  STONE: {
    label: "Stone",
    class: `${COMMON.class} text-stone-50 bg-stone-700 hover:bg-stone-800`,
    activeClass: `${COMMON.activeClass} outline-stone-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-stone-500`,
    bg_tw: "stone-700", // bg-stone-700   `bg-${bg_tw}`
    ho_tw: "stone-800", // hover:bg-stone-800  `hover:bg-${ho_tw}`
    tx_tw: "stone-50", // text-stone-50   `text-${tx_tw}`
    tw: "stone",
  },
  ZINC: {
    label: "Zinc",
    class: `${COMMON.class} text-zinc-900 bg-zinc-300 hover:bg-zinc-200`,
    activeClass: `${COMMON.activeClass} outline-zinc-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-zinc-500`,
    bg_tw: "zinc-300", // bg-zinc-300   `bg-${bg_tw}`
    ho_tw: "zinc-200", // hover:bg-zinc-200  `hover:bg-${ho_tw}`
    tx_tw: "zinc-900", // text-zinc-900   `text-${tx_tw}`
    tw: "zinc",
  },
  GRAY: {
    label: "Gray",
    class: `${COMMON.class} text-gray-900 bg-gray-200 hover:bg-gray-300`,
    activeClass: `${COMMON.activeClass} outline-gray-500`,
    pickerHoverClass: `${COMMON.pickerHoverClass} hover:outline-gray-500`,
    bg_tw: "gray-200", // bg-gray-200   `bg-${bg_tw}`
    ho_tw: "gray-300", // hover:bg-gray-300  `hover:bg-${ho_tw}`
    tx_tw: "gray-900", // text-gray-900   `text-${tx_tw}`
    tw: "gray",
  },
};
