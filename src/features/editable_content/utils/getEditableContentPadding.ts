const getEditableContentPadding = (fontSize: number) => {
  switch (fontSize) {
    case 10: {
      return "p-1";
    }
    case 12: {
      return "p-1";
    }
    case 14: {
      return "p-2";
    }
    case 16: {
      return "p-2";
    }
    case 18: {
      return "p-2";
    }
    case 20: {
      return "p-2";
    }
    default: {
      return "p-2";
    }
  }
};

export default getEditableContentPadding;
